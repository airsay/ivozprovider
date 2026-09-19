/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/brand/public/apiSpec.json
// Regenerate with: yarn codegen
// App: brand  Spec: swagger 2.0  basePath: /api/brand/

/** `ACK` */
export interface ACK {
  status?: string | null;
}

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
  company: number;
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
  company: number;
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
  company: Company;
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

/** `BalanceMovement-collection` — the `collection` serialization of BalanceMovement. */
export interface BalanceMovementCollection {
  amount?: number | null;
  balance?: number | null;
  createdOn?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  carrier?: number | null;
}

/** `BalanceMovement-detailed` — the `detailed` serialization of BalanceMovement. */
export interface BalanceMovementDetailed {
  amount?: number | null;
  balance?: number | null;
  createdOn?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  carrier?: Carrier | null;
}

/** `BalanceNotification` */
export interface BalanceNotification {
  /** Max length 255. */
  toAddress?: string | null;
  threshold?: number | null;
  lastSent?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  carrier?: number | null;
  notificationTemplate?: number | null;
}

/** `BalanceNotification-collection` — the `collection` serialization of BalanceNotification. */
export interface BalanceNotificationCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  toAddress?: string | null;
  threshold?: number | null;
  notificationTemplate?: number | null;
  lastSent?: string | null;
}

/** `BalanceNotification-detailed` — the `detailed` serialization of BalanceNotification. */
export interface BalanceNotificationDetailed {
  /** Max length 255. */
  toAddress?: string | null;
  threshold?: number | null;
  lastSent?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  carrier?: Carrier | null;
  notificationTemplate?: NotificationTemplate | null;
}

/** `BannedAddress-collection` — the `collection` serialization of BannedAddress. */
export interface BannedAddressCollection {
  /** Max length 50. */
  ip?: string | null;
  lastTimeBanned?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
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
  company?: Company | null;
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
  company?: number | null;
  carrier?: number | null;
  destination?: number | null;
  ratingPlanGroup?: number | null;
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
  company?: Company | null;
  carrier?: Carrier | null;
  destination?: Destination | null;
  ratingPlanGroup?: RatingPlanGroup | null;
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
  /** Read-only. */
  readonly id?: number | null;
  logo?: BrandLogo | null;
  invoice?: BrandInvoice | null;
  language: number;
  defaultTimezone: number;
  currency: number;
  voicemailNotificationTemplate?: number | null;
  faxNotificationTemplate?: number | null;
  invoiceNotificationTemplate?: number | null;
  callCsvNotificationTemplate?: number | null;
  maxDailyUsageNotificationTemplate?: number | null;
}

/** `Brand-collection` — the `collection` serialization of Brand. */
export interface BrandCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 75. */
  name: string;
  invoice?: BrandInvoice | null;
  logo?: BrandLogo | null;
}

/** `Brand-detailed` — the `detailed` serialization of Brand. */
export interface BrandDetailed {
  /** Max length 75. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  logo?: BrandLogo | null;
  invoice?: BrandInvoice | null;
  language: Language;
  defaultTimezone: Timezone;
  currency: Currency;
  voicemailNotificationTemplate?: NotificationTemplate | null;
  faxNotificationTemplate?: NotificationTemplate | null;
  invoiceNotificationTemplate?: NotificationTemplate | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  maxDailyUsageNotificationTemplate?: NotificationTemplate | null;
}

/** `BrandService` */
export interface BrandService {
  /** Max length 3. */
  code: string;
  /** Read-only. */
  readonly id?: number | null;
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

/** `CallCsvReport-collection` — the `collection` serialization of CallCsvReport. */
export interface CallCsvReportCollection {
  /** Read-only. */
  readonly id?: number | null;
  inDate: string;
  outDate: string;
  csv?: CallCsvReportCsv | null;
  createdOn: string;
  /** Max length 250. */
  sentTo: string;
  callCsvScheduler?: number | null;
}

/** `CallCsvReport-detailed` — the `detailed` serialization of CallCsvReport. */
export interface CallCsvReportDetailed {
  /** Max length 250. */
  sentTo: string;
  inDate: string;
  outDate: string;
  createdOn: string;
  /** Read-only. */
  readonly id?: number | null;
  csv?: CallCsvReportCsv | null;
  brand: Brand;
  callCsvScheduler?: CallCsvScheduler | null;
}

/** `CallCsvReport_Csv` */
export interface CallCsvReportCsv {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `CallCsvScheduler` */
export interface CallCsvScheduler {
  /** Max length 40. */
  name: string;
  /** Max length 30. */
  unit: "day" | "week" | "month";
  frequency: number;
  callDirection?: "inbound" | "outbound" | null;
  /** Max length 140. */
  email: string;
  /** Read-only. */
  readonly lastExecution?: string | null;
  /** Read-only. Max length 300. */
  readonly lastExecutionError?: string | null;
  nextExecution?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  callCsvNotificationTemplate?: number | null;
  ddi?: number | null;
  carrier?: number | null;
  retailAccount?: number | null;
  residentialDevice?: number | null;
  user?: number | null;
  fax?: number | null;
  friend?: number | null;
  ddiProvider?: number | null;
}

/** `CallCsvScheduler-collection` — the `collection` serialization of CallCsvScheduler. */
export interface CallCsvSchedulerCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 40. */
  name: string;
  company?: number | null;
  frequency: number;
  /** Max length 30. */
  unit: "day" | "week" | "month";
  callDirection?: "inbound" | "outbound" | null;
  /** Max length 140. */
  email: string;
  /** Read-only. */
  readonly lastExecution?: string | null;
  /** Read-only. Max length 300. */
  readonly lastExecutionError?: string | null;
  nextExecution?: string | null;
}

/** `CallCsvScheduler-detailed` — the `detailed` serialization of CallCsvScheduler. */
export interface CallCsvSchedulerDetailed {
  /** Max length 40. */
  name: string;
  /** Max length 30. */
  unit: "day" | "week" | "month";
  frequency: number;
  callDirection?: "inbound" | "outbound" | null;
  /** Max length 140. */
  email: string;
  /** Read-only. */
  readonly lastExecution?: string | null;
  /** Read-only. Max length 300. */
  readonly lastExecutionError?: string | null;
  nextExecution?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  ddi?: Ddi | null;
  carrier?: Carrier | null;
  retailAccount?: RetailAccount | null;
  residentialDevice?: ResidentialDevice | null;
  user?: User | null;
  fax?: Fax | null;
  friend?: Friend | null;
  ddiProvider?: DdiProvider | null;
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
  transformationRuleSet: number;
  currency?: number | null;
  proxyTrunk?: number | null;
  mediaRelaySet?: number | null;
}

/** `Carrier-collection` — the `collection` serialization of Carrier. */
export interface CarrierCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  calculateCost?: boolean | null;
  transformationRuleSet: number;
  balance?: number | null;
  proxyTrunk?: number | null;
  status?: CarrierStatus | null;
  /** Has servers */
  hasServers?: boolean | null;
}

/** `Carrier-detailed` — the `detailed` serialization of Carrier. */
export interface CarrierDetailed {
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  balance?: number | null;
  calculateCost?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet: TransformationRuleSet;
  currency?: Currency | null;
  proxyTrunk?: ProxyTrunk | null;
  mediaRelaySet?: MediaRelaySet | null;
}

/** `CarrierServer` */
export interface CarrierServer {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 64. */
  hostname?: string | null;
  port?: number | null;
  uriScheme?: number | null;
  transport?: number | null;
  sendPAI?: boolean | null;
  sendRPID?: boolean | null;
  authNeeded: string;
  /** Max length 64. */
  authUser?: string | null;
  /** Max length 64. */
  authPassword?: string | null;
  /** Max length 128. */
  sipProxy?: string | null;
  /** Max length 128. */
  outboundProxy?: string | null;
  /** Max length 64. */
  fromUser?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  carrier: number;
}

/** `CarrierServer-collection` — the `collection` serialization of CarrierServer. */
export interface CarrierServerCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  ip?: string | null;
  /** Max length 64. */
  hostname?: string | null;
  /** Max length 128. */
  sipProxy?: string | null;
  authNeeded: string;
  /** Max length 128. */
  outboundProxy?: string | null;
  status?: CarrierServerStatus | null;
}

/** `CarrierServer-detailed` — the `detailed` serialization of CarrierServer. */
export interface CarrierServerDetailed {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 64. */
  hostname?: string | null;
  port?: number | null;
  uriScheme?: number | null;
  transport?: number | null;
  sendPAI?: boolean | null;
  sendRPID?: boolean | null;
  authNeeded: string;
  /** Max length 64. */
  authUser?: string | null;
  /** Max length 64. */
  authPassword?: string | null;
  /** Max length 128. */
  sipProxy?: string | null;
  /** Max length 128. */
  outboundProxy?: string | null;
  /** Max length 64. */
  fromUser?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  carrier: Carrier;
}

/** `CarrierServer-status` — the `status` serialization of CarrierServer. */
export interface CarrierServer_Status {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  ip?: string | null;
  /** Max length 64. */
  hostname?: string | null;
  /** Max length 128. */
  sipProxy?: string | null;
  authNeeded: string;
  status?: CarrierServerStatus | null;
}

/** `CarrierServerStatus` */
export interface CarrierServerStatus {
  registered?: boolean | null;
}

