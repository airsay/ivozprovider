/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/brand/public/apiSpec.json
// Regenerate with: yarn codegen
// App: brand  Spec: swagger 2.0  basePath: /api/brand/

import type { FieldMetaMap } from '../../fieldMeta';

export const ACKFields: FieldMetaMap = {
  status: { kind: "string", default: "OK" },
};

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
  company: { kind: "integer", required: true },
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
  company: { kind: "integer", required: true },
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
  company: { kind: "ref", ref: "Company", required: true },
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

export const BalanceMovementCollectionFields: FieldMetaMap = {
  amount: { kind: "number", format: "float", default: 0 },
  balance: { kind: "number", format: "float", default: 0 },
  createdOn: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
};

export const BalanceMovementDetailedFields: FieldMetaMap = {
  amount: { kind: "number", format: "float", default: 0 },
  balance: { kind: "number", format: "float", default: 0 },
  createdOn: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
};

export const BalanceNotificationFields: FieldMetaMap = {
  toAddress: { kind: "string", maxLength: 255 },
  threshold: { kind: "number", format: "float", default: 0 },
  lastSent: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  notificationTemplate: { kind: "integer" },
};

export const BalanceNotificationCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  toAddress: { kind: "string", maxLength: 255 },
  threshold: { kind: "number", format: "float", default: 0 },
  notificationTemplate: { kind: "integer" },
  lastSent: { kind: "string", format: "date-time" },
};

export const BalanceNotificationDetailedFields: FieldMetaMap = {
  toAddress: { kind: "string", maxLength: 255 },
  threshold: { kind: "number", format: "float", default: 0 },
  lastSent: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
  notificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
};

export const BannedAddressCollectionFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  lastTimeBanned: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
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
  company: { kind: "ref", ref: "Company" },
};

export const BillableCallFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  cost: { kind: "number", format: "float" },
  price: { kind: "number", format: "float" },
  carrierName: { kind: "string", maxLength: 200 },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  destination: { kind: "integer" },
  ratingPlanGroup: { kind: "integer" },
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
  carrierName: { kind: "string", maxLength: 200 },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
  destination: { kind: "ref", ref: "Destination" },
  ratingPlanGroup: { kind: "ref", ref: "RatingPlanGroup" },
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
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "Brand_Logo" },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  language: { kind: "integer", required: true },
  defaultTimezone: { kind: "integer", required: true },
  currency: { kind: "integer", required: true },
  voicemailNotificationTemplate: { kind: "integer" },
  faxNotificationTemplate: { kind: "integer" },
  invoiceNotificationTemplate: { kind: "integer" },
  callCsvNotificationTemplate: { kind: "integer" },
  maxDailyUsageNotificationTemplate: { kind: "integer" },
};

export const BrandCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 75, required: true },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  logo: { kind: "ref", ref: "Brand_Logo" },
};

export const BrandDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 75, required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "Brand_Logo" },
  invoice: { kind: "ref", ref: "Brand_Invoice" },
  language: { kind: "ref", ref: "Language", required: true },
  defaultTimezone: { kind: "ref", ref: "Timezone", required: true },
  currency: { kind: "ref", ref: "Currency", required: true },
  voicemailNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  faxNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  invoiceNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  maxDailyUsageNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
};

export const BrandServiceFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 3, required: true },
  id: { kind: "integer", readOnly: true },
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

export const CallCsvReportCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  inDate: { kind: "string", format: "date-time", required: true },
  outDate: { kind: "string", format: "date-time", required: true },
  csv: { kind: "ref", ref: "CallCsvReport_Csv" },
  createdOn: { kind: "string", format: "date-time", required: true },
  sentTo: { kind: "string", maxLength: 250, default: "", required: true },
  callCsvScheduler: { kind: "integer" },
};

export const CallCsvReportDetailedFields: FieldMetaMap = {
  sentTo: { kind: "string", maxLength: 250, default: "", required: true },
  inDate: { kind: "string", format: "date-time", required: true },
  outDate: { kind: "string", format: "date-time", required: true },
  createdOn: { kind: "string", format: "date-time", required: true },
  id: { kind: "integer", readOnly: true },
  csv: { kind: "ref", ref: "CallCsvReport_Csv" },
  brand: { kind: "ref", ref: "Brand", required: true },
  callCsvScheduler: { kind: "ref", ref: "CallCsvScheduler" },
};

export const CallCsvReportCsvFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const CallCsvSchedulerFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  unit: { kind: "string", enum: ["day","week","month"], maxLength: 30, default: "month", required: true },
  frequency: { kind: "integer", minimum: 0, required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound"], default: "outbound" },
  email: { kind: "string", maxLength: 140, default: "", required: true },
  lastExecution: { kind: "string", format: "date-time", readOnly: true },
  lastExecutionError: { kind: "string", maxLength: 300, readOnly: true },
  nextExecution: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  callCsvNotificationTemplate: { kind: "integer" },
  ddi: { kind: "integer" },
  carrier: { kind: "integer" },
  retailAccount: { kind: "integer" },
  residentialDevice: { kind: "integer" },
  user: { kind: "integer" },
  fax: { kind: "integer" },
  friend: { kind: "integer" },
  ddiProvider: { kind: "integer" },
};

export const CallCsvSchedulerCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 40, required: true },
  company: { kind: "integer" },
  frequency: { kind: "integer", minimum: 0, required: true },
  unit: { kind: "string", enum: ["day","week","month"], maxLength: 30, default: "month", required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound"], default: "outbound" },
  email: { kind: "string", maxLength: 140, default: "", required: true },
  lastExecution: { kind: "string", format: "date-time", readOnly: true },
  lastExecutionError: { kind: "string", maxLength: 300, readOnly: true },
  nextExecution: { kind: "string", format: "date-time" },
};

export const CallCsvSchedulerDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  unit: { kind: "string", enum: ["day","week","month"], maxLength: 30, default: "month", required: true },
  frequency: { kind: "integer", minimum: 0, required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound"], default: "outbound" },
  email: { kind: "string", maxLength: 140, default: "", required: true },
  lastExecution: { kind: "string", format: "date-time", readOnly: true },
  lastExecutionError: { kind: "string", maxLength: 300, readOnly: true },
  nextExecution: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  ddi: { kind: "ref", ref: "Ddi" },
  carrier: { kind: "ref", ref: "Carrier" },
  retailAccount: { kind: "ref", ref: "RetailAccount" },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice" },
  user: { kind: "ref", ref: "User" },
  fax: { kind: "ref", ref: "Fax" },
  friend: { kind: "ref", ref: "Friend" },
  ddiProvider: { kind: "ref", ref: "DdiProvider" },
};

export const CarrierFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  balance: { kind: "number", format: "float", default: 0 },
  calculateCost: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer", required: true },
  currency: { kind: "integer" },
  proxyTrunk: { kind: "integer" },
  mediaRelaySet: { kind: "integer" },
};

export const CarrierCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  calculateCost: { kind: "boolean", default: 0 },
  transformationRuleSet: { kind: "integer", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  proxyTrunk: { kind: "integer" },
  status: { kind: "ref", ref: "CarrierStatus" },
  hasServers: { kind: "boolean" },
};

export const CarrierDetailedFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  balance: { kind: "number", format: "float", default: 0 },
  calculateCost: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
  currency: { kind: "ref", ref: "Currency" },
  proxyTrunk: { kind: "ref", ref: "ProxyTrunk" },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet" },
};

export const CarrierServerFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  hostname: { kind: "string", maxLength: 64 },
  port: { kind: "integer", minimum: 0 },
  uriScheme: { kind: "integer", minimum: 0 },
  transport: { kind: "integer", minimum: 0 },
  sendPAI: { kind: "boolean", default: 0 },
  sendRPID: { kind: "boolean", default: 0 },
  authNeeded: { kind: "string", default: "no", required: true },
  authUser: { kind: "string", maxLength: 64 },
  authPassword: { kind: "string", maxLength: 64 },
  sipProxy: { kind: "string", maxLength: 128 },
  outboundProxy: { kind: "string", maxLength: 128 },
  fromUser: { kind: "string", maxLength: 64 },
  fromDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  carrier: { kind: "integer", required: true },
};

export const CarrierServerCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ip: { kind: "string", maxLength: 50 },
  hostname: { kind: "string", maxLength: 64 },
  sipProxy: { kind: "string", maxLength: 128 },
  authNeeded: { kind: "string", default: "no", required: true },
  outboundProxy: { kind: "string", maxLength: 128 },
  status: { kind: "ref", ref: "CarrierServerStatus" },
};

export const CarrierServerDetailedFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  hostname: { kind: "string", maxLength: 64 },
  port: { kind: "integer", minimum: 0 },
  uriScheme: { kind: "integer", minimum: 0 },
  transport: { kind: "integer", minimum: 0 },
  sendPAI: { kind: "boolean", default: 0 },
  sendRPID: { kind: "boolean", default: 0 },
  authNeeded: { kind: "string", default: "no", required: true },
  authUser: { kind: "string", maxLength: 64 },
  authPassword: { kind: "string", maxLength: 64 },
  sipProxy: { kind: "string", maxLength: 128 },
  outboundProxy: { kind: "string", maxLength: 128 },
  fromUser: { kind: "string", maxLength: 64 },
  fromDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  carrier: { kind: "ref", ref: "Carrier", required: true },
};

