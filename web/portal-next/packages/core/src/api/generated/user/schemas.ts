/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/user/public/apiSpec.json
// Regenerate with: yarn codegen
// App: user  Spec: swagger 2.0  basePath: /api/user/

/** `CallForwardSetting` */
export interface CallForwardSetting {
  /** Max length 25. */
  callTypeFilter: "internal" | "external" | "both";
  /** Max length 25. */
  callForwardType: "inconditional" | "noAnswer" | "busy" | "userNotRegistered";
  /** Max length 25. */
  targetType?: "number" | "extension" | "voicemail" | "retail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  noAnswerTimeout: number;
  enabled: boolean;
  /** Read-only. */
  readonly id?: number | null;
  user?: number | null;
  extension?: number | null;
  voicemail?: number | null;
  numberCountry?: number | null;
}

/** `CallForwardSetting-detailed` — the `detailed` serialization of CallForwardSetting. */
export interface CallForwardSettingDetailed {
  /** Max length 25. */
  callTypeFilter: "internal" | "external" | "both";
  /** Max length 25. */
  callForwardType: "inconditional" | "noAnswer" | "busy" | "userNotRegistered";
  /** Max length 25. */
  targetType?: "number" | "extension" | "voicemail" | "retail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  noAnswerTimeout: number;
  enabled: boolean;
  /** Read-only. */
  readonly id?: number | null;
  user?: User | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  numberCountry?: Country | null;
}

/** `CallForwardSetting-detailedCollection` — the `detailedCollection` serialization of CallForwardSetting. */
export interface CallForwardSettingDetailedCollection {
  /** Max length 25. */
  callTypeFilter: "internal" | "external" | "both";
  /** Max length 25. */
  callForwardType: "inconditional" | "noAnswer" | "busy" | "userNotRegistered";
  /** Max length 25. */
  targetType?: "number" | "extension" | "voicemail" | "retail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  noAnswerTimeout: number;
  /** Read-only. */
  readonly id?: number | null;
  enabled: boolean;
  user?: User | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  numberCountry?: Country | null;
}

/** `CallStats` */
export interface CallStats {
  totalCalls?: number | null;
  totalDetours?: number | null;
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

/** `Dashboard` */
export interface Dashboard {
  userName?: string | null;
  userLastName?: string | null;
  extension?: string | null;
  terminal?: string | null;
  email?: string | null;
  outgoingDdi?: string | null;
  productName?: string | null;
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
  user?: number | null;
  numberCountry?: number | null;
  voicemail?: number | null;
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
}

/** `Fax-detailed` — the `detailed` serialization of Fax. */
export interface FaxDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  email?: string | null;
  sendByEmail: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Fax rel users */
  relUserIds?: Array<number> | null;
}

/** `FaxesInOut` */
export interface FaxesInOut {
  /** Read-only. */
  readonly calldate?: string | null;
  /** Read-only. Max length 128. */
  readonly src?: string | null;
  /** Max length 128. */
  dst?: string | null;
  /** Max length 20. */
  type?: "In" | "Out" | null;
  /** Max length 64. */
  pages?: string | null;
  /** Read-only. Max length 25. */
  readonly status?: "error" | "pending" | "inprogress" | "completed" | null;
  /** Read-only. */
  readonly id?: number | null;
  file?: FaxesInOutFile | null;
  fax: number;
  dstCountry?: number | null;
}

/** `FaxesInOut-collection` — the `collection` serialization of FaxesInOut. */
export interface FaxesInOutCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly calldate?: string | null;
  /** Read-only. Max length 128. */
  readonly src?: string | null;
  /** Max length 128. */
  dst?: string | null;
  /** Max length 20. */
  type?: "In" | "Out" | null;
  /** Read-only. Max length 25. */
  readonly status?: "error" | "pending" | "inprogress" | "completed" | null;
  file?: FaxesInOutFile | null;
}

/** `FaxesInOut-detailed` — the `detailed` serialization of FaxesInOut. */
export interface FaxesInOutDetailed {
  /** Read-only. */
  readonly calldate?: string | null;
  /** Read-only. Max length 128. */
  readonly src?: string | null;
  /** Max length 128. */
  dst?: string | null;
  /** Max length 20. */
  type?: "In" | "Out" | null;
  /** Max length 64. */
  pages?: string | null;
  /** Read-only. Max length 25. */
  readonly status?: "error" | "pending" | "inprogress" | "completed" | null;
  /** Read-only. */
  readonly id?: number | null;
  file?: FaxesInOutFile | null;
  fax: Fax;
  dstCountry?: Country | null;
}

