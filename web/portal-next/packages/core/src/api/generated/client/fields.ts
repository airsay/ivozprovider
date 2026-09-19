/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/client/public/apiSpec.json
// Regenerate with: yarn codegen
// App: client  Spec: swagger 2.0  basePath: /api/client/

import type { FieldMetaMap } from '../../fieldMeta';

export const ActiveCallsFields: FieldMetaMap = {
  inbound: { kind: "integer" },
  outbound: { kind: "integer" },
  total: { kind: "integer" },
};

export const BillableCallFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  price: { kind: "number", format: "float" },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  ddi: { kind: "integer" },
};

export const BillableCallCollectionFields: FieldMetaMap = {
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
  price: { kind: "number", format: "float" },
  callid: { kind: "string", maxLength: 255 },
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
  price: { kind: "number", format: "float" },
  destinationName: { kind: "string", maxLength: 100 },
  ratingPlanName: { kind: "string", maxLength: 55 },
  endpointType: { kind: "string", enum: ["RetailAccount","ResidentialDevice","User","Friend","Fax"], maxLength: 55 },
  endpointId: { kind: "integer", minimum: 0 },
  endpointName: { kind: "string", maxLength: 65 },
  direction: { kind: "string", enum: ["inbound","outbound"], default: "outbound", required: true },
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  ddi: { kind: "ref", ref: "Ddi" },
};

export const CalendarFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CalendarCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
};

export const CalendarDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CalendarPeriodFields: FieldMetaMap = {
  startDate: { kind: "string", format: "date", required: true },
  endDate: { kind: "string", format: "date", required: true },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  calendar: { kind: "integer", required: true },
  locution: { kind: "integer" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  numberCountry: { kind: "integer" },
  scheduleIds: { kind: "array" },
};

export const CalendarPeriodCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  calendar: { kind: "integer", required: true },
  startDate: { kind: "string", format: "date", required: true },
  endDate: { kind: "string", format: "date", required: true },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  locution: { kind: "integer" },
  numberCountry: { kind: "integer" },
  numberValue: { kind: "string", maxLength: 25 },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  scheduleIds: { kind: "array" },
};

export const CalendarPeriodDetailedFields: FieldMetaMap = {
  startDate: { kind: "string", format: "date", required: true },
  endDate: { kind: "string", format: "date", required: true },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
  locution: { kind: "ref", ref: "Locution" },
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  numberCountry: { kind: "ref", ref: "Country" },
  scheduleIds: { kind: "array" },
};

export const CalendarPeriodsRelScheduleFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  calendarPeriod: { kind: "integer", required: true },
  schedule: { kind: "integer", required: true },
};

export const CalendarPeriodsRelScheduleDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  calendarPeriod: { kind: "ref", ref: "CalendarPeriod", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const CalendarPeriodsRelScheduleDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  calendarPeriod: { kind: "ref", ref: "CalendarPeriod", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const CallAclFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  defaultPolicy: { kind: "string", enum: ["allow","deny"], maxLength: 10, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CallAclCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  defaultPolicy: { kind: "string", enum: ["allow","deny"], maxLength: 10, required: true },
};

export const CallAclDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  defaultPolicy: { kind: "string", enum: ["allow","deny"], maxLength: 10, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CallAclRelMatchListFields: FieldMetaMap = {
  priority: { kind: "integer", required: true },
  policy: { kind: "string", enum: ["allow","deny"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
  callAcl: { kind: "integer", required: true },
  matchList: { kind: "integer", required: true },
};

export const CallAclRelMatchListDetailedFields: FieldMetaMap = {
  priority: { kind: "integer", required: true },
  policy: { kind: "string", enum: ["allow","deny"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
  callAcl: { kind: "ref", ref: "CallAcl", required: true },
  matchList: { kind: "ref", ref: "MatchList", required: true },
};

export const CallAclRelMatchListDetailedCollectionFields: FieldMetaMap = {
  priority: { kind: "integer", required: true },
  policy: { kind: "string", enum: ["allow","deny"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
  callAcl: { kind: "ref", ref: "CallAcl", required: true },
  matchList: { kind: "ref", ref: "MatchList", required: true },
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
  callCsvNotificationTemplate: { kind: "integer" },
  ddi: { kind: "integer" },
  retailAccount: { kind: "integer" },
  residentialDevice: { kind: "integer" },
  user: { kind: "integer" },
  fax: { kind: "integer" },
  friend: { kind: "integer" },
};

export const CallCsvSchedulerCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 40, required: true },
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
  callCsvNotificationTemplate: { kind: "ref", ref: "NotificationTemplate" },
  ddi: { kind: "ref", ref: "Ddi" },
  retailAccount: { kind: "ref", ref: "RetailAccount" },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice" },
  user: { kind: "ref", ref: "User" },
  fax: { kind: "ref", ref: "Fax" },
  friend: { kind: "ref", ref: "Friend" },
};

export const CallForwardSettingFields: FieldMetaMap = {
  callTypeFilter: { kind: "string", enum: ["internal","external","both"], maxLength: 25, required: true },
  callForwardType: { kind: "string", enum: ["inconditional","noAnswer","busy","userNotRegistered"], maxLength: 25, required: true },
  targetType: { kind: "string", enum: ["number","extension","voicemail","retail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  noAnswerTimeout: { kind: "integer", default: 10, required: true },
  enabled: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer" },
  friend: { kind: "integer" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  numberCountry: { kind: "integer" },
  residentialDevice: { kind: "integer" },
  retailAccount: { kind: "integer" },
  cfwToRetailAccount: { kind: "integer" },
  ddi: { kind: "integer" },
};

export const CallForwardSettingCollectionFields: FieldMetaMap = {
  callTypeFilter: { kind: "string", enum: ["internal","external","both"], maxLength: 25, required: true },
  callForwardType: { kind: "string", enum: ["inconditional","noAnswer","busy","userNotRegistered"], maxLength: 25, required: true },
  targetType: { kind: "string", enum: ["number","extension","voicemail","retail"], maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  enabled: { kind: "boolean", default: 1, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  numberCountry: { kind: "integer" },
  user: { kind: "integer" },
  voicemail: { kind: "integer" },
  extension: { kind: "integer" },
  residentialDevice: { kind: "integer" },
  retailAccount: { kind: "integer" },
  cfwToRetailAccount: { kind: "integer" },
  ddi: { kind: "integer" },
};

export const CallForwardSettingDetailedFields: FieldMetaMap = {
  callTypeFilter: { kind: "string", enum: ["internal","external","both"], maxLength: 25, required: true },
  callForwardType: { kind: "string", enum: ["inconditional","noAnswer","busy","userNotRegistered"], maxLength: 25, required: true },
  targetType: { kind: "string", enum: ["number","extension","voicemail","retail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  noAnswerTimeout: { kind: "integer", default: 10, required: true },
  enabled: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User" },
  friend: { kind: "ref", ref: "Friend" },
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  numberCountry: { kind: "ref", ref: "Country" },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice" },
  retailAccount: { kind: "ref", ref: "RetailAccount" },
  cfwToRetailAccount: { kind: "ref", ref: "RetailAccount" },
  ddi: { kind: "ref", ref: "Ddi" },
};

export const ChannelUsageCollectionFields: FieldMetaMap = {
  timestamp: { kind: "string", format: "date-time", required: true },
  peak: { kind: "integer", minimum: 0, required: true },
  avgUsage: { kind: "number", format: "float", required: true },
  maxCallsCompany: { kind: "integer", minimum: 0, required: true },
  blockedByCompanyLimit: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
};

export const CompanyFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, readOnly: true },
  domainUsers: { kind: "string", maxLength: 190, readOnly: true },
  onDemandRecordCode: { kind: "string", maxLength: 3, readOnly: true },
  balance: { kind: "number", format: "float", default: 0, readOnly: true },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Invoicing" },
  language: { kind: "integer" },
  defaultTimezone: { kind: "integer" },
  country: { kind: "integer", required: true },
  transformationRuleSet: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  outgoingDdiRule: { kind: "integer" },
};

export const CompanyCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 80, readOnly: true },
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  invoicing: { kind: "ref", ref: "Invoicing" },
  domainName: { kind: "string", readOnly: true },
};

export const CompanyDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["vpbx","retail","wholesale","residential"], maxLength: 25, default: "vpbx", required: true },
  name: { kind: "string", maxLength: 80, readOnly: true },
  domainUsers: { kind: "string", maxLength: 190, readOnly: true },
  onDemandRecordCode: { kind: "string", maxLength: 3, readOnly: true },
  balance: { kind: "number", format: "float", default: 0, readOnly: true },
  id: { kind: "integer", readOnly: true },
  invoicing: { kind: "ref", ref: "Invoicing" },
  language: { kind: "ref", ref: "Language" },
  defaultTimezone: { kind: "ref", ref: "Timezone" },
  country: { kind: "ref", ref: "Country", required: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule" },
  domainName: { kind: "string", readOnly: true },
};

export const CompanyServiceFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 3, required: true },
  id: { kind: "integer", readOnly: true },
  service: { kind: "integer", required: true },
};

export const CompanyServiceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  code: { kind: "string", maxLength: 3, required: true },
  service: { kind: "integer", required: true },
};

export const CompanyServiceDetailedFields: FieldMetaMap = {
  code: { kind: "string", maxLength: 3, required: true },
  id: { kind: "integer", readOnly: true },
  service: { kind: "ref", ref: "Service", required: true },
};

export const ConditionalRouteFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  routetype: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numbervalue: { kind: "string", maxLength: 25 },
  friendvalue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  voicemail: { kind: "integer" },
  user: { kind: "integer" },
  queue: { kind: "integer" },
  locution: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  extension: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ConditionalRouteCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  locution: { kind: "integer" },
  routetype: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numbervalue: { kind: "string", maxLength: 25 },
  friendvalue: { kind: "string", maxLength: 25 },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  voicemail: { kind: "integer" },
  user: { kind: "integer" },
  queue: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  extension: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ConditionalRouteDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  routetype: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numbervalue: { kind: "string", maxLength: 25 },
  friendvalue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "ref", ref: "Ivr" },
  huntGroup: { kind: "ref", ref: "HuntGroup" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  user: { kind: "ref", ref: "User" },
  queue: { kind: "ref", ref: "Queue" },
  locution: { kind: "ref", ref: "Locution" },
  conferenceRoom: { kind: "ref", ref: "ConferenceRoom" },
  extension: { kind: "ref", ref: "Extension" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const ConditionalRoutesConditionFields: FieldMetaMap = {
  priority: { kind: "integer", default: 1, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  conditionalRoute: { kind: "integer", required: true },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  voicemail: { kind: "integer" },
  user: { kind: "integer" },
  queue: { kind: "integer" },
  locution: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  extension: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ConditionalRoutesConditionCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  priority: { kind: "integer", default: 1, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  locution: { kind: "integer" },
  numberCountry: { kind: "integer" },
  numberValue: { kind: "string", maxLength: 25 },
  ivr: { kind: "integer" },
  user: { kind: "integer" },
  huntGroup: { kind: "integer" },
  voicemail: { kind: "integer" },
  friendValue: { kind: "string", maxLength: 25 },
  queue: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  extension: { kind: "integer" },
};

export const ConditionalRoutesConditionDetailedFields: FieldMetaMap = {
  priority: { kind: "integer", default: 1, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  conditionalRoute: { kind: "ref", ref: "ConditionalRoute", required: true },
  ivr: { kind: "ref", ref: "Ivr" },
  huntGroup: { kind: "ref", ref: "HuntGroup" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  user: { kind: "ref", ref: "User" },
  queue: { kind: "ref", ref: "Queue" },
  locution: { kind: "ref", ref: "Locution" },
  conferenceRoom: { kind: "ref", ref: "ConferenceRoom" },
  extension: { kind: "ref", ref: "Extension" },
  numberCountry: { kind: "ref", ref: "Country" },
  matchListIds: { kind: "array" },
  scheduleIds: { kind: "array" },
  calendarIds: { kind: "array" },
  routeLockIds: { kind: "array" },
};

export const ConditionalRoutesConditionWithInverseRelationshipsFields: FieldMetaMap = {
  priority: { kind: "integer", default: 1, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","voicemail","friend","queue","conferenceRoom","extension"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  conditionalRoute: { kind: "ref", ref: "ConditionalRoute", required: true },
  ivr: { kind: "ref", ref: "Ivr" },
  huntGroup: { kind: "ref", ref: "HuntGroup" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  user: { kind: "ref", ref: "User" },
  queue: { kind: "ref", ref: "Queue" },
  locution: { kind: "ref", ref: "Locution" },
  conferenceRoom: { kind: "ref", ref: "ConferenceRoom" },
  extension: { kind: "ref", ref: "Extension" },
  numberCountry: { kind: "ref", ref: "Country" },
  matchListIds: { kind: "array" },
  scheduleIds: { kind: "array" },
  calendarIds: { kind: "array" },
  routeLockIds: { kind: "array" },
};

export const ConditionalRoutesConditionsRelCalendarFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "integer", required: true },
  calendar: { kind: "integer", required: true },
};

export const ConditionalRoutesConditionsRelCalendarDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
};

export const ConditionalRoutesConditionsRelCalendarDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
};

export const ConditionalRoutesConditionsRelMatchlistFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "integer", required: true },
  matchlist: { kind: "integer", required: true },
};

export const ConditionalRoutesConditionsRelMatchlistDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const ConditionalRoutesConditionsRelMatchlistDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const ConditionalRoutesConditionsRelRouteLockFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "integer", required: true },
  routeLock: { kind: "integer", required: true },
};

export const ConditionalRoutesConditionsRelRouteLockDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  routeLock: { kind: "ref", ref: "RouteLock", required: true },
};

export const ConditionalRoutesConditionsRelRouteLockDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  routeLock: { kind: "ref", ref: "RouteLock", required: true },
};

export const ConditionalRoutesConditionsRelScheduleFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "integer", required: true },
  schedule: { kind: "integer", required: true },
};

export const ConditionalRoutesConditionsRelScheduleDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const ConditionalRoutesConditionsRelScheduleDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  condition: { kind: "ref", ref: "ConditionalRoutesCondition", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const ConferenceRoomFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  pinProtected: { kind: "boolean", default: 0, required: true },
  pinCode: { kind: "string", maxLength: 6 },
  maxMembers: { kind: "integer", minimum: 0, default: 0, required: true },
  announceUserCount: { kind: "string", enum: ["always","first"], maxLength: 10, default: "first", required: true },
  id: { kind: "integer", readOnly: true },
};

export const ConferenceRoomCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  maxMembers: { kind: "integer", minimum: 0, default: 0, required: true },
  pinProtected: { kind: "boolean", default: 0, required: true },
  pinCode: { kind: "string", maxLength: 6 },
  announceUserCount: { kind: "string", enum: ["always","first"], maxLength: 10, default: "first", required: true },
};