/** `CarrierStatus` */
export interface CarrierStatus {
  registered?: boolean | null;
}

/** `Codec` */
export interface Codec {
  /** Max length 10. */
  type: "audio" | "video";
  /** Max length 25. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Codec-collection` — the `collection` serialization of Codec. */
export interface CodecCollection {
  /** Max length 25. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Codec-detailed` — the `detailed` serialization of Codec. */
export interface CodecDetailed {
  /** Max length 10. */
  type: "audio" | "video";
  /** Max length 25. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Company` */
export interface Company {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Max length 80. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
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
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  balance?: number | null;
  showInvoices?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: CompanyInvoicing | null;
  language?: number | null;
  defaultTimezone?: number | null;
  country: number;
  currency?: number | null;
  transformationRuleSet: number;
  outgoingDdi?: number | null;
  outgoingDdiRule?: number | null;
  voicemailNotificationTemplate?: number | null;
  onDemandRecordNotificationTemplate?: number | null;
  faxNotificationTemplate?: number | null;
  invoiceNotificationTemplate?: number | null;
  callCsvNotificationTemplate?: number | null;
  maxDailyUsageNotificationTemplate?: number | null;
  accessCredentialNotificationTemplate?: number | null;
  corporation?: number | null;
  applicationServerSet: number;
  mediaRelaySet: number;
  location?: number | null;
  /** Active feature ids */
  featureIds?: Array<number> | null;
  /** Country ids */
  geoIpAllowedCountries?: Array<number> | null;
  /** Routing tag ids */
  routingTagIds?: Array<number> | null;
  /** Codec ids */
  codecIds?: Array<number> | null;
  /** Active, inactive or unavailable */
  accountStatus?: string | null;
}

/** `Company-balances` — the `balances` serialization of Company. */
export interface CompanyBalances {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Max length 80. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
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
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  balance?: number | null;
  showInvoices?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: CompanyInvoicing | null;
  language?: Language | null;
  defaultTimezone?: Timezone | null;
  country: Country;
  currency?: Currency | null;
  transformationRuleSet: TransformationRuleSet;
  outgoingDdi?: Ddi | null;
  outgoingDdiRule?: OutgoingDdiRule | null;
  voicemailNotificationTemplate?: NotificationTemplate | null;
  onDemandRecordNotificationTemplate?: NotificationTemplate | null;
  faxNotificationTemplate?: NotificationTemplate | null;
  invoiceNotificationTemplate?: NotificationTemplate | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  maxDailyUsageNotificationTemplate?: NotificationTemplate | null;
  accessCredentialNotificationTemplate?: NotificationTemplate | null;
  corporation?: Corporation | null;
  applicationServerSet: ApplicationServerSet;
  mediaRelaySet: MediaRelaySet;
  location?: Location | null;
  /** Active feature ids */
  featureIds?: Array<number> | null;
  /** Country ids */
  geoIpAllowedCountries?: Array<number> | null;
  /** Routing tag ids */
  routingTagIds?: Array<number> | null;
  /** Codec ids */
  codecIds?: Array<number> | null;
  /** Active, inactive or unavailable */
  accountStatus?: string | null;
}

/** `Company-collection` — the `collection` serialization of Company. */
export interface CompanyCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 80. */
  name: string;
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  invoicing?: CompanyInvoicing | null;
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  currentDayUsage?: number | null;
  maxDailyUsage: number;
  /** Max length 190. */
  domainUsers?: string | null;
  balance?: number | null;
  outgoingDdi?: number | null;
  applicationServerSet: number;
  /** Registration domain Read-only. */
  readonly domainName?: string | null;
  /** Active feature ids */
  featureIds?: Array<number> | null;
  /** Country ids */
  geoIpAllowedCountries?: Array<number> | null;
  /** Routing tag ids */
  routingTagIds?: Array<number> | null;
  /** Codec ids */
  codecIds?: Array<number> | null;
  corporation?: number | null;
  mediaRelaySet: number;
  /** Active, inactive or unavailable */
  accountStatus?: string | null;
}

/** `Company-dailyUsage` — the `dailyUsage` serialization of Company. */
export interface CompanyDailyUsage {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Max length 80. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
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
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  balance?: number | null;
  showInvoices?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: CompanyInvoicing | null;
  language?: Language | null;
  defaultTimezone?: Timezone | null;
  country: Country;
  currency?: Currency | null;
  transformationRuleSet: TransformationRuleSet;
  outgoingDdi?: Ddi | null;
  outgoingDdiRule?: OutgoingDdiRule | null;
  voicemailNotificationTemplate?: NotificationTemplate | null;
  onDemandRecordNotificationTemplate?: NotificationTemplate | null;
  faxNotificationTemplate?: NotificationTemplate | null;
  invoiceNotificationTemplate?: NotificationTemplate | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  maxDailyUsageNotificationTemplate?: NotificationTemplate | null;
  accessCredentialNotificationTemplate?: NotificationTemplate | null;
  corporation?: Corporation | null;
  applicationServerSet: ApplicationServerSet;
  mediaRelaySet: MediaRelaySet;
  location?: Location | null;
  /** Active feature ids */
  featureIds?: Array<number> | null;
  /** Country ids */
  geoIpAllowedCountries?: Array<number> | null;
  /** Routing tag ids */
  routingTagIds?: Array<number> | null;
  /** Codec ids */
  codecIds?: Array<number> | null;
  /** Active, inactive or unavailable */
  accountStatus?: string | null;
}

/** `Company-detailed` — the `detailed` serialization of Company. */
export interface CompanyDetailed {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Max length 80. */
  name: string;
  /** Max length 190. */
  domainUsers?: string | null;
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
  /** Max length 25. */
  billingMethod: "postpaid" | "prepaid" | "pseudoprepaid" | "none";
  balance?: number | null;
  showInvoices?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: CompanyInvoicing | null;
  language?: Language | null;
  defaultTimezone?: Timezone | null;
  country: Country;
  currency?: Currency | null;
  transformationRuleSet: TransformationRuleSet;
  outgoingDdi?: Ddi | null;
  outgoingDdiRule?: OutgoingDdiRule | null;
  voicemailNotificationTemplate?: NotificationTemplate | null;
  onDemandRecordNotificationTemplate?: NotificationTemplate | null;
  faxNotificationTemplate?: NotificationTemplate | null;
  invoiceNotificationTemplate?: NotificationTemplate | null;
  callCsvNotificationTemplate?: NotificationTemplate | null;
  maxDailyUsageNotificationTemplate?: NotificationTemplate | null;
  accessCredentialNotificationTemplate?: NotificationTemplate | null;
  corporation?: Corporation | null;
  applicationServerSet: ApplicationServerSet;
  mediaRelaySet: MediaRelaySet;
  location?: Location | null;
  /** Registration domain Read-only. */
  readonly domainName?: string | null;
  /** Active feature ids */
  featureIds?: Array<number> | null;
  /** Country ids */
  geoIpAllowedCountries?: Array<number> | null;
  /** Routing tag ids */
  routingTagIds?: Array<number> | null;
  /** Codec ids */
  codecIds?: Array<number> | null;
  /** Active, inactive or unavailable */
  accountStatus?: string | null;
}

/** `CompanyRelCodec` */
export interface CompanyRelCodec {
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  codec: number;
}

/** `CompanyRelCodec-collection` — the `collection` serialization of CompanyRelCodec. */
export interface CompanyRelCodecCollection {
  /** Read-only. */
  readonly id?: number | null;
}

/** `CompanyRelCodec-detailed` — the `detailed` serialization of CompanyRelCodec. */
export interface CompanyRelCodecDetailed {
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  codec: Codec;
}

/** `Company_Invoicing` */
export interface CompanyInvoicing {
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

/** `Corporation` */
export interface Corporation {
  /** Max length 255. */
  name: string;
  /** Max length 255. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Corporation-collection` — the `collection` serialization of Corporation. */
export interface CorporationCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  name: string;
  /** Max length 255. */
  description?: string | null;
}

/** `Corporation-detailed` — the `detailed` serialization of Corporation. */
export interface CorporationDetailed {
  /** Max length 255. */
  name: string;
  /** Max length 255. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
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
  brand?: DashboardBrand | null;
  recentActivity?: Array<DashboardClient> | null;
  clientNum?: number | null;
  ddiNum?: number | null;
  carrierNum?: number | null;
  productName?: string | null;
}

/** `DashboardBrand` */
export interface DashboardBrand {
  id?: number | null;
  name?: string | null;
  nif?: string | null;
  postalCode?: string | null;
  sipDomain?: string | null;
  maxCalls?: number | null;
}

/** `DashboardClient` */
export interface DashboardClient {
  name?: string | null;
  type?: string | null;
  domainUsers?: string | null;
  maxCalls?: number | null;
}

/** `Ddi` */
export interface Ddi {
  /** Max length 25. */
  ddi: string;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
  /** Max length 100. */
  description?: string | null;
  /** Max length 25. */
  type: "inout" | "out";
  useDdiProviderRoutingTag: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  ddiProvider?: number | null;
  country?: number | null;
  routingTag?: number | null;
}

/** `Ddi-collection` — the `collection` serialization of Ddi. */
export interface DdiCollection {
  /** Read-only. */
  readonly id?: number | null;
  country?: number | null;
  /** Max length 25. */
  ddi: string;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
  /** Max length 100. */
  description?: string | null;
  ddiProvider?: number | null;
  company?: number | null;
}

/** `Ddi-detailed` — the `detailed` serialization of Ddi. */
export interface DdiDetailed {
  /** Max length 25. */
  ddi: string;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
  /** Max length 100. */
  description?: string | null;
  /** Max length 25. */
  type: "inout" | "out";
  useDdiProviderRoutingTag: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  ddiProvider?: DdiProvider | null;
  country?: Country | null;
  routingTag?: RoutingTag | null;
}

/** `DdiProvider` */
export interface DdiProvider {
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet: number;
  proxyTrunk?: number | null;
  mediaRelaySet?: number | null;
  routingTag?: number | null;
}

/** `DdiProvider-collection` — the `collection` serialization of DdiProvider. */
export interface DdiProviderCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 200. */
  name: string;
  /** Max length 500. */
  description: string;
  transformationRuleSet: number;
  proxyTrunk?: number | null;
}

/** `DdiProvider-detailed` — the `detailed` serialization of DdiProvider. */
export interface DdiProviderDetailed {
  /** Max length 500. */
  description: string;
  /** Max length 200. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet: TransformationRuleSet;
  proxyTrunk?: ProxyTrunk | null;
  mediaRelaySet?: MediaRelaySet | null;
  routingTag?: RoutingTag | null;
}

/** `DdiProviderAddress` */
export interface DdiProviderAddress {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ddiProvider: number;
}

/** `DdiProviderAddress-collection` — the `collection` serialization of DdiProviderAddress. */
export interface DdiProviderAddressCollection {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `DdiProviderAddress-detailed` — the `detailed` serialization of DdiProviderAddress. */
export interface DdiProviderAddressDetailed {
  /** Max length 50. */
  ip?: string | null;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ddiProvider: DdiProvider;
}

/** `DdiProviderRegistration` */
export interface DdiProviderRegistration {
  /** Max length 64. */
  username: string;
  /** Max length 190. */
  domain: string;
  /** Max length 64. */
  realm: string;
  /** Max length 64. */
  authUsername: string;
  /** Max length 64. */
  authPassword: string;
  /** Max length 64. */
  authProxy: string;
  expires: number;
  multiDdi?: boolean | null;
  /** Max length 64. */
  contactUsername: string;
  /** Read-only. */
  readonly id?: number | null;
  ddiProvider: number;
}

/** `DdiProviderRegistration-detailed` — the `detailed` serialization of DdiProviderRegistration. */
export interface DdiProviderRegistrationDetailed {
  /** Max length 64. */
  username: string;
  /** Max length 190. */
  domain: string;
  /** Max length 64. */
  realm: string;
  /** Max length 64. */
  authUsername: string;
  /** Max length 64. */
  authPassword: string;
  /** Max length 64. */
  authProxy: string;
  expires: number;
  multiDdi?: boolean | null;
  /** Max length 64. */
  contactUsername: string;
  /** Read-only. */
  readonly id?: number | null;
  ddiProvider: DdiProvider;
}

/** `DdiProviderRegistration-detailedCollection` — the `detailedCollection` serialization of DdiProviderRegistration. */
export interface DdiProviderRegistrationDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 64. */
  username: string;
  /** Max length 190. */
  domain: string;
  status?: DdiProviderRegistrationStatus | null;
}

/** `DdiProviderRegistration-status` — the `status` serialization of DdiProviderRegistration. */
export interface DdiProviderRegistration_Status {
  /** Max length 64. */
  username: string;
  /** Max length 190. */
  domain: string;
  /** Read-only. */
  readonly id?: number | null;
  status?: DdiProviderRegistrationStatus | null;
}

/** `DdiProviderRegistrationStatus` */
export interface DdiProviderRegistrationStatus {
  registered?: boolean | null;
  inProgress?: boolean | null;
  expires?: number | null;
}

/** `Destination` */
export interface Destination {
  /** Max length 24. */
  prefix: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationName | null;
}

/** `Destination-collection` — the `collection` serialization of Destination. */
export interface DestinationCollection {
  /** Max length 24. */
  prefix: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationName | null;
}

/** `Destination-detailed` — the `detailed` serialization of Destination. */
export interface DestinationDetailed {
  /** Max length 24. */
  prefix: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationName | null;
}

/** `DestinationRate` */
export interface DestinationRate {
  cost: number;
  connectFee: number;
  /** Max length 16. */
  rateIncrement: string;
  /** Max length 16. */
  groupIntervalStart: string;
  /** Read-only. */
  readonly id?: number | null;
  destinationRateGroup: number;
  destination: number;
}

/** `DestinationRate-collection` — the `collection` serialization of DestinationRate. */
export interface DestinationRateCollection {
  cost: number;
  connectFee: number;
  /** Max length 16. */
  rateIncrement: string;
  /** Max length 16. */
  groupIntervalStart: string;
  /** Read-only. */
  readonly id?: number | null;
  destinationRateGroup: number;
  destination: number;
  /** Cost currency Read-only. */
  readonly currencySymbol?: string | null;
}

/** `DestinationRate-detailed` — the `detailed` serialization of DestinationRate. */
export interface DestinationRateDetailed {
  cost: number;
  connectFee: number;
  /** Max length 16. */
  rateIncrement: string;
  /** Max length 16. */
  groupIntervalStart: string;
  /** Read-only. */
  readonly id?: number | null;
  destinationRateGroup: DestinationRateGroup;
  destination: Destination;
  /** Cost currency Read-only. */
  readonly currencySymbol?: string | null;
}

/** `DestinationRateGroup` */
export interface DestinationRateGroup {
  /** Max length 20. */
  status?: "waiting" | "inProgress" | "imported" | "error" | null;
  /** Max length 300. */
  lastExecutionError?: string | null;
  deductibleConnectionFee: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationRateGroupName | null;
  description?: DestinationRateGroupDescription | null;
  file?: DestinationRateGroupFile | null;
  currency?: number | null;
  importerArguments?: FileImporterArguments | null;
}

/** `DestinationRateGroup-collection` — the `collection` serialization of DestinationRateGroup. */
export interface DestinationRateGroupCollection {
  /** Max length 20. */
  status?: "waiting" | "inProgress" | "imported" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationRateGroupName | null;
  description?: DestinationRateGroupDescription | null;
  file?: DestinationRateGroupFile | null;
  currency?: number | null;
}

/** `DestinationRateGroup-detailed` — the `detailed` serialization of DestinationRateGroup. */
export interface DestinationRateGroupDetailed {
  /** Max length 20. */
  status?: "waiting" | "inProgress" | "imported" | "error" | null;
  /** Max length 300. */
  lastExecutionError?: string | null;
  deductibleConnectionFee: boolean;
  /** Read-only. */
  readonly id?: number | null;
  name?: DestinationRateGroupName | null;
  description?: DestinationRateGroupDescription | null;
  file?: DestinationRateGroupFile | null;
  currency?: Currency | null;
}

/** `DestinationRateGroup_Description` */
export interface DestinationRateGroupDescription {
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

/** `DestinationRateGroup_File` */
export interface DestinationRateGroupFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
  importerArguments?: Array<string> | null;
}

/** `DestinationRateGroup_Name` */
export interface DestinationRateGroupName {
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

/** `Destination_Name` */
export interface DestinationName {
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

/** `Domain-collection` — the `collection` serialization of Domain. */
export interface DomainCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 190. */
  domain: string;
}

/** `Extension` */
export interface Extension {
  /** Max length 10. */
  number: string;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "conferenceRoom" | "friend" | "queue" | "conditional" | "voicemail" | "locution" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  user?: number | null;
  numberCountry?: number | null;
}

/** `Extension-collection` — the `collection` serialization of Extension. */
export interface ExtensionCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 10. */
  number: string;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "conferenceRoom" | "friend" | "queue" | "conditional" | "voicemail" | "locution" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  user?: number | null;
  numberCountry?: number | null;
}

/** `Extension-detailed` — the `detailed` serialization of Extension. */
export interface ExtensionDetailed {
  /** Max length 10. */
  number: string;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "conferenceRoom" | "friend" | "queue" | "conditional" | "voicemail" | "locution" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  user?: User | null;
  numberCountry?: Country | null;
}

/** `Fax` */
export interface Fax {
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  email?: string | null;
  sendByEmail: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  outgoingDdi?: number | null;
}

/** `Fax-collection` — the `collection` serialization of Fax. */
export interface FaxCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  email?: string | null;
  sendByEmail: boolean;
  outgoingDdi?: number | null;
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

/** `FeaturesRelBrand-collection` — the `collection` serialization of FeaturesRelBrand. */
export interface FeaturesRelBrandCollection {
  /** Read-only. */
  readonly id?: number | null;
  feature: number;
}

/** `FeaturesRelBrand-detailed` — the `detailed` serialization of FeaturesRelBrand. */
export interface FeaturesRelBrandDetailed {
  /** Read-only. */
  readonly id?: number | null;
  feature: Feature;
}

/** `FeaturesRelCompany` */
export interface FeaturesRelCompany {
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  feature: number;
}

/** `FeaturesRelCompany-collection` — the `collection` serialization of FeaturesRelCompany. */
export interface FeaturesRelCompanyCollection {
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  feature: number;
}

/** `FeaturesRelCompany-detailed` — the `detailed` serialization of FeaturesRelCompany. */
export interface FeaturesRelCompanyDetailed {
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  feature: Feature;
}

/** `FileImporterArguments` */
export interface FileImporterArguments {
  scape?: string | null;
  delimiter?: string | null;
  enclosure?: string | null;
  ignoreFirst?: boolean | null;
  columns?: Array<string> | null;
}

/** `FixedCost` */
export interface FixedCost {
  /** Max length 255. */
  name: string;
  /** Max length 1024. */
  description?: string | null;
  cost?: number | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `FixedCost-collection` — the `collection` serialization of FixedCost. */
export interface FixedCostCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  name: string;
  /** Max length 1024. */
  description?: string | null;
  cost?: number | null;
}

/** `FixedCost-detailed` — the `detailed` serialization of FixedCost. */
export interface FixedCostDetailed {
  /** Max length 255. */
  name: string;
  /** Max length 1024. */
  description?: string | null;
  cost?: number | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `FixedCostsRelInvoice` */
export interface FixedCostsRelInvoice {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  fixedCost: number;
  invoice: number;
}

/** `FixedCostsRelInvoice-detailed` — the `detailed` serialization of FixedCostsRelInvoice. */
export interface FixedCostsRelInvoiceDetailed {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  fixedCost: FixedCost;
  invoice: Invoice;
}

/** `FixedCostsRelInvoice-detailedCollection` — the `detailedCollection` serialization of FixedCostsRelInvoice. */
export interface FixedCostsRelInvoiceDetailedCollection {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  fixedCost: FixedCost;
  invoice: Invoice;
}

/** `FixedCostsRelInvoiceScheduler` */
export interface FixedCostsRelInvoiceScheduler {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 25. */
  type: "static" | "maxcalls" | "ddis";
  /** Max length 25. */
  ddisCountryMatch?: "all" | "national" | "international" | "specific" | null;
  ddisCountry?: number | null;
  fixedCost: number;
  invoiceScheduler: number;
}

/** `FixedCostsRelInvoiceScheduler-detailed` — the `detailed` serialization of FixedCostsRelInvoiceScheduler. */
export interface FixedCostsRelInvoiceSchedulerDetailed {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 25. */
  type: "static" | "maxcalls" | "ddis";
  /** Max length 25. */
  ddisCountryMatch?: "all" | "national" | "international" | "specific" | null;
  ddisCountry?: Country | null;
  fixedCost: FixedCost;
  invoiceScheduler: InvoiceScheduler;
}

/** `FixedCostsRelInvoiceScheduler-detailedCollection` — the `detailedCollection` serialization of FixedCostsRelInvoiceScheduler. */
export interface FixedCostsRelInvoiceSchedulerDetailedCollection {
  quantity?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 25. */
  type: "static" | "maxcalls" | "ddis";
  /** Max length 25. */
  ddisCountryMatch?: "all" | "national" | "international" | "specific" | null;
  ddisCountry?: Country | null;
  fixedCost: FixedCost;
  invoiceScheduler: InvoiceScheduler;
}

/** `Friend` */
export interface Friend {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  priority: number;
  /** Max length 20. */
  directConnectivity: "yes" | "no" | "intervpbx";
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  interCompany?: number | null;
  proxyUser?: number | null;
}

/** `Friend-collection` — the `collection` serialization of Friend. */
export interface FriendCollection {
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  /** Max length 65. */
  name: string;
  domain?: number | null;
  /** Max length 500. */
  description: string;
  priority: number;
  /** Max length 20. */
  directConnectivity: "yes" | "no" | "intervpbx";
  interCompany?: number | null;
  proxyUser?: number | null;
}

/** `Friend-detailed` — the `detailed` serialization of Friend. */
export interface FriendDetailed {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  priority: number;
  /** Max length 20. */
  directConnectivity: "yes" | "no" | "intervpbx";
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  interCompany?: Company | null;
  proxyUser?: ProxyUser | null;
}

/** `Friend-status` — the `status` serialization of Friend. */
export interface FriendStatus {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 65. */
  name: string;
  /** Registration domain */
  domainName?: string | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  company: Company;
}

/** `Invoice` */
export interface Invoice {
  /** Max length 30. */
  number?: string | null;
  inDate?: string | null;
  outDate?: string | null;
  total?: number | null;
  taxRate?: number | null;
  totalWithTax?: number | null;
  /** Max length 25. */
  status?: "waiting" | "processing" | "created" | "error" | null;
  /** Max length 140. */
  statusMsg?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  pdf?: InvoicePdf | null;
  invoiceTemplate: number;
  company: number;
  numberSequence?: number | null;
  scheduler?: number | null;
  /** Invoice currency */
  currency?: string | null;
}

/** `Invoice-collection` — the `collection` serialization of Invoice. */
export interface InvoiceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 30. */
  number?: string | null;
  inDate?: string | null;
  outDate?: string | null;
  total?: number | null;
  taxRate?: number | null;
  totalWithTax?: number | null;
  /** Max length 25. */
  status?: "waiting" | "processing" | "created" | "error" | null;
  pdf?: InvoicePdf | null;
  invoiceTemplate: number;
  company: number;
  scheduler?: number | null;
  /** Invoice currency */
  currency?: string | null;
}

/** `Invoice-detailed` — the `detailed` serialization of Invoice. */
export interface InvoiceDetailed {
  /** Max length 30. */
  number?: string | null;
  inDate?: string | null;
  outDate?: string | null;
  total?: number | null;
  taxRate?: number | null;
  totalWithTax?: number | null;
  /** Max length 25. */
  status?: "waiting" | "processing" | "created" | "error" | null;
  /** Max length 140. */
  statusMsg?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  pdf?: InvoicePdf | null;
  invoiceTemplate: InvoiceTemplate;
  company: Company;
  numberSequence?: InvoiceNumberSequence | null;
  scheduler?: InvoiceScheduler | null;
  /** Invoice currency */
  currency?: string | null;
}

/** `InvoiceNumberSequence` */
export interface InvoiceNumberSequence {
  /** Max length 40. */
  name: string;
  /** Max length 20. */
  prefix: string;
  sequenceLength: number;
  increment: number;
  latestValue?: string | null;
  iteration: number;
  version: number;
  /** Read-only. */
  readonly id?: number | null;
}

/** `InvoiceNumberSequence-collection` — the `collection` serialization of InvoiceNumberSequence. */
export interface InvoiceNumberSequenceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 40. */
  name: string;
  latestValue?: string | null;
}

/** `InvoiceNumberSequence-detailed` — the `detailed` serialization of InvoiceNumberSequence. */
export interface InvoiceNumberSequenceDetailed {
  /** Max length 40. */
  name: string;
  /** Max length 20. */
  prefix: string;
  sequenceLength: number;
  increment: number;
  latestValue?: string | null;
  iteration: number;
  version: number;
  /** Read-only. */
  readonly id?: number | null;
}

/** `InvoiceScheduler` */
export interface InvoiceScheduler {
  /** Max length 40. */
  name: string;
  /** Max length 30. */
  unit: "week" | "month" | "year";
  frequency: number;
  /** Max length 140. */
  email: string;
  lastExecution?: string | null;
  /** Max length 300. */
  lastExecutionError?: string | null;
  nextExecution?: string | null;
  taxRate?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  invoiceTemplate?: number | null;
  brand: number;
  company: number;
  numberSequence?: number | null;
}

/** `InvoiceScheduler-collection` — the `collection` serialization of InvoiceScheduler. */
export interface InvoiceSchedulerCollection {
  /** Max length 40. */
  name: string;
  /** Max length 30. */
  unit: "week" | "month" | "year";
  frequency: number;
  lastExecution?: string | null;
  /** Max length 300. */
  lastExecutionError?: string | null;
  nextExecution?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  brand: number;
  company: number;
}

/** `InvoiceScheduler-detailed` — the `detailed` serialization of InvoiceScheduler. */
export interface InvoiceSchedulerDetailed {
  /** Max length 40. */
  name: string;
  /** Max length 30. */
  unit: "week" | "month" | "year";
  frequency: number;
  /** Max length 140. */
  email: string;
  lastExecution?: string | null;
  /** Max length 300. */
  lastExecutionError?: string | null;
  nextExecution?: string | null;
  taxRate?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  invoiceTemplate?: InvoiceTemplate | null;
  brand: Brand;
  company: Company;
  numberSequence?: InvoiceNumberSequence | null;
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
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
}

/** `InvoiceTemplate-collection` — the `collection` serialization of InvoiceTemplate. */
export interface InvoiceTemplateCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 55. */
  name: string;
  /** Max length 300. */
  description?: string | null;
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
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
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
}

/** `Invoice_Pdf` */
export interface InvoicePdf {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
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

/** `Location` */
export interface Location {
  /** Max length 50. */
  name: string;
  /** Max length 500. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `Location-collection` — the `collection` serialization of Location. */
export interface LocationCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 500. */
  description?: string | null;
  survivalDevice?: number | null;
}

/** `MatchList` */
export interface MatchList {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `MatchList-collection` — the `collection` serialization of MatchList. */
export interface MatchListCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
}

/** `MatchList-detailed` — the `detailed` serialization of MatchList. */
export interface MatchListDetailed {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `MatchListPattern` */
export interface MatchListPattern {
  /** Max length 55. */
  description?: string | null;
  /** Max length 10. */
  type: "number" | "regexp";
  /** Max length 255. */
  regexp?: string | null;
  /** Max length 25. */
  numbervalue?: string | null;
  /** Max length 255. */
  matchPattern?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  matchList: number;
  numberCountry?: number | null;
}

/** `MatchListPattern-collection` — the `collection` serialization of MatchListPattern. */
export interface MatchListPatternCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 55. */
  description?: string | null;
  /** Max length 10. */
  type: "number" | "regexp";
  /** Max length 255. */
  regexp?: string | null;
  /** Max length 25. */
  numbervalue?: string | null;
  numberCountry?: number | null;
  matchList: number;
  /** Max length 255. */
  matchPattern?: string | null;
}

/** `MatchListPattern-detailed` — the `detailed` serialization of MatchListPattern. */
export interface MatchListPatternDetailed {
  /** Max length 55. */
  description?: string | null;
  /** Max length 10. */
  type: "number" | "regexp";
  /** Max length 255. */
  regexp?: string | null;
  /** Max length 25. */
  numbervalue?: string | null;
  /** Max length 255. */
  matchPattern?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  matchList: MatchList;
  numberCountry?: Country | null;
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

/** `MusicOnHold` */
export interface MusicOnHold {
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
  originalFile?: MusicOnHoldOriginalFile | null;
  encodedFile?: MusicOnHoldEncodedFile | null;
}

/** `MusicOnHold-collection` — the `collection` serialization of MusicOnHold. */
export interface MusicOnHoldCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  originalFile?: MusicOnHoldOriginalFile | null;
}

/** `MusicOnHold-detailed` — the `detailed` serialization of MusicOnHold. */
export interface MusicOnHoldDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
  originalFile?: MusicOnHoldOriginalFile | null;
  encodedFile?: MusicOnHoldEncodedFile | null;
}

/** `MusicOnHold_EncodedFile` */
export interface MusicOnHoldEncodedFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `MusicOnHold_OriginalFile` */
export interface MusicOnHoldOriginalFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `NotificationTemplate` */
export interface NotificationTemplate {
  /** Max length 55. */
  name: string;
  /** Max length 25. */
  type: "voicemail" | "fax" | "limit" | "lowbalance" | "invoice" | "callCsv" | "maxDailyUsage" | "accessCredentials" | "onDemandRecord";
  /** Read-only. */
  readonly id?: number | null;
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

/** `OutgoingDdiRule` */
export interface OutgoingDdiRule {
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultAction: "keep" | "force";
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  forcedDdi?: number | null;
}

/** `OutgoingDdiRule-collection` — the `collection` serialization of OutgoingDdiRule. */
export interface OutgoingDdiRuleCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultAction: "keep" | "force";
  forcedDdi?: number | null;
}

/** `OutgoingDdiRule-detailed` — the `detailed` serialization of OutgoingDdiRule. */
export interface OutgoingDdiRuleDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultAction: "keep" | "force";
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  forcedDdi?: Ddi | null;
}

/** `OutgoingRouting` */
export interface OutgoingRouting {
  /** Max length 25. */
  type?: "pattern" | "group" | "fax" | null;
  priority: number;
  weight: number;
  /** Max length 25. */
  routingMode?: "static" | "lcr" | "block" | null;
  /** Max length 25. */
  prefix?: string | null;
  stopper: boolean;
  forceClid?: boolean | null;
  /** Max length 25. */
  clid?: string | null;
  disableDiversion: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  carrier?: number | null;
  routingPattern?: number | null;
  routingPatternGroup?: number | null;
  routingTag?: number | null;
  clidCountry?: number | null;
  /** Carriers on LCR route type */
  carrierIds?: Array<number> | null;
}

/** `OutgoingRouting-collection` — the `collection` serialization of OutgoingRouting. */
export interface OutgoingRoutingCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 25. */
  type?: "pattern" | "group" | "fax" | null;
  priority: number;
  weight: number;
  /** Max length 25. */
  routingMode?: "static" | "lcr" | "block" | null;
  company?: number | null;
  routingTag?: number | null;
  carrier?: number | null;
  stopper: boolean;
  routingPattern?: number | null;
  routingPatternGroup?: number | null;
  /** Carriers on LCR route type */
  carrierIds?: Array<number> | null;
}

