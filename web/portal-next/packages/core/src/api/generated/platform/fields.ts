/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/platform/public/apiSpec.json
// Regenerate with: yarn codegen
// App: platform  Spec: swagger 2.0  basePath: /api/platform/

import type { FieldMetaMap } from '../../fieldMeta';

export const ActiveCallsFields: FieldMetaMap = {
  inbound: { kind: "integer" },
  outbound: { kind: "integer" },
  total: { kind: "integer" },
};

export const AdministratorFields: FieldMetaMap = {
  username: { kind: "string", maxLength: 65, required: true },
  pass: { kind: "string", maxLength: 80, default: "" },
  email: { kind: "string", maxLength: 100, default: "", required: true },
  active: { kind: "boolean", default: 1, required: true },
  restricted: { kind: "boolean", default: 0, required: true },
  name: { kind: "string", maxLength: 100 },
  lastname: { kind: "string", maxLength: 100 },
  canImpersonate: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer" },
  company: { kind: "integer" },
  timezone: { kind: "integer" },
};

export const AdministratorCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  active: { kind: "boolean", default: 1, required: true },
  restricted: { kind: "boolean", default: 0, required: true },
  username: { kind: "string", maxLength: 65, required: true },
  name: { kind: "string", maxLength: 100 },
  lastname: { kind: "string", maxLength: 100 },
  email: { kind: "string", maxLength: 100, default: "", required: true },
};

export const AdministratorDetailedFields: FieldMetaMap = {
  username: { kind: "string", maxLength: 65, required: true },
  pass: { kind: "string", maxLength: 80, default: "" },
  email: { kind: "string", maxLength: 100, default: "", required: true },
  active: { kind: "boolean", default: 1, required: true },
  restricted: { kind: "boolean", default: 0, required: true },
  name: { kind: "string", maxLength: 100 },
  lastname: { kind: "string", maxLength: 100 },
  canImpersonate: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand" },
  company: { kind: "ref", ref: "Company" },
  timezone: { kind: "ref", ref: "Timezone" },
};

export const AdministratorRelPublicEntityFields: FieldMetaMap = {
  create: { kind: "boolean", default: 0, required: true },
  read: { kind: "boolean", default: 1, required: true },
  update: { kind: "boolean", default: 0, required: true },
  delete: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  administrator: { kind: "integer", required: true },
  publicEntity: { kind: "integer", required: true },
};

export const AdministratorRelPublicEntityCollectionFields: FieldMetaMap = {
  create: { kind: "boolean", default: 0, required: true },
  read: { kind: "boolean", default: 1, required: true },
  update: { kind: "boolean", default: 0, required: true },
  delete: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  administrator: { kind: "integer", required: true },
  publicEntity: { kind: "integer", required: true },
};

export const AdministratorRelPublicEntityDetailedFields: FieldMetaMap = {
  create: { kind: "boolean", default: 0, required: true },
  read: { kind: "boolean", default: 1, required: true },
  update: { kind: "boolean", default: 0, required: true },
  delete: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  administrator: { kind: "ref", ref: "Administrator", required: true },
  publicEntity: { kind: "ref", ref: "PublicEntity", required: true },
};

export const ApplicationServerFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50, required: true },
  name: { kind: "string", maxLength: 64, required: true },
  id: { kind: "integer", readOnly: true },
};

export const ApplicationServerCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 64, required: true },
  ip: { kind: "string", maxLength: 50, required: true },
};

export const ApplicationServerDetailedFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50, required: true },
  name: { kind: "string", maxLength: 64, required: true },
  id: { kind: "integer", readOnly: true },
};

export const ApplicationServerSetFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 32, default: "", required: true },
  distributeMethod: { kind: "string", enum: ["rr","hash"], maxLength: 25, default: "hash", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  applicationServers: { kind: "unknown" },
};

export const ApplicationServerSetCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 32, default: "", required: true },
  distributeMethod: { kind: "string", enum: ["rr","hash"], maxLength: 25, default: "hash", required: true },
  description: { kind: "string", maxLength: 200 },
};

export const ApplicationServerSetDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 32, default: "", required: true },
  distributeMethod: { kind: "string", enum: ["rr","hash"], maxLength: 25, default: "hash", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  applicationServers: { kind: "unknown" },
};

export const BannedAddressCollectionFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  lastTimeBanned: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  blocker: { kind: "string", enum: ["antiflood","ipfilter","antibruteforce"], maxLength: 50 },
  aor: { kind: "string", maxLength: 300 },
};

