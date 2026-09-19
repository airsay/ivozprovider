/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/platform/public/apiSpec.json
// Regenerate with: yarn codegen
// App: platform  Spec: swagger 2.0  basePath: /api/platform/

/** `ActiveCalls` */
export interface ActiveCalls {
  inbound?: number | null;
  outbound?: number | null;
  total?: number | null;
}

/** `Administrator` */
export interface Administrator {
  /** Max length 65. */
  username: string;
  /** Max length 80. */
  pass?: string | null;
  /** Max length 100. */
  email: string;
  active: boolean;
  restricted: boolean;
  /** Max length 100. */
  name?: string | null;
  /** Max length 100. */
  lastname?: string | null;
  canImpersonate: boolean;
  /** Read-only. */
  readonly id?: number | null;
  brand?: number | null;
  company?: number | null;
  timezone?: number | null;
}

/** `Administrator-collection` — the `collection` serialization of Administrator. */
export interface AdministratorCollection {
  /** Read-only. */
  readonly id?: number | null;
  active: boolean;
  restricted: boolean;
  /** Max length 65. */
  username: string;
  /** Max length 100. */
  name?: string | null;
  /** Max length 100. */
  lastname?: string | null;
  /** Max length 100. */
  email: string;
}

/** `Administrator-detailed` — the `detailed` serialization of Administrator. */
export interface AdministratorDetailed {
  /** Max length 65. */
  username: string;
  /** Max length 80. */
  pass?: string | null;
  /** Max length 100. */
  email: string;
  active: boolean;
  restricted: boolean;
  /** Max length 100. */
  name?: string | null;
  /** Max length 100. */
  lastname?: string | null;
  canImpersonate: boolean;
  /** Read-only. */
  readonly id?: number | null;
  brand?: Brand | null;
  company?: Company | null;
  timezone?: Timezone | null;
}

/** `AdministratorRelPublicEntity` */
export interface AdministratorRelPublicEntity {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  /** Read-only. */
  readonly id?: number | null;
  administrator: number;
  publicEntity: number;
}

/** `AdministratorRelPublicEntity-collection` — the `collection` serialization of AdministratorRelPublicEntity. */
export interface AdministratorRelPublicEntityCollection {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  /** Read-only. */
  readonly id?: number | null;
  administrator: number;
  publicEntity: number;
}

/** `AdministratorRelPublicEntity-detailed` — the `detailed` serialization of AdministratorRelPublicEntity. */
export interface AdministratorRelPublicEntityDetailed {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  /** Read-only. */
  readonly id?: number | null;
  administrator: Administrator;
  publicEntity: PublicEntity;
}

/** `ApplicationServer` */
export interface ApplicationServer {
  /** Max length 50. */
  ip: string;
  /** Max length 64. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ApplicationServer-collection` — the `collection` serialization of ApplicationServer. */
export interface ApplicationServerCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 64. */
  name: string;
  /** Max length 50. */
  ip: string;
}

/** `ApplicationServer-detailed` — the `detailed` serialization of ApplicationServer. */
export interface ApplicationServerDetailed {
  /** Max length 50. */
  ip: string;
  /** Max length 64. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ApplicationServerSet` */
export interface ApplicationServerSet {
  /** Max length 32. */
  name: string;
  /** Max length 25. */
  distributeMethod: "rr" | "hash";
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  applicationServers?: unknown | null;
}

/** `ApplicationServerSet-collection` — the `collection` serialization of ApplicationServerSet. */
export interface ApplicationServerSetCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 32. */
  name: string;
  /** Max length 25. */
  distributeMethod: "rr" | "hash";
  /** Max length 200. */
  description?: string | null;
}

/** `ApplicationServerSet-detailed` — the `detailed` serialization of ApplicationServerSet. */
export interface ApplicationServerSetDetailed {
  /** Max length 32. */
  name: string;
  /** Max length 25. */
  distributeMethod: "rr" | "hash";
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  applicationServers?: unknown | null;
}

/** `BannedAddress-collection` — the `collection` serialization of BannedAddress. */
export interface BannedAddressCollection {
  /** Max length 50. */
  ip?: string | null;
  lastTimeBanned?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  blocker?: "antiflood" | "ipfilter" | "antibruteforce" | null;
  /** Max length 300. */
  aor?: string | null;
}