export const ConferenceRoomDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  pinProtected: { kind: "boolean", default: 0, required: true },
  pinCode: { kind: "string", maxLength: 6 },
  maxMembers: { kind: "integer", minimum: 0, default: 0, required: true },
  announceUserCount: { kind: "string", enum: ["always","first"], maxLength: 10, default: "first", required: true },
  id: { kind: "integer", readOnly: true },
};

export const ContactFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100 },
  email: { kind: "string", maxLength: 100 },
  workPhone: { kind: "string", maxLength: 20 },
  workPhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  mobilePhone: { kind: "string", maxLength: 20 },
  mobilePhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  otherPhone: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer", readOnly: true },
  workPhoneCountry: { kind: "integer" },
  mobilePhoneCountry: { kind: "integer" },
};

export const ContactCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100 },
  email: { kind: "string", maxLength: 100 },
  workPhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  mobilePhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  otherPhone: { kind: "string", maxLength: 25 },
  user: { kind: "integer", readOnly: true },
};

export const ContactDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100 },
  email: { kind: "string", maxLength: 100 },
  workPhone: { kind: "string", maxLength: 20 },
  workPhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  mobilePhone: { kind: "string", maxLength: 20 },
  mobilePhoneE164: { kind: "string", maxLength: 25, readOnly: true },
  otherPhone: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User", readOnly: true },
  workPhoneCountry: { kind: "ref", ref: "Country" },
  mobilePhoneCountry: { kind: "ref", ref: "Country" },
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

export const DashboardFields: FieldMetaMap = {
  client: { kind: "ref", ref: "DashboardClient" },
  latestBillableCalls: { kind: "array", itemsRef: "DashboardBillableCall" },
  latestUsers: { kind: "array", itemsRef: "DashboardUser" },
  latestResidentialDevices: { kind: "array", itemsRef: "DashboardResidentialDevice" },
  latestRetailAccounts: { kind: "array", itemsRef: "DashboardRetailAccount" },
  userNum: { kind: "integer" },
  extensionNum: { kind: "integer" },
  ddiNum: { kind: "integer" },
  residentialDeviceNum: { kind: "integer" },
  voiceMailNum: { kind: "integer" },
  retailsAccountNum: { kind: "integer" },
  productName: { kind: "string" },
};

export const DashboardBillableCallFields: FieldMetaMap = {
  startTime: { kind: "string" },
  caller: { kind: "string" },
  callee: { kind: "string" },
  duration: { kind: "number" },
};

export const DashboardClientFields: FieldMetaMap = {
  name: { kind: "string" },
  nif: { kind: "string" },
  postalCode: { kind: "string" },
  domainUsers: { kind: "string" },
  maxCalls: { kind: "integer" },
};

export const DashboardResidentialDeviceFields: FieldMetaMap = {
  name: { kind: "string" },
  outgoingDdi: { kind: "string" },
  description: { kind: "string" },
};

export const DashboardRetailAccountFields: FieldMetaMap = {
  name: { kind: "string" },
  outgoingDdi: { kind: "string" },
  description: { kind: "string" },
};

export const DashboardUserFields: FieldMetaMap = {
  name: { kind: "string" },
  lastName: { kind: "string" },
  extension: { kind: "string" },
  outgoingDdi: { kind: "string" },
};