export const BannedAddressDetailedFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  blocker: { kind: "string", enum: ["antiflood","ipfilter","antibruteforce"], maxLength: 50 },
  aor: { kind: "string", maxLength: 300 },
  description: { kind: "string", maxLength: 100 },
  lastTimeBanned: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
};

export const BillableCallFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  cost: { kind: "number", format: "float" },
  price: { kind: "number", format: "float" },
  priceDetails: { kind: "array" },
  carrierName: { kind: "string", maxLength: 200 },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer" },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  invoice: { kind: "integer" },
  ddi: { kind: "integer" },
  ddiProvider: { kind: "integer" },
};

export const BillableCallCollectionFields: FieldMetaMap = {
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  cost: { kind: "number", format: "float" },
  id: { kind: "integer", readOnly: true },
  price: { kind: "number", format: "float" },
  callid: { kind: "string", maxLength: 255 },
  brand: { kind: "integer" },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  ddiProvider: { kind: "integer" },
  invoice: { kind: "integer" },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  ddi: { kind: "integer" },
};

export const BillableCallDetailedFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  cost: { kind: "number", format: "float" },
  price: { kind: "number", format: "float" },
  priceDetails: { kind: "array" },
  carrierName: { kind: "string", maxLength: 200 },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand" },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
  invoice: { kind: "ref", ref: "Invoice" },
  ddi: { kind: "ref", ref: "Ddi" },
  ddiProvider: { kind: "ref", ref: "DdiProvider" },
};

export const BillableCallRatingFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  price: { kind: "number", format: "float" },
  cost: { kind: "number", format: "float" },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
};

export const BrandFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 75, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "Brand_Logo" },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  language: { kind: "integer", required: true },
  defaultTimezone: { kind: "integer", required: true },
  currency: { kind: "integer", required: true },
  voicemailNotificationTemplate: { kind: "integer" },
  onDemandRecordNotificationTemplate: { kind: "integer" },
  faxNotificationTemplate: { kind: "integer" },
  invoiceNotificationTemplate: { kind: "integer" },
  callCsvNotificationTemplate: { kind: "integer" },
  maxDailyUsageNotificationTemplate: { kind: "integer" },
  features: { kind: "array" },
  proxyTrunks: { kind: "array" },
  applicationServerSets: { kind: "array" },
  mediaRelaySets: { kind: "array" },
};

export const BrandCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 75, required: true },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  logo: { kind: "ref", ref: "Brand_Logo" },
  domainUsers: { kind: "string", maxLength: 190 },
  features: { kind: "array" },
  proxyTrunks: { kind: "array" },
  applicationServerSets: { kind: "array" },
  mediaRelaySets: { kind: "array" },
};

export const BrandDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 75, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "Brand_Logo" },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  language: { kind: "ref", ref: "Language", required: true },
  defaultTimezone: { kind: "ref", ref: "Timezone", required: true },
  currency: { kind: "ref", ref: "Currency", required: true },
  voicemailNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  onDemandRecordNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  faxNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  invoiceNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  maxDailyUsageNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  features: { kind: "array" },
  proxyTrunks: { kind: "array" },
  applicationServerSets: { kind: "array" },
  mediaRelaySets: { kind: "array" },
};

export const BrandServiceFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 3, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  service: { kind: "integer", required: true },
};

export const BrandServiceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  code: { kind: "string", maxLength: 3, required: true },
  service: { kind: "integer", required: true },
};

export const BrandServiceDetailedFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 3, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand", required: true },
  service: { kind: "ref", ref: "Service", required: true },
};

export const BrandInvoiceFields: FieldMetaMap = {
  nif: { kind: "string", maxLength: 25, default: "", required: true },
  postalAddress: { kind: "string", maxLength: 255, default: "", required: true },
  postalCode: { kind: "string", maxLength: 10, default: "", required: true },
  town: { kind: "string", maxLength: 255, default: "", required: true },
  province: { kind: "string", maxLength: 255, default: "", required: true },
  country: { kind: "string", maxLength: 255, default: "", required: true },
  registryData: { kind: "string", maxLength: 1024, default: "" },
};

export const BrandLogoFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const CarrierFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  balance: { kind: "number", format: "float", default: 0 },
  calculateCost: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  currency: { kind: "integer" },
  proxyTrunk: { kind: "integer" },
  mediaRelaySet: { kind: "integer" },
};

export const CarrierCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 200, required: true },
};