export const CarrierServer_StatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ip: { kind: "string", maxLength: 50 },
  hostname: { kind: "string", maxLength: 64 },
  sipProxy: { kind: "string", maxLength: 128 },
  authNeeded: { kind: "string", default: "no", required: true },
  status: { kind: "ref", ref: "CarrierServerStatus" },
};

export const CarrierServerStatusFields: FieldMetaMap = {
  registered: { kind: "boolean" },
};

export const CarrierStatusFields: FieldMetaMap = {
  registered: { kind: "boolean" },
};

export const CodecFields: FieldMetaMap = {
  type: { kind: "string", enum: ["audio","video"], maxLength: 10, default: "audio", required: true },
  iden: { kind: "string", maxLength: 25, required: true },
  name: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CodecCollectionFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CodecDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["audio","video"], maxLength: 10, default: "audio", required: true },
  iden: { kind: "string", maxLength: 25, required: true },
  name: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CompanyFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
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
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  showInvoices: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Company_Invoicing" },
  language: { kind: "integer" },
  defaultTimezone: { kind: "integer" },
  country: { kind: "integer", required: true },
  currency: { kind: "integer" },
  transformationRuleSet: { kind: "integer", required: true },
  outgoingDdi: { kind: "integer" },
  outgoingDdiRule: { kind: "integer" },
  voicemailNotificationTemplate: { kind: "integer" },
  onDemandRecordNotificationTemplate: { kind: "integer" },
  faxNotificationTemplate: { kind: "integer" },
  invoiceNotificationTemplate: { kind: "integer" },
  callCsvNotificationTemplate: { kind: "integer" },
  maxDailyUsageNotificationTemplate: { kind: "integer" },
  accessCredentialNotificationTemplate: { kind: "integer" },
  corporation: { kind: "integer" },
  applicationServerSet: { kind: "integer", required: true },
  mediaRelaySet: { kind: "integer", required: true },
  location: { kind: "integer" },
  featureIds: { kind: "array" },
  geoIpAllowedCountries: { kind: "array" },
  routingTagIds: { kind: "array" },
  codecIds: { kind: "array" },
  accountStatus: { kind: "string" },
};

export const CompanyBalancesFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
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
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  showInvoices: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Company_Invoicing" },
  language: { kind: "ref", ref: "Language" },
  defaultTimezone: { kind: "ref", ref: "Timezone" },
  country: { kind: "ref", ref: "Country", required: true },
  currency: { kind: "ref", ref: "Currency" },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule" },
  voicemailNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  onDemandRecordNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  faxNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  invoiceNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  maxDailyUsageNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  accessCredentialNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  corporation: { kind: "ref", ref: "Corporation" },
  applicationServerSet: { kind: "ref", ref: "ApplicationServerSet", required: true },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet", required: true },
  location: { kind: "ref", ref: "Location" },
  featureIds: { kind: "array" },
  geoIpAllowedCountries: { kind: "array" },
  routingTagIds: { kind: "array" },
  codecIds: { kind: "array" },
  accountStatus: { kind: "string" },
};

export const CompanyCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 80, required: true },
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  invoicing: { kind: "ref", ref: "Company_Invoicing" },
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  currentDayUsage: { kind: "number", format: "float", default: 0 },
  maxDailyUsage: { kind: "integer", minimum: 0, default: 1000000, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
  balance: { kind: "number", format: "float", default: 0 },
  outgoingDdi: { kind: "integer" },
  applicationServerSet: { kind: "integer", required: true },
  domainName: { kind: "string", readOnly: true },
  featureIds: { kind: "array" },
  geoIpAllowedCountries: { kind: "array" },
  routingTagIds: { kind: "array" },
  codecIds: { kind: "array" },
  corporation: { kind: "integer" },
  mediaRelaySet: { kind: "integer", required: true },
  accountStatus: { kind: "string" },
};

export const CompanyDailyUsageFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
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
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  showInvoices: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Company_Invoicing" },
  language: { kind: "ref", ref: "Language" },
  defaultTimezone: { kind: "ref", ref: "Timezone" },
  country: { kind: "ref", ref: "Country", required: true },
  currency: { kind: "ref", ref: "Currency" },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule" },
  voicemailNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  onDemandRecordNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  faxNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  invoiceNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  maxDailyUsageNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  accessCredentialNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  corporation: { kind: "ref", ref: "Corporation" },
  applicationServerSet: { kind: "ref", ref: "ApplicationServerSet", required: true },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet", required: true },
  location: { kind: "ref", ref: "Location" },
  featureIds: { kind: "array" },
  geoIpAllowedCountries: { kind: "array" },
  routingTagIds: { kind: "array" },
  codecIds: { kind: "array" },
  accountStatus: { kind: "string" },
};

export const CompanyDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, required: true },
  domainUsers: { kind: "string", maxLength: 190 },
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
  billingMethod: { kind: "string", enum: ["postpaid","prepaid","pseudoprepaid","none"], maxLength: 25, default: "postpaid", required: true },
  balance: { kind: "number", format: "float", default: 0 },
  showInvoices: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Company_Invoicing" },
  language: { kind: "ref", ref: "Language" },
  defaultTimezone: { kind: "ref", ref: "Timezone" },
  country: { kind: "ref", ref: "Country", required: true },
  currency: { kind: "ref", ref: "Currency" },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule" },
  voicemailNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  onDemandRecordNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  faxNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  invoiceNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  maxDailyUsageNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  accessCredentialNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  corporation: { kind: "ref", ref: "Corporation" },
  applicationServerSet: { kind: "ref", ref: "ApplicationServerSet", required: true },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet", required: true },
  location: { kind: "ref", ref: "Location" },
  domainName: { kind: "string", readOnly: true },
  featureIds: { kind: "array" },
  geoIpAllowedCountries: { kind: "array" },
  routingTagIds: { kind: "array" },
  codecIds: { kind: "array" },
  accountStatus: { kind: "string" },
};

export const CompanyRelCodecFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  codec: { kind: "integer", required: true },
};

export const CompanyRelCodecCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
};

export const CompanyRelCodecDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  codec: { kind: "ref", ref: "Codec", required: true },
};

export const CompanyInvoicingFields: FieldMetaMap = {
  nif: { kind: "string", maxLength: 25, default: "", required: true },
  postalAddress: { kind: "string", maxLength: 255, default: "", required: true },
  postalCode: { kind: "string", maxLength: 10, default: "", required: true },
  town: { kind: "string", maxLength: 255, default: "", required: true },
  province: { kind: "string", maxLength: 255, default: "", required: true },
  countryName: { kind: "string", maxLength: 255, default: "", required: true },
};

export const CorporationFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 255 },
  id: { kind: "integer", readOnly: true },
};

export const CorporationCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 255 },
};

export const CorporationDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 255 },
  id: { kind: "integer", readOnly: true },
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
  brand: { kind: "ref", ref: "DashboardBrand" },
  recentActivity: { kind: "array", itemsRef: "DashboardClient" },
  clientNum: { kind: "integer" },
  ddiNum: { kind: "integer" },
  carrierNum: { kind: "integer" },
  productName: { kind: "string" },
};

export const DashboardBrandFields: FieldMetaMap = {
  id: { kind: "integer" },
  name: { kind: "string" },
  nif: { kind: "string" },
  postalCode: { kind: "string" },
  sipDomain: { kind: "string" },
  maxCalls: { kind: "integer" },
};

export const DashboardClientFields: FieldMetaMap = {
  name: { kind: "string" },
  type: { kind: "string" },
  domainUsers: { kind: "string" },
  maxCalls: { kind: "integer" },
};

export const DdiFields: FieldMetaMap = {
  ddi: { kind: "string", maxLength: 25, required: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  type: { kind: "string", enum: ["inout","out"], maxLength: 25, default: "inout", required: true },
  useDdiProviderRoutingTag: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  ddiProvider: { kind: "integer" },
  country: { kind: "integer" },
  routingTag: { kind: "integer" },
};

export const DdiCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  country: { kind: "integer" },
  ddi: { kind: "string", maxLength: 25, required: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  ddiProvider: { kind: "integer" },
  company: { kind: "integer" },
};

export const DdiDetailedFields: FieldMetaMap = {
  ddi: { kind: "string", maxLength: 25, required: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  type: { kind: "string", enum: ["inout","out"], maxLength: 25, default: "inout", required: true },
  useDdiProviderRoutingTag: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  ddiProvider: { kind: "ref", ref: "DdiProvider" },
  country: { kind: "ref", ref: "Country" },
  routingTag: { kind: "ref", ref: "RoutingTag" },
};

export const DdiProviderFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer", required: true },
  proxyTrunk: { kind: "integer" },
  mediaRelaySet: { kind: "integer" },
  routingTag: { kind: "integer" },
};

export const DdiProviderCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 200, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transformationRuleSet: { kind: "integer", required: true },
  proxyTrunk: { kind: "integer" },
};

export const DdiProviderDetailedFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 500, default: "", required: true },
  name: { kind: "string", maxLength: 200, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
  proxyTrunk: { kind: "ref", ref: "ProxyTrunk" },
  mediaRelaySet: { kind: "ref", ref: "MediaRelaySet" },
  routingTag: { kind: "ref", ref: "RoutingTag" },
};

export const DdiProviderAddressFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  ddiProvider: { kind: "integer", required: true },
};

export const DdiProviderAddressCollectionFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
};

export const DdiProviderAddressDetailedFields: FieldMetaMap = {
  ip: { kind: "string", maxLength: 50 },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  ddiProvider: { kind: "ref", ref: "DdiProvider", required: true },
};