export const DdiFields: FieldMetaMap = {
  ddi: { kind: "string", maxLength: 25, readOnly: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  recordCalls: { kind: "string", enum: ["none","all","inbound","outbound"], maxLength: 25, default: "none", required: true },
  displayName: { kind: "string", maxLength: 50 },
  routeType: { kind: "string", enum: ["user","ivr","huntGroup","fax","conferenceRoom","friend","queue","conditional","residential","retail","locution"], maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  conferenceRoom: { kind: "integer" },
  language: { kind: "integer" },
  queue: { kind: "integer" },
  externalCallFilter: { kind: "integer" },
  user: { kind: "integer" },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  fax: { kind: "integer" },
  country: { kind: "integer", readOnly: true },
  residentialDevice: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
  retailAccount: { kind: "integer" },
  locution: { kind: "integer" },
};

export const DdiCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  country: { kind: "integer", readOnly: true },
  ddi: { kind: "string", maxLength: 25, readOnly: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  externalCallFilter: { kind: "integer" },
  routeType: { kind: "string", enum: ["user","ivr","huntGroup","fax","conferenceRoom","friend","queue","conditional","residential","retail","locution"], maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  conferenceRoom: { kind: "integer" },
  language: { kind: "integer" },
  queue: { kind: "integer" },
  user: { kind: "integer" },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  fax: { kind: "integer" },
  residentialDevice: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
  retailAccount: { kind: "integer" },
  locution: { kind: "integer" },
};

export const DdiDetailedFields: FieldMetaMap = {
  ddi: { kind: "string", maxLength: 25, readOnly: true },
  ddie164: { kind: "string", maxLength: 25, readOnly: true },
  description: { kind: "string", maxLength: 100 },
  recordCalls: { kind: "string", enum: ["none","all","inbound","outbound"], maxLength: 25, default: "none", required: true },
  displayName: { kind: "string", maxLength: 50 },
  routeType: { kind: "string", enum: ["user","ivr","huntGroup","fax","conferenceRoom","friend","queue","conditional","residential","retail","locution"], maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  conferenceRoom: { kind: "ref", ref: "ConferenceRoom" },
  language: { kind: "ref", ref: "Language" },
  queue: { kind: "ref", ref: "Queue" },
  externalCallFilter: { kind: "ref", ref: "ExternalCallFilter" },
  user: { kind: "ref", ref: "User" },
  ivr: { kind: "ref", ref: "Ivr" },
  huntGroup: { kind: "ref", ref: "HuntGroup" },
  fax: { kind: "ref", ref: "Fax" },
  country: { kind: "ref", ref: "Country", readOnly: true },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice" },
  conditionalRoute: { kind: "ref", ref: "ConditionalRoute" },
  retailAccount: { kind: "ref", ref: "RetailAccount" },
  locution: { kind: "ref", ref: "Locution" },
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
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  user: { kind: "integer" },
  queue: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
  numberCountry: { kind: "integer" },
  voicemail: { kind: "integer" },
  locution: { kind: "integer" },
};

export const ExtensionCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  ivr: { kind: "integer" },
  huntGroup: { kind: "integer" },
  conferenceRoom: { kind: "integer" },
  user: { kind: "integer" },
  queue: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
  voicemail: { kind: "integer" },
  locution: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const ExtensionDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "ref", ref: "Ivr" },
  huntGroup: { kind: "ref", ref: "HuntGroup" },
  conferenceRoom: { kind: "ref", ref: "ConferenceRoom" },
  user: { kind: "ref", ref: "User" },
  queue: { kind: "ref", ref: "Queue" },
  conditionalRoute: { kind: "ref", ref: "ConditionalRoute" },
  numberCountry: { kind: "ref", ref: "Country" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  locution: { kind: "ref", ref: "Locution" },
};

export const ExtensionsMassImportFields: FieldMetaMap = {
  success: { kind: "boolean" },
  errorMsg: { kind: "string" },
  failed: { kind: "integer" },
};

export const ExternalCallFilterFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  holidayEnabled: { kind: "boolean", default: 0, required: true },
  holidayTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  holidayNumberValue: { kind: "string", maxLength: 25 },
  outOfScheduleEnabled: { kind: "boolean", default: 0, required: true },
  outOfScheduleTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  outOfScheduleNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "integer" },
  holidayLocution: { kind: "integer" },
  outOfScheduleLocution: { kind: "integer" },
  holidayExtension: { kind: "integer" },
  outOfScheduleExtension: { kind: "integer" },
  holidayVoicemail: { kind: "integer" },
  outOfScheduleVoicemail: { kind: "integer" },
  holidayNumberCountry: { kind: "integer" },
  outOfScheduleNumberCountry: { kind: "integer" },
};

export const ExternalCallFilterCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  holidayTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  holidayNumberValue: { kind: "string", maxLength: 25 },
  holidayLocution: { kind: "integer" },
  holidayExtension: { kind: "integer" },
  holidayVoicemail: { kind: "integer" },
  holidayNumberCountry: { kind: "integer" },
  outOfScheduleTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  outOfScheduleNumberValue: { kind: "string", maxLength: 25 },
  outOfScheduleLocution: { kind: "integer" },
  outOfScheduleExtension: { kind: "integer" },
  outOfScheduleVoicemail: { kind: "integer" },
  outOfScheduleNumberCountry: { kind: "integer" },
};

export const ExternalCallFilterDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  holidayEnabled: { kind: "boolean", default: 0, required: true },
  holidayTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  holidayNumberValue: { kind: "string", maxLength: 25 },
  outOfScheduleEnabled: { kind: "boolean", default: 0, required: true },
  outOfScheduleTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  outOfScheduleNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "ref", ref: "Locution" },
  holidayLocution: { kind: "ref", ref: "Locution" },
  outOfScheduleLocution: { kind: "ref", ref: "Locution" },
  holidayExtension: { kind: "ref", ref: "Extension" },
  outOfScheduleExtension: { kind: "ref", ref: "Extension" },
  holidayVoicemail: { kind: "ref", ref: "Voicemail" },
  outOfScheduleVoicemail: { kind: "ref", ref: "Voicemail" },
  holidayNumberCountry: { kind: "ref", ref: "Country" },
  outOfScheduleNumberCountry: { kind: "ref", ref: "Country" },
  scheduleIds: { kind: "array" },
  calendarIds: { kind: "array" },
  whiteListIds: { kind: "array" },
  blackListIds: { kind: "array" },
};

export const ExternalCallFilterWithInverseRelationshipsFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  holidayEnabled: { kind: "boolean", default: 0, required: true },
  holidayTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  holidayNumberValue: { kind: "string", maxLength: 25 },
  outOfScheduleEnabled: { kind: "boolean", default: 0, required: true },
  outOfScheduleTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  outOfScheduleNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "ref", ref: "Locution" },
  holidayLocution: { kind: "ref", ref: "Locution" },
  outOfScheduleLocution: { kind: "ref", ref: "Locution" },
  holidayExtension: { kind: "ref", ref: "Extension" },
  outOfScheduleExtension: { kind: "ref", ref: "Extension" },
  holidayVoicemail: { kind: "ref", ref: "Voicemail" },
  outOfScheduleVoicemail: { kind: "ref", ref: "Voicemail" },
  holidayNumberCountry: { kind: "ref", ref: "Country" },
  outOfScheduleNumberCountry: { kind: "ref", ref: "Country" },
  scheduleIds: { kind: "array" },
  calendarIds: { kind: "array" },
  whiteListIds: { kind: "array" },
  blackListIds: { kind: "array" },
};

export const ExternalCallFilterBlackListFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "integer", required: true },
  matchlist: { kind: "integer", required: true },
};

export const ExternalCallFilterBlackListDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const ExternalCallFilterBlackListDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const ExternalCallFilterRelCalendarFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "integer", required: true },
  calendar: { kind: "integer", required: true },
};

export const ExternalCallFilterRelCalendarDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
};

export const ExternalCallFilterRelCalendarDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
};

export const ExternalCallFilterRelScheduleFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "integer", required: true },
  schedule: { kind: "integer", required: true },
};

export const ExternalCallFilterRelScheduleDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const ExternalCallFilterRelScheduleDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  schedule: { kind: "ref", ref: "Schedule", required: true },
};

export const ExternalCallFilterWhiteListFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "integer", required: true },
  matchlist: { kind: "integer", required: true },
};

export const ExternalCallFilterWhiteListDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const ExternalCallFilterWhiteListDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  filter: { kind: "ref", ref: "ExternalCallFilter", required: true },
  matchlist: { kind: "ref", ref: "MatchList", required: true },
};

export const FaxFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  outgoingDdi: { kind: "integer" },
};

export const FaxCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  outgoingDdi: { kind: "integer" },
};

export const FaxDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  relUserIds: { kind: "array" },
};

export const FaxesInOutFields: FieldMetaMap = {
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", readOnly: true },
  src: { kind: "string", maxLength: 128, readOnly: true },
  dst: { kind: "string", maxLength: 128 },
  type: { kind: "string", enum: ["In","Out"], maxLength: 20, default: "Out" },
  pages: { kind: "string", maxLength: 64 },
  status: { kind: "string", enum: ["error","pending","inprogress","completed"], maxLength: 25, readOnly: true },
  id: { kind: "integer", readOnly: true },
  file: { kind: "ref", ref: "FaxesInOut_File" },
  fax: { kind: "integer", required: true },
  dstCountry: { kind: "integer" },
};

export const FaxesInOutCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", readOnly: true },
  src: { kind: "string", maxLength: 128, readOnly: true },
  dst: { kind: "string", maxLength: 128 },
  type: { kind: "string", enum: ["In","Out"], maxLength: 20, default: "Out" },
  status: { kind: "string", enum: ["error","pending","inprogress","completed"], maxLength: 25, readOnly: true },
  file: { kind: "ref", ref: "FaxesInOut_File" },
};

export const FaxesInOutDetailedFields: FieldMetaMap = {
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", readOnly: true },
  src: { kind: "string", maxLength: 128, readOnly: true },
  dst: { kind: "string", maxLength: 128 },
  type: { kind: "string", enum: ["In","Out"], maxLength: 20, default: "Out" },
  pages: { kind: "string", maxLength: 64 },
  status: { kind: "string", enum: ["error","pending","inprogress","completed"], maxLength: 25, readOnly: true },
  id: { kind: "integer", readOnly: true },
  file: { kind: "ref", ref: "FaxesInOut_File" },
  fax: { kind: "ref", ref: "Fax", required: true },
  dstCountry: { kind: "ref", ref: "Country" },
};

export const FaxesInOutFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const FeatureFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  id: { kind: "integer", readOnly: true },
};

export const FeaturesRelCompanyDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  feature: { kind: "ref", ref: "Feature", required: true },
};

export const FeaturesRelCompanyDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  feature: { kind: "ref", ref: "Feature", required: true },
};

export const FriendFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  priority: { kind: "integer", default: 1, required: true },
  allow: { kind: "string", maxLength: 200, default: "alaw", required: true },
  fromUser: { kind: "string", maxLength: 190 },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no","intervpbx"], maxLength: 20, default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  alwaysApplyTransformations: { kind: "boolean", default: 0, required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer" },
  callAcl: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  language: { kind: "integer" },
  interCompany: { kind: "integer" },
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
};

export const FriendDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  transport: { kind: "string", enum: ["udp","tcp","tls"], maxLength: 25 },
  ip: { kind: "string", maxLength: 50 },
  port: { kind: "integer", minimum: 0 },
  password: { kind: "string", maxLength: 64 },
  priority: { kind: "integer", default: 1, required: true },
  allow: { kind: "string", maxLength: 200, default: "alaw", required: true },
  fromUser: { kind: "string", maxLength: 190 },
  fromDomain: { kind: "string", maxLength: 190 },
  directConnectivity: { kind: "string", enum: ["yes","no","intervpbx"], maxLength: 20, default: "yes", required: true },
  ddiIn: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  alwaysApplyTransformations: { kind: "boolean", default: 0, required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  multiContact: { kind: "boolean", default: 1, required: true },
  ruriDomain: { kind: "string", maxLength: 190 },
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  callAcl: { kind: "ref", ref: "CallAcl" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  language: { kind: "ref", ref: "Language" },
  interCompany: { kind: "ref", ref: "Company" },
};

export const FriendStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, required: true },
  domainName: { kind: "string" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const FriendsPatternFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  regExp: { kind: "string", maxLength: 255, required: true },
  id: { kind: "integer", readOnly: true },
  friend: { kind: "integer", required: true },
};

export const FriendsPatternCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  regExp: { kind: "string", maxLength: 255, required: true },
};

export const FriendsPatternDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  regExp: { kind: "string", maxLength: 255, required: true },
  id: { kind: "integer", readOnly: true },
  friend: { kind: "ref", ref: "Friend", required: true },
};