export const CompanyFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
  distributeMethod: { kind: "string", enum: ["static","rr","hash"], maxLength: 25, default: "hash", required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  maxDailyUsage: { kind: "integer", minimum: 0, default: 1000000, required: true },
  currentDayUsage: { kind: "number", format: "float", default: 0 },
  maxDailyUsageEmail: { kind: "string", maxLength: 100 },
  ipfilter: { kind: "boolean", default: 1 },
  onDemandRecord: { kind: "integer", default: 0 },
  allowRecordingRemoval: { kind: "boolean", default: 1, required: true },
  onDemandRecordCode: { kind: "string", maxLength: 3 },
  onDemandRecordEmail: { kind: "string", enum: ["disabled","user","other"], maxLength: 25, default: "disabled", required: true },
  onDemandRecordEmailAddress: { kind: "string", maxLength: 100 },
  externallyextraopts: { kind: "string", maxLength: 65535 },
  recordingsLimitMB: { kind: "integer" },
  recordingsLimitEmail: { kind: "string", maxLength: 250 },
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  showInvoices: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Invoicing" },
  language: { kind: "integer" },
  defaultTimezone: { kind: "integer" },
  brand: { kind: "integer", required: true },
  country: { kind: "integer", required: true },
  currency: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  voicemailNotificationTemplate: { kind: "integer" },
  onDemandRecordNotificationTemplate: { kind: "integer" },
  faxNotificationTemplate: { kind: "integer" },
  invoiceNotificationTemplate: { kind: "integer" },
  callCsvNotificationTemplate: { kind: "integer" },
  maxDailyUsageNotificationTemplate: { kind: "integer" },
  accessCredentialNotificationTemplate: { kind: "integer" },
  applicationServerSet: { kind: "integer", required: true },
  mediaRelaySet: { kind: "integer", required: true },
};

export const CompanyCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 80, required: true },
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  invoicing: { kind: "ref", ref: "Invoicing" },
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  currentDayUsage: { kind: "number", format: "float", default: 0 },
  maxDailyUsage: { kind: "integer", minimum: 0, default: 1000000, required: true },
  domainName: { kind: "string", readOnly: true },
};

export const CountryFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 100, default: "", required: true },
  countryCode: { kind: "string", maxLength: 10 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Country_Name" },
  zone: { kind: "ref", ref: "Country_Zone" },
};

export const CountryCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  code: { kind: "string", maxLength: 100, default: "", required: true },
  countryCode: { kind: "string", maxLength: 10 },
  name: { kind: "ref", ref: "Country_Name" },
};

export const CountryDetailedFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 100, default: "", required: true },
  countryCode: { kind: "string", maxLength: 10 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Country_Name" },
  zone: { kind: "ref", ref: "Country_Zone" },
};

export const CountryNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100, required: true },
  es: { kind: "string", maxLength: 100, required: true },
  ca: { kind: "string", maxLength: 100, required: true },
  it: { kind: "string", maxLength: 100, required: true },
  eu: { kind: "string", maxLength: 100, required: true },
};

export const CountryZoneFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 55, default: "", required: true },
  es: { kind: "string", maxLength: 55, default: "", required: true },
  ca: { kind: "string", maxLength: 55, default: "", required: true },
  it: { kind: "string", maxLength: 55, default: "", required: true },
  eu: { kind: "string", maxLength: 55, default: "", required: true },
};

export const CurrencyFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 10, required: true },
  symbol: { kind: "string", maxLength: 5, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Currency_Name" },
};

export const CurrencyCollectionFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 10, required: true },
  symbol: { kind: "string", maxLength: 5, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Currency_Name" },
};

export const CurrencyDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 10, required: true },
  symbol: { kind: "string", maxLength: 5, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Currency_Name" },
};

export const CurrencyNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 25, default: "", required: true },
  es: { kind: "string", maxLength: 25, default: "", required: true },
  ca: { kind: "string", maxLength: 25, default: "", required: true },
  it: { kind: "string", maxLength: 25, default: "", required: true },
  eu: { kind: "string", maxLength: 25, default: "", required: true },
};

export const DashboardFields: FieldMetaMap = {
  admin: { kind: "ref", ref: "DashboardAdmin" },
  recentActivity: { kind: "array", itemsRef: "DashboardBrand" },
  brandNumber: { kind: "integer" },
  clientNumber: { kind: "integer" },
  userNumber: { kind: "integer" },
  productName: { kind: "string" },
};