/** `BannedAddress-detailed` — the `detailed` serialization of BannedAddress. */
export interface BannedAddressDetailed {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 50. */
  blocker?: "antiflood" | "ipfilter" | "antibruteforce" | null;
  /** Max length 300. */
  aor?: string | null;
  /** Max length 100. */
  description?: string | null;
  lastTimeBanned?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `BillableCall` */
export interface BillableCall {
  /** Max length 255. */
  callid?: string | null;
  startTime: string;
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  cost?: number | null;
  price?: number | null;
  priceDetails?: Array<string> | null;
  /** Max length 200. */
  carrierName?: string | null;
  /** Max length 100. */
  destinationName?: string | null;
  /** Max length 55. */
  ratingPlanName?: string | null;
  /** Max length 55. */
  endpointType?: "RetailAccount" | "ResidentialDevice" | "User" | "Friend" | "Fax" | null;
  endpointId?: number | null;
  /** Max length 65. */
  endpointName?: string | null;
  direction: "inbound" | "outbound";
  /** Read-only. */
  readonly id?: number | null;
  brand?: number | null;
  company?: number | null;
  carrier?: number | null;
  invoice?: number | null;
  ddi?: number | null;
  ddiProvider?: number | null;
}

/** `BillableCall-collection` — the `collection` serialization of BillableCall. */
export interface BillableCallCollection {
  startTime: string;
  direction: "inbound" | "outbound";
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  cost?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  price?: number | null;
  /** Max length 255. */
  callid?: string | null;
  brand?: number | null;
  company?: number | null;
  carrier?: number | null;
  ddiProvider?: number | null;
  invoice?: number | null;
  /** Max length 55. */
  endpointType?: "RetailAccount" | "ResidentialDevice" | "User" | "Friend" | "Fax" | null;
  endpointId?: number | null;
  /** Max length 65. */
  endpointName?: string | null;
  ddi?: number | null;
}

/** `BillableCall-detailed` — the `detailed` serialization of BillableCall. */
export interface BillableCallDetailed {
  /** Max length 255. */
  callid?: string | null;
  startTime: string;
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  cost?: number | null;
  price?: number | null;
  priceDetails?: Array<string> | null;
  /** Max length 200. */
  carrierName?: string | null;
  /** Max length 100. */
  destinationName?: string | null;
  /** Max length 55. */
  ratingPlanName?: string | null;
  /** Max length 55. */
  endpointType?: "RetailAccount" | "ResidentialDevice" | "User" | "Friend" | "Fax" | null;
  endpointId?: number | null;
  /** Max length 65. */
  endpointName?: string | null;
  direction: "inbound" | "outbound";
  /** Read-only. */
  readonly id?: number | null;
  brand?: Brand | null;
  company?: Company | null;
  carrier?: Carrier | null;
  invoice?: Invoice | null;
  ddi?: Ddi | null;
  ddiProvider?: DdiProvider | null;
}

/** `BillableCall-rating` — the `rating` serialization of BillableCall. */
export interface BillableCallRating {
  /** Read-only. */
  readonly id?: number | null;
  price?: number | null;
  cost?: number | null;
  /** Max length 100. */
  destinationName?: string | null;
  /** Max length 55. */
  ratingPlanName?: string | null;
}

/** `Brand` */
export interface Brand {
  /** Max length 75. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
  maxCalls: number;
  /** Read-only. */
  readonly id?: number | null;
  logo?: BrandLogo | null;
  invoice?: BrandInvoice | null;
  language: number;
  defaultTimezone: number;
  currency: number;
  voicemailNotificationTemplate?: number | null;
  onDemandRecordNotificationTemplate?: number | null;
  faxNotificationTemplate?: number | null;
  invoiceNotificationTemplate?: number | null;
  callCsvNotificationTemplate?: number | null;
  maxDailyUsageNotificationTemplate?: number | null;
  /** Active feature ids */
  features?: Array<number> | null;
  /** Active proxyTrunks ids */
  proxyTrunks?: Array<number> | null;
  /** Application Server Set ids */
  applicationServerSets?: Array<number> | null;
  /** Media Relay Set Ids */
  mediaRelaySets?: Array<number> | null;
}

/** `Brand-collection` — the `collection` serialization of Brand. */
export interface BrandCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 75. */
  name: string;
  invoice?: BrandInvoice | null;
  logo?: BrandLogo | null;
  /** Max length 190. */
  domainUsers?: string | null;
  /** Active feature ids */
  features?: Array<number> | null;
  /** Active proxyTrunks ids */
  proxyTrunks?: Array<number> | null;
  /** Application Server Set ids */
  applicationServerSets?: Array<number> | null;
  /** Media Relay Set Ids */
  mediaRelaySets?: Array<number> | null;
}

/** `Brand-detailed` — the `detailed` serialization of Brand. */
export interface BrandDetailed {
  /** Max length 75. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
  maxCalls: number;
  /** Read-only. */
  readonly id?: number | null;
  logo?: BrandLogo | null;
  invoice?: BrandInvoice | null;
  language: Language;
  defaultTimezone: Timezone;
  currency: Currency;
  voicemailNotificationTemplate?: NotificationTemplate | null;
  onDemandRecordNotificationTemplate?: NotificationTemplate | null;
  faxNotificationTemplate?: NotificationTemplate | null;
  invoiceNotificationTemplate?: NotificationTemplate | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  maxDailyUsageNotificationTemplate?: NotificationTemplate | null;
  /** Active feature ids */
  features?: Array<number> | null;
  /** Active proxyTrunks ids */
  proxyTrunks?: Array<number> | null;
  /** Application Server Set ids */
  applicationServerSets?: Array<number> | null;
  /** Media Relay Set Ids */
  mediaRelaySets?: Array<number> | null;
}