export const HolidayDateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  eventDate: { kind: "string", format: "date", required: true },
  wholeDayEvent: { kind: "boolean", default: 1, required: true },
  timeIn: { kind: "string", format: "time" },
  timeOut: { kind: "string", format: "time" },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  calendar: { kind: "integer", required: true },
  locution: { kind: "integer" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const HolidayDateCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  eventDate: { kind: "string", format: "date", required: true },
  locution: { kind: "integer" },
  wholeDayEvent: { kind: "boolean", default: 1, required: true },
  timeIn: { kind: "string", format: "time" },
  timeOut: { kind: "string", format: "time" },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  numberCountry: { kind: "integer" },
  numberValue: { kind: "string", maxLength: 25 },
  calendar: { kind: "integer", required: true },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
};

export const HolidayDateDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  eventDate: { kind: "string", format: "date", required: true },
  wholeDayEvent: { kind: "boolean", default: 1, required: true },
  timeIn: { kind: "string", format: "time" },
  timeOut: { kind: "string", format: "time" },
  routeType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  calendar: { kind: "ref", ref: "Calendar", required: true },
  locution: { kind: "ref", ref: "Locution" },
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const HolidayDateRangeFields: FieldMetaMap = {
  name: { kind: "string", required: true },
  locution: { kind: "integer" },
  wholeDayEvent: { kind: "integer", required: true },
  timeIn: { kind: "string" },
  timeOut: { kind: "string" },
  routeType: { kind: "string" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  numberCountry: { kind: "integer" },
  numberValue: { kind: "string" },
  startDate: { kind: "string", required: true },
  endDate: { kind: "string", required: true },
  calendar: { kind: "integer", required: true },
};

export const HolidaysMassImportFields: FieldMetaMap = {
  success: { kind: "boolean" },
  errorMsg: { kind: "string" },
  failed: { kind: "integer" },
};

export const HuntGroupFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  strategy: { kind: "string", enum: ["ringAll","linear","roundRobin","random"], maxLength: 25, required: true },
  ringAllTimeout: { kind: "integer" },
  noAnswerTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noAnswerNumberValue: { kind: "string", maxLength: 25 },
  preventMissedCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  allowCallForwards: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  noAnswerLocution: { kind: "integer" },
  noAnswerExtension: { kind: "integer" },
  noAnswerVoicemail: { kind: "integer" },
  noAnswerNumberCountry: { kind: "integer" },
};

export const HuntGroupCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  strategy: { kind: "string", enum: ["ringAll","linear","roundRobin","random"], maxLength: 25, required: true },
};

export const HuntGroupDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  strategy: { kind: "string", enum: ["ringAll","linear","roundRobin","random"], maxLength: 25, required: true },
  ringAllTimeout: { kind: "integer" },
  noAnswerTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noAnswerNumberValue: { kind: "string", maxLength: 25 },
  preventMissedCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  allowCallForwards: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  noAnswerLocution: { kind: "ref", ref: "Locution" },
  noAnswerExtension: { kind: "ref", ref: "Extension" },
  noAnswerVoicemail: { kind: "ref", ref: "Voicemail" },
  noAnswerNumberCountry: { kind: "ref", ref: "Country" },
};

export const HuntGroupMemberFields: FieldMetaMap = {
  timeoutTime: { kind: "integer" },
  priority: { kind: "integer" },
  routeType: { kind: "string", enum: ["number","user"], maxLength: 25, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  huntGroup: { kind: "integer", required: true },
  user: { kind: "integer", required: true },
  numberCountry: { kind: "integer" },
};

export const HuntGroupMemberDetailedFields: FieldMetaMap = {
  timeoutTime: { kind: "integer" },
  priority: { kind: "integer" },
  routeType: { kind: "string", enum: ["number","user"], maxLength: 25, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  huntGroup: { kind: "ref", ref: "HuntGroup", required: true },
  user: { kind: "ref", ref: "User", required: true },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const HuntGroupMemberDetailedCollectionFields: FieldMetaMap = {
  timeoutTime: { kind: "integer" },
  priority: { kind: "integer" },
  routeType: { kind: "string", enum: ["number","user"], maxLength: 25, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  huntGroup: { kind: "ref", ref: "HuntGroup", required: true },
  user: { kind: "ref", ref: "User", required: true },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const InvoiceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  number: { kind: "string", maxLength: 30 },
  inDate: { kind: "string", format: "date-time" },
  outDate: { kind: "string", format: "date-time" },
  taxRate: { kind: "number", format: "float" },
  totalWithTax: { kind: "number", format: "float" },
  pdf: { kind: "ref", ref: "Invoice_Pdf" },
  currency: { kind: "string" },
};

export const InvoiceDetailedFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 30 },
  inDate: { kind: "string", format: "date-time" },
  outDate: { kind: "string", format: "date-time" },
  taxRate: { kind: "number", format: "float" },
  totalWithTax: { kind: "number", format: "float" },
  statusMsg: { kind: "string", maxLength: 140 },
  id: { kind: "integer", readOnly: true },
  pdf: { kind: "ref", ref: "Invoice_Pdf" },
  currency: { kind: "string" },
};

export const InvoicePdfFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const InvoicingFields: FieldMetaMap = {
  nif: { kind: "string", maxLength: 25, default: "", required: true },
  postalAddress: { kind: "string", maxLength: 255, default: "", required: true },
  postalCode: { kind: "string", maxLength: 10, default: "", required: true },
  town: { kind: "string", maxLength: 255, default: "", required: true },
  province: { kind: "string", maxLength: 255, default: "", required: true },
  countryName: { kind: "string", maxLength: 255, default: "", required: true },
};

export const IvrFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeout: { kind: "integer", minimum: 0, required: true },
  maxDigits: { kind: "integer", minimum: 0, required: true },
  allowExtensions: { kind: "boolean", default: 0, required: true },
  noInputRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noInputNumberValue: { kind: "string", maxLength: 25 },
  errorRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  errorNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "integer" },
  noInputLocution: { kind: "integer" },
  errorLocution: { kind: "integer" },
  successLocution: { kind: "integer" },
  noInputExtension: { kind: "integer" },
  errorExtension: { kind: "integer" },
  noInputVoicemail: { kind: "integer" },
  errorVoicemail: { kind: "integer" },
  noInputNumberCountry: { kind: "integer" },
  errorNumberCountry: { kind: "integer" },
};

export const IvrCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  timeout: { kind: "integer", minimum: 0, required: true },
  allowExtensions: { kind: "boolean", default: 0, required: true },
  noInputRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noInputNumberValue: { kind: "string", maxLength: 25 },
  errorRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  errorNumberValue: { kind: "string", maxLength: 25 },
  noInputLocution: { kind: "integer" },
  errorLocution: { kind: "integer" },
  successLocution: { kind: "integer" },
  noInputExtension: { kind: "integer" },
  errorExtension: { kind: "integer" },
  noInputVoicemail: { kind: "integer" },
  errorVoicemail: { kind: "integer" },
  noInputNumberCountry: { kind: "integer" },
  errorNumberCountry: { kind: "integer" },
};

export const IvrDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeout: { kind: "integer", minimum: 0, required: true },
  maxDigits: { kind: "integer", minimum: 0, required: true },
  allowExtensions: { kind: "boolean", default: 0, required: true },
  noInputRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noInputNumberValue: { kind: "string", maxLength: 25 },
  errorRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  errorNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "ref", ref: "Locution" },
  noInputLocution: { kind: "ref", ref: "Locution" },
  errorLocution: { kind: "ref", ref: "Locution" },
  successLocution: { kind: "ref", ref: "Locution" },
  noInputExtension: { kind: "ref", ref: "Extension" },
  errorExtension: { kind: "ref", ref: "Extension" },
  noInputVoicemail: { kind: "ref", ref: "Voicemail" },
  errorVoicemail: { kind: "ref", ref: "Voicemail" },
  noInputNumberCountry: { kind: "ref", ref: "Country" },
  errorNumberCountry: { kind: "ref", ref: "Country" },
  excludedExtensionIds: { kind: "array" },
};

export const IvrWithExcludedExtensionsFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeout: { kind: "integer", minimum: 0, required: true },
  maxDigits: { kind: "integer", minimum: 0, required: true },
  allowExtensions: { kind: "boolean", default: 0, required: true },
  noInputRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  noInputNumberValue: { kind: "string", maxLength: 25 },
  errorRouteType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  errorNumberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  welcomeLocution: { kind: "ref", ref: "Locution" },
  noInputLocution: { kind: "ref", ref: "Locution" },
  errorLocution: { kind: "ref", ref: "Locution" },
  successLocution: { kind: "ref", ref: "Locution" },
  noInputExtension: { kind: "ref", ref: "Extension" },
  errorExtension: { kind: "ref", ref: "Extension" },
  noInputVoicemail: { kind: "ref", ref: "Voicemail" },
  errorVoicemail: { kind: "ref", ref: "Voicemail" },
  noInputNumberCountry: { kind: "ref", ref: "Country" },
  errorNumberCountry: { kind: "ref", ref: "Country" },
  excludedExtensionIds: { kind: "array" },
};

export const IvrEntryFields: FieldMetaMap = {
  entry: { kind: "string", maxLength: 40, required: true },
  displayName: { kind: "string", maxLength: 50 },
  routeType: { kind: "string", enum: ["number","extension","voicemail","conditional"], maxLength: 25, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "integer", required: true },
  welcomeLocution: { kind: "integer" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
  numberCountry: { kind: "integer" },
};

export const IvrEntryCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "integer", required: true },
  entry: { kind: "string", maxLength: 40, required: true },
  displayName: { kind: "string", maxLength: 50 },
  welcomeLocution: { kind: "integer" },
  routeType: { kind: "string", enum: ["number","extension","voicemail","conditional"], maxLength: 25, required: true },
  numberCountry: { kind: "integer" },
  numberValue: { kind: "string", maxLength: 25 },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  conditionalRoute: { kind: "integer" },
};

export const IvrEntryDetailedFields: FieldMetaMap = {
  entry: { kind: "string", maxLength: 40, required: true },
  displayName: { kind: "string", maxLength: 50 },
  routeType: { kind: "string", enum: ["number","extension","voicemail","conditional"], maxLength: 25, required: true },
  numberValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "ref", ref: "Ivr", required: true },
  welcomeLocution: { kind: "ref", ref: "Locution" },
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  conditionalRoute: { kind: "ref", ref: "ConditionalRoute" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const IvrExcludedExtensionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "integer", required: true },
  extension: { kind: "integer", required: true },
};