export const DashboardAdminFields: FieldMetaMap = {
  username: { kind: "string" },
  name: { kind: "string" },
  lastname: { kind: "string" },
  email: { kind: "string" },
};

export const DashboardBrandFields: FieldMetaMap = {
  id: { kind: "integer" },
  name: { kind: "string" },
  nif: { kind: "string" },
  sipDomain: { kind: "string" },
  maxCalls: { kind: "integer" },
};

export const DdiFields: FieldMetaMap = {
  ddi: { kind: "string", maxLength: 25, required: true },
  ddie164: { kind: "string", maxLength: 25 },
  description: { kind: "string", maxLength: 100 },
  recordCalls: { kind: "string", enum: ["none","all","inbound","outbound"], maxLength: 25, default: "none", required: true },
  displayName: { kind: "string", maxLength: 50 },
  routeType: { kind: "string", enum: ["user","ivr","huntGroup","fax","conferenceRoom","friend","queue","conditional","residential","retail","locution"], maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  type: { kind: "string", enum: ["inout","out"], maxLength: 25, default: "inout", required: true },
  useDdiProviderRoutingTag: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  brand: { kind: "integer", required: true },
  language: { kind: "integer" },
  ddiProvider: { kind: "integer" },
  country: { kind: "integer" },
};

export const DdiProviderFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  proxyTrunk: { kind: "integer" },
  mediaRelaySet: { kind: "integer" },
};

export const DdiProviderCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 200, required: true },
};

export const DomainCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  domain: { kind: "string", maxLength: 190, required: true },
  pointsTo: { kind: "string", enum: ["proxyusers","proxytrunks"], maxLength: 25, default: "proxyusers", required: true },
  brandName: { kind: "unknown" },
  companyName: { kind: "unknown" },
};

export const DomainDetailedFields: FieldMetaMap = {
  domain: { kind: "string", maxLength: 190, required: true },
  pointsTo: { kind: "string", enum: ["proxyusers","proxytrunks"], maxLength: 25, default: "proxyusers", required: true },
  description: { kind: "string", maxLength: 500 },
  id: { kind: "integer", readOnly: true },
};

export const FeatureFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Feature_Name" },
};

export const FeatureCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "ref", ref: "Feature_Name" },
};

export const FeatureDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Feature_Name" },
};

export const FeatureNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 50, default: "", required: true },
  es: { kind: "string", maxLength: 50, default: "", required: true },
  ca: { kind: "string", maxLength: 50, default: "", required: true },
  it: { kind: "string", maxLength: 50, default: "", required: true },
  eu: { kind: "string", maxLength: 50, default: "", required: true },
};

export const FeaturesRelBrandFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  feature: { kind: "integer", required: true },
};

export const FeaturesRelBrandCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  feature: { kind: "integer", required: true },
};

export const FeaturesRelBrandDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand", required: true },
  feature: { kind: "ref", ref: "Feature", required: true },
};

export const InvoiceFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 30 },
};

export const InvoiceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 30 },
};

export const InvoiceTemplateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
  template: { kind: "string", maxLength: 65535, required: true },
  templateHeader: { kind: "string", maxLength: 65535 },
  templateFooter: { kind: "string", maxLength: 65535 },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer" },
};

export const InvoiceTemplateCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
};

export const InvoiceTemplateDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
  template: { kind: "string", maxLength: 65535, required: true },
  templateHeader: { kind: "string", maxLength: 65535 },
  templateFooter: { kind: "string", maxLength: 65535 },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand" },
};

export const InvoicingFields: FieldMetaMap = {
  nif: { kind: "string", maxLength: 25, default: "", required: true },
  postalAddress: { kind: "string", maxLength: 255, default: "", required: true },
  postalCode: { kind: "string", maxLength: 10, default: "", required: true },
  town: { kind: "string", maxLength: 255, default: "", required: true },
  province: { kind: "string", maxLength: 255, default: "", required: true },
  countryName: { kind: "string", maxLength: 255, default: "", required: true },
};

export const LanguageFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Language_Name" },
};

export const LanguageCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "ref", ref: "Language_Name" },
};

export const LanguageDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Language_Name" },
};

export const LanguageNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100, default: "", required: true },
  es: { kind: "string", maxLength: 100, default: "", required: true },
  ca: { kind: "string", maxLength: 100, default: "", required: true },
  it: { kind: "string", maxLength: 100, default: "", required: true },
  eu: { kind: "string", maxLength: 100, default: "", required: true },
};

