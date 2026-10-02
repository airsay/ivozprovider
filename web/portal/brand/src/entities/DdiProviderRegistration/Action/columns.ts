import { CsvColumn, CsvRecord } from '../../../components/CsvImport/csvRecords';

/**
 * DDI provider registrations. Username + domain is unique platform-wide
 * [ORM unique constraint ddiProviderRegistration_username_domain], so rows
 * are matched on that pair within the provider.
 */
export const REGISTRATION_COLUMNS: CsvColumn[] = [
  { key: 'username', label: 'Username', required: true, maxLength: 64 },
  { key: 'domain', label: 'Domain', required: true, maxLength: 190 },
  { key: 'authPassword', label: 'Password', maxLength: 64 },
  {
    key: 'multiDdi',
    label: 'Random contact username',
    choices: ['yes', 'no'],
  },
  { key: 'contactUsername', label: 'Contact username', maxLength: 64 },
  {
    key: 'authUsername',
    label: 'Authentication username',
    aliases: ['Auth username'],
    maxLength: 64,
  },
  { key: 'authProxy', label: 'Registrar server URI', maxLength: 64 },
  { key: 'realm', label: 'Realm', maxLength: 64 },
  {
    key: 'expires',
    label: 'Registration expiry (seconds)',
    aliases: ['Expires', 'Expire'],
  },
];

export const DEFAULT_EXPIRES = 3600;

export interface RegistrationRow {
  id: number;
  username: string;
  domain: string;
  realm?: string | null;
  authUsername?: string | null;
  authPassword?: string | null;
  authProxy?: string | null;
  expires?: number | null;
  multiDdi?: boolean | number | null;
  contactUsername?: string | null;
}

export const pairKey = (username: string, domain: string): string =>
  `${username.trim().toLowerCase()}@${domain.trim().toLowerCase()}`;

/** Passwords are never exported. */
export const toRegistrationRecord = (row: RegistrationRow): CsvRecord => ({
  username: row.username ?? '',
  domain: row.domain ?? '',
  authPassword: '',
  multiDdi: row.multiDdi ? 'yes' : 'no',
  contactUsername: row.multiDdi ? '' : row.contactUsername ?? '',
  authUsername: row.authUsername ?? '',
  authProxy: row.authProxy ?? '',
  realm: row.realm ?? '',
  expires: String(row.expires ?? DEFAULT_EXPIRES),
});

export type Payload = { values: Record<string, unknown> } | { error: string };

export function toRegistrationPayload(
  record: CsvRecord,
  ddiProviderId: number,
  existing?: RegistrationRow
): Payload {
  const multiDdi = record.multiDdi
    ? record.multiDdi.toLowerCase() === 'yes'
    : true;
  const password = record.authPassword || existing?.authPassword || '';
  if (!password) {
    return {
      error: existing
        ? 'Password is required: the stored password could not be read'
        : 'Password is required for a new registration',
    };
  }
  if (record.authProxy && !/^sips?:/i.test(record.authProxy)) {
    return {
      error: 'Registrar server URI must start with sip: or sips:',
    };
  }
  let expires = DEFAULT_EXPIRES;
  if (record.expires) {
    if (!/^\d+$/.test(record.expires)) {
      return { error: 'Registration expiry must be a whole number of seconds' };
    }
    expires = Number(record.expires);
  }

  return {
    values: {
      username: record.username,
      domain: record.domain,
      authPassword: password,
      multiDdi,
      // The domain clears it when the contact username is random.
      contactUsername: multiDdi ? '' : record.contactUsername ?? '',
      authUsername: record.authUsername ?? '',
      authProxy: record.authProxy ?? '',
      realm: record.realm ?? '',
      expires,
      ddiProvider: ddiProviderId,
    },
  };
}