export const IvrExcludedExtensionDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "ref", ref: "Ivr", required: true },
  extension: { kind: "ref", ref: "Extension", required: true },
};

export const IvrExcludedExtensionDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  ivr: { kind: "ref", ref: "Ivr", required: true },
  extension: { kind: "ref", ref: "Extension", required: true },
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
  survivalDevice: { kind: "integer" },
  userIds: { kind: "array" },
};

export const LocationCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 500 },
  survivalDevice: { kind: "integer" },
};

export const LocationDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 500 },
  id: { kind: "integer", readOnly: true },
  survivalDevice: { kind: "ref", ref: "SurvivalDevice" },
  userIds: { kind: "array" },
};

export const LocutionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  id: { kind: "integer", readOnly: true },
  encodedFile: { kind: "ref", ref: "Locution_EncodedFile" },
  originalFile: { kind: "ref", ref: "Locution_OriginalFile" },
};

export const LocutionCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  originalFile: { kind: "ref", ref: "Locution_OriginalFile" },
};

export const LocutionDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  status: { kind: "string", enum: ["pending","encoding","ready","error"], maxLength: 20 },
  id: { kind: "integer", readOnly: true },
  encodedFile: { kind: "ref", ref: "Locution_EncodedFile" },
  originalFile: { kind: "ref", ref: "Locution_OriginalFile" },
};

export const LocutionEncodedFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const LocutionOriginalFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const LogoFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const MatchListFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
  generic: { kind: "boolean", readOnly: true },
};

export const MatchListCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  generic: { kind: "boolean", readOnly: true },
};

export const MatchListDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
  generic: { kind: "boolean", readOnly: true },
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

export const MetadataFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
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

export const NameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 50, default: "", required: true },
  es: { kind: "string", maxLength: 50, default: "", required: true },
  ca: { kind: "string", maxLength: 50, default: "", required: true },
  it: { kind: "string", maxLength: 50, default: "", required: true },
  eu: { kind: "string", maxLength: 50, default: "", required: true },
};

export const NotificationTemplateFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 55, required: true },
  type: { kind: "string", enum: ["voicemail","fax","limit","lowbalance","invoice","callCsv","maxDailyUsage","accessCredentials","onDemandRecord"], maxLength: 25, required: true },
  id: { kind: "integer", readOnly: true },
};

export const OutgoingDdiRuleFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  defaultAction: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  id: { kind: "integer", readOnly: true },
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
  forcedDdi: { kind: "ref", ref: "Ddi" },
};

export const OutgoingDdiRulesPatternFields: FieldMetaMap = {
  type: { kind: "string", enum: ["prefix","destination"], maxLength: 20, required: true },
  prefix: { kind: "string", maxLength: 10 },
  action: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  priority: { kind: "integer", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  outgoingDdiRule: { kind: "integer", required: true },
  matchList: { kind: "integer" },
  forcedDdi: { kind: "integer" },
};

export const OutgoingDdiRulesPatternDetailedFields: FieldMetaMap = {
  type: { kind: "string", enum: ["prefix","destination"], maxLength: 20, required: true },
  prefix: { kind: "string", maxLength: 10 },
  action: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  priority: { kind: "integer", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule", required: true },
  matchList: { kind: "ref", ref: "MatchList" },
  forcedDdi: { kind: "ref", ref: "Ddi" },
};

export const OutgoingDdiRulesPatternDetailedCollectionFields: FieldMetaMap = {
  type: { kind: "string", enum: ["prefix","destination"], maxLength: 20, required: true },
  prefix: { kind: "string", maxLength: 10 },
  action: { kind: "string", enum: ["keep","force"], maxLength: 10, required: true },
  priority: { kind: "integer", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule", required: true },
  matchList: { kind: "ref", ref: "MatchList" },
  forcedDdi: { kind: "ref", ref: "Ddi" },
};

export const PickUpGroupFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
};

export const PickUpGroupCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  userIds: { kind: "array" },
};

export const PickUpGroupDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
  userIds: { kind: "array" },
};

export const PickUpGroupWithUsersFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  id: { kind: "integer", readOnly: true },
  userIds: { kind: "array" },
};

export const PickUpRelUserFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  pickUpGroup: { kind: "integer", required: true },
  user: { kind: "integer", required: true },
};

export const PickUpRelUserDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  pickUpGroup: { kind: "ref", ref: "PickUpGroup", required: true },
  user: { kind: "ref", ref: "User", required: true },
};

export const PickUpRelUserDetailedCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  pickUpGroup: { kind: "ref", ref: "PickUpGroup", required: true },
  user: { kind: "ref", ref: "User", required: true },
};

export const ProfileFields: FieldMetaMap = {
  restricted: { kind: "boolean" },
  vpbx: { kind: "boolean" },
  residential: { kind: "boolean" },
  retail: { kind: "boolean" },
  wholesale: { kind: "boolean" },
  billingInfo: { kind: "boolean" },
  defaultCountryId: { kind: "integer" },
  defaultLocationId: { kind: "integer" },
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

export const QueueFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 128 },
  displayName: { kind: "string", maxLength: 50 },
  maxWaitTime: { kind: "integer" },
  timeoutTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  timeoutNumberValue: { kind: "string", maxLength: 25 },
  maxlen: { kind: "integer" },
  fullTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  fullNumberValue: { kind: "string", maxLength: 25 },
  periodicAnnounceFrequency: { kind: "integer" },
  announcePosition: { kind: "string", enum: ["yes","no"], maxLength: 10, default: "no" },
  announceFrequency: { kind: "integer" },
  memberCallRest: { kind: "integer" },
  memberCallTimeout: { kind: "integer" },
  strategy: { kind: "string", enum: ["ringall","leastrecent","fewestcalls","random","rrmemory","linear","wrandom","rrordered"], maxLength: 25 },
  weight: { kind: "integer" },
  preventMissedCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  periodicAnnounceLocution: { kind: "integer" },
  timeoutLocution: { kind: "integer" },
  timeoutExtension: { kind: "integer" },
  timeoutVoicemail: { kind: "integer" },
  fullLocution: { kind: "integer" },
  fullExtension: { kind: "integer" },
  fullVoicemail: { kind: "integer" },
  timeoutNumberCountry: { kind: "integer" },
  fullNumberCountry: { kind: "integer" },
};

export const QueueCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 128 },
  weight: { kind: "integer" },
  strategy: { kind: "string", enum: ["ringall","leastrecent","fewestcalls","random","rrmemory","linear","wrandom","rrordered"], maxLength: 25 },
  memberCallTimeout: { kind: "integer" },
  memberCallRest: { kind: "integer" },
  maxWaitTime: { kind: "integer" },
  maxlen: { kind: "integer" },
};

export const QueueDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 128 },
  displayName: { kind: "string", maxLength: 50 },
  maxWaitTime: { kind: "integer" },
  timeoutTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  timeoutNumberValue: { kind: "string", maxLength: 25 },
  maxlen: { kind: "integer" },
  fullTargetType: { kind: "string", enum: ["number","extension","voicemail"], maxLength: 25 },
  fullNumberValue: { kind: "string", maxLength: 25 },
  periodicAnnounceFrequency: { kind: "integer" },
  announcePosition: { kind: "string", enum: ["yes","no"], maxLength: 10, default: "no" },
  announceFrequency: { kind: "integer" },
  memberCallRest: { kind: "integer" },
  memberCallTimeout: { kind: "integer" },
  strategy: { kind: "string", enum: ["ringall","leastrecent","fewestcalls","random","rrmemory","linear","wrandom","rrordered"], maxLength: 25 },
  weight: { kind: "integer" },
  preventMissedCalls: { kind: "integer", minimum: 0, default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  periodicAnnounceLocution: { kind: "ref", ref: "Locution" },
  timeoutLocution: { kind: "ref", ref: "Locution" },
  timeoutExtension: { kind: "ref", ref: "Extension" },
  timeoutVoicemail: { kind: "ref", ref: "Voicemail" },
  fullLocution: { kind: "ref", ref: "Locution" },
  fullExtension: { kind: "ref", ref: "Extension" },
  fullVoicemail: { kind: "ref", ref: "Voicemail" },
  timeoutNumberCountry: { kind: "ref", ref: "Country" },
  fullNumberCountry: { kind: "ref", ref: "Country" },
};

export const QueueMemberFields: FieldMetaMap = {
  penalty: { kind: "integer" },
  id: { kind: "integer", readOnly: true },
  queue: { kind: "integer", required: true },
  user: { kind: "integer", required: true },
};

export const QueueMemberDetailedFields: FieldMetaMap = {
  penalty: { kind: "integer" },
  id: { kind: "integer", readOnly: true },
  queue: { kind: "ref", ref: "Queue", required: true },
  user: { kind: "ref", ref: "User", required: true },
};

export const QueueMemberDetailedCollectionFields: FieldMetaMap = {
  penalty: { kind: "integer" },
  id: { kind: "integer", readOnly: true },
  queue: { kind: "ref", ref: "Queue", required: true },
  user: { kind: "ref", ref: "User", required: true },
};

export const RatingPlanGroupFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
  description: { kind: "ref", ref: "RatingPlanGroup_Description" },
};

export const RatingPlanGroupCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
};

export const RatingPlanGroupDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "RatingPlanGroup_Name" },
  description: { kind: "ref", ref: "RatingPlanGroup_Description" },
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

export const RatingPlanPricesFields: FieldMetaMap = {
  ratingPlan: { kind: "string" },
  name: { kind: "string" },
  prefix: { kind: "string" },
  connectFee: { kind: "number" },
  cost: { kind: "number" },
  rateIncrement: { kind: "string" },
  groupIntervalStart: { kind: "string" },
  timeIn: { kind: "string" },
  days: { kind: "string" },
};

export const RatingProfileCollectionFields: FieldMetaMap = {
  activationTime: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  id: { kind: "integer", readOnly: true },
  ratingPlanGroup: { kind: "integer", required: true },
  routingTag: { kind: "integer" },
};

export const RatingProfileDetailedFields: FieldMetaMap = {
  activationTime: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  id: { kind: "integer", readOnly: true },
  ratingPlanGroup: { kind: "ref", ref: "RatingPlanGroup", required: true },
  routingTag: { kind: "ref", ref: "RoutingTag" },
};

export const RecordingFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  type: { kind: "string", enum: ["ondemand","ddi"], maxLength: 25, default: "ddi", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  recorder: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
  recordedFile: { kind: "ref", ref: "Recording_RecordedFile" },
  usersCdr: { kind: "integer" },
  ddi: { kind: "integer" },
  user: { kind: "integer" },
  billableCall: { kind: "integer" },
};