/** `OutgoingRouting-detailed` — the `detailed` serialization of OutgoingRouting. */
export interface OutgoingRoutingDetailed {
  /** Max length 25. */
  type?: "pattern" | "group" | "fax" | null;
  priority: number;
  weight: number;
  /** Max length 25. */
  routingMode?: "static" | "lcr" | "block" | null;
  /** Max length 25. */
  prefix?: string | null;
  stopper: boolean;
  forceClid?: boolean | null;
  /** Max length 25. */
  clid?: string | null;
  disableDiversion: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  carrier?: Carrier | null;
  routingPattern?: RoutingPattern | null;
  routingPatternGroup?: RoutingPatternGroup | null;
  routingTag?: RoutingTag | null;
  clidCountry?: Country | null;
  /** Carriers on LCR route type */
  carrierIds?: Array<number> | null;
}

/** `Profile` */
export interface Profile {
  restricted?: boolean | null;
  canImpersonate?: boolean | null;
  acls?: Array<ProfileAcl> | null;
  features?: Array<string> | null;
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

/** `RatingPlan` */
export interface RatingPlan {
  weight: number;
  /** Max length 10. */
  timingType?: "always" | "custom" | null;
  timeIn: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  ratingPlanGroup: number;
  destinationRateGroup: number;
}

/** `RatingPlan-collection` — the `collection` serialization of RatingPlan. */
export interface RatingPlanCollection {
  weight: number;
  /** Max length 10. */
  timingType?: "always" | "custom" | null;
  timeIn: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  ratingPlanGroup: number;
  destinationRateGroup: number;
}

/** `RatingPlan-detailed` — the `detailed` serialization of RatingPlan. */
export interface RatingPlanDetailed {
  weight: number;
  /** Max length 10. */
  timingType?: "always" | "custom" | null;
  timeIn: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  ratingPlanGroup: RatingPlanGroup;
  destinationRateGroup: DestinationRateGroup;
}

/** `RatingPlanGroup` */
export interface RatingPlanGroup {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
  description?: RatingPlanGroupDescription | null;
  currency?: number | null;
}

/** `RatingPlanGroup-collection` — the `collection` serialization of RatingPlanGroup. */
export interface RatingPlanGroupCollection {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
  currency?: number | null;
  description?: RatingPlanGroupDescription | null;
}

/** `RatingPlanGroup-detailed` — the `detailed` serialization of RatingPlanGroup. */
export interface RatingPlanGroupDetailed {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
  description?: RatingPlanGroupDescription | null;
  currency?: Currency | null;
}

/** `RatingPlanGroup_Description` */
export interface RatingPlanGroupDescription {
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

/** `RatingPlanGroup_Name` */
export interface RatingPlanGroupName {
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

/** `RatingProfile` */
export interface RatingProfile {
  activationTime: string;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  carrier?: number | null;
  ratingPlanGroup: number;
  routingTag?: number | null;
}

/** `RatingProfile-collection` — the `collection` serialization of RatingProfile. */
export interface RatingProfileCollection {
  activationTime: string;
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  carrier?: number | null;
  ratingPlanGroup: number;
  routingTag?: number | null;
}

/** `RatingProfile-detailed` — the `detailed` serialization of RatingProfile. */
export interface RatingProfileDetailed {
  activationTime: string;
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  carrier?: Carrier | null;
  ratingPlanGroup: RatingPlanGroup;
  routingTag?: RoutingTag | null;
}

/** `RegistrationStatus` */
export interface RegistrationStatus {
  contact?: string | null;
  publicContact?: boolean | null;
  received?: string | null;
  publicReceived?: boolean | null;
  expires?: string | null;
  userAgent?: string | null;
}

/** `RegistrationSummary` */
export interface RegistrationSummary {
  active?: number | null;
  total?: number | null;
  percent?: number | null;
}

/** `ResidentialDevice` */
export interface ResidentialDevice {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  /** Max length 200. */
  allow: string;
  /** Max length 190. */
  fromDomain?: string | null;
  directConnectivity: "yes" | "no";
  ddiIn: "yes" | "no";
  maxCalls: number;
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  transformationRuleSet?: number | null;
  outgoingDdi?: number | null;
  language?: number | null;
  proxyUser?: number | null;
}

/** `ResidentialDevice-collection` — the `collection` serialization of ResidentialDevice. */
export interface ResidentialDeviceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  domain?: number | null;
  directConnectivity: "yes" | "no";
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  company: number;
  rtpEncryption: boolean;
  multiContact: boolean;
}

/** `ResidentialDevice-detailed` — the `detailed` serialization of ResidentialDevice. */
export interface ResidentialDeviceDetailed {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  /** Max length 200. */
  allow: string;
  /** Max length 190. */
  fromDomain?: string | null;
  directConnectivity: "yes" | "no";
  ddiIn: "yes" | "no";
  maxCalls: number;
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  transformationRuleSet?: TransformationRuleSet | null;
  outgoingDdi?: Ddi | null;
  language?: Language | null;
  proxyUser?: ProxyUser | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `ResidentialDevice-status` — the `status` serialization of ResidentialDevice. */
export interface ResidentialDeviceStatus {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 65. */
  name: string;
  /** Registration domain */
  domainName?: string | null;
  directConnectivity: "yes" | "no";
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  company: Company;
}

/** `RetailAccount` */
export interface RetailAccount {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  directConnectivity: "yes" | "no";
  ddiIn: "yes" | "no";
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  transformationRuleSet?: number | null;
  outgoingDdi?: number | null;
  proxyUser?: number | null;
}

/** `RetailAccount-collection` — the `collection` serialization of RetailAccount. */
export interface RetailAccountCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 65. */
  name: string;
  directConnectivity: "yes" | "no";
  /** Max length 500. */
  description: string;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  domain?: number | null;
  company: number;
  rtpEncryption: boolean;
  multiContact: boolean;
}

/** `RetailAccount-detailed` — the `detailed` serialization of RetailAccount. */
export interface RetailAccountDetailed {
  /** Max length 65. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  transport?: "udp" | "tcp" | "tls" | null;
  /** Max length 50. */
  ip?: string | null;
  port?: number | null;
  /** Max length 64. */
  password?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  directConnectivity: "yes" | "no";
  ddiIn: "yes" | "no";
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
  transformationRuleSet?: TransformationRuleSet | null;
  outgoingDdi?: Ddi | null;
  proxyUser?: ProxyUser | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `RetailAccount-statusItem` — the `statusItem` serialization of RetailAccount. */
export interface RetailAccountStatusItem {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 65. */
  name: string;
  directConnectivity: "yes" | "no";
  /** Max length 500. */
  description: string;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  /** Registration domain */
  domainName?: string | null;
  company: Company;
  rtpEncryption: boolean;
  multiContact: boolean;
}

/** `RoutingPattern` */
export interface RoutingPattern {
  /** Max length 80. */
  prefix: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: RoutingPatternName | null;
  description?: RoutingPatternDescription | null;
}

/** `RoutingPattern-collection` — the `collection` serialization of RoutingPattern. */
export interface RoutingPatternCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 80. */
  prefix: string;
  name?: RoutingPatternName | null;
  description?: RoutingPatternDescription | null;
}

/** `RoutingPattern-detailed` — the `detailed` serialization of RoutingPattern. */
export interface RoutingPatternDetailed {
  /** Max length 80. */
  prefix: string;
  /** Read-only. */
  readonly id?: number | null;
  name?: RoutingPatternName | null;
  description?: RoutingPatternDescription | null;
}

/** `RoutingPatternGroup` */
export interface RoutingPatternGroup {
  /** Max length 55. */
  name: string;
  /** Max length 55. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `RoutingPatternGroup-collection` — the `collection` serialization of RoutingPatternGroup. */
export interface RoutingPatternGroupCollection {
  /** Max length 55. */
  name: string;
  /** Max length 55. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Binded routing patterns */
  patternIds?: Array<number> | null;
}

/** `RoutingPatternGroup-detailed` — the `detailed` serialization of RoutingPatternGroup. */
export interface RoutingPatternGroupDetailed {
  /** Max length 55. */
  name: string;
  /** Max length 55. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Binded routing patterns */
  patternIds?: Array<number> | null;
}

/** `RoutingPatternGroup-withPatterns` — the `withPatterns` serialization of RoutingPatternGroup. */
export interface RoutingPatternGroupWithPatterns {
  /** Max length 55. */
  name: string;
  /** Max length 55. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Binded routing patterns */
  patternIds?: Array<number> | null;
}

/** `RoutingPatternGroupsRelPattern` */
export interface RoutingPatternGroupsRelPattern {
  /** Read-only. */
  readonly id?: number | null;
  routingPattern: number;
  routingPatternGroup: number;
}

/** `RoutingPatternGroupsRelPattern-detailed` — the `detailed` serialization of RoutingPatternGroupsRelPattern. */
export interface RoutingPatternGroupsRelPatternDetailed {
  /** Read-only. */
  readonly id?: number | null;
  routingPattern: RoutingPattern;
  routingPatternGroup: RoutingPatternGroup;
}

/** `RoutingPatternGroupsRelPattern-detailedCollection` — the `detailedCollection` serialization of RoutingPatternGroupsRelPattern. */
export interface RoutingPatternGroupsRelPatternDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  routingPattern: RoutingPattern;
  routingPatternGroup: RoutingPatternGroup;
}

/** `RoutingPattern_Description` */
export interface RoutingPatternDescription {
  /** Max length 55. */
  en?: string | null;
  /** Max length 55. */
  es?: string | null;
  /** Max length 55. */
  ca?: string | null;
  /** Max length 55. */
  it?: string | null;
  /** Max length 55. */
  eu?: string | null;
}

/** `RoutingPattern_Name` */
export interface RoutingPatternName {
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

/** `RoutingTag` */
export interface RoutingTag {
  /** Max length 80. */
  name: string;
  /** Max length 15. */
  tag: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `RoutingTag-collection` — the `collection` serialization of RoutingTag. */
export interface RoutingTagCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 80. */
  name: string;
  /** Max length 15. */
  tag: string;
}

/** `RoutingTag-detailed` — the `detailed` serialization of RoutingTag. */
export interface RoutingTagDetailed {
  /** Max length 80. */
  name: string;
  /** Max length 15. */
  tag: string;
  /** Read-only. */
  readonly id?: number | null;
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
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
}

/** `SpecialNumber-collection` — the `collection` serialization of SpecialNumber. */
export interface SpecialNumberCollection {
  /** Max length 25. */
  number: string;
  disableCDR: number;
  /** Read-only. */
  readonly id?: number | null;
  country: number;
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
}

/** `SpecialNumber-detailed` — the `detailed` serialization of SpecialNumber. */
export interface SpecialNumberDetailed {
  /** Max length 25. */
  number: string;
  disableCDR: number;
  /** Read-only. */
  readonly id?: number | null;
  country: Country;
  /** Global Special Number Read-only. */
  readonly global?: boolean | null;
}

/** `TarificationInfo` */
export interface TarificationInfo {
  plan?: string | null;
  callDate?: string | null;
  duration?: number | null;
  patternName?: string | null;
  connectionCharge?: number | null;
  intervalStart?: string | null;
  rate?: number | null;
  ratePeriod?: number | null;
  totalCost?: number | null;
  currencySymbol?: string | null;
}

/** `Terminal` */
export interface Terminal {
  /** Max length 100. */
  name: string;
  /** Max length 200. */
  disallow: string;
  /** Max length 200. */
  allowAudio: string;
  /** Max length 200. */
  allowVideo?: string | null;
  /** Max length 25. */
  directMediaMethod: "update" | "invite" | "reinvite";
  /** Max length 25. */
  password: string;
  /** Max length 12. */
  mac?: string | null;
  lastProvisionDate?: string | null;
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `Terminal-collection` — the `collection` serialization of Terminal. */
export interface TerminalCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 12. */
  mac?: string | null;
  lastProvisionDate?: string | null;
  domain?: number | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `Terminal-status` — the `status` serialization of Terminal. */
export interface TerminalStatus {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Registration domain */
  domainName?: string | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  company: Company;
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

/** `Token` */
export interface Token {
  token?: string | null;
}

/** `TransformationRule` */
export interface TransformationRule {
  /** Max length 10. */
  type: "callerin" | "calleein" | "callerout" | "calleeout";
  /** Max length 64. */
  description: string;
  priority?: number | null;
  /** Max length 128. */
  matchExpr?: string | null;
  /** Max length 128. */
  replaceExpr?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet: number;
}

/** `TransformationRule-collection` — the `collection` serialization of TransformationRule. */
export interface TransformationRuleCollection {
  /** Max length 10. */
  type: "callerin" | "calleein" | "callerout" | "calleeout";
  /** Max length 64. */
  description: string;
  priority?: number | null;
  /** Max length 128. */
  matchExpr?: string | null;
  /** Max length 128. */
  replaceExpr?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `TransformationRule-detailed` — the `detailed` serialization of TransformationRule. */
export interface TransformationRuleDetailed {
  /** Max length 10. */
  type: "callerin" | "calleein" | "callerout" | "calleeout";
  /** Max length 64. */
  description: string;
  priority?: number | null;
  /** Max length 128. */
  matchExpr?: string | null;
  /** Max length 128. */
  replaceExpr?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet: TransformationRuleSet;
}

/** `TransformationRuleSet` */
export interface TransformationRuleSet {
  /** Max length 250. */
  description?: string | null;
  /** Max length 10. */
  internationalCode?: string | null;
  /** Max length 5. */
  trunkPrefix?: string | null;
  /** Max length 5. */
  areaCode?: string | null;
  nationalLen?: number | null;
  generateRules?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: TransformationRuleSetName | null;
  country?: number | null;
  editable?: boolean | null;
}

/** `TransformationRuleSet-collection` — the `collection` serialization of TransformationRuleSet. */
export interface TransformationRuleSetCollection {
  /** Max length 250. */
  description?: string | null;
  /** Max length 10. */
  internationalCode?: string | null;
  /** Max length 5. */
  trunkPrefix?: string | null;
  /** Max length 5. */
  areaCode?: string | null;
  nationalLen?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: TransformationRuleSetName | null;
  editable?: boolean | null;
}

/** `TransformationRuleSet-detailed` — the `detailed` serialization of TransformationRuleSet. */
export interface TransformationRuleSetDetailed {
  /** Max length 250. */
  description?: string | null;
  /** Max length 10. */
  internationalCode?: string | null;
  /** Max length 5. */
  trunkPrefix?: string | null;
  /** Max length 5. */
  areaCode?: string | null;
  nationalLen?: number | null;
  generateRules?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
  name?: TransformationRuleSetName | null;
  country?: Country | null;
  editable?: boolean | null;
}

/** `TransformationRuleSet_Name` */
export interface TransformationRuleSetName {
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

/** `Trusted` */
export interface Trusted {
  /** Max length 50. */
  srcIp?: string | null;
  /** Max length 4. */
  proto?: string | null;
  /** Max length 64. */
  fromPattern?: string | null;
  /** Max length 64. */
  ruriPattern?: string | null;
  /** Max length 64. */
  tag?: string | null;
  /** Max length 200. */
  description?: string | null;
  priority: number;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `Trusted-collection` — the `collection` serialization of Trusted. */
export interface TrustedCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  srcIp?: string | null;
  /** Max length 200. */
  description?: string | null;
}

/** `Trusted-detailed` — the `detailed` serialization of Trusted. */
export interface TrustedDetailed {
  /** Max length 50. */
  srcIp?: string | null;
  /** Max length 4. */
  proto?: string | null;
  /** Max length 64. */
  fromPattern?: string | null;
  /** Max length 64. */
  ruriPattern?: string | null;
  /** Max length 64. */
  tag?: string | null;
  /** Max length 200. */
  description?: string | null;
  priority: number;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
}

/** `User` */
export interface User {
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname: string;
  /** Max length 100. */
  email?: string | null;
  /** Max length 80. */
  pass?: string | null;
  doNotDisturb: boolean;
  isBoss: boolean;
  active: boolean;
  maxCalls: number;
  /** Max length 1. */
  externalIpCalls: "0" | "1" | "2" | "3";
  /** Max length 3. */
  rejectCallMethod: "rfc" | "486" | "600";
  multiContact: boolean;
  gsQRCode: boolean;
  useDefaultLocation: boolean;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
  bossAssistant?: number | null;
  bossAssistantWhiteList?: number | null;
  transformationRuleSet?: number | null;
  language?: number | null;
  terminal?: number | null;
  extension?: number | null;
  timezone?: number | null;
  outgoingDdi?: number | null;
  outgoingDdiRule?: number | null;
  location?: number | null;
  /** required in order to update user password */
  oldPass?: string | null;
}

/** `User-collection` — the `collection` serialization of User. */
export interface UserCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname: string;
  terminal?: number | null;
  extension?: number | null;
  outgoingDdi?: number | null;
  /** Max length 100. */
  email?: string | null;
  active: boolean;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  company: number;
  location?: number | null;
}

/** `UsersAddress` */
export interface UsersAddress {
  /** Max length 100. */
  sourceAddress: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `UsersAddress-collection` — the `collection` serialization of UsersAddress. */
export interface UsersAddressCollection {
  /** Max length 100. */
  sourceAddress: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `UsersAddress-detailed` — the `detailed` serialization of UsersAddress. */
export interface UsersAddressDetailed {
  /** Max length 100. */
  sourceAddress: string;
  /** Max length 200. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
}

/** `UsersMassImport` */
export interface UsersMassImport {
  success?: boolean | null;
  errorMsg?: string | null;
  failed?: number | null;
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
  brand: number;
  company?: number | null;
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

/** `Webhook` */
export interface Webhook {
  /** Max length 64. */
  name: string;
  /** Max length 255. */
  description?: string | null;
  uri: string;
  eventStart: boolean;
  eventRing: boolean;
  eventAnswer: boolean;
  eventEnd: boolean;
  eventUpdateClid: boolean;
  template: string;
  /** Max length 25. */
  callDirection: "inbound" | "outbound" | "both";
  /** Read-only. */
  readonly id?: number | null;
  company?: number | null;
  ddi?: number | null;
  user?: number | null;
}

/** `Webhook-collection` — the `collection` serialization of Webhook. */
export interface WebhookCollection {
  /** Max length 64. */
  name: string;
  uri: string;
  eventStart: boolean;
  eventRing: boolean;
  eventAnswer: boolean;
  eventEnd: boolean;
  eventUpdateClid: boolean;
  template: string;
  /** Max length 25. */
  callDirection: "inbound" | "outbound" | "both";
  /** Max length 255. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Webhook-detailed` — the `detailed` serialization of Webhook. */
export interface WebhookDetailed {
  /** Max length 64. */
  name: string;
  /** Max length 255. */
  description?: string | null;
  uri: string;
  eventStart: boolean;
  eventRing: boolean;
  eventAnswer: boolean;
  eventEnd: boolean;
  eventUpdateClid: boolean;
  template: string;
  /** Max length 25. */
  callDirection: "inbound" | "outbound" | "both";
  /** Read-only. */
  readonly id?: number | null;
  company?: Company | null;
  ddi?: Ddi | null;
  user?: User | null;
}

/** Every definition in this spec, keyed by its wire name. */
export interface Definitions {
  ACK: ACK;
  ActiveCalls: ActiveCalls;
  Administrator: Administrator;
  "Administrator-collection": AdministratorCollection;
  "Administrator-detailed": AdministratorDetailed;
  AdministratorRelPublicEntity: AdministratorRelPublicEntity;
  "AdministratorRelPublicEntity-collection": AdministratorRelPublicEntityCollection;
  "AdministratorRelPublicEntity-detailed": AdministratorRelPublicEntityDetailed;
  ApplicationServerSet: ApplicationServerSet;
  "ApplicationServerSet-collection": ApplicationServerSetCollection;
  "ApplicationServerSet-detailed": ApplicationServerSetDetailed;
  "BalanceMovement-collection": BalanceMovementCollection;
  "BalanceMovement-detailed": BalanceMovementDetailed;
  BalanceNotification: BalanceNotification;
  "BalanceNotification-collection": BalanceNotificationCollection;
  "BalanceNotification-detailed": BalanceNotificationDetailed;
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
  "CallCsvReport-collection": CallCsvReportCollection;
  "CallCsvReport-detailed": CallCsvReportDetailed;
  CallCsvReport_Csv: CallCsvReportCsv;
  CallCsvScheduler: CallCsvScheduler;
  "CallCsvScheduler-collection": CallCsvSchedulerCollection;
  "CallCsvScheduler-detailed": CallCsvSchedulerDetailed;
  Carrier: Carrier;
  "Carrier-collection": CarrierCollection;
  "Carrier-detailed": CarrierDetailed;
  CarrierServer: CarrierServer;
  "CarrierServer-collection": CarrierServerCollection;
  "CarrierServer-detailed": CarrierServerDetailed;
  "CarrierServer-status": CarrierServer_Status;
  CarrierServerStatus: CarrierServerStatus;
  CarrierStatus: CarrierStatus;
  Codec: Codec;
  "Codec-collection": CodecCollection;
  "Codec-detailed": CodecDetailed;
  Company: Company;
  "Company-balances": CompanyBalances;
  "Company-collection": CompanyCollection;
  "Company-dailyUsage": CompanyDailyUsage;
  "Company-detailed": CompanyDetailed;
  CompanyRelCodec: CompanyRelCodec;
  "CompanyRelCodec-collection": CompanyRelCodecCollection;
  "CompanyRelCodec-detailed": CompanyRelCodecDetailed;
  Company_Invoicing: CompanyInvoicing;
  Corporation: Corporation;
  "Corporation-collection": CorporationCollection;
  "Corporation-detailed": CorporationDetailed;
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
  DashboardBrand: DashboardBrand;
  DashboardClient: DashboardClient;
  Ddi: Ddi;
  "Ddi-collection": DdiCollection;
  "Ddi-detailed": DdiDetailed;
  DdiProvider: DdiProvider;
  "DdiProvider-collection": DdiProviderCollection;
  "DdiProvider-detailed": DdiProviderDetailed;
  DdiProviderAddress: DdiProviderAddress;
  "DdiProviderAddress-collection": DdiProviderAddressCollection;
  "DdiProviderAddress-detailed": DdiProviderAddressDetailed;
  DdiProviderRegistration: DdiProviderRegistration;
  "DdiProviderRegistration-detailed": DdiProviderRegistrationDetailed;
  "DdiProviderRegistration-detailedCollection": DdiProviderRegistrationDetailedCollection;
  "DdiProviderRegistration-status": DdiProviderRegistration_Status;
  DdiProviderRegistrationStatus: DdiProviderRegistrationStatus;
  Destination: Destination;
  "Destination-collection": DestinationCollection;
  "Destination-detailed": DestinationDetailed;
  DestinationRate: DestinationRate;
  "DestinationRate-collection": DestinationRateCollection;
  "DestinationRate-detailed": DestinationRateDetailed;
  DestinationRateGroup: DestinationRateGroup;
  "DestinationRateGroup-collection": DestinationRateGroupCollection;
  "DestinationRateGroup-detailed": DestinationRateGroupDetailed;
  DestinationRateGroup_Description: DestinationRateGroupDescription;
  DestinationRateGroup_File: DestinationRateGroupFile;
  DestinationRateGroup_Name: DestinationRateGroupName;
  Destination_Name: DestinationName;
  "Domain-collection": DomainCollection;
  Extension: Extension;
  "Extension-collection": ExtensionCollection;
  "Extension-detailed": ExtensionDetailed;
  Fax: Fax;
  "Fax-collection": FaxCollection;
  Feature: Feature;
  "Feature-collection": FeatureCollection;
  "Feature-detailed": FeatureDetailed;
  Feature_Name: FeatureName;
  "FeaturesRelBrand-collection": FeaturesRelBrandCollection;
  "FeaturesRelBrand-detailed": FeaturesRelBrandDetailed;
  FeaturesRelCompany: FeaturesRelCompany;
  "FeaturesRelCompany-collection": FeaturesRelCompanyCollection;
  "FeaturesRelCompany-detailed": FeaturesRelCompanyDetailed;
  FileImporterArguments: FileImporterArguments;
  FixedCost: FixedCost;
  "FixedCost-collection": FixedCostCollection;
  "FixedCost-detailed": FixedCostDetailed;
  FixedCostsRelInvoice: FixedCostsRelInvoice;
  "FixedCostsRelInvoice-detailed": FixedCostsRelInvoiceDetailed;
  "FixedCostsRelInvoice-detailedCollection": FixedCostsRelInvoiceDetailedCollection;
  FixedCostsRelInvoiceScheduler: FixedCostsRelInvoiceScheduler;
  "FixedCostsRelInvoiceScheduler-detailed": FixedCostsRelInvoiceSchedulerDetailed;
  "FixedCostsRelInvoiceScheduler-detailedCollection": FixedCostsRelInvoiceSchedulerDetailedCollection;
  Friend: Friend;
  "Friend-collection": FriendCollection;
  "Friend-detailed": FriendDetailed;
  "Friend-status": FriendStatus;
  Invoice: Invoice;
  "Invoice-collection": InvoiceCollection;
  "Invoice-detailed": InvoiceDetailed;
  InvoiceNumberSequence: InvoiceNumberSequence;
  "InvoiceNumberSequence-collection": InvoiceNumberSequenceCollection;
  "InvoiceNumberSequence-detailed": InvoiceNumberSequenceDetailed;
  InvoiceScheduler: InvoiceScheduler;
  "InvoiceScheduler-collection": InvoiceSchedulerCollection;
  "InvoiceScheduler-detailed": InvoiceSchedulerDetailed;
  InvoiceTemplate: InvoiceTemplate;
  "InvoiceTemplate-collection": InvoiceTemplateCollection;
  "InvoiceTemplate-detailed": InvoiceTemplateDetailed;
  Invoice_Pdf: InvoicePdf;
  Language: Language;
  "Language-collection": LanguageCollection;
  "Language-detailed": LanguageDetailed;
  Language_Name: LanguageName;
  Location: Location;
  "Location-collection": LocationCollection;
  MatchList: MatchList;
  "MatchList-collection": MatchListCollection;
  "MatchList-detailed": MatchListDetailed;
  MatchListPattern: MatchListPattern;
  "MatchListPattern-collection": MatchListPatternCollection;
  "MatchListPattern-detailed": MatchListPatternDetailed;
  MediaRelaySet: MediaRelaySet;
  "MediaRelaySet-collection": MediaRelaySetCollection;
  "MediaRelaySet-detailed": MediaRelaySetDetailed;
  MusicOnHold: MusicOnHold;
  "MusicOnHold-collection": MusicOnHoldCollection;
  "MusicOnHold-detailed": MusicOnHoldDetailed;
  MusicOnHold_EncodedFile: MusicOnHoldEncodedFile;
  MusicOnHold_OriginalFile: MusicOnHoldOriginalFile;
  NotificationTemplate: NotificationTemplate;
  "NotificationTemplate-collection": NotificationTemplateCollection;
  "NotificationTemplate-detailed": NotificationTemplateDetailed;
  NotificationTemplateContent: NotificationTemplateContent;
  "NotificationTemplateContent-collection": NotificationTemplateContentCollection;
  "NotificationTemplateContent-detailed": NotificationTemplateContentDetailed;
  OutgoingDdiRule: OutgoingDdiRule;
  "OutgoingDdiRule-collection": OutgoingDdiRuleCollection;
  "OutgoingDdiRule-detailed": OutgoingDdiRuleDetailed;
  OutgoingRouting: OutgoingRouting;
  "OutgoingRouting-collection": OutgoingRoutingCollection;
  "OutgoingRouting-detailed": OutgoingRoutingDetailed;
  Profile: Profile;
  ProfileAcl: ProfileAcl;
  ProxyTrunk: ProxyTrunk;
  "ProxyTrunk-collection": ProxyTrunkCollection;
  "ProxyTrunk-detailed": ProxyTrunkDetailed;
  ProxyUser: ProxyUser;
  "ProxyUser-collection": ProxyUserCollection;
  "ProxyUser-detailed": ProxyUserDetailed;
  PublicEntity: PublicEntity;
  "PublicEntity-collection": PublicEntityCollection;
  "PublicEntity-detailed": PublicEntityDetailed;
  PublicEntity_Name: PublicEntityName;
  RatingPlan: RatingPlan;
  "RatingPlan-collection": RatingPlanCollection;
  "RatingPlan-detailed": RatingPlanDetailed;
  RatingPlanGroup: RatingPlanGroup;
  "RatingPlanGroup-collection": RatingPlanGroupCollection;
  "RatingPlanGroup-detailed": RatingPlanGroupDetailed;
  RatingPlanGroup_Description: RatingPlanGroupDescription;
  RatingPlanGroup_Name: RatingPlanGroupName;
  RatingProfile: RatingProfile;
  "RatingProfile-collection": RatingProfileCollection;
  "RatingProfile-detailed": RatingProfileDetailed;
  RegistrationStatus: RegistrationStatus;
  RegistrationSummary: RegistrationSummary;
  ResidentialDevice: ResidentialDevice;
  "ResidentialDevice-collection": ResidentialDeviceCollection;
  "ResidentialDevice-detailed": ResidentialDeviceDetailed;
  "ResidentialDevice-status": ResidentialDeviceStatus;
  RetailAccount: RetailAccount;
  "RetailAccount-collection": RetailAccountCollection;
  "RetailAccount-detailed": RetailAccountDetailed;
  "RetailAccount-statusItem": RetailAccountStatusItem;
  RoutingPattern: RoutingPattern;
  "RoutingPattern-collection": RoutingPatternCollection;
  "RoutingPattern-detailed": RoutingPatternDetailed;
  RoutingPatternGroup: RoutingPatternGroup;
  "RoutingPatternGroup-collection": RoutingPatternGroupCollection;
  "RoutingPatternGroup-detailed": RoutingPatternGroupDetailed;
  "RoutingPatternGroup-withPatterns": RoutingPatternGroupWithPatterns;
  RoutingPatternGroupsRelPattern: RoutingPatternGroupsRelPattern;
  "RoutingPatternGroupsRelPattern-detailed": RoutingPatternGroupsRelPatternDetailed;
  "RoutingPatternGroupsRelPattern-detailedCollection": RoutingPatternGroupsRelPatternDetailedCollection;
  RoutingPattern_Description: RoutingPatternDescription;
  RoutingPattern_Name: RoutingPatternName;
  RoutingTag: RoutingTag;
  "RoutingTag-collection": RoutingTagCollection;
  "RoutingTag-detailed": RoutingTagDetailed;
  Service: Service;
  "Service-collection": ServiceCollection;
  "Service-detailed": ServiceDetailed;
  Service_Description: ServiceDescription;
  Service_Name: ServiceName;
  SpecialNumber: SpecialNumber;
  "SpecialNumber-collection": SpecialNumberCollection;
  "SpecialNumber-detailed": SpecialNumberDetailed;
  TarificationInfo: TarificationInfo;
  Terminal: Terminal;
  "Terminal-collection": TerminalCollection;
  "Terminal-status": TerminalStatus;
  Timezone: Timezone;
  "Timezone-collection": TimezoneCollection;
  "Timezone-detailed": TimezoneDetailed;
  Timezone_Label: TimezoneLabel;
  Token: Token;
  TransformationRule: TransformationRule;
  "TransformationRule-collection": TransformationRuleCollection;
  "TransformationRule-detailed": TransformationRuleDetailed;
  TransformationRuleSet: TransformationRuleSet;
  "TransformationRuleSet-collection": TransformationRuleSetCollection;
  "TransformationRuleSet-detailed": TransformationRuleSetDetailed;
  TransformationRuleSet_Name: TransformationRuleSetName;
  Trusted: Trusted;
  "Trusted-collection": TrustedCollection;
  "Trusted-detailed": TrustedDetailed;
  User: User;
  "User-collection": UserCollection;
  UsersAddress: UsersAddress;
  "UsersAddress-collection": UsersAddressCollection;
  "UsersAddress-detailed": UsersAddressDetailed;
  UsersMassImport: UsersMassImport;
  WebPortal: WebPortal;
  "WebPortal-collection": WebPortalCollection;
  "WebPortal-detailed": WebPortalDetailed;
  WebPortal_Logo: WebPortalLogo;
  WebTheme: WebTheme;
  Webhook: Webhook;
  "Webhook-collection": WebhookCollection;
  "Webhook-detailed": WebhookDetailed;
}

export type DefinitionName = keyof Definitions;