export const MediaRelaySetFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 32, default: "", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
};

export const MediaRelaySetCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 32, default: "", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
};

export const MediaRelaySetDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 32, default: "", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
};

export const NotificationTemplateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  type: { kind: "string", enum: ["voicemail","fax","limit","lowbalance","invoice","callCsv","maxDailyUsage","accessCredentials","onDemandRecord"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer" },
};

export const NotificationTemplateCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 55, required: true },
  type: { kind: "string", enum: ["voicemail","fax","limit","lowbalance","invoice","callCsv","maxDailyUsage","accessCredentials","onDemandRecord"], maxLength: 25, required: true },
};

export const NotificationTemplateDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  type: { kind: "string", enum: ["voicemail","fax","limit","lowbalance","invoice","callCsv","maxDailyUsage","accessCredentials","onDemandRecord"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand" },
};

export const NotificationTemplateContentFields: FieldMetaMap = {
  fromName: { kind: "string", maxLength: 255 },
  fromAddress: { kind: "string", maxLength: 255 },
  subject: { kind: "string", maxLength: 255, required: true },
  body: { kind: "string", maxLength: 65535, required: true },
  bodyType: { kind: "string", enum: ["text/plain","text/html"], maxLength: 25, default: "text/plain", required: true },
  id: { kind: "integer", readOnly: true },
  notificationTemplate: { kind: "integer", required: true },
  language: { kind: "integer" },
};

export const NotificationTemplateContentCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  fromName: { kind: "string", maxLength: 255 },
  fromAddress: { kind: "string", maxLength: 255 },
  language: { kind: "integer" },
};

export const NotificationTemplateContentDetailedFields: FieldMetaMap = {
  fromName: { kind: "string", maxLength: 255 },
  fromAddress: { kind: "string", maxLength: 255 },
  subject: { kind: "string", maxLength: 255, required: true },
  body: { kind: "string", maxLength: 65535, required: true },
  bodyType: { kind: "string", enum: ["text/plain","text/html"], maxLength: 25, default: "text/plain", required: true },
  id: { kind: "integer", readOnly: true },
  notificationTemplate: { kind: "ref", ref: "NotificationTemplate", required: true },
  language: { kind: "ref", ref: "Language" },
};

export const ProfileFields: FieldMetaMap = {
  restricted: { kind: "boolean" },
  canImpersonate: { kind: "boolean" },
  acls: { kind: "array", itemsRef: "ProfileAcl" },
};

export const ProfileAclFields: FieldMetaMap = {
  iden: { kind: "string" },
  create: { kind: "boolean" },
  read: { kind: "boolean" },
  update: { kind: "boolean" },
  delete: { kind: "boolean" },
};

export const ProxyTrunkFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50, required: true },
  advertisedIp: { kind: "string", maxLength: 50 },
  id: { kind: "integer", readOnly: true },
};

export const ProxyTrunkCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50, required: true },
  advertisedIp: { kind: "string", maxLength: 50 },
};

export const ProxyTrunkDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50, required: true },
  advertisedIp: { kind: "string", maxLength: 50 },
  id: { kind: "integer", readOnly: true },
};

export const ProxyTrunksRelBrandFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  proxyTrunk: { kind: "integer", required: true },
};

export const ProxyTrunksRelBrandCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  proxyTrunk: { kind: "integer", required: true },
};

export const ProxyTrunksRelBrandDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  brand: { kind: "ref", ref: "Brand", required: true },
  proxyTrunk: { kind: "ref", ref: "ProxyTrunk", required: true },
};

export const ProxyUserFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50 },
  advertisedIp: { kind: "string", maxLength: 50 },
  id: { kind: "integer", readOnly: true },
};

export const ProxyUserCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50 },
  advertisedIp: { kind: "string", maxLength: 50 },
  id: { kind: "integer", readOnly: true },
};

export const ProxyUserDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100 },
  ip: { kind: "string", maxLength: 50 },
  advertisedIp: { kind: "string", maxLength: 50 },
  id: { kind: "integer", readOnly: true },
};

export const PublicEntityFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  fqdn: { kind: "string", maxLength: 200 },
  platform: { kind: "boolean", default: 0, required: true },
  brand: { kind: "boolean", default: 0, required: true },
  client: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "PublicEntity_Name" },
};

export const PublicEntityCollectionFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "PublicEntity_Name" },
};