export const DdiProviderRegistrationFields: FieldMetaMap = {
  username: { kind: "string", maxLength: 64, default: "", required: true },
  domain: { kind: "string", maxLength: 190, default: "", required: true },
  realm: { kind: "string", maxLength: 64, default: "", required: true },
  authUsername: { kind: "string", maxLength: 64, default: "", required: true },
  authPassword: { kind: "string", maxLength: 64, default: "", required: true },
  authProxy: { kind: "string", maxLength: 64, default: "", required: true },
  expires: { kind: "integer", default: 0, required: true },
  multiDdi: { kind: "boolean", default: 0 },
  contactUsername: { kind: "string", maxLength: 64, default: "", required: true },
  id: { kind: "integer", readOnly: true },
  ddiProvider: { kind: "integer", required: true },
};

export const DdiProviderRegistrationDetailedFields: FieldMetaMap = {
  username: { kind: "string", maxLength: 64, default: "", required: true },
  domain: { kind: "string", maxLength: 190, default: "", required: true },
  realm: { kind: "string", maxLength: 64, default: "", required: true },
  authUsername: { kind: "string", maxLength: 64, default: "", required: true },
  authPassword: { kind: "string", maxLength: 64, default: "", required: true },
  authProxy: { kind: "string", maxLength: 64, default: "", required: true },
  expires: { kind: "integer", default: 0, required: true },
  multiDdi: { kind: "boolean", default: 0 },
  contactUsername: { kind: "string", maxLength: 64, default: "", required: true },
  id: { kind: "integer", readOnly: true },
  ddiProvider: { kind: "ref", ref: "DdiProvider", required: true },
};

export const DdiProviderRegistrationDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  username: { kind: "string", maxLength: 64, default: "", required: true },
  domain: { kind: "string", maxLength: 190, default: "", required: true },
  status: { kind: "ref", ref: "DdiProviderRegistrationStatus" },
};

export const DdiProviderRegistration_StatusFields: FieldMetaMap = {
  username: { kind: "string", maxLength: 64, default: "", required: true },
  domain: { kind: "string", maxLength: 190, default: "", required: true },
  id: { kind: "integer", readOnly: true },
  status: { kind: "ref", ref: "DdiProviderRegistrationStatus" },
};

export const DdiProviderRegistrationStatusFields: FieldMetaMap = {
  registered: { kind: "boolean" },
  inProgress: { kind: "boolean" },
  expires: { kind: "integer" },
};

export const DestinationFields: FieldMetaMap = {
  prefix: { kind: "string", maxLength: 24, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Destination_Name" },
};

export const DestinationCollectionFields: FieldMetaMap = {
  prefix: { kind: "string", maxLength: 24, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Destination_Name" },
};

export const DestinationDetailedFields: FieldMetaMap = {
  prefix: { kind: "string", maxLength: 24, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "Destination_Name" },
};

export const DestinationRateFields: FieldMetaMap = {
  cost: { kind: "number", format: "float", required: true },
  connectFee: { kind: "number", format: "float", required: true },
  rateIncrement: { kind: "string", maxLength: 16, required: true },
  groupIntervalStart: { kind: "string", maxLength: 16, default: "0s", required: true },
  id: { kind: "integer", readOnly: true },
  destinationRateGroup: { kind: "integer", required: true },
  destination: { kind: "integer", required: true },
};

export const DestinationRateCollectionFields: FieldMetaMap = {
  cost: { kind: "number", format: "float", required: true },
  connectFee: { kind: "number", format: "float", required: true },
  rateIncrement: { kind: "string", maxLength: 16, required: true },
  groupIntervalStart: { kind: "string", maxLength: 16, default: "0s", required: true },
  id: { kind: "integer", readOnly: true },
  destinationRateGroup: { kind: "integer", required: true },
  destination: { kind: "integer", required: true },
  currencySymbol: { kind: "string", readOnly: true },
};

export const DestinationRateDetailedFields: FieldMetaMap = {
  cost: { kind: "number", format: "float", required: true },
  connectFee: { kind: "number", format: "float", required: true },
  rateIncrement: { kind: "string", maxLength: 16, required: true },
  groupIntervalStart: { kind: "string", maxLength: 16, default: "0s", required: true },
  id: { kind: "integer", readOnly: true },
  destinationRateGroup: { kind: "ref", ref: "DestinationRateGroup", required: true },
  destination: { kind: "ref", ref: "Destination", required: true },
  currencySymbol: { kind: "string", readOnly: true },
};

export const DestinationRateGroupFields: FieldMetaMap = {
  status: { kind: "string", enum: ["waiting","inProgress","imported","error"], maxLength: 20 },
  lastExecutionError: { kind: "string", maxLength: 300 },
  deductibleConnectionFee: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "DestinationRateGroup_Name" },
  description: { kind: "ref", ref: "DestinationRateGroup_Description" },
  file: { kind: "ref", ref: "DestinationRateGroup_File" },
  currency: { kind: "integer" },
  importerArguments: { kind: "ref", ref: "FileImporterArguments" },
};

export const DestinationRateGroupCollectionFields: FieldMetaMap = {
  status: { kind: "string", enum: ["waiting","inProgress","imported","error"], maxLength: 20 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "DestinationRateGroup_Name" },
  description: { kind: "ref", ref: "DestinationRateGroup_Description" },
  file: { kind: "ref", ref: "DestinationRateGroup_File" },
  currency: { kind: "integer" },
};

export const DestinationRateGroupDetailedFields: FieldMetaMap = {
  status: { kind: "string", enum: ["waiting","inProgress","imported","error"], maxLength: 20 },
  lastExecutionError: { kind: "string", maxLength: 300 },
  deductibleConnectionFee: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "DestinationRateGroup_Name" },
  description: { kind: "ref", ref: "DestinationRateGroup_Description" },
  file: { kind: "ref", ref: "DestinationRateGroup_File" },
  currency: { kind: "ref", ref: "Currency" },
};

export const DestinationRateGroupDescriptionFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 255, required: true },
  es: { kind: "string", maxLength: 255, required: true },
  ca: { kind: "string", maxLength: 255, required: true },
  it: { kind: "string", maxLength: 255, required: true },
  eu: { kind: "string", maxLength: 255, required: true },
};

export const DestinationRateGroupFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
  importerArguments: { kind: "array" },
};

export const DestinationRateGroupNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 55, required: true },
  es: { kind: "string", maxLength: 55, required: true },
  ca: { kind: "string", maxLength: 55, required: true },
  it: { kind: "string", maxLength: 55, required: true },
  eu: { kind: "string", maxLength: 55, required: true },
};

export const DestinationNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100 },
  es: { kind: "string", maxLength: 100 },
  ca: { kind: "string", maxLength: 100 },
  it: { kind: "string", maxLength: 100 },
  eu: { kind: "string", maxLength: 100 },
};

export const DomainCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  domain: { kind: "string", maxLength: 190, required: true },
};

export const ExtensionFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  user: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ExtensionCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  user: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ExtensionDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  user: { kind: "ref", ref: "User" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const FaxFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  outgoingDdi: { kind: "integer" },
};

export const FaxCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  outgoingDdi: { kind: "integer" },
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

export const FeaturesRelBrandCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  feature: { kind: "integer", required: true },
};

export const FeaturesRelBrandDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  feature: { kind: "ref", ref: "Feature", required: true },
};

export const FeaturesRelCompanyFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  feature: { kind: "integer", required: true },
};

export const FeaturesRelCompanyCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  feature: { kind: "integer", required: true },
};

export const FeaturesRelCompanyDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  feature: { kind: "ref", ref: "Feature", required: true },
};

export const FileImporterArgumentsFields: FieldMetaMap = {
  scape: { kind: "string" },
  delimiter: { kind: "string" },
  enclosure: { kind: "string" },
  ignoreFirst: { kind: "boolean" },
  columns: { kind: "array" },
};

export const FixedCostFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 1024 },
  cost: { kind: "number", format: "float" },
  id: { kind: "integer", readOnly: true },
};

export const FixedCostCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 1024 },
  cost: { kind: "number", format: "float" },
};

export const FixedCostDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 255, required: true },
  description: { kind: "string", maxLength: 1024 },
  cost: { kind: "number", format: "float" },
  id: { kind: "integer", readOnly: true },
};

export const FixedCostsRelInvoiceFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  fixedCost: { kind: "integer", required: true },
  invoice: { kind: "integer", required: true },
};

export const FixedCostsRelInvoiceDetailedFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  fixedCost: { kind: "ref", ref: "FixedCost", required: true },
  invoice: { kind: "ref", ref: "Invoice", required: true },
};

export const FixedCostsRelInvoiceDetailedCollectionFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  fixedCost: { kind: "ref", ref: "FixedCost", required: true },
  invoice: { kind: "ref", ref: "Invoice", required: true },
};

export const FixedCostsRelInvoiceSchedulerFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  type: { kind: "string", enum: ["static","maxcalls","ddis"], maxLength: 25, default: "static", required: true },
  ddisCountryMatch: { kind: "string", enum: ["all","national","international","specific"], maxLength: 25, default: "all" },
  ddisCountry: { kind: "integer" },
  fixedCost: { kind: "integer", required: true },
  invoiceScheduler: { kind: "integer", required: true },
};