/** `FaxesInOut_File` */
export interface FaxesInOutFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Label` */
export interface Label {
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

/** `LastMonthCalls` */
export interface LastMonthCalls {
  inbound?: number | null;
  outbound?: number | null;
  total?: number | null;
}

/** `MetadataFile` */
export interface MetadataFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Recording` */
export interface Recording {
  /** Max length 255. */
  callid?: string | null;
  calldate: string;
  /** Max length 25. */
  type: "ondemand" | "ddi";
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Max length 128. */
  recorder?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  recordedFile?: RecordingRecordedFile | null;
  usersCdr?: number | null;
  user?: number | null;
}

/** `Recording-collection` — the `collection` serialization of Recording. */
export interface RecordingCollection {
  /** Max length 255. */
  callid?: string | null;
  calldate: string;
  /** Max length 25. */
  type: "ondemand" | "ddi";
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Max length 128. */
  recorder?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Recording-detailed` — the `detailed` serialization of Recording. */
export interface RecordingDetailed {
  /** Max length 255. */
  callid?: string | null;
  calldate: string;
  /** Max length 25. */
  type: "ondemand" | "ddi";
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Max length 128. */
  recorder?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  recordedFile?: RecordingRecordedFile | null;
  usersCdr?: UsersCdr | null;
  user?: User | null;
}

/** `Recording_RecordedFile` */
export interface RecordingRecordedFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Timezone` */
export interface Timezone {
  /** Max length 255. */
  tz: string;
  /** Max length 150. */
  comment?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  label?: Label | null;
  country?: number | null;
}

/** `Timezone-collection` — the `collection` serialization of Timezone. */
export interface TimezoneCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 255. */
  tz: string;
}

/** `Token` */
export interface Token {
  token?: string | null;
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
  bossAssistant?: number | null;
  extension?: number | null;
  timezone?: number | null;
  voicemail: number;
}

/** `User-myProfile` — the `myProfile` serialization of User. */
export interface UserMyProfile {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname: string;
  /** Max length 100. */
  email?: string | null;
  doNotDisturb: boolean;
  isBoss: boolean;
  maxCalls: number;
  bossAssistant?: User | null;
  timezone?: Timezone | null;
}

/** `User-updateMyProfile` — the `updateMyProfile` serialization of User. */
export interface UserUpdateMyProfile {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 80. */
  pass?: string | null;
  /** required in order to update user password */
  oldPass?: string | null;
  /** Max length 100. */
  lastname: string;
  /** Max length 100. */
  email?: string | null;
  doNotDisturb: boolean;
  isBoss: boolean;
  maxCalls: number;
  bossAssistant?: User | null;
  timezone?: Timezone | null;
}

/** `UserStatus` */
export interface UserStatus {
  userName?: string | null;
  companyName?: string | null;
  companyDomain?: string | null;
  language?: string | null;
  voiceMail?: string | null;
  gsQRCode?: string | null;
  userAgent?: string | null;
  ipRegistered?: string | null;
  statusTerminal?: string | null;
  terminalName?: string | null;
  terminalPassword?: string | null;
  extensionNumber?: number | null;
  features?: Array<string> | null;
}

/** `UsersCdr` */
export interface UsersCdr {
  startTime: string;
  duration: number;
  /** Max length 8. */
  direction?: "inbound" | "outbound" | null;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Max length 128. */
  owner?: string | null;
  /** Max length 255. */
  callid?: string | null;
  /** Max length 8. */
  disposition?: "answered" | "missed" | "busy" | "error" | null;
  numRecordings: number;
  /** Read-only. */
  readonly id?: number | null;
  user?: number | null;
  extension?: number | null;
}