/** `BrandService` */
export interface BrandService {
  /** Max length 3. */
  code: string;
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  service: number;
}

/** `BrandService-collection` — the `collection` serialization of BrandService. */
export interface BrandServiceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 3. */
  code: string;
  service: number;
}

/** `BrandService-detailed` — the `detailed` serialization of BrandService. */
export interface BrandServiceDetailed {
  /** Max length 3. */
  code: string;
  /** Read-only. */
  readonly id?: number | null;
  brand: Brand;
  service: Service;
}

/** `Brand_Invoice` */
export interface BrandInvoice {
  /** Max length 25. */
  nif: string;
  /** Max length 255. */
  postalAddress: string;
  /** Max length 10. */
  postalCode: string;
  /** Max length 255. */
  town: string;
  /** Max length 255. */
  province: string;
  /** Max length 255. */
  country: string;
  /** Max length 1024. */
  registryData?: string | null;
}

/** `Brand_Logo` */
export interface BrandLogo {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Carrier` */
export interface Carrier {
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  balance?: number | null;
  calculateCost?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  currency?: number | null;
  proxyTrunk?: number | null;
  mediaRelaySet?: number | null;
}

/** `Carrier-collection` — the `collection` serialization of Carrier. */
export interface CarrierCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 200. */
  name: string;
}

/** `Company` */
export interface Company {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Max length 80. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
  /** Max length 25. */
  distributeMethod: "static" | "rr" | "hash";
  maxCalls: number;
  maxDailyUsage: number;
  currentDayUsage?: number | null;
  /** Max length 100. */
  maxDailyUsageEmail?: string | null;
  ipfilter?: boolean | null;
  onDemandRecord?: number | null;
  allowRecordingRemoval: boolean;
  /** Max length 3. */
  onDemandRecordCode?: string | null;
  /** Max length 25. */
  onDemandRecordEmail: "disabled" | "user" | "other";
  /** Max length 100. */
  onDemandRecordEmailAddress?: string | null;
  /** Max length 65535. */
  externallyextraopts?: string | null;
  recordingsLimitMB?: number | null;
  /** Max length 250. */
  recordingsLimitEmail?: string | null;
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  balance?: number | null;
  showInvoices?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: Invoicing | null;
  language?: number | null;
  defaultTimezone?: number | null;
  brand: number;
  country: number;
  currency?: number | null;
  outgoingDdi?: number | null;
  voicemailNotificationTemplate?: number | null;
  onDemandRecordNotificationTemplate?: number | null;
  faxNotificationTemplate?: number | null;
  invoiceNotificationTemplate?: number | null;
  callCsvNotificationTemplate?: number | null;
  maxDailyUsageNotificationTemplate?: number | null;
  accessCredentialNotificationTemplate?: number | null;
  applicationServerSet: number;
  mediaRelaySet: number;
}

/** `Company-collection` — the `collection` serialization of Company. */
export interface CompanyCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 80. */
  name: string;
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  invoicing?: Invoicing | null;
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  currentDayUsage?: number | null;
  maxDailyUsage: number;
  /** Registration domain Read-only. */
  readonly domainName?: string | null;
}

/** `Country` */
export interface Country {
  /** Max length 100. */
  code: string;
  /** Max length 10. */
  countryCode?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: CountryName | null;
  zone?: CountryZone | null;
}

/** `Country-collection` — the `collection` serialization of Country. */
export interface CountryCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  code: string;
  /** Max length 10. */
  countryCode?: string | null;
  name?: CountryName | null;
}

/** `Country-detailed` — the `detailed` serialization of Country. */
export interface CountryDetailed {
  /** Max length 100. */
  code: string;
  /** Max length 10. */
  countryCode?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: CountryName | null;
  zone?: CountryZone | null;
}

/** `Country_Name` */
export interface CountryName {
  /** Max length 100. */
  en: string;
  /** Max length 100. */
  es: string;
  /** Max length 100. */
  ca: string;
  /** Max length 100. */
  it: string;
  /** Max length 100. */
  eu: string;
}

/** `Country_Zone` */
export interface CountryZone {
  /** Max length 55. */
  en: string;
  /** Max length 55. */
  es: string;
  /** Max length 55. */
  ca: string;
  /** Max length 55. */
  it: string;
  /** Max length 55. */
  eu: string;
}

/** `Currency` */
export interface Currency {
  /** Max length 10. */
  iden: string;
  /** Max length 5. */
  symbol: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: CurrencyName | null;
}

/** `Currency-collection` — the `collection` serialization of Currency. */
export interface CurrencyCollection {
  /** Max length 10. */
  iden: string;
  /** Max length 5. */
  symbol: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: CurrencyName | null;
}

/** `Currency-detailed` — the `detailed` serialization of Currency. */
export interface CurrencyDetailed {
  /** Max length 10. */
  iden: string;
  /** Max length 5. */
  symbol: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: CurrencyName | null;
}

/** `Currency_Name` */
export interface CurrencyName {
  /** Max length 25. */
  en: string;
  /** Max length 25. */
  es: string;
  /** Max length 25. */
  ca: string;
  /** Max length 25. */
  it: string;
  /** Max length 25. */
  eu: string;
}

/** `Dashboard` */
export interface Dashboard {
  admin?: DashboardAdmin | null;
  recentActivity?: Array<DashboardBrand> | null;
  brandNumber?: number | null;
  clientNumber?: number | null;
  userNumber?: number | null;
  productName?: string | null;
}

/** `DashboardAdmin` */
export interface DashboardAdmin {
  username?: string | null;
  name?: string | null;
  lastname?: string | null;
  email?: string | null;
}

/** `DashboardBrand` */
export interface DashboardBrand {
  id?: number | null;
  name?: string | null;
  nif?: string | null;
  sipDomain?: string | null;
  maxCalls?: number | null;
}

/** `Ddi` */
export interface Ddi {
  /** Max length 25. */
  ddi: string;
  /** Max length 25. */
  ddie164?: string | null;
  /** Max length 100. */
  description?: string | null;
  /** Max length 25. */
  recordCalls: "none" | "all" | "inbound" | "outbound";
  /** Max length 50. */
  displayName?: string | null;
  /** Max length 25. */
  routeType?: "user" | "ivr" | "huntGroup" | "fax" | "conferenceRoom" | "friend" | "queue" | "conditional" | "residential" | "retail" | "locution" | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Max length 25. */
  type: "inout" | "out";
  useDdiProviderRoutingTag: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  brand: number;
  language?: number | null;
  ddiProvider?: number | null;
  country?: number | null;
}

/** `DdiProvider` */
export interface DdiProvider {
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  proxyTrunk?: number | null;
  mediaRelaySet?: number | null;
}

/** `DdiProvider-collection` — the `collection` serialization of DdiProvider. */
export interface DdiProviderCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 200. */
  name: string;
}

/** `Domain-collection` — the `collection` serialization of Domain. */
export interface DomainCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 190. */
  domain: string;
  /** Max length 25. */
  pointsTo: "proxyusers" | "proxytrunks";
  brandName?: unknown | null;
  companyName?: unknown | null;
}

/** `Domain-detailed` — the `detailed` serialization of Domain. */
export interface DomainDetailed {
  /** Max length 190. */
  domain: string;
  /** Max length 25. */
  pointsTo: "proxyusers" | "proxytrunks";
  /** Max length 500. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Feature` */
export interface Feature {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: FeatureName | null;
}

/** `Feature-collection` — the `collection` serialization of Feature. */
export interface FeatureCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  iden: string;
  name?: FeatureName | null;
}