export const RecordingCollectionFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  type: { kind: "string", enum: ["ondemand","ddi"], maxLength: 25, default: "ddi", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  recorder: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
};

export const RecordingDetailedFields: FieldMetaMap = {
  callid: { kind: "string", maxLength: 255 },
  calldate: { kind: "string", format: "date-time", default: "CURRENT_TIMESTAMP", required: true },
  type: { kind: "string", enum: ["ondemand","ddi"], maxLength: 25, default: "ddi", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  recorder: { kind: "string", maxLength: 128 },
  id: { kind: "integer", readOnly: true },
  recordedFile: { kind: "ref", ref: "Recording_RecordedFile" },
  usersCdr: { kind: "ref", ref: "UsersCdr" },
  ddi: { kind: "ref", ref: "Ddi" },
  user: { kind: "ref", ref: "User" },
  billableCall: { kind: "ref", ref: "BillableCall" },
};

export const RecordingRecordedFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const RegistrationStatusFields: FieldMetaMap = {
  contact: { kind: "string" },
  publicContact: { kind: "boolean" },
  received: { kind: "string" },
  publicReceived: { kind: "boolean" },
  expires: { kind: "string" },
  userAgent: { kind: "string" },
};

export const ResidentialDeviceFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, readOnly: true },
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
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
  language: { kind: "integer" },
};

export const ResidentialDeviceCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, readOnly: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  domain: { kind: "integer" },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const ResidentialDeviceDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, readOnly: true },
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
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  language: { kind: "ref", ref: "Language" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const ResidentialDeviceStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, readOnly: true },
  domainName: { kind: "string" },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const RetailAccountFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, readOnly: true },
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
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "integer" },
  outgoingDdi: { kind: "integer" },
};

export const RetailAccountCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, readOnly: true },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  domain: { kind: "integer" },
};

export const RetailAccountDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 65, readOnly: true },
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
  trustSDP: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const RetailAccountStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, readOnly: true },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  domainName: { kind: "string" },
};

export const RetailAccountStatusItemFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 65, readOnly: true },
  directConnectivity: { kind: "string", enum: ["yes","no"], default: "yes", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
  domainName: { kind: "string" },
};

export const RouteLockFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 100, default: "", required: true },
  open: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  closeExtension: { kind: "string", readOnly: true },
  openExtension: { kind: "string", readOnly: true },
  toggleExtension: { kind: "string", readOnly: true },
};

export const RouteLockCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 100, default: "", required: true },
  open: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  closeExtension: { kind: "string", readOnly: true },
  openExtension: { kind: "string", readOnly: true },
  toggleExtension: { kind: "string", readOnly: true },
};

export const RouteLockDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  description: { kind: "string", maxLength: 100, default: "", required: true },
  open: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  closeExtension: { kind: "string", readOnly: true },
  openExtension: { kind: "string", readOnly: true },
  toggleExtension: { kind: "string", readOnly: true },
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

export const ScheduleFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeIn: { kind: "string", format: "time", required: true },
  timeout: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 0 },
  tuesday: { kind: "boolean", default: 0 },
  wednesday: { kind: "boolean", default: 0 },
  thursday: { kind: "boolean", default: 0 },
  friday: { kind: "boolean", default: 0 },
  saturday: { kind: "boolean", default: 0 },
  sunday: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
};

export const ScheduleCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeIn: { kind: "string", format: "time", required: true },
  timeout: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 0 },
  tuesday: { kind: "boolean", default: 0 },
  wednesday: { kind: "boolean", default: 0 },
  thursday: { kind: "boolean", default: 0 },
  friday: { kind: "boolean", default: 0 },
  saturday: { kind: "boolean", default: 0 },
  sunday: { kind: "boolean", default: 0 },
  id: { kind: "integer", readOnly: true },
};

export const ScheduleDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  timeIn: { kind: "string", format: "time", required: true },
  timeout: { kind: "string", format: "time", required: true },
  monday: { kind: "boolean", default: 0 },
  tuesday: { kind: "boolean", default: 0 },
  wednesday: { kind: "boolean", default: 0 },
  thursday: { kind: "boolean", default: 0 },
  friday: { kind: "boolean", default: 0 },
  saturday: { kind: "boolean", default: 0 },
  sunday: { kind: "boolean", default: 0 },
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

export const SurvivalDeviceFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 80, required: true },
  proxy: { kind: "string", maxLength: 80, required: true },
  outboundProxy: { kind: "string", maxLength: 80 },
  udpPort: { kind: "integer", minimum: 0, default: 5060, required: true },
  tcpPort: { kind: "integer", minimum: 0, default: 5060, required: true },
  tlsPort: { kind: "integer", minimum: 0, default: 5061, required: true },
  wssPort: { kind: "integer", minimum: 0, default: 10081, required: true },
  description: { kind: "string", maxLength: 1024 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
};

export const SurvivalDeviceCollectionFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 80, required: true },
  proxy: { kind: "string", maxLength: 80, required: true },
  description: { kind: "string", maxLength: 1024 },
  id: { kind: "integer", readOnly: true },
};

export const SurvivalDeviceDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 80, required: true },
  proxy: { kind: "string", maxLength: 80, required: true },
  outboundProxy: { kind: "string", maxLength: 80 },
  udpPort: { kind: "integer", minimum: 0, default: 5060, required: true },
  tcpPort: { kind: "integer", minimum: 0, default: 5060, required: true },
  tlsPort: { kind: "integer", minimum: 0, default: 5061, required: true },
  wssPort: { kind: "integer", minimum: 0, default: 10081, required: true },
  description: { kind: "string", maxLength: 1024 },
  id: { kind: "integer", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
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
  lastProvisionDate: { kind: "string", format: "date-time", readOnly: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  terminalModel: { kind: "integer" },
};

export const TerminalCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  mac: { kind: "string", maxLength: 12 },
  lastProvisionDate: { kind: "string", format: "date-time", readOnly: true },
  domain: { kind: "integer" },
  terminalModel: { kind: "integer" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const TerminalDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 100, required: true },
  disallow: { kind: "string", maxLength: 200, default: "all", required: true },
  allowAudio: { kind: "string", maxLength: 200, default: "alaw", required: true },
  allowVideo: { kind: "string", maxLength: 200 },
  directMediaMethod: { kind: "string", enum: ["update","invite","reinvite"], maxLength: 25, default: "update", required: true },
  password: { kind: "string", maxLength: 25, default: "", required: true },
  mac: { kind: "string", maxLength: 12 },
  lastProvisionDate: { kind: "string", format: "date-time", readOnly: true },
  t38Passthrough: { kind: "string", enum: ["yes","no"], default: "no", required: true },
  rtpEncryption: { kind: "boolean", default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  terminalModel: { kind: "ref", ref: "TerminalModel" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const TerminalStatusFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  domainName: { kind: "string" },
  status: { kind: "array", itemsRef: "RegistrationStatus" },
};

export const TerminalModelFields: FieldMetaMap = {
  iden: { kind: "string", maxLength: 100, required: true },
  name: { kind: "string", maxLength: 100, default: "", required: true },
  description: { kind: "string", maxLength: 500, default: "", required: true },
  id: { kind: "integer", readOnly: true },
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
  id: { kind: "integer", readOnly: true },
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
};

export const TransformationRuleSetCollectionFields: FieldMetaMap = {
  description: { kind: "string", maxLength: 250 },
  internationalCode: { kind: "string", maxLength: 10, default: "00" },
  trunkPrefix: { kind: "string", maxLength: 5, default: "" },
  areaCode: { kind: "string", maxLength: 5, default: "" },
  nationalLen: { kind: "integer", minimum: 0, default: 9 },
  id: { kind: "integer", readOnly: true },
  name: { kind: "ref", ref: "TransformationRuleSet_Name" },
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
};

export const TransformationRuleSetNameFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 100, required: true },
  es: { kind: "string", maxLength: 100, required: true },
  ca: { kind: "string", maxLength: 100, required: true },
  it: { kind: "string", maxLength: 100, required: true },
  eu: { kind: "string", maxLength: 100, required: true },
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
  callAcl: { kind: "integer" },
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
  voicemail: { kind: "integer", required: true },
  contact: { kind: "integer", required: true },
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
};

export const UserDetailedFields: FieldMetaMap = {
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
  callAcl: { kind: "ref", ref: "CallAcl" },
  bossAssistant: { kind: "ref", ref: "User" },
  bossAssistantWhiteList: { kind: "ref", ref: "MatchList" },
  transformationRuleSet: { kind: "ref", ref: "TransformationRuleSet" },
  language: { kind: "ref", ref: "Language" },
  terminal: { kind: "ref", ref: "Terminal" },
  extension: { kind: "ref", ref: "Extension" },
  timezone: { kind: "ref", ref: "Timezone" },
  outgoingDdi: { kind: "ref", ref: "Ddi" },
  outgoingDdiRule: { kind: "ref", ref: "OutgoingDdiRule" },
  location: { kind: "ref", ref: "Location" },
  voicemail: { kind: "ref", ref: "Voicemail", required: true },
  contact: { kind: "ref", ref: "Contact", required: true },
  pickupGroupIds: { kind: "array" },
};

export const UsersCdrFields: FieldMetaMap = {
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  direction: { kind: "string", enum: ["inbound","outbound"], maxLength: 8, default: "outbound" },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  owner: { kind: "string", maxLength: 128 },
  callid: { kind: "string", maxLength: 255 },
  disposition: { kind: "string", enum: ["answered","missed","busy","error"], maxLength: 8, default: "answered" },
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer" },
  friend: { kind: "integer" },
  extension: { kind: "integer" },
};

export const UsersCdrCollectionFields: FieldMetaMap = {
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  owner: { kind: "string", maxLength: 128 },
  direction: { kind: "string", enum: ["inbound","outbound"], maxLength: 8, default: "outbound" },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  duration: { kind: "number", format: "float", default: 0, required: true },
  disposition: { kind: "string", enum: ["answered","missed","busy","error"], maxLength: 8, default: "answered" },
  id: { kind: "integer", readOnly: true },
};