export const PublicEntityDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  fqdn: { kind: "string", maxLength: 200 },
  platform: { kind: "boolean", default: 0, required: true },
  brand: { kind: "boolean", default: 0, required: true },
  client: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "PublicEntity_Name" },
};

export const PublicEntityNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100 },
  es: { kind: "string", maxLength: 100 },
  ca: { kind: "string", maxLength: 100 },
  it: { kind: "string", maxLength: 100 },
  eu: { kind: "string", maxLength: 100 },
};

export const RtpengineFields: FieldMetaMap = {
  setid: { kind: "integer", default: 0, required: true },
  url: { kind: "string", maxLength: 64, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  disabled: { kind: "boolean", default: 0, required: true },
  stamp: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  mediaRelaySet: { kind: "integer", required: true },
};

export const RtpengineCollectionFields: FieldMetaMap = {
  url: { kind: "string", maxLength: 64, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  disabled: { kind: "boolean", default: 0, required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
};

export const RtpengineDetailedFields: FieldMetaMap = {
  setid: { kind: "integer", default: 0, required: true },
  url: { kind: "string", maxLength: 64, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  disabled: { kind: "boolean", default: 0, required: true },
  stamp: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet", required: true },
};

export const ServiceFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 50, default: "", required: true },
  defaultCode: { kind: "string", maxLength: 3, required: true },
  extraArgs: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Service_Name" },
  description: { kind: "ref", ref: "Service_Description" },
};

export const ServiceCollectionFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 50, default: "", required: true },
  defaultCode: { kind: "string", maxLength: 3, required: true },
  extraArgs: { kind: "boolean", default: 0, required: true },
  name: { kind: "ref", ref: "Service_Name" },
  description: { kind: "ref", ref: "Service_Description" },
  id: { kind: "integer", readOnly: true },
};

export const ServiceDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 50, default: "", required: true },
  defaultCode: { kind: "string", maxLength: 3, required: true },
  extraArgs: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Service_Name" },
  description: { kind: "ref", ref: "Service_Description" },
};

export const ServiceDescriptionFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 255, default: "", required: true },
  es: { kind: "string", maxLength: 255, default: "", required: true },
  ca: { kind: "string", maxLength: 255, default: "", required: true },
  it: { kind: "string", maxLength: 255, default: "", required: true },
  eu: { kind: "string", maxLength: 255, default: "", required: true },
};

export const ServiceNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 50, default: "", required: true },
  es: { kind: "string", maxLength: 50, default: "", required: true },
  ca: { kind: "string", maxLength: 50, default: "", required: true },
  it: { kind: "string", maxLength: 50, default: "", required: true },
  eu: { kind: "string", maxLength: 50, default: "", required: true },
};

export const SpecialNumberFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 25, required: true },
  disableCDR: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  country: { kind: "integer", required: true },
};

export const SpecialNumberCollectionFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 25, required: true },
  disableCDR: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  country: { kind: "integer", required: true },
};

export const SpecialNumberDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 25, required: true },
  disableCDR: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  country: { kind: "ref", ref: "Country", required: true },
};

export const TerminalManufacturerFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  id: { kind: "integer", readOnly: true },
};

export const TerminalManufacturerCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
};

export const TerminalManufacturerDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  id: { kind: "integer", readOnly: true },
};

export const TerminalModelFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  genericTemplate: { kind: "string", maxLength: 65535 },
  specificTemplate: { kind: "string", maxLength: 65535 },
  genericUrlPattern: { kind: "string", maxLength: 225 },
  specificUrlPattern: { kind: "string", maxLength: 225 },
  id: { kind: "integer", readOnly: true },
  terminalManufacturer: { kind: "integer", required: true },
};

export const TerminalModelCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  genericTemplate: { kind: "string", maxLength: 65535 },
  specificTemplate: { kind: "string", maxLength: 65535 },
  genericUrlPattern: { kind: "string", maxLength: 225 },
  specificUrlPattern: { kind: "string", maxLength: 225 },
};

export const TerminalModelDetailedFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  genericTemplate: { kind: "string", maxLength: 65535 },
  specificTemplate: { kind: "string", maxLength: 65535 },
  genericUrlPattern: { kind: "string", maxLength: 225 },
  specificUrlPattern: { kind: "string", maxLength: 225 },
  id: { kind: "integer", readOnly: true },
  terminalManufacturer: { kind: "ref", ref: "TerminalManufacturer", required: true },
};

