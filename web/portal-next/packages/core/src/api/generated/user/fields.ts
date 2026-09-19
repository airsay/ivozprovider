/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/user/public/apiSpec.json
// Regenerate with: yarn codegen
// App: user  Spec: swagger 2.0  basePath: /api/user/

import type { FieldMetaMap } from '../../fieldMeta';

export const CallForwardSettingFields: FieldMetaMap = {
  callTypeFilter: { kind: "string", enum: ["internal","external","both"], maxLength: 25, required: true },
  callForwardType: { kind: "string", enum: ["inconditional","noAnswer","busy","userNotRegistered"], maxLength: 25, required: true },
  targetType: { kind: "string", enum: ["number","extension","voicemail","retail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  noAnswerTimeout: { kind: "integer", default: 10, required: true },
  enabled: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer" },
  extension: { kind: "integer" },
  voicemail: { kind: "integer" },
  numberCountry: { kind: "integer" },
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
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const CallForwardSettingDetailedCollectionFields: FieldMetaMap = {
  callTypeFilter: { kind: "string", enum: ["internal","external","both"], maxLength: 25, required: true },
  callForwardType: { kind: "string", enum: ["inconditional","noAnswer","busy","userNotRegistered"], maxLength: 25, required: true },
  targetType: { kind: "string", enum: ["number","extension","voicemail","retail"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  noAnswerTimeout: { kind: "integer", default: 10, required: true },
  id: { kind: "integer", readOnly: true },
  enabled: { kind: "boolean", default: 1, required: true },
  user: { kind: "ref", ref: "User" },
  extension: { kind: "ref", ref: "Extension" },
  voicemail: { kind: "ref", ref: "Voicemail" },
  numberCountry: { kind: "ref", ref: "Country" },
};

export const CallStatsFields: FieldMetaMap = {
  totalCalls: { kind: "integer" },
  totalDetours: { kind: "integer" },
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
  userName: { kind: "string" },
  userLastName: { kind: "string" },
  extension: { kind: "string" },
  terminal: { kind: "string" },
  email: { kind: "string" },
  outgoingDdi: { kind: "string" },
  productName: { kind: "string" },
};

export const ExtensionFields: FieldMetaMap = {
  number: { kind: "string", maxLength: 10, required: true },
  routeType: { kind: "string", enum: ["user","number","ivr","huntGroup","conferenceRoom","friend","queue","conditional","voicemail","locution"], maxLength: 25 },
  numberValue: { kind: "string", maxLength: 25 },
  friendValue: { kind: "string", maxLength: 25 },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer" },
  numberCountry: { kind: "integer" },
  voicemail: { kind: "integer" },
};

export const FaxFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
};

export const FaxCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
};

export const FaxDetailedFields: FieldMetaMap = {
  name: { kind: "string", maxLength: 50, required: true },
  email: { kind: "string", maxLength: 255 },
  sendByEmail: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
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

export const LabelFields: FieldMetaMap = {
  en: { kind: "string", maxLength: 20, default: "", required: true },
  es: { kind: "string", maxLength: 20, default: "", required: true },
  ca: { kind: "string", maxLength: 20, default: "", required: true },
  it: { kind: "string", maxLength: 20, default: "", required: true },
  eu: { kind: "string", maxLength: 20, default: "", required: true },
};

export const LastMonthCallsFields: FieldMetaMap = {
  inbound: { kind: "integer" },
  outbound: { kind: "integer" },
  total: { kind: "integer" },
};

export const MetadataFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
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
  user: { kind: "integer" },
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
  user: { kind: "ref", ref: "User" },
};

export const RecordingRecordedFileFields: FieldMetaMap = {
  fileSize: { kind: "integer", minimum: 0 },
  mimeType: { kind: "string", maxLength: 80 },
  baseName: { kind: "string", maxLength: 255 },
};

export const TimezoneFields: FieldMetaMap = {
  tz: { kind: "string", maxLength: 255, required: true },
  comment: { kind: "string", maxLength: 150, default: "" },
  id: { kind: "integer", readOnly: true },
  label: { kind: "ref", ref: "Label" },
  country: { kind: "integer" },
};

export const TimezoneCollectionFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  tz: { kind: "string", maxLength: 255, required: true },
};

export const TokenFields: FieldMetaMap = {
  token: { kind: "string" },
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
  bossAssistant: { kind: "integer" },
  extension: { kind: "integer" },
  timezone: { kind: "integer" },
  voicemail: { kind: "integer", required: true },
};

export const UserMyProfileFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  lastname: { kind: "string", maxLength: 100, required: true },
  email: { kind: "string", maxLength: 100 },
  doNotDisturb: { kind: "boolean", default: 0, required: true },
  isBoss: { kind: "boolean", default: 0, required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  bossAssistant: { kind: "ref", ref: "User" },
  timezone: { kind: "ref", ref: "Timezone" },
};

export const UserUpdateMyProfileFields: FieldMetaMap = {
  id: { kind: "integer", readOnly: true },
  name: { kind: "string", maxLength: 100, required: true },
  pass: { kind: "string", maxLength: 80 },
  oldPass: { kind: "string" },
  lastname: { kind: "string", maxLength: 100, required: true },
  email: { kind: "string", maxLength: 100 },
  doNotDisturb: { kind: "boolean", default: 0, required: true },
  isBoss: { kind: "boolean", default: 0, required: true },
  maxCalls: { kind: "integer", minimum: 0, default: 0, required: true },
  bossAssistant: { kind: "ref", ref: "User" },
  timezone: { kind: "ref", ref: "Timezone" },
};

export const UserStatusFields: FieldMetaMap = {
  userName: { kind: "string" },
  companyName: { kind: "string" },
  companyDomain: { kind: "string" },
  language: { kind: "string" },
  voiceMail: { kind: "string" },
  gsQRCode: { kind: "string" },
  userAgent: { kind: "string" },
  ipRegistered: { kind: "string" },
  statusTerminal: { kind: "string" },
  terminalName: { kind: "string" },
  terminalPassword: { kind: "string" },
  extensionNumber: { kind: "integer" },
  features: { kind: "array" },
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
  extension: { kind: "ref", ref: "Extension" },
};

export const VoicemailFields: FieldMetaMap = {
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, readOnly: true },
  email: { kind: "string", maxLength: 200, readOnly: true },
  sendMail: { kind: "boolean", default: 0, required: true },
  attachSound: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "integer" },
};