export const FixedCostsRelInvoiceSchedulerDetailedFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  type: { kind: "string", enum: ["static","maxcalls","ddis"], maxLength: 25, default: "static", required: true },
  ddisCountryMatch: { kind: "string", enum: ["all","national","international","specific"], maxLength: 25, default: "all" },
  ddisCountry: { kind: "ref", ref: "Country" },
  fixedCost: { kind: "ref", ref: "FixedCost", required: true },
  invoiceScheduler: { kind: "ref", ref: "InvoiceScheduler", required: true },
};

export const FixedCostsRelInvoiceSchedulerDetailedCollectionFields: FieldMetaMap = {
  quantity: { kind: "integer", minimum: 0 },
  id: { kind: "integer", readOnly: true },
  type: { kind: "string", enum: ["static","maxcalls","ddis"], maxLength: 25, default: "static", required: true },
  ddisCountryMatch: { kind: "string", enum: ["all","national","international","specific"], maxLength: 25, default: "all" },
  ddisCountry: { kind: "ref", ref: "Country" },
  fixedCost: { kind: "ref", ref: "FixedCost", required: true },
  invoiceScheduler: { kind: "ref", ref: "InvoiceScheduler", required: true },
};

export const FriendFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  priority: { kind: "integer", default: 1, required: true },
  directConnectivity: { kind: "string", enum: ["yes","no","intervpbx"], maxLength: 20, default: "yes", required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  interCompany: { kind: "integer" },
  proxyUser: { kind: "integer" },
};

export const FriendCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  name: { kind: "string", maxLength: 65, required: true },
  domain: { kind: "integer" },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  priority: { kind: "integer", default: 1, required: true },
  directConnectivity: { kind: "string", enum: ["yes","no","intervpbx"], maxLength: 20, default: "yes", required: true },
  interCompany: { kind: "integer" },
  proxyUser: { kind: "integer" },
};

export const FriendDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  priority: { kind: "integer", default: 1, required: true },
  directConnectivity: { kind: "string", enum: ["yes","no","intervpbx"], maxLength: 20, default: "yes", required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  interCompany: { kind: "ref", ref: "Company" },
  proxyUser: { kind: "ref", ref: "ProxyUser" },
};

export const FriendStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  domainName: { kind: "string" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  company: { kind: "ref", ref: "Company", required: true },
};

export const InvoiceFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 30 },
  inDate: { kind: "string", format: "date-time" },
  outDate: { kind: "string", format: "date-time" },
  total: { kind: "number", format: "float" },
  taxRate: { kind: "number", format: "float" },
  totalWithTax: { kind: "number", format: "float" },
  status: { kind: "string", enum: ["waiting","processing","created","error"], maxLength: 25 },
  statusMsg: { kind: "string", maxLength: 140 },
  id: { kind: "integer", readOnly: true },
  pdf: { kind: "ref", ref: "Invoice_Pdf" },
  invoiceTemplate: { kind: "integer", required: true },
  company: { kind: "integer", required: true },
  numberSequence: { kind: "integer" },
  scheduler: { kind: "integer" },
  currency: { kind: "string" },
};

export const InvoiceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 30 },
  inDate: { kind: "string", format: "date-time" },
  outDate: { kind: "string", format: "date-time" },
  total: { kind: "number", format: "float" },
  taxRate: { kind: "number", format: "float" },
  totalWithTax: { kind: "number", format: "float" },
  status: { kind: "string", enum: ["waiting","processing","created","error"], maxLength: 25 },
  pdf: { kind: "ref", ref: "Invoice_Pdf" },
  invoiceTemplate: { kind: "integer", required: true },
  company: { kind: "integer", required: true },
  scheduler: { kind: "integer" },
  currency: { kind: "string" },
};

export const InvoiceDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 30 },
  inDate: { kind: "string", format: "date-time" },
  outDate: { kind: "string", format: "date-time" },
  total: { kind: "number", format: "float" },
  taxRate: { kind: "number", format: "float" },
  totalWithTax: { kind: "number", format: "float" },
  status: { kind: "string", enum: ["waiting","processing","created","error"], maxLength: 25 },
  statusMsg: { kind: "string", maxLength: 140 },
  id: { kind: "integer", readOnly: true },
  pdf: { kind: "ref", ref: "Invoice_Pdf" },
  invoiceTemplate: { kind: "ref", ref: "InvoiceTemplate", required: true },
  company: { kind: "ref", ref: "Company", required: true },
  numberSequence: { kind: "ref", ref: "InvoiceNumberSequence" },
  scheduler: { kind: "ref", ref: "InvoiceScheduler" },
  currency: { kind: "string" },
};

export const InvoiceNumberSequenceFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  prefix: { kind: "string", maxLength: 20, default: "", required: true },
  sequenceLength: { kind: "integer", minimum: 0, required: true },
  increment: { kind: "integer", minimum: 0, required: true },
  latestValue: { kind: "string", default: "" },
  iteration: { kind: "integer", minimum: 0, default: 0, required: true },
  version: { kind: "integer", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
};

export const InvoiceNumberSequenceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 40, required: true },
  latestValue: { kind: "string", default: "" },
};

export const InvoiceNumberSequenceDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  prefix: { kind: "string", maxLength: 20, default: "", required: true },
  sequenceLength: { kind: "integer", minimum: 0, required: true },
  increment: { kind: "integer", minimum: 0, required: true },
  latestValue: { kind: "string", default: "" },
  iteration: { kind: "integer", minimum: 0, default: 0, required: true },
  version: { kind: "integer", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
};

export const InvoiceSchedulerFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  unit: { kind: "string", enum: ["week","month","year"], maxLength: 30, default: "month", required: true },
  frequency: { kind: "integer", minimum: 0, required: true },
  email: { kind: "string", maxLength: 140, required: true },
  lastExecution: { kind: "string", format: "date-time" },
  lastExecutionError: { kind: "string", maxLength: 300 },
  nextExecution: { kind: "string", format: "date-time" },
  taxRate: { kind: "number", format: "float" },
  id: { kind: "integer", readOnly: true },
  invoiceTemplate: { kind: "integer" },
  brand: { kind: "integer", required: true },
  company: { kind: "integer", required: true },
  numberSequence: { kind: "integer" },
};

export const InvoiceSchedulerCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  unit: { kind: "string", enum: ["week","month","year"], maxLength: 30, default: "month", required: true },
  frequency: { kind: "integer", minimum: 0, required: true },
  lastExecution: { kind: "string", format: "date-time" },
  lastExecutionError: { kind: "string", maxLength: 300 },
  nextExecution: { kind: "string", format: "date-time" },
  id: { kind: "integer", readOnly: true },
  brand: { kind: "integer", required: true },
  company: { kind: "integer", required: true },
};

export const InvoiceSchedulerDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 40, required: true },
  unit: { kind: "string", enum: ["week","month","year"], maxLength: 30, default: "month", required: true },
  frequency: { kind: "integer", minimum: 0, required: true },
  email: { kind: "string", maxLength: 140, required: true },
  lastExecution: { kind: "string", format: "date-time" },
  lastExecutionError: { kind: "string", maxLength: 300 },
  nextExecution: { kind: "string", format: "date-time" },
  taxRate: { kind: "number", format: "float" },
  id: { kind: "integer", readOnly: true },
  invoiceTemplate: { kind: "ref", ref: "InvoiceTemplate" },
  brand: { kind: "ref", ref: "Brand", required: true },
  company: { kind: "ref", ref: "Company", required: true },
  numberSequence: { kind: "ref", ref: "InvoiceNumberSequence" },
};

export const InvoiceTemplateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
  template: { kind: "string", maxLength: 65535, required: true },
  templateHeader: { kind: "string", maxLength: 65535 },
  templateFooter: { kind: "string", maxLength: 65535 },
  id: { kind: "integer", readOnly: true },
  global: { kind: "boolean", readOnly: true },
};

export const InvoiceTemplateCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
  global: { kind: "boolean", readOnly: true },
};

export const InvoiceTemplateDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 300 },
  template: { kind: "string", maxLength: 65535, required: true },
  templateHeader: { kind: "string", maxLength: 65535 },
  templateFooter: { kind: "string", maxLength: 65535 },
  id: { kind: "integer", readOnly: true },
  global: { kind: "boolean", readOnly: true },
};

export const InvoicePdfFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
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

export const LocationFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 500 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const LocationCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 500 },
  survivalDevice: { kind: "integer" },
};

export const MatchListFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
};

export const MatchListCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
};

export const MatchListDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
};

export const MatchListPatternFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 55 },
  type: { kind: "string", enum: ["number","regexp"], maxLength: 10, required: true },
  regexp: { kind: "string", maxLength: 255 },
  numbervalue: { kind: "string", maxLength: 25 },
  matchPattern: { kind: "string", maxLength: 255, default: "" },
  id: { kind: "integer", readOnly: true },
  matchList: { kind: "integer", required: true },
  numberCountry: { kind: "integer" },
};

export const MatchListPatternCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  description: { kind: "string", maxLength: 55 },
  type: { kind: "string", enum: ["number","regexp"], maxLength: 10, required: true },
  regexp: { kind: "string", maxLength: 255 },
  numbervalue: { kind: "string", maxLength: 25 },
  numberCountry: { kind: "integer" },
  matchList: { kind: "integer", required: true },
  matchPattern: { kind: "string", maxLength: 255, default: "" },
};