/** `UsersCdr-collection` — the `collection` serialization of UsersCdr. */
export interface UsersCdrCollection {
  numRecordings: number;
  startTime: string;
  /** Max length 128. */
  owner?: string | null;
  /** Max length 8. */
  direction?: "inbound" | "outbound" | null;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  duration: number;
  /** Max length 8. */
  disposition?: "answered" | "missed" | "busy" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `UsersCdr-detailed` — the `detailed` serialization of UsersCdr. */
export interface UsersCdrDetailed {
  startTime: string;
  duration: number;
  /** Max length 8. */
  direction?: "inbound" | "outbound" | null;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Max length 128. */
  owner?: string | null;
  /** Max length 255. */
  callid?: string | null;
  /** Max length 8. */
  disposition?: "answered" | "missed" | "busy" | "error" | null;
  numRecordings: number;
  /** Read-only. */
  readonly id?: number | null;
  user?: User | null;
  extension?: Extension | null;
}

/** `Voicemail` */
export interface Voicemail {
  enabled: boolean;
  /** Read-only. Max length 200. */
  readonly name?: string | null;
  /** Read-only. Max length 200. */
  readonly email?: string | null;
  sendMail: boolean;
  attachSound: boolean;
  /** Read-only. */
  readonly id?: number | null;
  user?: number | null;
}

/** `Voicemail-detailed` — the `detailed` serialization of Voicemail. */
export interface VoicemailDetailed {
  enabled: boolean;
  /** Read-only. Max length 200. */
  readonly name?: string | null;
  /** Read-only. Max length 200. */
  readonly email?: string | null;
  sendMail: boolean;
  attachSound: boolean;
  /** Read-only. */
  readonly id?: number | null;
  user?: User | null;
  /** Voicemail rel users */
  relUserIds?: Array<number> | null;
}

/** `VoicemailMessage-collection` — the `collection` serialization of VoicemailMessage. */
export interface VoicemailMessageCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 64. */
  folder: string;
  calldate: string;
  /** Max length 128. */
  caller?: string | null;
  duration?: number | null;
}

/** `VoicemailMessage-detailed` — the `detailed` serialization of VoicemailMessage. */
export interface VoicemailMessageDetailed {
  calldate: string;
  /** Max length 64. */
  folder: string;
  /** Max length 128. */
  caller?: string | null;
  duration?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  recordingFile?: VoicemailMessageRecordingFile | null;
  metadataFile?: MetadataFile | null;
  voicemail: Voicemail;
}

/** `VoicemailMessage_RecordingFile` */
export interface VoicemailMessageRecordingFile {
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
  CallForwardSetting: CallForwardSetting;
  "CallForwardSetting-detailed": CallForwardSettingDetailed;
  "CallForwardSetting-detailedCollection": CallForwardSettingDetailedCollection;
  CallStats: CallStats;
  Country: Country;
  "Country-collection": CountryCollection;
  "Country-detailed": CountryDetailed;
  Country_Name: CountryName;
  Country_Zone: CountryZone;
  Dashboard: Dashboard;
  Extension: Extension;
  Fax: Fax;
  "Fax-collection": FaxCollection;
  "Fax-detailed": FaxDetailed;
  FaxesInOut: FaxesInOut;
  "FaxesInOut-collection": FaxesInOutCollection;
  "FaxesInOut-detailed": FaxesInOutDetailed;
  FaxesInOut_File: FaxesInOutFile;
  Label: Label;
  LastMonthCalls: LastMonthCalls;
  MetadataFile: MetadataFile;
  Recording: Recording;
  "Recording-collection": RecordingCollection;
  "Recording-detailed": RecordingDetailed;
  Recording_RecordedFile: RecordingRecordedFile;
  Timezone: Timezone;
  "Timezone-collection": TimezoneCollection;
  Token: Token;
  User: User;
  "User-myProfile": UserMyProfile;
  "User-updateMyProfile": UserUpdateMyProfile;
  UserStatus: UserStatus;
  UsersCdr: UsersCdr;
  "UsersCdr-collection": UsersCdrCollection;
  "UsersCdr-detailed": UsersCdrDetailed;
  Voicemail: Voicemail;
  "Voicemail-detailed": VoicemailDetailed;
  "VoicemailMessage-collection": VoicemailMessageCollection;
  "VoicemailMessage-detailed": VoicemailMessageDetailed;
  VoicemailMessage_RecordingFile: VoicemailMessageRecordingFile;
  WebTheme: WebTheme;
}

export type DefinitionName = keyof Definitions;