export const TimezoneFields: FieldMetaMap = {
  tz: { kind: "string", maxLength: 255, required: true },
  comment: { kind: "string", maxLength: 150, default: "" },
  id: { kind: "integer", readOnly: true },
  label: { kind: "ref", ref: "Timezone_Label" },
  country: { kind: "integer" },
};

export const TimezoneCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  tz: { kind: "string", maxLength: 255, required: true },
};

export const TimezoneDetailedFields: FieldMetaMap = {
  tz: { kind: "string", maxLength: 255, required: true },
  comment: { kind: "string", maxLength: 150, default: "" },
  id: { kind: "integer", readOnly: true },
  label: { kind: "ref", ref: "Timezone_Label" },
  country: { kind: "ref", ref: "Country" },
};

export const TimezoneLabelFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 20, default: "", required: true },
  es: { kind: "string", maxLength: 20, default: "", required: true },
  ca: { kind: "string", maxLength: 20, default: "", required: true },
  it: { kind: "string", maxLength: 20, default: "", required: true },
  eu: { kind: "string", maxLength: 20, default: "", required: true },
};

export const WebPortalFields: FieldMetaMap = {
  url: { kind: "string", maxLength: 255, required: true },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  color: { kind: "string", maxLength: 10, default: "#000000", required: true },
  productName: { kind: "string", maxLength: 64, default: "Ivoz Provider", required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
  brand: { kind: "integer" },
  company: { kind: "integer" },
};

export const WebPortalCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  url: { kind: "string", maxLength: 255, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
  brand: { kind: "integer" },
};

export const WebPortalDetailedFields: FieldMetaMap = {
  url: { kind: "string", maxLength: 255, required: true },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  color: { kind: "string", maxLength: 10, default: "#000000", required: true },
  productName: { kind: "string", maxLength: 64, default: "Ivoz Provider", required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
  brand: { kind: "ref", ref: "Brand" },
  company: { kind: "ref", ref: "Company" },
};

export const WebPortalLogoFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const WebThemeFields: FieldMetaMap = {
  name: { kind: "string" },
  logo: { kind: "string" },
  color: { kind: "string" },
  title: { kind: "string" },
  productName: { kind: "string" },
};

/** Field metadata for every definition, keyed by wire name. */
export const fieldsByDefinition: Record<string, FieldMetaMap> = {
  ActiveCalls: ActiveCallsFields,
  Administrator: AdministratorFields,
  "Administrator-collection": AdministratorCollectionFields,
  "Administrator-detailed": AdministratorDetailedFields,
  AdministratorRelPublicEntity: AdministratorRelPublicEntityFields,
  "AdministratorRelPublicEntity-collection": AdministratorRelPublicEntityCollectionFields,
  "AdministratorRelPublicEntity-detailed": AdministratorRelPublicEntityDetailedFields,
  ApplicationServer: ApplicationServerFields,
  "ApplicationServer-collection": ApplicationServerCollectionFields,
  "ApplicationServer-detailed": ApplicationServerDetailedFields,
  ApplicationServerSet: ApplicationServerSetFields,
  "ApplicationServerSet-collection": ApplicationServerSetCollectionFields,
  "ApplicationServerSet-detailed": ApplicationServerSetDetailedFields,
  "BannedAddress-collection": BannedAddressCollectionFields,
  "BannedAddress-detailed": BannedAddressDetailedFields,
  BillableCall: BillableCallFields,
  "BillableCall-collection": BillableCallCollectionFields,
  "BillableCall-detailed": BillableCallDetailedFields,
  "BillableCall-rating": BillableCallRatingFields,
  Brand: BrandFields,
  "Brand-collection": BrandCollectionFields,
  "Brand-detailed": BrandDetailedFields,
  BrandService: BrandServiceFields,
  "BrandService-collection": BrandServiceCollectionFields,
  "BrandService-detailed": BrandServiceDetailedFields,
  Brand_Invoice: BrandInvoiceFields,
  Brand_Logo: BrandLogoFields,
  Carrier: CarrierFields,
  "Carrier-collection": CarrierCollectionFields,
  Company: CompanyFields,
  "Company-collection": CompanyCollectionFields,
  Country: CountryFields,
  "Country-collection": CountryCollectionFields,
  "Country-detailed": CountryDetailedFields,
  Country_Name: CountryNameFields,
  Country_Zone: CountryZoneFields,
  Currency: CurrencyFields,
  "Currency-collection": CurrencyCollectionFields,
  "Currency-detailed": CurrencyDetailedFields,
  Currency_Name: CurrencyNameFields,
  Dashboard: DashboardFields,
  DashboardAdmin: DashboardAdminFields,
  DashboardBrand: DashboardBrandFields,
  Ddi: DdiFields,
  DdiProvider: DdiProviderFields,
  "DdiProvider-collection": DdiProviderCollectionFields,
  "Domain-collection": DomainCollectionFields,
  "Domain-detailed": DomainDetailedFields,
  Feature: FeatureFields,
  "Feature-collection": FeatureCollectionFields,
  "Feature-detailed": FeatureDetailedFields,
  Feature_Name: FeatureNameFields,
  FeaturesRelBrand: FeaturesRelBrandFields,
  "FeaturesRelBrand-collection": FeaturesRelBrandCollectionFields,
  "FeaturesRelBrand-detailed": FeaturesRelBrandDetailedFields,
  Invoice: InvoiceFields,
  "Invoice-collection": InvoiceCollectionFields,
  InvoiceTemplate: InvoiceTemplateFields,
  "InvoiceTemplate-collection": InvoiceTemplateCollectionFields,
  "InvoiceTemplate-detailed": InvoiceTemplateDetailedFields,
  Invoicing: InvoicingFields,
  Language: LanguageFields,
  "Language-collection": LanguageCollectionFields,
  "Language-detailed": LanguageDetailedFields,
  Language_Name: LanguageNameFields,
  MediaRelaySet: MediaRelaySetFields,
  "MediaRelaySet-collection": MediaRelaySetCollectionFields,
  "MediaRelaySet-detailed": MediaRelaySetDetailedFields,
  NotificationTemplate: NotificationTemplateFields,
  "NotificationTemplate-collection": NotificationTemplateCollectionFields,
  "NotificationTemplate-detailed": NotificationTemplateDetailedFields,
  NotificationTemplateContent: NotificationTemplateContentFields,
  "NotificationTemplateContent-collection": NotificationTemplateContentCollectionFields,
  "NotificationTemplateContent-detailed": NotificationTemplateContentDetailedFields,
  Profile: ProfileFields,
  ProfileAcl: ProfileAclFields,
  ProxyTrunk: ProxyTrunkFields,
  "ProxyTrunk-collection": ProxyTrunkCollectionFields,
  "ProxyTrunk-detailed": ProxyTrunkDetailedFields,
  ProxyTrunksRelBrand: ProxyTrunksRelBrandFields,
  "ProxyTrunksRelBrand-collection": ProxyTrunksRelBrandCollectionFields,
  "ProxyTrunksRelBrand-detailed": ProxyTrunksRelBrandDetailedFields,
  ProxyUser: ProxyUserFields,
  "ProxyUser-collection": ProxyUserCollectionFields,
  "ProxyUser-detailed": ProxyUserDetailedFields,
  PublicEntity: PublicEntityFields,
  "PublicEntity-collection": PublicEntityCollectionFields,
  "PublicEntity-detailed": PublicEntityDetailedFields,
  PublicEntity_Name: PublicEntityNameFields,
  Rtpengine: RtpengineFields,
  "Rtpengine-collection": RtpengineCollectionFields,
  "Rtpengine-detailed": RtpengineDetailedFields,
  Service: ServiceFields,
  "Service-collection": ServiceCollectionFields,
  "Service-detailed": ServiceDetailedFields,
  Service_Description: ServiceDescriptionFields,
  Service_Name: ServiceNameFields,
  SpecialNumber: SpecialNumberFields,
  "SpecialNumber-collection": SpecialNumberCollectionFields,
  "SpecialNumber-detailed": SpecialNumberDetailedFields,
  TerminalManufacturer: TerminalManufacturerFields,
  "TerminalManufacturer-collection": TerminalManufacturerCollectionFields,
  "TerminalManufacturer-detailed": TerminalManufacturerDetailedFields,
  TerminalModel: TerminalModelFields,
  "TerminalModel-collection": TerminalModelCollectionFields,
  "TerminalModel-detailed": TerminalModelDetailedFields,
  Timezone: TimezoneFields,
  "Timezone-collection": TimezoneCollectionFields,
  "Timezone-detailed": TimezoneDetailedFields,
  Timezone_Label: TimezoneLabelFields,
  WebPortal: WebPortalFields,
  "WebPortal-collection": WebPortalCollectionFields,
  "WebPortal-detailed": WebPortalDetailedFields,
  WebPortal_Logo: WebPortalLogoFields,
  WebTheme: WebThemeFields,
};