export const MatchListPatternDetailedFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 55 },
  type: { kind: "string", enum: ["number","regexp"], maxLength: 10, required: true },
  regexp: { kind: "string", maxLength: 255 },
  numbervalue: { kind: "string", maxLength: 25 },
  matchPattern: { kind: "string", maxLength: 255, default: "" },
  id: { kind: "integer", readOnly: true },
  matchList: { kind: "ref", ref: "MatchList", required: true },
  numberCountry: { kind: "ref", ref: "Country" },
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

export const MusicOnHoldFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  id: { kind: "integer", readOnly: true },
  originalFile: { kind: "ref", ref: "MusicOnHold_OriginalFile" },
  encodedFile: { kind: "ref", ref: "MusicOnHold_EncodedFile" },
};

export const MusicOnHoldCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  originalFile: { kind: "ref", ref: "MusicOnHold_OriginalFile" },
};

export const MusicOnHoldDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  id: { kind: "integer", readOnly: true },
  originalFile: { kind: "ref", ref: "MusicOnHold_OriginalFile" },
  encodedFile: { kind: "ref", ref: "MusicOnHold_EncodedFile" },
};

export const MusicOnHoldEncodedFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const MusicOnHoldOriginalFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const NotificationTemplateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  type: { kind: "string", enum: ["voicemail","fax","limit","lowbalance","invoice","callCsv","maxDailyUsage","accessCredentials","onDemandRecord"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
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

export const OutgoingDdiRuleFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  defaultAction: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  forcedDdi: { kind: "integer" },
};

export const OutgoingDdiRuleCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  defaultAction: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  forcedDdi: { kind: "integer" },
};

export const OutgoingDdiRuleDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  defaultAction: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  forcedDdi: { kind: "ref", ref: "Ddi" },
};

export const OutgoingRoutingFields: FieldMetaMap = {
  type: { kind: "string", enum: ["pattern","group","fax"], maxLength: 25, default: "group" },
  priority: { kind: "integer", minimum: 0, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  routingMode: { kind: "string", enum: ["static","lcr","block"], maxLength: 25, default: "static" },
  prefix: { kind: "string", maxLength: 25 },
  stopper: { kind: "boolean", default: 0, required: true },
  forceClid: { kind: "boolean", default: 0 },
  clid: { kind: "string", maxLength: 25 },
  disableDiversion: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  routingPattern: { kind: "integer" },
  routingPatternGroup: { kind: "integer" },
  routingTag: { kind: "integer" },
  clidCountry: { kind: "integer" },
  carrierIds: { kind: "array" },
};

export const OutgoingRoutingCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  type: { kind: "string", enum: ["pattern","group","fax"], maxLength: 25, default: "group" },
  priority: { kind: "integer", minimum: 0, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  routingMode: { kind: "string", enum: ["static","lcr","block"], maxLength: 25, default: "static" },
  company: { kind: "integer" },
  routingTag: { kind: "integer" },
  carrier: { kind: "integer" },
  stopper: { kind: "boolean", default: 0, required: true },
  routingPattern: { kind: "integer" },
  routingPatternGroup: { kind: "integer" },
  carrierIds: { kind: "array" },
};

export const OutgoingRoutingDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["pattern","group","fax"], maxLength: 25, default: "group" },
  priority: { kind: "integer", minimum: 0, required: true },
  weight: { kind: "integer", minimum: 0, default: 1, required: true },
  routingMode: { kind: "string", enum: ["static","lcr","block"], maxLength: 25, default: "static" },
  prefix: { kind: "string", maxLength: 25 },
  stopper: { kind: "boolean", default: 0, required: true },
  forceClid: { kind: "boolean", default: 0 },
  clid: { kind: "string", maxLength: 25 },
  disableDiversion: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
  routingPattern: { kind: "ref", ref: "RoutingPattern" },
  routingPatternGroup: { kind: "ref", ref: "RoutingPatternGroup" },
  routingTag: { kind: "ref", ref: "RoutingTag" },
  clidCountry: { kind: "ref", ref: "Country" },
  carrierIds: { kind: "array" },
};

export const ProfileFields: FieldMetaMap = {
  restricted: { kind: "boolean" },
  canImpersonate: { kind: "boolean" },
  acls: { kind: "array", itemsRef: "ProfileAcl" },
  features: { kind: "array" },
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

export const RatingPlanFields: FieldMetaMap = {
  weight: { kind: "number", format: "float", default: 10, required: true },
  timingType: { kind: "string", enum: ["always","custom"], maxLength: 10, default: "always" },
  timeIn: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 1 },
  tuesday: { kind: "boolean", default: 1 },
  wednesday: { kind: "boolean", default: 1 },
  thursday: { kind: "boolean", default: 1 },
  friday: { kind: "boolean", default: 1 },
  saturday: { kind: "boolean", default: 1 },
  sunday: { kind: "boolean", default: 1 },
  id: { kind: "integer", readOnly: true },
  ratingPlanGroup: { kind: "integer", required: true },
  destinationRateGroup: { kind: "integer", required: true },
};

export const RatingPlanCollectionFields: FieldMetaMap = {
  weight: { kind: "number", format: "float", default: 10, required: true },
  timingType: { kind: "string", enum: ["always","custom"], maxLength: 10, default: "always" },
  timeIn: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 1 },
  tuesday: { kind: "boolean", default: 1 },
  wednesday: { kind: "boolean", default: 1 },
  thursday: { kind: "boolean", default: 1 },
  friday: { kind: "boolean", default: 1 },
  saturday: { kind: "boolean", default: 1 },
  sunday: { kind: "boolean", default: 1 },
  id: { kind: "integer", readOnly: true },
  ratingPlanGroup: { kind: "integer", required: true },
  destinationRateGroup: { kind: "integer", required: true },
};

export const RatingPlanDetailedFields: FieldMetaMap = {
  weight: { kind: "number", format: "float", default: 10, required: true },
  timingType: { kind: "string", enum: ["always","custom"], maxLength: 10, default: "always" },
  timeIn: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 1 },
  tuesday: { kind: "boolean", default: 1 },
  wednesday: { kind: "boolean", default: 1 },
  thursday: { kind: "boolean", default: 1 },
  friday: { kind: "boolean", default: 1 },
  saturday: { kind: "boolean", default: 1 },
  sunday: { kind: "boolean", default: 1 },
  id: { kind: "integer", readOnly: true },
  ratingPlanGroup: { kind: "ref", ref: "RatingPlanGroup", required: true },
  destinationRateGroup: { kind: "ref", ref: "DestinationRateGroup", required: true },
};

export const RatingPlanGroupFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
  description: { kind: "ref", ref: "RatingPlanGroup_Description" },
  currency: { kind: "integer" },
};

export const RatingPlanGroupCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
  currency: { kind: "integer" },
  description: { kind: "ref", ref: "RatingPlanGroup_Description" },
};

export const RatingPlanGroupDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
  description: { kind: "ref", ref: "RatingPlanGroup_Description" },
  currency: { kind: "ref", ref: "Currency" },
};

export const RatingPlanGroupDescriptionFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 255, required: true },
  es: { kind: "string", maxLength: 255, required: true },
  ca: { kind: "string", maxLength: 255, required: true },
  it: { kind: "string", maxLength: 255, required: true },
  eu: { kind: "string", maxLength: 255, required: true },
};

export const RatingPlanGroupNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 55, required: true },
  es: { kind: "string", maxLength: 55, required: true },
  ca: { kind: "string", maxLength: 55, required: true },
  it: { kind: "string", maxLength: 55, required: true },
  eu: { kind: "string", maxLength: 55, required: true },
};

export const RatingProfileFields: FieldMetaMap = {
  activationTime: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  ratingPlanGroup: { kind: "integer", required: true },
  routingTag: { kind: "integer" },
};

export const RatingProfileCollectionFields: FieldMetaMap = {
  activationTime: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  carrier: { kind: "integer" },
  ratingPlanGroup: { kind: "integer", required: true },
  routingTag: { kind: "integer" },
};

export const RatingProfileDetailedFields: FieldMetaMap = {
  activationTime: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  carrier: { kind: "ref", ref: "Carrier" },
  ratingPlanGroup: { kind: "ref", ref: "RatingPlanGroup", required: true },
  routingTag: { kind: "ref", ref: "RoutingTag" },
};

export const RegistrationStatusFields: FieldMetaMap = {
  contact: { kind: "string" },
  publicContact: { kind: "boolean" },
  received: { kind: "string" },
  publicReceived: { kind: "boolean" },
  expires: { kind: "string" },
  userAgent: { kind: "string" },
};

export const RegistrationSummaryFields: FieldMetaMap = {
  active: { kind: "integer" },
  total: { kind: "integer" },
  percent: { kind: "integer" },
};

export const ResidentialDeviceFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  allow: { kind: "string", maxLength: 200, default: "alaw", required: true },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  transformationRuleSet: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  language: { kind: "integer" },
  proxyUser: { kind: "integer" },
};

export const ResidentialDeviceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  domain: { kind: "integer" },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  company: { kind: "integer", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
};

export const ResidentialDeviceDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  allow: { kind: "string", maxLength: 200, default: "alaw", required: true },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  language: { kind: "ref", ref: "Language" },
  proxyUser: { kind: "ref", ref: "ProxyUser" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const ResidentialDeviceStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  domainName: { kind: "string" },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  company: { kind: "ref", ref: "Company", required: true },
};

export const RetailAccountFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  transformationRuleSet: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  proxyUser: { kind: "integer" },
};

export const RetailAccountCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  domain: { kind: "integer" },
  company: { kind: "integer", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
};

