/**
 * Permission evaluation, from `GET /my/profile`.
 *
 * The backend returns one ACL row per *public entity* the administrator has
 * privileges on, keyed by an iden like `DDIs` or `Extension` (see
 * `AdministratorRelPublicEntityRepository::getByAdministratorId()`), plus a set
 * of feature flags for the tenant.
 *
 * The rule that is easy to get wrong: `acls` is only meaningful when
 * `restricted` is true. An unrestricted administrator gets `acls: []` and may
 * do everything — an empty array means "no restrictions", not "no access".
 */

export type Operation = 'create' | 'read' | 'update' | 'delete';

export interface ProfileAcl {
  iden: string;
  create?: boolean | null;
  read?: boolean | null;
  update?: boolean | null;
  delete?: boolean | null;
}

/** The union of what the four `/my/profile` variants can return. */
export interface RawProfile {
  restricted?: boolean | null;
  canImpersonate?: boolean | null;
  acls?: ProfileAcl[] | null;
  features?: string[] | null;
  vpbx?: boolean | null;
  residential?: boolean | null;
  retail?: boolean | null;
  wholesale?: boolean | null;
  billingInfo?: boolean | null;
  defaultCountryId?: number | null;
  defaultLocationId?: number | null;
}

/** The tenant's business type, which decides which screens make sense at all. */
export type TenantType =
  'vpbx' | 'residential' | 'retail' | 'wholesale' | 'unknown';

const ALL_ALLOWED: Readonly<Record<Operation, boolean>> = Object.freeze({
  create: true,
  read: true,
  update: true,
  delete: true,
});

export class AccessControl {
  readonly restricted: boolean;
  readonly canImpersonate: boolean;
  readonly features: ReadonlySet<string>;
  readonly billingInfo: boolean;
  readonly defaultCountryId: number | null;
  readonly defaultLocationId: number | null;
  readonly tenantTypes: ReadonlySet<TenantType>;

  private readonly acls: ReadonlyMap<string, Record<Operation, boolean>>;

  constructor(profile: RawProfile | null | undefined) {
    const raw = profile ?? {};

    this.restricted = raw.restricted === true;
    this.canImpersonate = raw.canImpersonate === true;
    this.features = new Set(raw.features ?? []);
    this.billingInfo = raw.billingInfo === true;
    this.defaultCountryId = raw.defaultCountryId ?? null;
    this.defaultLocationId = raw.defaultLocationId ?? null;

    const types = new Set<TenantType>();
    if (raw.vpbx) types.add('vpbx');
    if (raw.residential) types.add('residential');
    if (raw.retail) types.add('retail');
    if (raw.wholesale) types.add('wholesale');
    if (types.size === 0) types.add('unknown');
    this.tenantTypes = types;

    const acls = new Map<string, Record<Operation, boolean>>();
    for (const entry of raw.acls ?? []) {
      if (!entry?.iden) continue;
      acls.set(entry.iden, {
        create: entry.create === true,
        read: entry.read === true,
        update: entry.update === true,
        delete: entry.delete === true,
      });
    }
    this.acls = acls;
  }

  /**
   * Whether the signed-in administrator may perform `operation` on the public
   * entity `iden`.
   *
   * An unrestricted administrator may do anything. A restricted one may only do
   * what an explicit ACL row grants; an entity with no row at all is denied.
   */
  can(iden: string | undefined, operation: Operation): boolean {
    if (!this.restricted) return true;
    if (!iden) return false;
    return this.acls.get(iden)?.[operation] === true;
  }

  /** The full permission set for an entity, for gating a whole screen at once. */
  permissions(iden: string | undefined): Record<Operation, boolean> {
    if (!this.restricted) return { ...ALL_ALLOWED };
    if (!iden)
      return { create: false, read: false, update: false, delete: false };
    return (
      this.acls.get(iden) ?? {
        create: false,
        read: false,
        update: false,
        delete: false,
      }
    );
  }

  /** Whether the entity is reachable at all — the test for showing a nav item. */
  isVisible(iden: string | undefined): boolean {
    return this.can(iden, 'read');
  }

  hasFeature(feature: string): boolean {
    return this.features.has(feature);
  }

  isTenant(type: TenantType): boolean {
    return this.tenantTypes.has(type);
  }
}

/**
 * Feature idens the client API reports in `features[]`.
 * Mirrors `FeaturesRelCompanyRepository` and the old `ClientFeatures` enum.
 */
export const ClientFeature = {
  queues: 'queues',
  recordings: 'recordings',
  faxes: 'faxes',
  friends: 'friends',
  conferences: 'conferences',
  webhooks: 'webhooks',
} as const;

export type ClientFeatureName =
  (typeof ClientFeature)[keyof typeof ClientFeature];