/** `Feature-detailed` — the `detailed` serialization of Feature. */
export interface FeatureDetailed {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: FeatureName | null;
}

/** `Feature_Name` */
export interface FeatureName {
  /** Max length 50. */
  en: string;
  /** Max length 50. */
  es: string;
  /** Max length 50. */
  ca: string;
  /** Max length 50. */
  it: string;
  /** Max length 50. */
  eu: string;
}

/** `FeaturesRelBrand` */
export interface FeaturesRelBrand {
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  feature: number;
}

/** `FeaturesRelBrand-collection` — the `collection` serialization of FeaturesRelBrand. */
export interface FeaturesRelBrandCollection {
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  feature: number;
}

/** `FeaturesRelBrand-detailed` — the `detailed` serialization of FeaturesRelBrand. */
export interface FeaturesRelBrandDetailed {
  /** Read-only. */
  readonly id?: number | null;
  brand: Brand;
  feature: Feature;
}

/** `Invoice` */
export interface Invoice {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 30. */
  number?: string | null;
}

/** `Invoice-collection` — the `collection` serialization of Invoice. */
export interface InvoiceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 30. */
  number?: string | null;
}

/** `InvoiceTemplate` */
export interface InvoiceTemplate {
  /** Max length 55. */
  name: string;
  /** Max length 300. */
  description?: string | null;
  /** Max length 65535. */
  template: string;
  /** Max length 65535. */
  templateHeader?: string | null;
  /** Max length 65535. */
  templateFooter?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  brand?: number | null;
}

/** `InvoiceTemplate-collection` — the `collection` serialization of InvoiceTemplate. */
export interface InvoiceTemplateCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 55. */
  name: string;
  /** Max length 300. */
  description?: string | null;
}

/** `InvoiceTemplate-detailed` — the `detailed` serialization of InvoiceTemplate. */
export interface InvoiceTemplateDetailed {
  /** Max length 55. */
  name: string;
  /** Max length 300. */
  description?: string | null;
  /** Max length 65535. */
  template: string;
  /** Max length 65535. */
  templateHeader?: string | null;
  /** Max length 65535. */
  templateFooter?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  brand?: Brand | null;
}