export const RetailAccountDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  proxyUser: { kind: "ref", ref: "ProxyUser" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const RetailAccountStatusItemFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  domainName: { kind: "string" },
  company: { kind: "ref", ref: "Company", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
};

export const RoutingPatternFields: FieldMetaMap = {
  prefix: { kind: "string", maxLength: 80, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RoutingPattern_Name" },
  description: { kind: "ref", ref: "RoutingPattern_Description" },
};

export const RoutingPatternCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  prefix: { kind: "string", maxLength: 80, required: true },
  name: { kind: "ref", ref: "RoutingPattern_Name" },
  description: { kind: "ref", ref: "RoutingPattern_Description" },
};

export const RoutingPatternDetailedFields: FieldMetaMap = {
  prefix: { kind: "string", maxLength: 80, required: true },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RoutingPattern_Name" },
  description: { kind: "ref", ref: "RoutingPattern_Description" },
};

export const RoutingPatternGroupFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 55 },
  id: { kind: "integer", readOnly: true },
};

export const RoutingPatternGroupCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 55 },
  id: { kind: "integer", readOnly: true },
  patternIds: { kind: "array" },
};

export const RoutingPatternGroupDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 55 },
  id: { kind: "integer", readOnly: true },
  patternIds: { kind: "array" },
};

export const RoutingPatternGroupWithPatternsFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  description: { kind: "string", maxLength: 55 },
  id: { kind: "integer", readOnly: true },
  patternIds: { kind: "array" },
};

export const RoutingPatternGroupsRelPatternFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  routingPattern: { kind: "integer", required: true },
  routingPatternGroup: { kind: "integer", required: true },
};

export const RoutingPatternGroupsRelPatternDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  routingPattern: { kind: "ref", ref: "RoutingPattern", required: true },
  routingPatternGroup: { kind: "ref", ref: "RoutingPatternGroup", required: true },
};

export const RoutingPatternGroupsRelPatternDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  routingPattern: { kind: "ref", ref: "RoutingPattern", required: true },
  routingPatternGroup: { kind: "ref", ref: "RoutingPatternGroup", required: true },
};

export const RoutingPatternDescriptionFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 55 },
  es: { kind: "string", maxLength: 55 },
  ca: { kind: "string", maxLength: 55 },
  it: { kind: "string", maxLength: 55 },
  eu: { kind: "string", maxLength: 55 },
};

export const RoutingPatternNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 55, required: true },
  es: { kind: "string", maxLength: 55, required: true },
  ca: { kind: "string", maxLength: 55, required: true },
  it: { kind: "string", maxLength: 55, required: true },
  eu: { kind: "string", maxLength: 55, required: true },
};

export const RoutingTagFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 80, required: true },
  tag: { kind: "string", maxLength: 15, required: true },
  id: { kind: "integer", readOnly: true },
};

export const RoutingTagCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 80, required: true },
  tag: { kind: "string", maxLength: 15, required: true },
};

export const RoutingTagDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 80, required: true },
  tag: { kind: "string", maxLength: 15, required: true },
  id: { kind: "integer", readOnly: true },
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
  global: { kind: "boolean", readOnly: true },
};

export const SpecialNumberCollectionFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 25, required: true },
  disableCDR: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  country: { kind: "integer", required: true },
  global: { kind: "boolean", readOnly: true },
};

export const SpecialNumberDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 25, required: true },
  disableCDR: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  country: { kind: "ref", ref: "Country", required: true },
  global: { kind: "boolean", readOnly: true },
};

export const TarificationInfoFields: FieldMetaMap = {
  plan: { kind: "string" },
  callDate: { kind: "string" },
  duration: { kind: "integer" },
  patternName: { kind: "string" },
  connectionCharge: { kind: "number" },
  intervalStart: { kind: "string" },
  rate: { kind: "number" },
  ratePeriod: { kind: "integer" },
  totalCost: { kind: "number" },
  currencySymbol: { kind: "string" },
};

export const TerminalFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  disallow: { kind: "string", maxLength: 200, default: "all", required: true },
  allowAudio: { kind: "string", maxLength: 200, default: "alaw", required: true },
  allowVideo: { kind: "string", maxLength: 200 },
  directMediaMethod: { kind: "string", enum: ["update","invite","reinvite"], maxLength: 25, default: "update", required: true },
  password: { kind: "string", maxLength: 25, default: "", required: true },
  mac: { kind: "string", maxLength: 12 },
  lastProvisionDate: { kind: "string", format: "date-time" },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const TerminalCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  mac: { kind: "string", maxLength: 12 },
  lastProvisionDate: { kind: "string", format: "date-time" },
  domain: { kind: "integer" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const TerminalStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  domainName: { kind: "string" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  company: { kind: "ref", ref: "Company", required: true },
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

export const TokenFields: FieldMetaMap = {
  token: { kind: "string" },
};

export const TransformationRuleFields: FieldMetaMap = {
  type: { kind: "string", enum: ["callerin","calleein","callerout","calleeout"], maxLength: 10, required: true },
  description: { kind: "string", maxLength: 64, default: "", required: true },
  priority: { kind: "integer", minimum: 0 },
  matchExpr: { kind: "string", maxLength: 128 },
  replaceExpr: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer", required: true },
};

export const TransformationRuleCollectionFields: FieldMetaMap = {
  type: { kind: "string", enum: ["callerin","calleein","callerout","calleeout"], maxLength: 10, required: true },
  description: { kind: "string", maxLength: 64, default: "", required: true },
  priority: { kind: "integer", minimum: 0 },
  matchExpr: { kind: "string", maxLength: 128 },
  replaceExpr: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
};

export const TransformationRuleDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["callerin","calleein","callerout","calleeout"], maxLength: 10, required: true },
  description: { kind: "string", maxLength: 64, default: "", required: true },
  priority: { kind: "integer", minimum: 0 },
  matchExpr: { kind: "string", maxLength: 128 },
  replaceExpr: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet", required: true },
};

export const TransformationRuleSetFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 250 },
  internationalCode: { kind: "string", maxLength: 10, default: "00" },
  trunkPrefix: { kind: "string", maxLength: 5, default: "" },
  areaCode: { kind: "string", maxLength: 5, default: "" },
  nationalLen: { kind: "integer", minimum: 0, default: 9 },
  generateRules: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "TransformationRuleSet_Name" },
  country: { kind: "integer" },
  editable: { kind: "boolean" },
};

export const TransformationRuleSetCollectionFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 250 },
  internationalCode: { kind: "string", maxLength: 10, default: "00" },
  trunkPrefix: { kind: "string", maxLength: 5, default: "" },
  areaCode: { kind: "string", maxLength: 5, default: "" },
  nationalLen: { kind: "integer", minimum: 0, default: 9 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "TransformationRuleSet_Name" },
  editable: { kind: "boolean" },
};

export const TransformationRuleSetDetailedFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 250 },
  internationalCode: { kind: "string", maxLength: 10, default: "00" },
  trunkPrefix: { kind: "string", maxLength: 5, default: "" },
  areaCode: { kind: "string", maxLength: 5, default: "" },
  nationalLen: { kind: "integer", minimum: 0, default: 9 },
  generateRules: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "TransformationRuleSet_Name" },
  country: { kind: "ref", ref: "Country" },
  editable: { kind: "boolean" },
};

export const TransformationRuleSetNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100, required: true },
  es: { kind: "string", maxLength: 100, required: true },
  ca: { kind: "string", maxLength: 100, required: true },
  it: { kind: "string", maxLength: 100, required: true },
  eu: { kind: "string", maxLength: 100, required: true },
};