export const UsersCdrDetailedFields: FieldMetaMap = {
  startTime: { kind: "string", format: "date-time", default: "2000-01-01 00:00:00", required: true },
  duration: { kind: "number", format: "float", default: 0, required: true },
  direction: { kind: "string", enum: ["inbound","outbound"], maxLength: 8, default: "outbound" },
  caller: { kind: "string", maxLength: 128 },
  callee: { kind: "string", maxLength: 128 },
  owner: { kind: "string", maxLength: 128 },
  callid: { kind: "string", maxLength: 255 },
  disposition: { kind: "string", enum: ["answered","missed","busy","error"], maxLength: 8, default: "answered" },
  numRecordings: { kind: "integer", minimum: 0, default: 0, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User" },
  friend: { kind: "ref", ref: "Friend" },
  extension: { kind: "ref", ref: "Extension" },
};

export const VoicemailFields: FieldMetaMap = {
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, required: true },
  email: { kind: "string", maxLength: 200 },
  sendMail: { kind: "boolean", default: 0, required: true },
  attachSound: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer", readOnly: true },
  residentialDevice: { kind: "integer", readOnly: true },
  company: { kind: "integer", required: true },
  locution: { kind: "integer" },
};

export const VoicemailCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, required: true },
  email: { kind: "string", maxLength: 200 },
  user: { kind: "integer", readOnly: true },
  residentialDevice: { kind: "integer", readOnly: true },
};

export const VoicemailDetailedFields: FieldMetaMap = {
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, required: true },
  email: { kind: "string", maxLength: 200 },
  sendMail: { kind: "boolean", default: 0, required: true },
  attachSound: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User", readOnly: true },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  locution: { kind: "ref", ref: "Locution" },
  relUserIds: { kind: "array" },
};

export const VoicemailWithRelUsersFields: FieldMetaMap = {
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, required: true },
  email: { kind: "string", maxLength: 200 },
  sendMail: { kind: "boolean", default: 0, required: true },
  attachSound: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User", readOnly: true },
  residentialDevice: { kind: "ref", ref: "ResidentialDevice", readOnly: true },
  company: { kind: "ref", ref: "Company", required: true },
  locution: { kind: "ref", ref: "Locution" },
  relUserIds: { kind: "array" },
};

export const VoicemailMessageCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  folder: { kind: "string", maxLength: 64, required: true },
  calldate: { kind: "string", format: "date-time", required: true },
  caller: { kind: "string", maxLength: 128 },
  duration: { kind: "integer" },
};

export const VoicemailMessageDetailedFields: FieldMetaMap = {
  calldate: { kind: "string", format: "date-time", required: true },
  folder: { kind: "string", maxLength: 64, required: true },
  caller: { kind: "string", maxLength: 128 },
  duration: { kind: "integer" },
  id: { kind: "integer", readOnly: true },
  recordingFile: { kind: "ref", ref: "VoicemailMessage_RecordingFile" },
  metadataFile: { kind: "ref", ref: "MetadataFile" },
  voicemail: { kind: "ref", ref: "Voicemail", required: true },
};

export const VoicemailMessageRecordingFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const VoicemailRelUserFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer", required: true },
  voicemail: { kind: "integer", required: true },
};

export const VoicemailRelUserCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer", required: true },
  voicemail: { kind: "integer", required: true },
};

export const VoicemailRelUserDetailedFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User", required: true },
  voicemail: { kind: "ref", ref: "Voicemail", required: true },
};