export const VoicemailDetailedFields: FieldMetaMap = {
  enabled: { kind: "boolean", default: 1, required: true },
  name: { kind: "string", maxLength: 200, readOnly: true },
  email: { kind: "string", maxLength: 200, readOnly: true },
  sendMail: { kind: "boolean", default: 0, required: true },
  attachSound: { kind: "boolean", default: 1, required: true },
  id: { kind: "integer", readOnly: true },
  user: { kind: "ref", ref: "User" },
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

export const WebThemeFields: FieldMetaMap = {
  name: { kind: "string" },
  logo: { kind: "string" },
  color: { kind: "string" },
  title: { kind: "string" },
  productName: { kind: "string" },
};

/** Field metadata for every definition, keyed by wire name. */
export const fieldsByDefinition: Record<string, FieldMetaMap> = {
  CallForwardSetting: CallForwardSettingFields,
  "CallForwardSetting-detailed": CallForwardSettingDetailedFields,
  "CallForwardSetting-detailedCollection": CallForwardSettingDetailedCollectionFields,
  CallStats: CallStatsFields,
  Country: CountryFields,
  "Country-collection": CountryCollectionFields,
  "Country-detailed": CountryDetailedFields,
  Country_Name: CountryNameFields,
  Country_Zone: CountryZoneFields,
  Dashboard: DashboardFields,
  Extension: ExtensionFields,
  Fax: FaxFields,
  "Fax-collection": FaxCollectionFields,
  "Fax-detailed": FaxDetailedFields,
  FaxesInOut: FaxesInOutFields,
  "FaxesInOut-collection": FaxesInOutCollectionFields,
  "FaxesInOut-detailed": FaxesInOutDetailedFields,
  FaxesInOut_File: FaxesInOutFileFields,
  Label: LabelFields,
  LastMonthCalls: LastMonthCallsFields,
  MetadataFile: MetadataFileFields,
  Recording: RecordingFields,
  "Recording-collection": RecordingCollectionFields,
  "Recording-detailed": RecordingDetailedFields,
  Recording_RecordedFile: RecordingRecordedFileFields,
  Timezone: TimezoneFields,
  "Timezone-collection": TimezoneCollectionFields,
  Token: TokenFields,
  User: UserFields,
  "User-myProfile": UserMyProfileFields,
  "User-updateMyProfile": UserUpdateMyProfileFields,
  UserStatus: UserStatusFields,
  UsersCdr: UsersCdrFields,
  "UsersCdr-collection": UsersCdrCollectionFields,
  "UsersCdr-detailed": UsersCdrDetailedFields,
  Voicemail: VoicemailFields,
  "Voicemail-detailed": VoicemailDetailedFields,
  "VoicemailMessage-collection": VoicemailMessageCollectionFields,
  "VoicemailMessage-detailed": VoicemailMessageDetailedFields,
  VoicemailMessage_RecordingFile: VoicemailMessageRecordingFileFields,
  WebTheme: WebThemeFields,
};