/** `Invoicing` */
export interface Invoicing {
  /** Max length 25. */
  nif: string;
  /** Max length 255. */
  postalAddress: string;
  /** Max length 10. */
  postalCode: string;
  /** Max length 255. */
  town: string;
  /** Max length 255. */
  province: string;
  /** Max length 255. */
  countryName: string;
}

/** `Language` */
export interface Language {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: LanguageName | null;
}

/** `Language-collection` — the `collection` serialization of Language. */
export interface LanguageCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  iden: string;
  name?: LanguageName | null;
}

/** `Language-detailed` — the `detailed` serialization of Language. */
export interface LanguageDetailed {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: LanguageName | null;
}

/** `Language_Name` */
export interface LanguageName {
  /** Max length 100. */
  en: string;
  /** Max length 100. */
  es: string;
  /** Max length 100. */
  ca: string;
  /** Max length 100. */
  it: string;
  /** Max length 100. */
  eu: string;
}

/** `MediaRelaySet` */
export interface MediaRelaySet {
  /** Max length 32. */
  name: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `MediaRelaySet-collection` — the `collection` serialization of MediaRelaySet. */
export interface MediaRelaySetCollection {
  /** Max length 32. */
  name: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `MediaRelaySet-detailed` — the `detailed` serialization of MediaRelaySet. */
export interface MediaRelaySetDetailed {
  /** Max length 32. */
  name: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `NotificationTemplate` */
export interface NotificationTemplate {
  /** Max length 55. */
  name: string;
  /** Max length 25. */
  type: "voicemail" | "fax" | "limit" | "lowbalance" | "invoice" | "callCsv" | "maxDailyUsage" | "accessCredentials" | "onDemandRecord";
  /** Read-only. */
  readonly id?: number | null;
  brand?: number | null;
}

/** `NotificationTemplate-collection` — the `collection` serialization of NotificationTemplate. */
export interface NotificationTemplateCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 55. */
  name: string;
  /** Max length 25. */
  type: "voicemail" | "fax" | "limit" | "lowbalance" | "invoice" | "callCsv" | "maxDailyUsage" | "accessCredentials" | "onDemandRecord";
}

/** `NotificationTemplate-detailed` — the `detailed` serialization of NotificationTemplate. */
export interface NotificationTemplateDetailed {
  /** Max length 55. */
  name: string;
  /** Max length 25. */
  type: "voicemail" | "fax" | "limit" | "lowbalance" | "invoice" | "callCsv" | "maxDailyUsage" | "accessCredentials" | "onDemandRecord";
  /** Read-only. */
  readonly id?: number | null;
  brand?: Brand | null;
}

/** `NotificationTemplateContent` */
export interface NotificationTemplateContent {
  /** Max length 255. */
  fromName?: string | null;
  /** Max length 255. */
  fromAddress?: string | null;
  /** Max length 255. */
  subject: string;
  /** Max length 65535. */
  body: string;
  /** Max length 25. */
  bodyType: "text/plain" | "text/html";
  /** Read-only. */
  readonly id?: number | null;
  notificationTemplate: number;
  language?: number | null;
}

/** `NotificationTemplateContent-collection` — the `collection` serialization of NotificationTemplateContent. */
export interface NotificationTemplateContentCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  fromName?: string | null;
  /** Max length 255. */
  fromAddress?: string | null;
  language?: number | null;
}

/** `NotificationTemplateContent-detailed` — the `detailed` serialization of NotificationTemplateContent. */
export interface NotificationTemplateContentDetailed {
  /** Max length 255. */
  fromName?: string | null;
  /** Max length 255. */
  fromAddress?: string | null;
  /** Max length 255. */
  subject: string;
  /** Max length 65535. */
  body: string;
  /** Max length 25. */
  bodyType: "text/plain" | "text/html";
  /** Read-only. */
  readonly id?: number | null;
  notificationTemplate: NotificationTemplate;
  language?: Language | null;
}

/** `Profile` */
export interface Profile {
  restricted?: boolean | null;
  canImpersonate?: boolean | null;
  acls?: Array<ProfileAcl> | null;
}

/** `ProfileAcl` */
export interface ProfileAcl {
  iden?: string | null;
  create?: boolean | null;
  read?: boolean | null;
  update?: boolean | null;
  delete?: boolean | null;
}

/** `ProxyTrunk` */
export interface ProxyTrunk {
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip: string;
  /** Max length 50. */
  advertisedIp?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ProxyTrunk-collection` — the `collection` serialization of ProxyTrunk. */
export interface ProxyTrunkCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip: string;
  /** Max length 50. */
  advertisedIp?: string | null;
}

/** `ProxyTrunk-detailed` — the `detailed` serialization of ProxyTrunk. */
export interface ProxyTrunkDetailed {
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip: string;
  /** Max length 50. */
  advertisedIp?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ProxyTrunksRelBrand` */
export interface ProxyTrunksRelBrand {
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  proxyTrunk: number;
}

/** `ProxyTrunksRelBrand-collection` — the `collection` serialization of ProxyTrunksRelBrand. */
export interface ProxyTrunksRelBrandCollection {
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  proxyTrunk: number;
}

/** `ProxyTrunksRelBrand-detailed` — the `detailed` serialization of ProxyTrunksRelBrand. */
export interface ProxyTrunksRelBrandDetailed {
  /** Read-only. */
  readonly id?: number | null;
  brand: Brand;
  proxyTrunk: ProxyTrunk;
}

/** `ProxyUser` */
export interface ProxyUser {
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip?: string | null;
  /** Max length 50. */
  advertisedIp?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ProxyUser-collection` — the `collection` serialization of ProxyUser. */
export interface ProxyUserCollection {
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip?: string | null;
  /** Max length 50. */
  advertisedIp?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `ProxyUser-detailed` — the `detailed` serialization of ProxyUser. */
export interface ProxyUserDetailed {
  /** Max length 100. */
  name?: string | null;
  /** Max length 50. */
  ip?: string | null;
  /** Max length 50. */
  advertisedIp?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `PublicEntity` */
export interface PublicEntity {
  /** Max length 100. */
  iden: string;
  /** Max length 200. */
  fqdn?: string | null;
  platform: boolean;
  brand: boolean;
  client: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: PublicEntityName | null;
}

/** `PublicEntity-collection` — the `collection` serialization of PublicEntity. */
export interface PublicEntityCollection {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: PublicEntityName | null;
}

/** `PublicEntity-detailed` — the `detailed` serialization of PublicEntity. */
export interface PublicEntityDetailed {
  /** Max length 100. */
  iden: string;
  /** Max length 200. */
  fqdn?: string | null;
  platform: boolean;
  brand: boolean;
  client: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: PublicEntityName | null;
}

/** `PublicEntity_Name` */
export interface PublicEntityName {
  /** Max length 100. */
  en?: string | null;
  /** Max length 100. */
  es?: string | null;
  /** Max length 100. */
  ca?: string | null;
  /** Max length 100. */
  it?: string | null;
  /** Max length 100. */
  eu?: string | null;
}

/** `Rtpengine` */
export interface Rtpengine {
  setid: number;
  /** Max length 64. */
  url: string;
  weight: number;
  disabled: boolean;
  stamp: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  mediaRelaySet: number;
}

/** `Rtpengine-collection` — the `collection` serialization of Rtpengine. */
export interface RtpengineCollection {
  /** Max length 64. */
  url: string;
  weight: number;
  disabled: boolean;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Rtpengine-detailed` — the `detailed` serialization of Rtpengine. */
export interface RtpengineDetailed {
  setid: number;
  /** Max length 64. */
  url: string;
  weight: number;
  disabled: boolean;
  stamp: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  mediaRelaySet: MediaRelaySet;
}

/** `Service` */
export interface Service {
  /** Max length 50. */
  iden: string;
  /** Max length 3. */
  defaultCode: string;
  extraArgs: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: ServiceName | null;
  description?: ServiceDescription | null;
}

/** `Service-collection` — the `collection` serialization of Service. */
export interface ServiceCollection {
  /** Max length 50. */
  iden: string;
  /** Max length 3. */
  defaultCode: string;
  extraArgs: boolean;
  name?: ServiceName | null;
  description?: ServiceDescription | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Service-detailed` — the `detailed` serialization of Service. */
export interface ServiceDetailed {
  /** Max length 50. */
  iden: string;
  /** Max length 3. */
  defaultCode: string;
  extraArgs: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: ServiceName | null;
  description?: ServiceDescription | null;
}

/** `Service_Description` */
export interface ServiceDescription {
  /** Max length 255. */
  en: string;
  /** Max length 255. */
  es: string;
  /** Max length 255. */
  ca: string;
  /** Max length 255. */
  it: string;
  /** Max length 255. */
  eu: string;
}

/** `Service_Name` */
export interface ServiceName {
  /** Max length 50. */
  en: string;
  /** Max length 50. */
  es: string;
  /** Max length 50. */
  ca: string;
  /** Max length 50. */
  it: string;
  /** Max length 50. */
  eu: string;
}

/** `SpecialNumber` */
export interface SpecialNumber {
  /** Max length 25. */
  number: string;
  disableCDR: number;
  /** Read-only. */
  readonly id?: number | null;
  country: number;
}

/** `SpecialNumber-collection` — the `collection` serialization of SpecialNumber. */
export interface SpecialNumberCollection {
  /** Max length 25. */
  number: string;
  disableCDR: number;
  /** Read-only. */
  readonly id?: number | null;
  country: number;
}

/** `SpecialNumber-detailed` — the `detailed` serialization of SpecialNumber. */
export interface SpecialNumberDetailed {
  /** Max length 25. */
  number: string;
  disableCDR: number;
  /** Read-only. */
  readonly id?: number | null;
  country: Country;
}

/** `TerminalManufacturer` */
export interface TerminalManufacturer {
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `TerminalManufacturer-collection` — the `collection` serialization of TerminalManufacturer. */
export interface TerminalManufacturerCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
}

/** `TerminalManufacturer-detailed` — the `detailed` serialization of TerminalManufacturer. */
export interface TerminalManufacturerDetailed {
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `TerminalModel` */
export interface TerminalModel {
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 65535. */
  genericTemplate?: string | null;
  /** Max length 65535. */
  specificTemplate?: string | null;
  /** Max length 225. */
  genericUrlPattern?: string | null;
  /** Max length 225. */
  specificUrlPattern?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  terminalManufacturer: number;
}

/** `TerminalModel-collection` — the `collection` serialization of TerminalModel. */
export interface TerminalModelCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 65535. */
  genericTemplate?: string | null;
  /** Max length 65535. */
  specificTemplate?: string | null;
  /** Max length 225. */
  genericUrlPattern?: string | null;
  /** Max length 225. */
  specificUrlPattern?: string | null;
}

/** `TerminalModel-detailed` — the `detailed` serialization of TerminalModel. */
export interface TerminalModelDetailed {
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 65535. */
  genericTemplate?: string | null;
  /** Max length 65535. */
  specificTemplate?: string | null;
  /** Max length 225. */
  genericUrlPattern?: string | null;
  /** Max length 225. */
  specificUrlPattern?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  terminalManufacturer: TerminalManufacturer;
}

/** `Timezone` */
export interface Timezone {
  /** Max length 255. */
  tz: string;
  /** Max length 150. */
  comment?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  label?: TimezoneLabel | null;
  country?: number | null;
}

/** `Timezone-collection` — the `collection` serialization of Timezone. */
export interface TimezoneCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  tz: string;
}

/** `Timezone-detailed` — the `detailed` serialization of Timezone. */
export interface TimezoneDetailed {
  /** Max length 255. */
  tz: string;
  /** Max length 150. */
  comment?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  label?: TimezoneLabel | null;
  country?: Country | null;
}

/** `Timezone_Label` */
export interface TimezoneLabel {
  /** Max length 20. */
  en: string;
  /** Max length 20. */
  es: string;
  /** Max length 20. */
  ca: string;
  /** Max length 20. */
  it: string;
  /** Max length 20. */
  eu: string;
}

/** `WebPortal` */
export interface WebPortal {
  /** Max length 255. */
  url: string;
  /** Max length 25. */
  urlType: "god" | "brand" | "admin" | "user";
  /** Max length 200. */
  name?: string | null;
  /** Max length 10. */
  color: string;
  /** Max length 64. */
  productName: string;
  /** Read-only. */
  readonly id?: number | null;
  logo?: WebPortalLogo | null;
  brand?: number | null;
  company?: number | null;
}

/** `WebPortal-collection` — the `collection` serialization of WebPortal. */
export interface WebPortalCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  url: string;
  /** Max length 200. */
  name?: string | null;
  /** Max length 25. */
  urlType: "god" | "brand" | "admin" | "user";
  logo?: WebPortalLogo | null;
  brand?: number | null;
}

/** `WebPortal-detailed` — the `detailed` serialization of WebPortal. */
export interface WebPortalDetailed {
  /** Max length 255. */
  url: string;
  /** Max length 25. */
  urlType: "god" | "brand" | "admin" | "user";
  /** Max length 200. */
  name?: string | null;
  /** Max length 10. */
  color: string;
  /** Max length 64. */
  productName: string;
  /** Read-only. */
  readonly id?: number | null;
  logo?: WebPortalLogo | null;
  brand?: Brand | null;
  company?: Company | null;
}

/** `WebPortal_Logo` */
export interface WebPortalLogo {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `WebTheme` */
export interface WebTheme {
  name?: string | null;
  logo?: string | null;
  color?: string | null;
  title?: string | null;
  productName?: string | null;
}

/** Every definition in this spec, keyed by its wire name. */
export interface Definitions {
  ActiveCalls: ActiveCalls;
  Administrator: Administrator;
  "Administrator-collection": AdministratorCollection;
  "Administrator-detailed": AdministratorDetailed;
  AdministratorRelPublicEntity: AdministratorRelPublicEntity;
  "AdministratorRelPublicEntity-collection": AdministratorRelPublicEntityCollection;
  "AdministratorRelPublicEntity-detailed": AdministratorRelPublicEntityDetailed;
  ApplicationServer: ApplicationServer;
  "ApplicationServer-collection": ApplicationServerCollection;
  "ApplicationServer-detailed": ApplicationServerDetailed;
  ApplicationServerSet: ApplicationServerSet;
  "ApplicationServerSet-collection": ApplicationServerSetCollection;
  "ApplicationServerSet-detailed": ApplicationServerSetDetailed;
  "BannedAddress-collection": BannedAddressCollection;
  "BannedAddress-detailed": BannedAddressDetailed;
  BillableCall: BillableCall;
  "BillableCall-collection": BillableCallCollection;
  "BillableCall-detailed": BillableCallDetailed;
  "BillableCall-rating": BillableCallRating;
  Brand: Brand;
  "Brand-collection": BrandCollection;
  "Brand-detailed": BrandDetailed;
  BrandService: BrandService;
  "BrandService-collection": BrandServiceCollection;
  "BrandService-detailed": BrandServiceDetailed;
  Brand_Invoice: BrandInvoice;
  Brand_Logo: BrandLogo;
  Carrier: Carrier;
  "Carrier-collection": CarrierCollection;
  Company: Company;
  "Company-collection": CompanyCollection;
  Country: Country;
  "Country-collection": CountryCollection;
  "Country-detailed": CountryDetailed;
  Country_Name: CountryName;
  Country_Zone: CountryZone;
  Currency: Currency;
  "Currency-collection": CurrencyCollection;
  "Currency-detailed": CurrencyDetailed;
  Currency_Name: CurrencyName;
  Dashboard: Dashboard;
  DashboardAdmin: DashboardAdmin;
  DashboardBrand: DashboardBrand;
  Ddi: Ddi;
  DdiProvider: DdiProvider;
  "DdiProvider-collection": DdiProviderCollection;
  "Domain-collection": DomainCollection;
  "Domain-detailed": DomainDetailed;
  Feature: Feature;
  "Feature-collection": FeatureCollection;
  "Feature-detailed": FeatureDetailed;
  Feature_Name: FeatureName;
  FeaturesRelBrand: FeaturesRelBrand;
  "FeaturesRelBrand-collection": FeaturesRelBrandCollection;
  "FeaturesRelBrand-detailed": FeaturesRelBrandDetailed;
  Invoice: Invoice;
  "Invoice-collection": InvoiceCollection;
  InvoiceTemplate: InvoiceTemplate;
  "InvoiceTemplate-collection": InvoiceTemplateCollection;
  "InvoiceTemplate-detailed": InvoiceTemplateDetailed;
  Invoicing: Invoicing;
  Language: Language;
  "Language-collection": LanguageCollection;
  "Language-detailed": LanguageDetailed;
  Language_Name: LanguageName;
  MediaRelaySet: MediaRelaySet;
  "MediaRelaySet-collection": MediaRelaySetCollection;
  "MediaRelaySet-detailed": MediaRelaySetDetailed;
  NotificationTemplate: NotificationTemplate;
  "NotificationTemplate-collection": NotificationTemplateCollection;
  "NotificationTemplate-detailed": NotificationTemplateDetailed;
  NotificationTemplateContent: NotificationTemplateContent;
  "NotificationTemplateContent-collection": NotificationTemplateContentCollection;
  "NotificationTemplateContent-detailed": NotificationTemplateContentDetailed;
  Profile: Profile;
  ProfileAcl: ProfileAcl;
  ProxyTrunk: ProxyTrunk;
  "ProxyTrunk-collection": ProxyTrunkCollection;
  "ProxyTrunk-detailed": ProxyTrunkDetailed;
  ProxyTrunksRelBrand: ProxyTrunksRelBrand;
  "ProxyTrunksRelBrand-collection": ProxyTrunksRelBrandCollection;
  "ProxyTrunksRelBrand-detailed": ProxyTrunksRelBrandDetailed;
  ProxyUser: ProxyUser;
  "ProxyUser-collection": ProxyUserCollection;
  "ProxyUser-detailed": ProxyUserDetailed;
  PublicEntity: PublicEntity;
  "PublicEntity-collection": PublicEntityCollection;
  "PublicEntity-detailed": PublicEntityDetailed;
  PublicEntity_Name: PublicEntityName;
  Rtpengine: Rtpengine;
  "Rtpengine-collection": RtpengineCollection;
  "Rtpengine-detailed": RtpengineDetailed;
  Service: Service;
  "Service-collection": ServiceCollection;
  "Service-detailed": ServiceDetailed;
  Service_Description: ServiceDescription;
  Service_Name: ServiceName;
  SpecialNumber: SpecialNumber;
  "SpecialNumber-collection": SpecialNumberCollection;
  "SpecialNumber-detailed": SpecialNumberDetailed;
  TerminalManufacturer: TerminalManufacturer;
  "TerminalManufacturer-collection": TerminalManufacturerCollection;
  "TerminalManufacturer-detailed": TerminalManufacturerDetailed;
  TerminalModel: TerminalModel;
  "TerminalModel-collection": TerminalModelCollection;
  "TerminalModel-detailed": TerminalModelDetailed;
  Timezone: Timezone;
  "Timezone-collection": TimezoneCollection;
  "Timezone-detailed": TimezoneDetailed;
  Timezone_Label: TimezoneLabel;
  WebPortal: WebPortal;
  "WebPortal-collection": WebPortalCollection;
  "WebPortal-detailed": WebPortalDetailed;
  WebPortal_Logo: WebPortalLogo;
  WebTheme: WebTheme;
}

export type DefinitionName = keyof Definitions;