export const WebPortalCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  url: { kind: "string", maxLength: 255, required: true },
  name: { kind: "string", maxLength: 200, default: "" },
  urlType: { kind: "string", enum: ["god","brand","admin","user"], maxLength: 25, required: true },
  logo: { kind: "ref", ref: "Logo" },
  company: { kind: "integer" },
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
  ActiveCalls: ActiveCallsFields,
  BillableCall: BillableCallFields,
  "BillableCall-collection": BillableCallCollectionFields,
  "BillableCall-detailed": BillableCallDetailedFields,
  Calendar: CalendarFields,
  "Calendar-collection": CalendarCollectionFields,
  "Calendar-detailed": CalendarDetailedFields,
  CalendarPeriod: CalendarPeriodFields,
  "CalendarPeriod-collection": CalendarPeriodCollectionFields,
  "CalendarPeriod-detailed": CalendarPeriodDetailedFields,
  CalendarPeriodsRelSchedule: CalendarPeriodsRelScheduleFields,
  "CalendarPeriodsRelSchedule-detailed": CalendarPeriodsRelScheduleDetailedFields,
  "CalendarPeriodsRelSchedule-detailedCollection": CalendarPeriodsRelScheduleDetailedCollectionFields,
  CallAcl: CallAclFields,
  "CallAcl-collection": CallAclCollectionFields,
  "CallAcl-detailed": CallAclDetailedFields,
  CallAclRelMatchList: CallAclRelMatchListFields,
  "CallAclRelMatchList-detailed": CallAclRelMatchListDetailedFields,
  "CallAclRelMatchList-detailedCollection": CallAclRelMatchListDetailedCollectionFields,
  "CallCsvReport-collection": CallCsvReportCollectionFields,
  "CallCsvReport-detailed": CallCsvReportDetailedFields,
  CallCsvReport_Csv: CallCsvReportCsvFields,
  CallCsvScheduler: CallCsvSchedulerFields,
  "CallCsvScheduler-collection": CallCsvSchedulerCollectionFields,
  "CallCsvScheduler-detailed": CallCsvSchedulerDetailedFields,
  CallForwardSetting: CallForwardSettingFields,
  "CallForwardSetting-collection": CallForwardSettingCollectionFields,
  "CallForwardSetting-detailed": CallForwardSettingDetailedFields,
  "ChannelUsage-collection": ChannelUsageCollectionFields,
  Company: CompanyFields,
  "Company-collection": CompanyCollectionFields,
  "Company-detailed": CompanyDetailedFields,
  CompanyService: CompanyServiceFields,
  "CompanyService-collection": CompanyServiceCollectionFields,
  "CompanyService-detailed": CompanyServiceDetailedFields,
  ConditionalRoute: ConditionalRouteFields,
  "ConditionalRoute-collection": ConditionalRouteCollectionFields,
  "ConditionalRoute-detailed": ConditionalRouteDetailedFields,
  ConditionalRoutesCondition: ConditionalRoutesConditionFields,
  "ConditionalRoutesCondition-collection": ConditionalRoutesConditionCollectionFields,
  "ConditionalRoutesCondition-detailed": ConditionalRoutesConditionDetailedFields,
  "ConditionalRoutesCondition-withInverseRelationships": ConditionalRoutesConditionWithInverseRelationshipsFields,
  ConditionalRoutesConditionsRelCalendar: ConditionalRoutesConditionsRelCalendarFields,
  "ConditionalRoutesConditionsRelCalendar-detailed": ConditionalRoutesConditionsRelCalendarDetailedFields,
  "ConditionalRoutesConditionsRelCalendar-detailedCollection": ConditionalRoutesConditionsRelCalendarDetailedCollectionFields,
  ConditionalRoutesConditionsRelMatchlist: ConditionalRoutesConditionsRelMatchlistFields,
  "ConditionalRoutesConditionsRelMatchlist-detailed": ConditionalRoutesConditionsRelMatchlistDetailedFields,
  "ConditionalRoutesConditionsRelMatchlist-detailedCollection": ConditionalRoutesConditionsRelMatchlistDetailedCollectionFields,
  ConditionalRoutesConditionsRelRouteLock: ConditionalRoutesConditionsRelRouteLockFields,
  "ConditionalRoutesConditionsRelRouteLock-detailed": ConditionalRoutesConditionsRelRouteLockDetailedFields,
  "ConditionalRoutesConditionsRelRouteLock-detailedCollection": ConditionalRoutesConditionsRelRouteLockDetailedCollectionFields,
  ConditionalRoutesConditionsRelSchedule: ConditionalRoutesConditionsRelScheduleFields,
  "ConditionalRoutesConditionsRelSchedule-detailed": ConditionalRoutesConditionsRelScheduleDetailedFields,
  "ConditionalRoutesConditionsRelSchedule-detailedCollection": ConditionalRoutesConditionsRelScheduleDetailedCollectionFields,
  ConferenceRoom: ConferenceRoomFields,
  "ConferenceRoom-collection": ConferenceRoomCollectionFields,
  "ConferenceRoom-detailed": ConferenceRoomDetailedFields,
  Contact: ContactFields,
  "Contact-collection": ContactCollectionFields,
  "Contact-detailed": ContactDetailedFields,
  Country: CountryFields,
  "Country-collection": CountryCollectionFields,
  "Country-detailed": CountryDetailedFields,
  Country_Name: CountryNameFields,
  Country_Zone: CountryZoneFields,
  Dashboard: DashboardFields,
  DashboardBillableCall: DashboardBillableCallFields,
  DashboardClient: DashboardClientFields,
  DashboardResidentialDevice: DashboardResidentialDeviceFields,
  DashboardRetailAccount: DashboardRetailAccountFields,
  DashboardUser: DashboardUserFields,
  Ddi: DdiFields,
  "Ddi-collection": DdiCollectionFields,
  "Ddi-detailed": DdiDetailedFields,
  "Domain-collection": DomainCollectionFields,
  Extension: ExtensionFields,
  "Extension-collection": ExtensionCollectionFields,
  "Extension-detailed": ExtensionDetailedFields,
  ExtensionsMassImport: ExtensionsMassImportFields,
  ExternalCallFilter: ExternalCallFilterFields,
  "ExternalCallFilter-collection": ExternalCallFilterCollectionFields,
  "ExternalCallFilter-detailed": ExternalCallFilterDetailedFields,
  "ExternalCallFilter-withInverseRelationships": ExternalCallFilterWithInverseRelationshipsFields,
  ExternalCallFilterBlackList: ExternalCallFilterBlackListFields,
  "ExternalCallFilterBlackList-detailed": ExternalCallFilterBlackListDetailedFields,
  "ExternalCallFilterBlackList-detailedCollection": ExternalCallFilterBlackListDetailedCollectionFields,
  ExternalCallFilterRelCalendar: ExternalCallFilterRelCalendarFields,
  "ExternalCallFilterRelCalendar-detailed": ExternalCallFilterRelCalendarDetailedFields,
  "ExternalCallFilterRelCalendar-detailedCollection": ExternalCallFilterRelCalendarDetailedCollectionFields,
  ExternalCallFilterRelSchedule: ExternalCallFilterRelScheduleFields,
  "ExternalCallFilterRelSchedule-detailed": ExternalCallFilterRelScheduleDetailedFields,
  "ExternalCallFilterRelSchedule-detailedCollection": ExternalCallFilterRelScheduleDetailedCollectionFields,
  ExternalCallFilterWhiteList: ExternalCallFilterWhiteListFields,
  "ExternalCallFilterWhiteList-detailed": ExternalCallFilterWhiteListDetailedFields,
  "ExternalCallFilterWhiteList-detailedCollection": ExternalCallFilterWhiteListDetailedCollectionFields,
  Fax: FaxFields,
  "Fax-collection": FaxCollectionFields,
  "Fax-detailed": FaxDetailedFields,
  FaxesInOut: FaxesInOutFields,
  "FaxesInOut-collection": FaxesInOutCollectionFields,
  "FaxesInOut-detailed": FaxesInOutDetailedFields,
  FaxesInOut_File: FaxesInOutFileFields,
  Feature: FeatureFields,
  "FeaturesRelCompany-detailed": FeaturesRelCompanyDetailedFields,
  "FeaturesRelCompany-detailedCollection": FeaturesRelCompanyDetailedCollectionFields,
  Friend: FriendFields,
  "Friend-collection": FriendCollectionFields,
  "Friend-detailed": FriendDetailedFields,
  "Friend-status": FriendStatusFields,
  FriendsPattern: FriendsPatternFields,
  "FriendsPattern-collection": FriendsPatternCollectionFields,
  "FriendsPattern-detailed": FriendsPatternDetailedFields,
  HolidayDate: HolidayDateFields,
  "HolidayDate-collection": HolidayDateCollectionFields,
  "HolidayDate-detailed": HolidayDateDetailedFields,
  HolidayDateRange: HolidayDateRangeFields,
  HolidaysMassImport: HolidaysMassImportFields,
  HuntGroup: HuntGroupFields,
  "HuntGroup-collection": HuntGroupCollectionFields,
  "HuntGroup-detailed": HuntGroupDetailedFields,
  HuntGroupMember: HuntGroupMemberFields,
  "HuntGroupMember-detailed": HuntGroupMemberDetailedFields,
  "HuntGroupMember-detailedCollection": HuntGroupMemberDetailedCollectionFields,
  "Invoice-collection": InvoiceCollectionFields,
  "Invoice-detailed": InvoiceDetailedFields,
  Invoice_Pdf: InvoicePdfFields,
  Invoicing: InvoicingFields,
  Ivr: IvrFields,
  "Ivr-collection": IvrCollectionFields,
  "Ivr-detailed": IvrDetailedFields,
  "Ivr-withExcludedExtensions": IvrWithExcludedExtensionsFields,
  IvrEntry: IvrEntryFields,
  "IvrEntry-collection": IvrEntryCollectionFields,
  "IvrEntry-detailed": IvrEntryDetailedFields,
  IvrExcludedExtension: IvrExcludedExtensionFields,
  "IvrExcludedExtension-detailed": IvrExcludedExtensionDetailedFields,
  "IvrExcludedExtension-detailedCollection": IvrExcludedExtensionDetailedCollectionFields,
  Language: LanguageFields,
  "Language-collection": LanguageCollectionFields,
  "Language-detailed": LanguageDetailedFields,
  Language_Name: LanguageNameFields,
  Location: LocationFields,
  "Location-collection": LocationCollectionFields,
  "Location-detailed": LocationDetailedFields,
  Locution: LocutionFields,
  "Locution-collection": LocutionCollectionFields,
  "Locution-detailed": LocutionDetailedFields,
  Locution_EncodedFile: LocutionEncodedFileFields,
  Locution_OriginalFile: LocutionOriginalFileFields,
  Logo: LogoFields,
  MatchList: MatchListFields,
  "MatchList-collection": MatchListCollectionFields,
  "MatchList-detailed": MatchListDetailedFields,
  MatchListPattern: MatchListPatternFields,
  "MatchListPattern-collection": MatchListPatternCollectionFields,
  "MatchListPattern-detailed": MatchListPatternDetailedFields,
  MetadataFile: MetadataFileFields,
  MusicOnHold: MusicOnHoldFields,
  "MusicOnHold-collection": MusicOnHoldCollectionFields,
  "MusicOnHold-detailed": MusicOnHoldDetailedFields,
  MusicOnHold_EncodedFile: MusicOnHoldEncodedFileFields,
  MusicOnHold_OriginalFile: MusicOnHoldOriginalFileFields,
  Name: NameFields,
  NotificationTemplate: NotificationTemplateFields,
  OutgoingDdiRule: OutgoingDdiRuleFields,
  "OutgoingDdiRule-collection": OutgoingDdiRuleCollectionFields,
  "OutgoingDdiRule-detailed": OutgoingDdiRuleDetailedFields,
  OutgoingDdiRulesPattern: OutgoingDdiRulesPatternFields,
  "OutgoingDdiRulesPattern-detailed": OutgoingDdiRulesPatternDetailedFields,
  "OutgoingDdiRulesPattern-detailedCollection": OutgoingDdiRulesPatternDetailedCollectionFields,
  PickUpGroup: PickUpGroupFields,
  "PickUpGroup-collection": PickUpGroupCollectionFields,
  "PickUpGroup-detailed": PickUpGroupDetailedFields,
  "PickUpGroup-withUsers": PickUpGroupWithUsersFields,
  PickUpRelUser: PickUpRelUserFields,
  "PickUpRelUser-detailed": PickUpRelUserDetailedFields,
  "PickUpRelUser-detailedCollection": PickUpRelUserDetailedCollectionFields,
  Profile: ProfileFields,
  ProfileAcl: ProfileAclFields,
  Queue: QueueFields,
  "Queue-collection": QueueCollectionFields,
  "Queue-detailed": QueueDetailedFields,
  QueueMember: QueueMemberFields,
  "QueueMember-detailed": QueueMemberDetailedFields,
  "QueueMember-detailedCollection": QueueMemberDetailedCollectionFields,
  RatingPlanGroup: RatingPlanGroupFields,
  "RatingPlanGroup-collection": RatingPlanGroupCollectionFields,
  "RatingPlanGroup-detailed": RatingPlanGroupDetailedFields,
  RatingPlanGroup_Description: RatingPlanGroupDescriptionFields,
  RatingPlanGroup_Name: RatingPlanGroupNameFields,
  RatingPlanPrices: RatingPlanPricesFields,
  "RatingProfile-collection": RatingProfileCollectionFields,
  "RatingProfile-detailed": RatingProfileDetailedFields,
  Recording: RecordingFields,
  "Recording-collection": RecordingCollectionFields,
  "Recording-detailed": RecordingDetailedFields,
  Recording_RecordedFile: RecordingRecordedFileFields,
  RegistrationStatus: RegistrationStatusFields,
  ResidentialDevice: ResidentialDeviceFields,
  "ResidentialDevice-collection": ResidentialDeviceCollectionFields,
  "ResidentialDevice-detailed": ResidentialDeviceDetailedFields,
  "ResidentialDevice-status": ResidentialDeviceStatusFields,
  RetailAccount: RetailAccountFields,
  "RetailAccount-collection": RetailAccountCollectionFields,
  "RetailAccount-detailed": RetailAccountDetailedFields,
  "RetailAccount-status": RetailAccountStatusFields,
  "RetailAccount-statusItem": RetailAccountStatusItemFields,
  RouteLock: RouteLockFields,
  "RouteLock-collection": RouteLockCollectionFields,
  "RouteLock-detailed": RouteLockDetailedFields,
  RoutingTag: RoutingTagFields,
  "RoutingTag-collection": RoutingTagCollectionFields,
  "RoutingTag-detailed": RoutingTagDetailedFields,
  Schedule: ScheduleFields,
  "Schedule-collection": ScheduleCollectionFields,
  "Schedule-detailed": ScheduleDetailedFields,
  Service: ServiceFields,
  "Service-collection": ServiceCollectionFields,
  "Service-detailed": ServiceDetailedFields,
  Service_Description: ServiceDescriptionFields,
  Service_Name: ServiceNameFields,
  SurvivalDevice: SurvivalDeviceFields,
  "SurvivalDevice-collection": SurvivalDeviceCollectionFields,
  "SurvivalDevice-detailed": SurvivalDeviceDetailedFields,
  TarificationInfo: TarificationInfoFields,
  Terminal: TerminalFields,
  "Terminal-collection": TerminalCollectionFields,
  "Terminal-detailed": TerminalDetailedFields,
  "Terminal-status": TerminalStatusFields,
  TerminalModel: TerminalModelFields,
  "TerminalModel-collection": TerminalModelCollectionFields,
  "TerminalModel-detailed": TerminalModelDetailedFields,
  Timezone: TimezoneFields,
  "Timezone-collection": TimezoneCollectionFields,
  "Timezone-detailed": TimezoneDetailedFields,
  Timezone_Label: TimezoneLabelFields,
  Token: TokenFields,
  TransformationRuleSet: TransformationRuleSetFields,
  "TransformationRuleSet-collection": TransformationRuleSetCollectionFields,
  "TransformationRuleSet-detailed": TransformationRuleSetDetailedFields,
  TransformationRuleSet_Name: TransformationRuleSetNameFields,
  User: UserFields,
  "User-collection": UserCollectionFields,
  "User-detailed": UserDetailedFields,
  UsersCdr: UsersCdrFields,
  "UsersCdr-collection": UsersCdrCollectionFields,
  "UsersCdr-detailed": UsersCdrDetailedFields,
  Voicemail: VoicemailFields,
  "Voicemail-collection": VoicemailCollectionFields,
  "Voicemail-detailed": VoicemailDetailedFields,
  "Voicemail-withRelUsers": VoicemailWithRelUsersFields,
  "VoicemailMessage-collection": VoicemailMessageCollectionFields,
  "VoicemailMessage-detailed": VoicemailMessageDetailedFields,
  VoicemailMessage_RecordingFile: VoicemailMessageRecordingFileFields,
  VoicemailRelUser: VoicemailRelUserFields,
  "VoicemailRelUser-collection": VoicemailRelUserCollectionFields,
  "VoicemailRelUser-detailed": VoicemailRelUserDetailedFields,
  "WebPortal-collection": WebPortalCollectionFields,
  WebTheme: WebThemeFields,
  Webhook: WebhookFields,
  "Webhook-collection": WebhookCollectionFields,
  "Webhook-detailed": WebhookDetailedFields,
};