export const TrustedFields: FieldMetaMap = {
  srcIp: { kind: "string", maxLength: 50 },
  proto: { kind: "string", maxLength: 4 },
  fromPattern: { kind: "string", maxLength: 64 },
  ruriPattern: { kind: "string", maxLength: 64 },
  tag: { kind: "string", maxLength: 64 },
  description: { kind: "string", maxLength: 200 },
  priority: { kind: "integer", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const TrustedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  srcIp: { kind: "string", maxLength: 50 },
  description: { kind: "string", maxLength: 200 },
};

export const TrustedDetailedFields: FieldMetaMap = {
  srcIp: { kind: "string", maxLength: 50 },
  proto: { kind: "string", maxLength: 4 },
  fromPattern: { kind: "string", maxLength: 64 },
  ruriPattern: { kind: "string", maxLength: 64 },
  tag: { kind: "string", maxLength: 64 },
  description: { kind: "string", maxLength: 200 },
  priority: { kind: "integer", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
};

export const UserFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100, required: true },
  email: { kind: "string", maxLength: 100 },
  pass: { kind: "string", maxLength: 80 },
  doNotDisturb: { kind: "boolean", default: 0, required: true },
  isBoss: { kind: "boolean", default: 0, required: true },
  active: { kind: "boolean", default: 0, required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  externalIpCalls: { kind: "string", enum: ["0","1","2","3"], maxLength: 1, default: "0", required: true },
  rejectCallMethod: { kind: "string", enum: ["rfc","486","600"], maxLength: 3, default: "rfc", required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  gsQRCode: { kind: "boolean", default: 0, required: true },
  useDefaultLocation: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  bossAssistant: { kind: "integer" },
  bossAssistantWhiteList: { kind: "integer" },
  transformationRuleSet: { kind: "integer" },
  language: { kind: "integer" },
  terminal: { kind: "integer" },
  extension: { kind: "integer" },
  timezone: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  outgoingDdiRule: { kind: "integer" },
  location: { kind: "integer" },
  oldPass: { kind: "string" },
};

export const UserCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100, required: true },
  terminal: { kind: "integer" },
  extension: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  email: { kind: "string", maxLength: 100 },
  active: { kind: "boolean", default: 0, required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  company: { kind: "integer", required: true },
  location: { kind: "integer" },
};

export const UsersAddressFields: FieldMetaMap = {
  sourceAddress: { kind: "string", maxLength: 100, required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const UsersAddressCollectionFields: FieldMetaMap = {
  sourceAddress: { kind: "string", maxLength: 100, required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const UsersAddressDetailedFields: FieldMetaMap = {
  sourceAddress: { kind: "string", maxLength: 100, required: true },
  description: { kind: "string", maxLength: 200 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
};

export const UsersMassImportFields: FieldMetaMap = {
  success: { kind: "boolean" },
  errorMsg: { kind: "string" },
  failed: { kind: "integer" },
};

export const WebPortalFields: FieldMetaMap = {
  url: { kind: "string", maxLength: 255, required: true },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  color: { kind: "string", maxLength: 10, default: "#000000", required: true },
  productName: { kind: "string", maxLength: 64, default: "Ivoz Provider", required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
  company: { kind: "integer" },
};

export const WebPortalCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  url: { kind: "string", maxLength: 255, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
  brand: { kind: "integer", required: true },
  company: { kind: "integer" },
};

export const WebPortalDetailedFields: FieldMetaMap = {
  url: { kind: "string", maxLength: 255, required: true },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  color: { kind: "string", maxLength: 10, default: "#000000", required: true },
  productName: { kind: "string", maxLength: 64, default: "Ivoz Provider", required: true },
  id: { kind: "integer", readOnly: true },
  logo: { kind: "ref", ref: "WebPortal_Logo" },
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

export const WebhookFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 64, required: true },
  description: { kind: "string", maxLength: 255 },
  uri: { kind: "string", required: true },
  eventStart: { kind: "boolean", default: 0, required: true },
  eventRing: { kind: "boolean", default: 0, required: true },
  eventAnswer: { kind: "boolean", default: 0, required: true },
  eventEnd: { kind: "boolean", default: 0, required: true },
  eventUpdateClid: { kind: "boolean", default: 0, required: true },
  template: { kind: "string", required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound","both"], maxLength: 25, default: "both", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer" },
  ddi: { kind: "integer" },
  user: { kind: "integer" },
};

export const WebhookCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 64, required: true },
  uri: { kind: "string", required: true },
  eventStart: { kind: "boolean", default: 0, required: true },
  eventRing: { kind: "boolean", default: 0, required: true },
  eventAnswer: { kind: "boolean", default: 0, required: true },
  eventEnd: { kind: "boolean", default: 0, required: true },
  eventUpdateClid: { kind: "boolean", default: 0, required: true },
  template: { kind: "string", required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound","both"], maxLength: 25, default: "both", required: true },
  description: { kind: "string", maxLength: 255 },
  id: { kind: "integer", readOnly: true },
};

export const WebhookDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 64, required: true },
  description: { kind: "string", maxLength: 255 },
  uri: { kind: "string", required: true },
  eventStart: { kind: "boolean", default: 0, required: true },
  eventRing: { kind: "boolean", default: 0, required: true },
  eventAnswer: { kind: "boolean", default: 0, required: true },
  eventEnd: { kind: "boolean", default: 0, required: true },
  eventUpdateClid: { kind: "boolean", default: 0, required: true },
  template: { kind: "string", required: true },
  callDirection: { kind: "string", enum: ["inbound","outbound","both"], maxLength: 25, default: "both", required: true },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company" },
  ddi: { kind: "ref", ref: "Ddi" },
  user: { kind: "ref", ref: "User" },
};

/** Field metadata for every definition, keyed by wire name. */
export const fieldsByDefinition: Record<string, FieldMetaMap> = {
  ACK: ACKFields,
  ActiveCalls: ActiveCallsFields,
  Administrator: AdministratorFields,
  "Administrator-collection": AdministratorCollectionFields,
  "Administrator-detailed": AdministratorDetailedFields,
  AdministratorRelPublicEntity: AdministratorRelPublicEntityFields,
  "AdministratorRelPublicEntity-collection": AdministratorRelPublicEntityCollectionFields,
  "AdministratorRelPublicEntity-detailed": AdministratorRelPublicEntityDetailedFields,
  ApplicationServerSet: ApplicationServerSetFields,
  "ApplicationServerSet-collection": ApplicationServerSetCollectionFields,
  "ApplicationServerSet-detailed": ApplicationServerSetDetailedFields,
  "BalanceMovement-collection": BalanceMovementCollectionFields,
  "BalanceMovement-detailed": BalanceMovementDetailedFields,
  BalanceNotification: BalanceNotificationFields,
  "BalanceNotification-collection": BalanceNotificationCollectionFields,
  "BalanceNotification-detailed": BalanceNotificationDetailedFields,
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
  "CallCsvReport-collection": CallCsvReportCollectionFields,
  "CallCsvReport-detailed": CallCsvReportDetailedFields,
  CallCsvReport_Csv: CallCsvReportCsvFields,
  CallCsvScheduler: CallCsvSchedulerFields,
  "CallCsvScheduler-collection": CallCsvSchedulerCollectionFields,
  "CallCsvScheduler-detailed": CallCsvSchedulerDetailedFields,
  Carrier: CarrierFields,
  "Carrier-collection": CarrierCollectionFields,
  "Carrier-detailed": CarrierDetailedFields,
  CarrierServer: CarrierServerFields,
  "CarrierServer-collection": CarrierServerCollectionFields,
  "CarrierServer-detailed": CarrierServerDetailedFields,
  "CarrierServer-status": CarrierServer_StatusFields,
  CarrierServerStatus: CarrierServerStatusFields,
  CarrierStatus: CarrierStatusFields,
  Codec: CodecFields,
  "Codec-collection": CodecCollectionFields,
  "Codec-detailed": CodecDetailedFields,
  Company: CompanyFields,
  "Company-balances": CompanyBalancesFields,
  "Company-collection": CompanyCollectionFields,
  "Company-dailyUsage": CompanyDailyUsageFields,
  "Company-detailed": CompanyDetailedFields,
  CompanyRelCodec: CompanyRelCodecFields,
  "CompanyRelCodec-collection": CompanyRelCodecCollectionFields,
  "CompanyRelCodec-detailed": CompanyRelCodecDetailedFields,
  Company_Invoicing: CompanyInvoicingFields,
  Corporation: CorporationFields,
  "Corporation-collection": CorporationCollectionFields,
  "Corporation-detailed": CorporationDetailedFields,
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
  DashboardBrand: DashboardBrandFields,
  DashboardClient: DashboardClientFields,
  Ddi: DdiFields,
  "Ddi-collection": DdiCollectionFields,
  "Ddi-detailed": DdiDetailedFields,
  DdiProvider: DdiProviderFields,
  "DdiProvider-collection": DdiProviderCollectionFields,
  "DdiProvider-detailed": DdiProviderDetailedFields,
  DdiProviderAddress: DdiProviderAddressFields,
  "DdiProviderAddress-collection": DdiProviderAddressCollectionFields,
  "DdiProviderAddress-detailed": DdiProviderAddressDetailedFields,
  DdiProviderRegistration: DdiProviderRegistrationFields,
  "DdiProviderRegistration-detailed": DdiProviderRegistrationDetailedFields,
  "DdiProviderRegistration-detailedCollection": DdiProviderRegistrationDetailedCollectionFields,
  "DdiProviderRegistration-status": DdiProviderRegistration_StatusFields,
  DdiProviderRegistrationStatus: DdiProviderRegistrationStatusFields,
  Destination: DestinationFields,
  "Destination-collection": DestinationCollectionFields,
  "Destination-detailed": DestinationDetailedFields,
  DestinationRate: DestinationRateFields,
  "DestinationRate-collection": DestinationRateCollectionFields,
  "DestinationRate-detailed": DestinationRateDetailedFields,
  DestinationRateGroup: DestinationRateGroupFields,
  "DestinationRateGroup-collection": DestinationRateGroupCollectionFields,
  "DestinationRateGroup-detailed": DestinationRateGroupDetailedFields,
  DestinationRateGroup_Description: DestinationRateGroupDescriptionFields,
  DestinationRateGroup_File: DestinationRateGroupFileFields,
  DestinationRateGroup_Name: DestinationRateGroupNameFields,
  Destination_Name: DestinationNameFields,
  "Domain-collection": DomainCollectionFields,
  Extension: ExtensionFields,
  "Extension-collection": ExtensionCollectionFields,
  "Extension-detailed": ExtensionDetailedFields,
  Fax: FaxFields,
  "Fax-collection": FaxCollectionFields,
  Feature: FeatureFields,
  "Feature-collection": FeatureCollectionFields,
  "Feature-detailed": FeatureDetailedFields,
  Feature_Name: FeatureNameFields,
  "FeaturesRelBrand-collection": FeaturesRelBrandCollectionFields,
  "FeaturesRelBrand-detailed": FeaturesRelBrandDetailedFields,
  FeaturesRelCompany: FeaturesRelCompanyFields,
  "FeaturesRelCompany-collection": FeaturesRelCompanyCollectionFields,
  "FeaturesRelCompany-detailed": FeaturesRelCompanyDetailedFields,
  FileImporterArguments: FileImporterArgumentsFields,
  FixedCost: FixedCostFields,
  "FixedCost-collection": FixedCostCollectionFields,
  "FixedCost-detailed": FixedCostDetailedFields,
  FixedCostsRelInvoice: FixedCostsRelInvoiceFields,
  "FixedCostsRelInvoice-detailed": FixedCostsRelInvoiceDetailedFields,
  "FixedCostsRelInvoice-detailedCollection": FixedCostsRelInvoiceDetailedCollectionFields,
  FixedCostsRelInvoiceScheduler: FixedCostsRelInvoiceSchedulerFields,
  "FixedCostsRelInvoiceScheduler-detailed": FixedCostsRelInvoiceSchedulerDetailedFields,
  "FixedCostsRelInvoiceScheduler-detailedCollection": FixedCostsRelInvoiceSchedulerDetailedCollectionFields,
  Friend: FriendFields,
  "Friend-collection": FriendCollectionFields,
  "Friend-detailed": FriendDetailedFields,
  "Friend-status": FriendStatusFields,
  Invoice: InvoiceFields,
  "Invoice-collection": InvoiceCollectionFields,
  "Invoice-detailed": InvoiceDetailedFields,
  InvoiceNumberSequence: InvoiceNumberSequenceFields,
  "InvoiceNumberSequence-collection": InvoiceNumberSequenceCollectionFields,
  "InvoiceNumberSequence-detailed": InvoiceNumberSequenceDetailedFields,
  InvoiceScheduler: InvoiceSchedulerFields,
  "InvoiceScheduler-collection": InvoiceSchedulerCollectionFields,
  "InvoiceScheduler-detailed": InvoiceSchedulerDetailedFields,
  InvoiceTemplate: InvoiceTemplateFields,
  "InvoiceTemplate-collection": InvoiceTemplateCollectionFields,
  "InvoiceTemplate-detailed": InvoiceTemplateDetailedFields,
  Invoice_Pdf: InvoicePdfFields,
  Language: LanguageFields,
  "Language-collection": LanguageCollectionFields,
  "Language-detailed": LanguageDetailedFields,
  Language_Name: LanguageNameFields,
  Location: LocationFields,
  "Location-collection": LocationCollectionFields,
  MatchList: MatchListFields,
  "MatchList-collection": MatchListCollectionFields,
  "MatchList-detailed": MatchListDetailedFields,
  MatchListPattern: MatchListPatternFields,
  "MatchListPattern-collection": MatchListPatternCollectionFields,
  "MatchListPattern-detailed": MatchListPatternDetailedFields,
  MediaRelaySet: MediaRelaySetFields,
  "MediaRelaySet-collection": MediaRelaySetCollectionFields,
  "MediaRelaySet-detailed": MediaRelaySetDetailedFields,
  MusicOnHold: MusicOnHoldFields,
  "MusicOnHold-collection": MusicOnHoldCollectionFields,
  "MusicOnHold-detailed": MusicOnHoldDetailedFields,
  MusicOnHold_EncodedFile: MusicOnHoldEncodedFileFields,
  MusicOnHold_OriginalFile: MusicOnHoldOriginalFileFields,
  NotificationTemplate: NotificationTemplateFields,
  "NotificationTemplate-collection": NotificationTemplateCollectionFields,
  "NotificationTemplate-detailed": NotificationTemplateDetailedFields,
  NotificationTemplateContent: NotificationTemplateContentFields,
  "NotificationTemplateContent-collection": NotificationTemplateContentCollectionFields,
  "NotificationTemplateContent-detailed": NotificationTemplateContentDetailedFields,
  OutgoingDdiRule: OutgoingDdiRuleFields,
  "OutgoingDdiRule-collection": OutgoingDdiRuleCollectionFields,
  "OutgoingDdiRule-detailed": OutgoingDdiRuleDetailedFields,
  OutgoingRouting: OutgoingRoutingFields,
  "OutgoingRouting-collection": OutgoingRoutingCollectionFields,
  "OutgoingRouting-detailed": OutgoingRoutingDetailedFields,
  Profile: ProfileFields,
  ProfileAcl: ProfileAclFields,
  ProxyTrunk: ProxyTrunkFields,
  "ProxyTrunk-collection": ProxyTrunkCollectionFields,
  "ProxyTrunk-detailed": ProxyTrunkDetailedFields,
  ProxyUser: ProxyUserFields,
  "ProxyUser-collection": ProxyUserCollectionFields,
  "ProxyUser-detailed": ProxyUserDetailedFields,
  PublicEntity: PublicEntityFields,
  "PublicEntity-collection": PublicEntityCollectionFields,
  "PublicEntity-detailed": PublicEntityDetailedFields,
  PublicEntity_Name: PublicEntityNameFields,
  RatingPlan: RatingPlanFields,
  "RatingPlan-collection": RatingPlanCollectionFields,
  "RatingPlan-detailed": RatingPlanDetailedFields,
  RatingPlanGroup: RatingPlanGroupFields,
  "RatingPlanGroup-collection": RatingPlanGroupCollectionFields,
  "RatingPlanGroup-detailed": RatingPlanGroupDetailedFields,
  RatingPlanGroup_Description: RatingPlanGroupDescriptionFields,
  RatingPlanGroup_Name: RatingPlanGroupNameFields,
  RatingProfile: RatingProfileFields,
  "RatingProfile-collection": RatingProfileCollectionFields,
  "RatingProfile-detailed": RatingProfileDetailedFields,
  RegistrationStatus: RegistrationStatusFields,
  RegistrationSummary: RegistrationSummaryFields,
  ResidentialDevice: ResidentialDeviceFields,
  "ResidentialDevice-collection": ResidentialDeviceCollectionFields,
  "ResidentialDevice-detailed": ResidentialDeviceDetailedFields,
  "ResidentialDevice-status": ResidentialDeviceStatusFields,
  RetailAccount: RetailAccountFields,
  "RetailAccount-collection": RetailAccountCollectionFields,
  "RetailAccount-detailed": RetailAccountDetailedFields,
  "RetailAccount-statusItem": RetailAccountStatusItemFields,
  RoutingPattern: RoutingPatternFields,
  "RoutingPattern-collection": RoutingPatternCollectionFields,
  "RoutingPattern-detailed": RoutingPatternDetailedFields,
  RoutingPatternGroup: RoutingPatternGroupFields,
  "RoutingPatternGroup-collection": RoutingPatternGroupCollectionFields,
  "RoutingPatternGroup-detailed": RoutingPatternGroupDetailedFields,
  "RoutingPatternGroup-withPatterns": RoutingPatternGroupWithPatternsFields,
  RoutingPatternGroupsRelPattern: RoutingPatternGroupsRelPatternFields,
  "RoutingPatternGroupsRelPattern-detailed": RoutingPatternGroupsRelPatternDetailedFields,
  "RoutingPatternGroupsRelPattern-detailedCollection": RoutingPatternGroupsRelPatternDetailedCollectionFields,
  RoutingPattern_Description: RoutingPatternDescriptionFields,
  RoutingPattern_Name: RoutingPatternNameFields,
  RoutingTag: RoutingTagFields,
  "RoutingTag-collection": RoutingTagCollectionFields,
  "RoutingTag-detailed": RoutingTagDetailedFields,
  Service: ServiceFields,
  "Service-collection": ServiceCollectionFields,
  "Service-detailed": ServiceDetailedFields,
  Service_Description: ServiceDescriptionFields,
  Service_Name: ServiceNameFields,
  SpecialNumber: SpecialNumberFields,
  "SpecialNumber-collection": SpecialNumberCollectionFields,
  "SpecialNumber-detailed": SpecialNumberDetailedFields,
  TarificationInfo: TarificationInfoFields,
  Terminal: TerminalFields,
  "Terminal-collection": TerminalCollectionFields,
  "Terminal-status": TerminalStatusFields,
  Timezone: TimezoneFields,
  "Timezone-collection": TimezoneCollectionFields,
  "Timezone-detailed": TimezoneDetailedFields,
  Timezone_Label: TimezoneLabelFields,
  Token: TokenFields,
  TransformationRule: TransformationRuleFields,
  "TransformationRule-collection": TransformationRuleCollectionFields,
  "TransformationRule-detailed": TransformationRuleDetailedFields,
  TransformationRuleSet: TransformationRuleSetFields,
  "TransformationRuleSet-collection": TransformationRuleSetCollectionFields,
  "TransformationRuleSet-detailed": TransformationRuleSetDetailedFields,
  TransformationRuleSet_Name: TransformationRuleSetNameFields,
  Trusted: TrustedFields,
  "Trusted-collection": TrustedCollectionFields,
  "Trusted-detailed": TrustedDetailedFields,
  User: UserFields,
  "User-collection": UserCollectionFields,
  UsersAddress: UsersAddressFields,
  "UsersAddress-collection": UsersAddressCollectionFields,
  "UsersAddress-detailed": UsersAddressDetailedFields,
  UsersMassImport: UsersMassImportFields,
  WebPortal: WebPortalFields,
  "WebPortal-collection": WebPortalCollectionFields,
  "WebPortal-detailed": WebPortalDetailedFields,
  WebPortal_Logo: WebPortalLogoFields,
  WebTheme: WebThemeFields,
  Webhook: WebhookFields,
  "Webhook-collection": WebhookCollectionFields,
  "Webhook-detailed": WebhookDetailedFields,
};
