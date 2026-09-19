/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/client/public/apiSpec.json
// Regenerate with: yarn codegen
// App: client  Spec: swagger 2.0  basePath: /api/client/

/** `ActiveCalls` */
export interface ActiveCalls {
  inbound?: number | null;
  outbound?: number | null;
  total?: number | null;
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
  price?: number | null;
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
  numRecordings: number;
  /** Read-only. */
  readonly id?: number | null;
  ddi?: number | null;
}

/** `BillableCall-collection` — the `collection` serialization of BillableCall. */
export interface BillableCallCollection {
  numRecordings: number;
  startTime: string;
  direction: "inbound" | "outbound";
  duration: number;
  /** Max length 128. */
  caller?: string | null;
  /** Max length 128. */
  callee?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  price?: number | null;
  /** Max length 255. */
  callid?: string | null;
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
  price?: number | null;
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
  numRecordings: number;
  /** Read-only. */
  readonly id?: number | null;
  ddi?: Ddi | null;
}

/** `Calendar` */
export interface Calendar {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Calendar-collection` — the `collection` serialization of Calendar. */
export interface CalendarCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
}

/** `Calendar-detailed` — the `detailed` serialization of Calendar. */
export interface CalendarDetailed {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `CalendarPeriod` */
export interface CalendarPeriod {
  startDate: string;
  endDate: string;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  calendar: number;
  locution?: number | null;
  extension?: number | null;
  voicemail?: number | null;
  numberCountry?: number | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
}

/** `CalendarPeriod-collection` — the `collection` serialization of CalendarPeriod. */
export interface CalendarPeriodCollection {
  /** Read-only. */
  readonly id?: number | null;
  calendar: number;
  startDate: string;
  endDate: string;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  locution?: number | null;
  numberCountry?: number | null;
  /** Max length 25. */
  numberValue?: string | null;
  extension?: number | null;
  voicemail?: number | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
}

/** `CalendarPeriod-detailed` — the `detailed` serialization of CalendarPeriod. */
export interface CalendarPeriodDetailed {
  startDate: string;
  endDate: string;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  calendar: Calendar;
  locution?: Locution | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  numberCountry?: Country | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
}

/** `CalendarPeriodsRelSchedule` */
export interface CalendarPeriodsRelSchedule {
  /** Read-only. */
  readonly id?: number | null;
  calendarPeriod: number;
  schedule: number;
}

/** `CalendarPeriodsRelSchedule-detailed` — the `detailed` serialization of CalendarPeriodsRelSchedule. */
export interface CalendarPeriodsRelScheduleDetailed {
  /** Read-only. */
  readonly id?: number | null;
  calendarPeriod: CalendarPeriod;
  schedule: Schedule;
}

/** `CalendarPeriodsRelSchedule-detailedCollection` — the `detailedCollection` serialization of CalendarPeriodsRelSchedule. */
export interface CalendarPeriodsRelScheduleDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  calendarPeriod: CalendarPeriod;
  schedule: Schedule;
}

/** `CallAcl` */
export interface CallAcl {
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultPolicy: "allow" | "deny";
  /** Read-only. */
  readonly id?: number | null;
}

/** `CallAcl-collection` — the `collection` serialization of CallAcl. */
export interface CallAclCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultPolicy: "allow" | "deny";
}

/** `CallAcl-detailed` — the `detailed` serialization of CallAcl. */
export interface CallAclDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultPolicy: "allow" | "deny";
  /** Read-only. */
  readonly id?: number | null;
}

/** `CallAclRelMatchList` */
export interface CallAclRelMatchList {
  priority: number;
  /** Max length 25. */
  policy: "allow" | "deny";
  /** Read-only. */
  readonly id?: number | null;
  callAcl: number;
  matchList: number;
}

/** `CallAclRelMatchList-detailed` — the `detailed` serialization of CallAclRelMatchList. */
export interface CallAclRelMatchListDetailed {
  priority: number;
  /** Max length 25. */
  policy: "allow" | "deny";
  /** Read-only. */
  readonly id?: number | null;
  callAcl: CallAcl;
  matchList: MatchList;
}

/** `CallAclRelMatchList-detailedCollection` — the `detailedCollection` serialization of CallAclRelMatchList. */
export interface CallAclRelMatchListDetailedCollection {
  priority: number;
  /** Max length 25. */
  policy: "allow" | "deny";
  /** Read-only. */
  readonly id?: number | null;
  callAcl: CallAcl;
  matchList: MatchList;
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
  callCsvNotificationTemplate?: number | null;
  ddi?: number | null;
  retailAccount?: number | null;
  residentialDevice?: number | null;
  user?: number | null;
  fax?: number | null;
  friend?: number | null;
}

/** `CallCsvScheduler-collection` — the `collection` serialization of CallCsvScheduler. */
export interface CallCsvSchedulerCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 40. */
  name: string;
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
  callCsvNotificationTemplate?: NotificationTemplate | null;
  ddi?: Ddi | null;
  retailAccount?: RetailAccount | null;
  residentialDevice?: ResidentialDevice | null;
  user?: User | null;
  fax?: Fax | null;
  friend?: Friend | null;
}

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
  friend?: number | null;
  extension?: number | null;
  voicemail?: number | null;
  numberCountry?: number | null;
  residentialDevice?: number | null;
  retailAccount?: number | null;
  cfwToRetailAccount?: number | null;
  ddi?: number | null;
}

/** `CallForwardSetting-collection` — the `collection` serialization of CallForwardSetting. */
export interface CallForwardSettingCollection {
  /** Max length 25. */
  callTypeFilter: "internal" | "external" | "both";
  /** Max length 25. */
  callForwardType: "inconditional" | "noAnswer" | "busy" | "userNotRegistered";
  /** Max length 25. */
  targetType?: "number" | "extension" | "voicemail" | "retail" | null;
  /** Read-only. */
  readonly id?: number | null;
  enabled: boolean;
  /** Max length 25. */
  numberValue?: string | null;
  numberCountry?: number | null;
  user?: number | null;
  voicemail?: number | null;
  extension?: number | null;
  residentialDevice?: number | null;
  retailAccount?: number | null;
  cfwToRetailAccount?: number | null;
  ddi?: number | null;
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
  friend?: Friend | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  numberCountry?: Country | null;
  residentialDevice?: ResidentialDevice | null;
  retailAccount?: RetailAccount | null;
  cfwToRetailAccount?: RetailAccount | null;
  ddi?: Ddi | null;
}

/** `ChannelUsage-collection` — the `collection` serialization of ChannelUsage. */
export interface ChannelUsageCollection {
  timestamp: string;
  peak: number;
  avgUsage: number;
  maxCallsCompany: number;
  blockedByCompanyLimit: number;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Company` */
export interface Company {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Read-only. Max length 80. */
  readonly name?: string | null;
  /** Read-only. Max length 190. */
  readonly domainUsers?: string | null;
  /** Read-only. Max length 3. */
  readonly onDemandRecordCode?: string | null;
  /** Read-only. */
  readonly balance?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: Invoicing | null;
  language?: number | null;
  defaultTimezone?: number | null;
  country: number;
  transformationRuleSet?: number | null;
  outgoingDdi?: number | null;
  outgoingDdiRule?: number | null;
}

/** `Company-collection` — the `collection` serialization of Company. */
export interface CompanyCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 80. */
  readonly name?: string | null;
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  invoicing?: Invoicing | null;
  /** Registration domain Read-only. */
  readonly domainName?: string | null;
}

/** `Company-detailed` — the `detailed` serialization of Company. */
export interface CompanyDetailed {
  /** Max length 25. */
  type: "vpbx" | "retail" | "wholesale" | "residential";
  /** Read-only. Max length 80. */
  readonly name?: string | null;
  /** Read-only. Max length 190. */
  readonly domainUsers?: string | null;
  /** Read-only. Max length 3. */
  readonly onDemandRecordCode?: string | null;
  /** Read-only. */
  readonly balance?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  invoicing?: Invoicing | null;
  language?: Language | null;
  defaultTimezone?: Timezone | null;
  country: Country;
  transformationRuleSet?: TransformationRuleSet | null;
  outgoingDdi?: Ddi | null;
  outgoingDdiRule?: OutgoingDdiRule | null;
  /** Registration domain Read-only. */
  readonly domainName?: string | null;
}

/** `CompanyService` */
export interface CompanyService {
  /** Max length 3. */
  code: string;
  /** Read-only. */
  readonly id?: number | null;
  service: number;
}

/** `CompanyService-collection` — the `collection` serialization of CompanyService. */
export interface CompanyServiceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 3. */
  code: string;
  service: number;
}

/** `CompanyService-detailed` — the `detailed` serialization of CompanyService. */
export interface CompanyServiceDetailed {
  /** Max length 3. */
  code: string;
  /** Read-only. */
  readonly id?: number | null;
  service: Service;
}

/** `ConditionalRoute` */
export interface ConditionalRoute {
  /** Max length 100. */
  name: string;
  /** Max length 25. */
  routetype?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numbervalue?: string | null;
  /** Max length 25. */
  friendvalue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ivr?: number | null;
  huntGroup?: number | null;
  voicemail?: number | null;
  user?: number | null;
  queue?: number | null;
  locution?: number | null;
  conferenceRoom?: number | null;
  extension?: number | null;
  numberCountry?: number | null;
}

/** `ConditionalRoute-collection` — the `collection` serialization of ConditionalRoute. */
export interface ConditionalRouteCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  locution?: number | null;
  /** Max length 25. */
  routetype?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numbervalue?: string | null;
  /** Max length 25. */
  friendvalue?: string | null;
  ivr?: number | null;
  huntGroup?: number | null;
  voicemail?: number | null;
  user?: number | null;
  queue?: number | null;
  conferenceRoom?: number | null;
  extension?: number | null;
  numberCountry?: number | null;
}

/** `ConditionalRoute-detailed` — the `detailed` serialization of ConditionalRoute. */
export interface ConditionalRouteDetailed {
  /** Max length 100. */
  name: string;
  /** Max length 25. */
  routetype?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numbervalue?: string | null;
  /** Max length 25. */
  friendvalue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ivr?: Ivr | null;
  huntGroup?: HuntGroup | null;
  voicemail?: Voicemail | null;
  user?: User | null;
  queue?: Queue | null;
  locution?: Locution | null;
  conferenceRoom?: ConferenceRoom | null;
  extension?: Extension | null;
  numberCountry?: Country | null;
}

/** `ConditionalRoutesCondition` */
export interface ConditionalRoutesCondition {
  priority: number;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  conditionalRoute: number;
  ivr?: number | null;
  huntGroup?: number | null;
  voicemail?: number | null;
  user?: number | null;
  queue?: number | null;
  locution?: number | null;
  conferenceRoom?: number | null;
  extension?: number | null;
  numberCountry?: number | null;
}

/** `ConditionalRoutesCondition-collection` — the `collection` serialization of ConditionalRoutesCondition. */
export interface ConditionalRoutesConditionCollection {
  /** Read-only. */
  readonly id?: number | null;
  priority: number;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  locution?: number | null;
  numberCountry?: number | null;
  /** Max length 25. */
  numberValue?: string | null;
  ivr?: number | null;
  user?: number | null;
  huntGroup?: number | null;
  voicemail?: number | null;
  /** Max length 25. */
  friendValue?: string | null;
  queue?: number | null;
  conferenceRoom?: number | null;
  extension?: number | null;
}

/** `ConditionalRoutesCondition-detailed` — the `detailed` serialization of ConditionalRoutesCondition. */
export interface ConditionalRoutesConditionDetailed {
  priority: number;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  conditionalRoute: ConditionalRoute;
  ivr?: Ivr | null;
  huntGroup?: HuntGroup | null;
  voicemail?: Voicemail | null;
  user?: User | null;
  queue?: Queue | null;
  locution?: Locution | null;
  conferenceRoom?: ConferenceRoom | null;
  extension?: Extension | null;
  numberCountry?: Country | null;
  /** Matchlist ids */
  matchListIds?: Array<number> | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
  /** Calendar ids */
  calendarIds?: Array<number> | null;
  /** Route lock ids */
  routeLockIds?: Array<number> | null;
}

/** `ConditionalRoutesCondition-withInverseRelationships` — the `withInverseRelationships` serialization of ConditionalRoutesCondition. */
export interface ConditionalRoutesConditionWithInverseRelationships {
  priority: number;
  /** Max length 25. */
  routeType?: "user" | "number" | "ivr" | "huntGroup" | "voicemail" | "friend" | "queue" | "conferenceRoom" | "extension" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Max length 25. */
  friendValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  conditionalRoute: ConditionalRoute;
  ivr?: Ivr | null;
  huntGroup?: HuntGroup | null;
  voicemail?: Voicemail | null;
  user?: User | null;
  queue?: Queue | null;
  locution?: Locution | null;
  conferenceRoom?: ConferenceRoom | null;
  extension?: Extension | null;
  numberCountry?: Country | null;
  /** Matchlist ids */
  matchListIds?: Array<number> | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
  /** Calendar ids */
  calendarIds?: Array<number> | null;
  /** Route lock ids */
  routeLockIds?: Array<number> | null;
}

/** `ConditionalRoutesConditionsRelCalendar` */
export interface ConditionalRoutesConditionsRelCalendar {
  /** Read-only. */
  readonly id?: number | null;
  condition: number;
  calendar: number;
}

/** `ConditionalRoutesConditionsRelCalendar-detailed` — the `detailed` serialization of ConditionalRoutesConditionsRelCalendar. */
export interface ConditionalRoutesConditionsRelCalendarDetailed {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  calendar: Calendar;
}

/** `ConditionalRoutesConditionsRelCalendar-detailedCollection` — the `detailedCollection` serialization of ConditionalRoutesConditionsRelCalendar. */
export interface ConditionalRoutesConditionsRelCalendarDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  calendar: Calendar;
}

/** `ConditionalRoutesConditionsRelMatchlist` */
export interface ConditionalRoutesConditionsRelMatchlist {
  /** Read-only. */
  readonly id?: number | null;
  condition: number;
  matchlist: number;
}

/** `ConditionalRoutesConditionsRelMatchlist-detailed` — the `detailed` serialization of ConditionalRoutesConditionsRelMatchlist. */
export interface ConditionalRoutesConditionsRelMatchlistDetailed {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  matchlist: MatchList;
}

/** `ConditionalRoutesConditionsRelMatchlist-detailedCollection` — the `detailedCollection` serialization of ConditionalRoutesConditionsRelMatchlist. */
export interface ConditionalRoutesConditionsRelMatchlistDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  matchlist: MatchList;
}

/** `ConditionalRoutesConditionsRelRouteLock` */
export interface ConditionalRoutesConditionsRelRouteLock {
  /** Read-only. */
  readonly id?: number | null;
  condition: number;
  routeLock: number;
}

/** `ConditionalRoutesConditionsRelRouteLock-detailed` — the `detailed` serialization of ConditionalRoutesConditionsRelRouteLock. */
export interface ConditionalRoutesConditionsRelRouteLockDetailed {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  routeLock: RouteLock;
}

/** `ConditionalRoutesConditionsRelRouteLock-detailedCollection` — the `detailedCollection` serialization of ConditionalRoutesConditionsRelRouteLock. */
export interface ConditionalRoutesConditionsRelRouteLockDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  routeLock: RouteLock;
}

/** `ConditionalRoutesConditionsRelSchedule` */
export interface ConditionalRoutesConditionsRelSchedule {
  /** Read-only. */
  readonly id?: number | null;
  condition: number;
  schedule: number;
}

/** `ConditionalRoutesConditionsRelSchedule-detailed` — the `detailed` serialization of ConditionalRoutesConditionsRelSchedule. */
export interface ConditionalRoutesConditionsRelScheduleDetailed {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  schedule: Schedule;
}

/** `ConditionalRoutesConditionsRelSchedule-detailedCollection` — the `detailedCollection` serialization of ConditionalRoutesConditionsRelSchedule. */
export interface ConditionalRoutesConditionsRelScheduleDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  condition: ConditionalRoutesCondition;
  schedule: Schedule;
}

/** `ConferenceRoom` */
export interface ConferenceRoom {
  /** Max length 50. */
  name: string;
  pinProtected: boolean;
  /** Max length 6. */
  pinCode?: string | null;
  maxMembers: number;
  /** Max length 10. */
  announceUserCount: "always" | "first";
  /** Read-only. */
  readonly id?: number | null;
}

/** `ConferenceRoom-collection` — the `collection` serialization of ConferenceRoom. */
export interface ConferenceRoomCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  maxMembers: number;
  pinProtected: boolean;
  /** Max length 6. */
  pinCode?: string | null;
  /** Max length 10. */
  announceUserCount: "always" | "first";
}

/** `ConferenceRoom-detailed` — the `detailed` serialization of ConferenceRoom. */
export interface ConferenceRoomDetailed {
  /** Max length 50. */
  name: string;
  pinProtected: boolean;
  /** Max length 6. */
  pinCode?: string | null;
  maxMembers: number;
  /** Max length 10. */
  announceUserCount: "always" | "first";
  /** Read-only. */
  readonly id?: number | null;
}

/** `Contact` */
export interface Contact {
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname?: string | null;
  /** Max length 100. */
  email?: string | null;
  /** Max length 20. */
  workPhone?: string | null;
  /** Read-only. Max length 25. */
  readonly workPhoneE164?: string | null;
  /** Max length 20. */
  mobilePhone?: string | null;
  /** Read-only. Max length 25. */
  readonly mobilePhoneE164?: string | null;
  /** Max length 25. */
  otherPhone?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly user?: number | null;
  workPhoneCountry?: number | null;
  mobilePhoneCountry?: number | null;
}

/** `Contact-collection` — the `collection` serialization of Contact. */
export interface ContactCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname?: string | null;
  /** Max length 100. */
  email?: string | null;
  /** Read-only. Max length 25. */
  readonly workPhoneE164?: string | null;
  /** Read-only. Max length 25. */
  readonly mobilePhoneE164?: string | null;
  /** Max length 25. */
  otherPhone?: string | null;
  /** Read-only. */
  readonly user?: number | null;
}

/** `Contact-detailed` — the `detailed` serialization of Contact. */
export interface ContactDetailed {
  /** Max length 100. */
  name: string;
  /** Max length 100. */
  lastname?: string | null;
  /** Max length 100. */
  email?: string | null;
  /** Max length 20. */
  workPhone?: string | null;
  /** Read-only. Max length 25. */
  readonly workPhoneE164?: string | null;
  /** Max length 20. */
  mobilePhone?: string | null;
  /** Read-only. Max length 25. */
  readonly mobilePhoneE164?: string | null;
  /** Max length 25. */
  otherPhone?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly user?: User | null;
  workPhoneCountry?: Country | null;
  mobilePhoneCountry?: Country | null;
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
  client?: DashboardClient | null;
  latestBillableCalls?: Array<DashboardBillableCall> | null;
  latestUsers?: Array<DashboardUser> | null;
  latestResidentialDevices?: Array<DashboardResidentialDevice> | null;
  latestRetailAccounts?: Array<DashboardRetailAccount> | null;
  userNum?: number | null;
  extensionNum?: number | null;
  ddiNum?: number | null;
  residentialDeviceNum?: number | null;
  voiceMailNum?: number | null;
  retailsAccountNum?: number | null;
  productName?: string | null;
}

/** `DashboardBillableCall` */
export interface DashboardBillableCall {
  startTime?: string | null;
  caller?: string | null;
  callee?: string | null;
  duration?: number | null;
}

/** `DashboardClient` */
export interface DashboardClient {
  name?: string | null;
  nif?: string | null;
  postalCode?: string | null;
  domainUsers?: string | null;
  maxCalls?: number | null;
}

/** `DashboardResidentialDevice` */
export interface DashboardResidentialDevice {
  name?: string | null;
  outgoingDdi?: string | null;
  description?: string | null;
}

/** `DashboardRetailAccount` */
export interface DashboardRetailAccount {
  name?: string | null;
  outgoingDdi?: string | null;
  description?: string | null;
}

/** `DashboardUser` */
export interface DashboardUser {
  name?: string | null;
  lastName?: string | null;
  extension?: string | null;
  outgoingDdi?: string | null;
}

/** `Ddi` */
export interface Ddi {
  /** Read-only. Max length 25. */
  readonly ddi?: string | null;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
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
  /** Read-only. */
  readonly id?: number | null;
  conferenceRoom?: number | null;
  language?: number | null;
  queue?: number | null;
  externalCallFilter?: number | null;
  user?: number | null;
  ivr?: number | null;
  huntGroup?: number | null;
  fax?: number | null;
  /** Read-only. */
  readonly country?: number | null;
  residentialDevice?: number | null;
  conditionalRoute?: number | null;
  retailAccount?: number | null;
  locution?: number | null;
}

/** `Ddi-collection` — the `collection` serialization of Ddi. */
export interface DdiCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly country?: number | null;
  /** Read-only. Max length 25. */
  readonly ddi?: string | null;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
  /** Max length 100. */
  description?: string | null;
  externalCallFilter?: number | null;
  /** Max length 25. */
  routeType?: "user" | "ivr" | "huntGroup" | "fax" | "conferenceRoom" | "friend" | "queue" | "conditional" | "residential" | "retail" | "locution" | null;
  /** Max length 25. */
  friendValue?: string | null;
  conferenceRoom?: number | null;
  language?: number | null;
  queue?: number | null;
  user?: number | null;
  ivr?: number | null;
  huntGroup?: number | null;
  fax?: number | null;
  residentialDevice?: number | null;
  conditionalRoute?: number | null;
  retailAccount?: number | null;
  locution?: number | null;
}

/** `Ddi-detailed` — the `detailed` serialization of Ddi. */
export interface DdiDetailed {
  /** Read-only. Max length 25. */
  readonly ddi?: string | null;
  /** Read-only. Max length 25. */
  readonly ddie164?: string | null;
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
  /** Read-only. */
  readonly id?: number | null;
  conferenceRoom?: ConferenceRoom | null;
  language?: Language | null;
  queue?: Queue | null;
  externalCallFilter?: ExternalCallFilter | null;
  user?: User | null;
  ivr?: Ivr | null;
  huntGroup?: HuntGroup | null;
  fax?: Fax | null;
  /** Read-only. */
  readonly country?: Country | null;
  residentialDevice?: ResidentialDevice | null;
  conditionalRoute?: ConditionalRoute | null;
  retailAccount?: RetailAccount | null;
  locution?: Locution | null;
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
  ivr?: number | null;
  huntGroup?: number | null;
  conferenceRoom?: number | null;
  user?: number | null;
  queue?: number | null;
  conditionalRoute?: number | null;
  numberCountry?: number | null;
  voicemail?: number | null;
  locution?: number | null;
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
  ivr?: number | null;
  huntGroup?: number | null;
  conferenceRoom?: number | null;
  user?: number | null;
  queue?: number | null;
  conditionalRoute?: number | null;
  voicemail?: number | null;
  locution?: number | null;
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
  ivr?: Ivr | null;
  huntGroup?: HuntGroup | null;
  conferenceRoom?: ConferenceRoom | null;
  user?: User | null;
  queue?: Queue | null;
  conditionalRoute?: ConditionalRoute | null;
  numberCountry?: Country | null;
  voicemail?: Voicemail | null;
  locution?: Locution | null;
}

/** `ExtensionsMassImport` */
export interface ExtensionsMassImport {
  success?: boolean | null;
  errorMsg?: string | null;
  failed?: number | null;
}

/** `ExternalCallFilter` */
export interface ExternalCallFilter {
  /** Max length 50. */
  name: string;
  holidayEnabled: boolean;
  /** Max length 25. */
  holidayTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  holidayNumberValue?: string | null;
  outOfScheduleEnabled: boolean;
  /** Max length 25. */
  outOfScheduleTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  outOfScheduleNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: number | null;
  holidayLocution?: number | null;
  outOfScheduleLocution?: number | null;
  holidayExtension?: number | null;
  outOfScheduleExtension?: number | null;
  holidayVoicemail?: number | null;
  outOfScheduleVoicemail?: number | null;
  holidayNumberCountry?: number | null;
  outOfScheduleNumberCountry?: number | null;
}

/** `ExternalCallFilter-collection` — the `collection` serialization of ExternalCallFilter. */
export interface ExternalCallFilterCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 25. */
  holidayTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  holidayNumberValue?: string | null;
  holidayLocution?: number | null;
  holidayExtension?: number | null;
  holidayVoicemail?: number | null;
  holidayNumberCountry?: number | null;
  /** Max length 25. */
  outOfScheduleTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  outOfScheduleNumberValue?: string | null;
  outOfScheduleLocution?: number | null;
  outOfScheduleExtension?: number | null;
  outOfScheduleVoicemail?: number | null;
  outOfScheduleNumberCountry?: number | null;
}

/** `ExternalCallFilter-detailed` — the `detailed` serialization of ExternalCallFilter. */
export interface ExternalCallFilterDetailed {
  /** Max length 50. */
  name: string;
  holidayEnabled: boolean;
  /** Max length 25. */
  holidayTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  holidayNumberValue?: string | null;
  outOfScheduleEnabled: boolean;
  /** Max length 25. */
  outOfScheduleTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  outOfScheduleNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: Locution | null;
  holidayLocution?: Locution | null;
  outOfScheduleLocution?: Locution | null;
  holidayExtension?: Extension | null;
  outOfScheduleExtension?: Extension | null;
  holidayVoicemail?: Voicemail | null;
  outOfScheduleVoicemail?: Voicemail | null;
  holidayNumberCountry?: Country | null;
  outOfScheduleNumberCountry?: Country | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
  /** Calendar ids */
  calendarIds?: Array<number> | null;
  /** Whitelisted matchlists */
  whiteListIds?: Array<number> | null;
  /** Blacklisted matchlists */
  blackListIds?: Array<number> | null;
}

/** `ExternalCallFilter-withInverseRelationships` — the `withInverseRelationships` serialization of ExternalCallFilter. */
export interface ExternalCallFilterWithInverseRelationships {
  /** Max length 50. */
  name: string;
  holidayEnabled: boolean;
  /** Max length 25. */
  holidayTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  holidayNumberValue?: string | null;
  outOfScheduleEnabled: boolean;
  /** Max length 25. */
  outOfScheduleTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  outOfScheduleNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: Locution | null;
  holidayLocution?: Locution | null;
  outOfScheduleLocution?: Locution | null;
  holidayExtension?: Extension | null;
  outOfScheduleExtension?: Extension | null;
  holidayVoicemail?: Voicemail | null;
  outOfScheduleVoicemail?: Voicemail | null;
  holidayNumberCountry?: Country | null;
  outOfScheduleNumberCountry?: Country | null;
  /** Schedule ids */
  scheduleIds?: Array<number> | null;
  /** Calendar ids */
  calendarIds?: Array<number> | null;
  /** Whitelisted matchlists */
  whiteListIds?: Array<number> | null;
  /** Blacklisted matchlists */
  blackListIds?: Array<number> | null;
}

/** `ExternalCallFilterBlackList` */
export interface ExternalCallFilterBlackList {
  /** Read-only. */
  readonly id?: number | null;
  filter: number;
  matchlist: number;
}

/** `ExternalCallFilterBlackList-detailed` — the `detailed` serialization of ExternalCallFilterBlackList. */
export interface ExternalCallFilterBlackListDetailed {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  matchlist: MatchList;
}

/** `ExternalCallFilterBlackList-detailedCollection` — the `detailedCollection` serialization of ExternalCallFilterBlackList. */
export interface ExternalCallFilterBlackListDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  matchlist: MatchList;
}

/** `ExternalCallFilterRelCalendar` */
export interface ExternalCallFilterRelCalendar {
  /** Read-only. */
  readonly id?: number | null;
  filter: number;
  calendar: number;
}

/** `ExternalCallFilterRelCalendar-detailed` — the `detailed` serialization of ExternalCallFilterRelCalendar. */
export interface ExternalCallFilterRelCalendarDetailed {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  calendar: Calendar;
}

/** `ExternalCallFilterRelCalendar-detailedCollection` — the `detailedCollection` serialization of ExternalCallFilterRelCalendar. */
export interface ExternalCallFilterRelCalendarDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  calendar: Calendar;
}

/** `ExternalCallFilterRelSchedule` */
export interface ExternalCallFilterRelSchedule {
  /** Read-only. */
  readonly id?: number | null;
  filter: number;
  schedule: number;
}

/** `ExternalCallFilterRelSchedule-detailed` — the `detailed` serialization of ExternalCallFilterRelSchedule. */
export interface ExternalCallFilterRelScheduleDetailed {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  schedule: Schedule;
}

/** `ExternalCallFilterRelSchedule-detailedCollection` — the `detailedCollection` serialization of ExternalCallFilterRelSchedule. */
export interface ExternalCallFilterRelScheduleDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  schedule: Schedule;
}

/** `ExternalCallFilterWhiteList` */
export interface ExternalCallFilterWhiteList {
  /** Read-only. */
  readonly id?: number | null;
  filter: number;
  matchlist: number;
}

/** `ExternalCallFilterWhiteList-detailed` — the `detailed` serialization of ExternalCallFilterWhiteList. */
export interface ExternalCallFilterWhiteListDetailed {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  matchlist: MatchList;
}

/** `ExternalCallFilterWhiteList-detailedCollection` — the `detailedCollection` serialization of ExternalCallFilterWhiteList. */
export interface ExternalCallFilterWhiteListDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  filter: ExternalCallFilter;
  matchlist: MatchList;
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

/** `Fax-detailed` — the `detailed` serialization of Fax. */
export interface FaxDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  email?: string | null;
  sendByEmail: boolean;
  /** Read-only. */
  readonly id?: number | null;
  outgoingDdi?: Ddi | null;
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

/** `Feature` */
export interface Feature {
  /** Max length 100. */
  iden: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `FeaturesRelCompany-detailed` — the `detailed` serialization of FeaturesRelCompany. */
export interface FeaturesRelCompanyDetailed {
  /** Read-only. */
  readonly id?: number | null;
  feature: Feature;
}

/** `FeaturesRelCompany-detailedCollection` — the `detailedCollection` serialization of FeaturesRelCompany. */
export interface FeaturesRelCompanyDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  feature: Feature;
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
  /** Max length 200. */
  allow: string;
  /** Max length 190. */
  fromUser?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  /** Max length 20. */
  directConnectivity: "yes" | "no" | "intervpbx";
  ddiIn: "yes" | "no";
  t38Passthrough: "yes" | "no";
  alwaysApplyTransformations: boolean;
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: number | null;
  callAcl?: number | null;
  outgoingDdi?: number | null;
  language?: number | null;
  interCompany?: number | null;
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
  /** Max length 200. */
  allow: string;
  /** Max length 190. */
  fromUser?: string | null;
  /** Max length 190. */
  fromDomain?: string | null;
  /** Max length 20. */
  directConnectivity: "yes" | "no" | "intervpbx";
  ddiIn: "yes" | "no";
  t38Passthrough: "yes" | "no";
  alwaysApplyTransformations: boolean;
  rtpEncryption: boolean;
  multiContact: boolean;
  /** Max length 190. */
  ruriDomain?: string | null;
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: TransformationRuleSet | null;
  callAcl?: CallAcl | null;
  outgoingDdi?: Ddi | null;
  language?: Language | null;
  interCompany?: Company | null;
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
}

/** `FriendsPattern` */
export interface FriendsPattern {
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  regExp: string;
  /** Read-only. */
  readonly id?: number | null;
  friend: number;
}

/** `FriendsPattern-collection` — the `collection` serialization of FriendsPattern. */
export interface FriendsPatternCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  regExp: string;
}

/** `FriendsPattern-detailed` — the `detailed` serialization of FriendsPattern. */
export interface FriendsPatternDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 255. */
  regExp: string;
  /** Read-only. */
  readonly id?: number | null;
  friend: Friend;
}

/** `HolidayDate` */
export interface HolidayDate {
  /** Max length 50. */
  name: string;
  eventDate: string;
  wholeDayEvent: boolean;
  timeIn?: string | null;
  timeOut?: string | null;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  calendar: number;
  locution?: number | null;
  extension?: number | null;
  voicemail?: number | null;
  numberCountry?: number | null;
}

/** `HolidayDate-collection` — the `collection` serialization of HolidayDate. */
export interface HolidayDateCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  eventDate: string;
  locution?: number | null;
  wholeDayEvent: boolean;
  timeIn?: string | null;
  timeOut?: string | null;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  numberCountry?: number | null;
  /** Max length 25. */
  numberValue?: string | null;
  calendar: number;
  extension?: number | null;
  voicemail?: number | null;
}

/** `HolidayDate-detailed` — the `detailed` serialization of HolidayDate. */
export interface HolidayDateDetailed {
  /** Max length 50. */
  name: string;
  eventDate: string;
  wholeDayEvent: boolean;
  timeIn?: string | null;
  timeOut?: string | null;
  /** Max length 25. */
  routeType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  calendar: Calendar;
  locution?: Locution | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  numberCountry?: Country | null;
}

/** `HolidayDateRange` */
export interface HolidayDateRange {
  name: string;
  locution?: number | null;
  wholeDayEvent: number;
  timeIn?: string | null;
  timeOut?: string | null;
  routeType?: string | null;
  extension?: number | null;
  voicemail?: number | null;
  numberCountry?: number | null;
  numberValue?: string | null;
  startDate: string;
  endDate: string;
  calendar: number;
}

/** `HolidaysMassImport` */
export interface HolidaysMassImport {
  success?: boolean | null;
  errorMsg?: string | null;
  failed?: number | null;
}

/** `HuntGroup` */
export interface HuntGroup {
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  strategy: "ringAll" | "linear" | "roundRobin" | "random";
  ringAllTimeout?: number | null;
  /** Max length 25. */
  noAnswerTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noAnswerNumberValue?: string | null;
  preventMissedCalls: number;
  allowCallForwards: number;
  /** Read-only. */
  readonly id?: number | null;
  noAnswerLocution?: number | null;
  noAnswerExtension?: number | null;
  noAnswerVoicemail?: number | null;
  noAnswerNumberCountry?: number | null;
}

/** `HuntGroup-collection` — the `collection` serialization of HuntGroup. */
export interface HuntGroupCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  strategy: "ringAll" | "linear" | "roundRobin" | "random";
}

/** `HuntGroup-detailed` — the `detailed` serialization of HuntGroup. */
export interface HuntGroupDetailed {
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Max length 25. */
  strategy: "ringAll" | "linear" | "roundRobin" | "random";
  ringAllTimeout?: number | null;
  /** Max length 25. */
  noAnswerTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noAnswerNumberValue?: string | null;
  preventMissedCalls: number;
  allowCallForwards: number;
  /** Read-only. */
  readonly id?: number | null;
  noAnswerLocution?: Locution | null;
  noAnswerExtension?: Extension | null;
  noAnswerVoicemail?: Voicemail | null;
  noAnswerNumberCountry?: Country | null;
}

/** `HuntGroupMember` */
export interface HuntGroupMember {
  timeoutTime?: number | null;
  priority?: number | null;
  /** Max length 25. */
  routeType: "number" | "user";
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  huntGroup: number;
  user: number;
  numberCountry?: number | null;
}

/** `HuntGroupMember-detailed` — the `detailed` serialization of HuntGroupMember. */
export interface HuntGroupMemberDetailed {
  timeoutTime?: number | null;
  priority?: number | null;
  /** Max length 25. */
  routeType: "number" | "user";
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  huntGroup: HuntGroup;
  user: User;
  numberCountry?: Country | null;
}

/** `HuntGroupMember-detailedCollection` — the `detailedCollection` serialization of HuntGroupMember. */
export interface HuntGroupMemberDetailedCollection {
  timeoutTime?: number | null;
  priority?: number | null;
  /** Max length 25. */
  routeType: "number" | "user";
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  huntGroup: HuntGroup;
  user: User;
  numberCountry?: Country | null;
}

/** `Invoice-collection` — the `collection` serialization of Invoice. */
export interface InvoiceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 30. */
  number?: string | null;
  inDate?: string | null;
  outDate?: string | null;
  taxRate?: number | null;
  totalWithTax?: number | null;
  pdf?: InvoicePdf | null;
  /** Invoice currency */
  currency?: string | null;
}

/** `Invoice-detailed` — the `detailed` serialization of Invoice. */
export interface InvoiceDetailed {
  /** Max length 30. */
  number?: string | null;
  inDate?: string | null;
  outDate?: string | null;
  taxRate?: number | null;
  totalWithTax?: number | null;
  /** Max length 140. */
  statusMsg?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  pdf?: InvoicePdf | null;
  /** Invoice currency */
  currency?: string | null;
}

/** `Invoice_Pdf` */
export interface InvoicePdf {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
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

/** `Ivr` */
export interface Ivr {
  /** Max length 50. */
  name: string;
  timeout: number;
  maxDigits: number;
  allowExtensions: boolean;
  /** Max length 25. */
  noInputRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noInputNumberValue?: string | null;
  /** Max length 25. */
  errorRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  errorNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: number | null;
  noInputLocution?: number | null;
  errorLocution?: number | null;
  successLocution?: number | null;
  noInputExtension?: number | null;
  errorExtension?: number | null;
  noInputVoicemail?: number | null;
  errorVoicemail?: number | null;
  noInputNumberCountry?: number | null;
  errorNumberCountry?: number | null;
}

/** `Ivr-collection` — the `collection` serialization of Ivr. */
export interface IvrCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  timeout: number;
  allowExtensions: boolean;
  /** Max length 25. */
  noInputRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noInputNumberValue?: string | null;
  /** Max length 25. */
  errorRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  errorNumberValue?: string | null;
  noInputLocution?: number | null;
  errorLocution?: number | null;
  successLocution?: number | null;
  noInputExtension?: number | null;
  errorExtension?: number | null;
  noInputVoicemail?: number | null;
  errorVoicemail?: number | null;
  noInputNumberCountry?: number | null;
  errorNumberCountry?: number | null;
}

/** `Ivr-detailed` — the `detailed` serialization of Ivr. */
export interface IvrDetailed {
  /** Max length 50. */
  name: string;
  timeout: number;
  maxDigits: number;
  allowExtensions: boolean;
  /** Max length 25. */
  noInputRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noInputNumberValue?: string | null;
  /** Max length 25. */
  errorRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  errorNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: Locution | null;
  noInputLocution?: Locution | null;
  errorLocution?: Locution | null;
  successLocution?: Locution | null;
  noInputExtension?: Extension | null;
  errorExtension?: Extension | null;
  noInputVoicemail?: Voicemail | null;
  errorVoicemail?: Voicemail | null;
  noInputNumberCountry?: Country | null;
  errorNumberCountry?: Country | null;
  /** Excluded extensions */
  excludedExtensionIds?: Array<number> | null;
}

/** `Ivr-withExcludedExtensions` — the `withExcludedExtensions` serialization of Ivr. */
export interface IvrWithExcludedExtensions {
  /** Max length 50. */
  name: string;
  timeout: number;
  maxDigits: number;
  allowExtensions: boolean;
  /** Max length 25. */
  noInputRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  noInputNumberValue?: string | null;
  /** Max length 25. */
  errorRouteType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  errorNumberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  welcomeLocution?: Locution | null;
  noInputLocution?: Locution | null;
  errorLocution?: Locution | null;
  successLocution?: Locution | null;
  noInputExtension?: Extension | null;
  errorExtension?: Extension | null;
  noInputVoicemail?: Voicemail | null;
  errorVoicemail?: Voicemail | null;
  noInputNumberCountry?: Country | null;
  errorNumberCountry?: Country | null;
  /** Excluded extensions */
  excludedExtensionIds?: Array<number> | null;
}

/** `IvrEntry` */
export interface IvrEntry {
  /** Max length 40. */
  entry: string;
  /** Max length 50. */
  displayName?: string | null;
  /** Max length 25. */
  routeType: "number" | "extension" | "voicemail" | "conditional";
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ivr: number;
  welcomeLocution?: number | null;
  extension?: number | null;
  voicemail?: number | null;
  conditionalRoute?: number | null;
  numberCountry?: number | null;
}

/** `IvrEntry-collection` — the `collection` serialization of IvrEntry. */
export interface IvrEntryCollection {
  /** Read-only. */
  readonly id?: number | null;
  ivr: number;
  /** Max length 40. */
  entry: string;
  /** Max length 50. */
  displayName?: string | null;
  welcomeLocution?: number | null;
  /** Max length 25. */
  routeType: "number" | "extension" | "voicemail" | "conditional";
  numberCountry?: number | null;
  /** Max length 25. */
  numberValue?: string | null;
  extension?: number | null;
  voicemail?: number | null;
  conditionalRoute?: number | null;
}

/** `IvrEntry-detailed` — the `detailed` serialization of IvrEntry. */
export interface IvrEntryDetailed {
  /** Max length 40. */
  entry: string;
  /** Max length 50. */
  displayName?: string | null;
  /** Max length 25. */
  routeType: "number" | "extension" | "voicemail" | "conditional";
  /** Max length 25. */
  numberValue?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  ivr: Ivr;
  welcomeLocution?: Locution | null;
  extension?: Extension | null;
  voicemail?: Voicemail | null;
  conditionalRoute?: ConditionalRoute | null;
  numberCountry?: Country | null;
}

/** `IvrExcludedExtension` */
export interface IvrExcludedExtension {
  /** Read-only. */
  readonly id?: number | null;
  ivr: number;
  extension: number;
}

/** `IvrExcludedExtension-detailed` — the `detailed` serialization of IvrExcludedExtension. */
export interface IvrExcludedExtensionDetailed {
  /** Read-only. */
  readonly id?: number | null;
  ivr: Ivr;
  extension: Extension;
}

/** `IvrExcludedExtension-detailedCollection` — the `detailedCollection` serialization of IvrExcludedExtension. */
export interface IvrExcludedExtensionDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  ivr: Ivr;
  extension: Extension;
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
  survivalDevice?: number | null;
  userIds?: Array<number> | null;
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

/** `Location-detailed` — the `detailed` serialization of Location. */
export interface LocationDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 500. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  survivalDevice?: SurvivalDevice | null;
  userIds?: Array<number> | null;
}

/** `Locution` */
export interface Locution {
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
  encodedFile?: LocutionEncodedFile | null;
  originalFile?: LocutionOriginalFile | null;
}

/** `Locution-collection` — the `collection` serialization of Locution. */
export interface LocutionCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  originalFile?: LocutionOriginalFile | null;
}

/** `Locution-detailed` — the `detailed` serialization of Locution. */
export interface LocutionDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 20. */
  status?: "pending" | "encoding" | "ready" | "error" | null;
  /** Read-only. */
  readonly id?: number | null;
  encodedFile?: LocutionEncodedFile | null;
  originalFile?: LocutionOriginalFile | null;
}

/** `Locution_EncodedFile` */
export interface LocutionEncodedFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Locution_OriginalFile` */
export interface LocutionOriginalFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `Logo` */
export interface Logo {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
}

/** `MatchList` */
export interface MatchList {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  /** Generic Match List Read-only. */
  readonly generic?: boolean | null;
}

/** `MatchList-collection` — the `collection` serialization of MatchList. */
export interface MatchListCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** Generic Match List Read-only. */
  readonly generic?: boolean | null;
}

/** `MatchList-detailed` — the `detailed` serialization of MatchList. */
export interface MatchListDetailed {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  /** Generic Match List Read-only. */
  readonly generic?: boolean | null;
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

/** `MetadataFile` */
export interface MetadataFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
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

/** `Name` */
export interface Name {
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

/** `NotificationTemplate` */
export interface NotificationTemplate {
  /** Max length 55. */
  name: string;
  /** Max length 25. */
  type: "voicemail" | "fax" | "limit" | "lowbalance" | "invoice" | "callCsv" | "maxDailyUsage" | "accessCredentials" | "onDemandRecord";
  /** Read-only. */
  readonly id?: number | null;
}

/** `OutgoingDdiRule` */
export interface OutgoingDdiRule {
  /** Max length 50. */
  name: string;
  /** Max length 10. */
  defaultAction: "keep" | "force";
  /** Read-only. */
  readonly id?: number | null;
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
  forcedDdi?: Ddi | null;
}

/** `OutgoingDdiRulesPattern` */
export interface OutgoingDdiRulesPattern {
  /** Max length 20. */
  type: "prefix" | "destination";
  /** Max length 10. */
  prefix?: string | null;
  /** Max length 10. */
  action: "keep" | "force";
  priority: number;
  /** Read-only. */
  readonly id?: number | null;
  outgoingDdiRule: number;
  matchList?: number | null;
  forcedDdi?: number | null;
}

/** `OutgoingDdiRulesPattern-detailed` — the `detailed` serialization of OutgoingDdiRulesPattern. */
export interface OutgoingDdiRulesPatternDetailed {
  /** Max length 20. */
  type: "prefix" | "destination";
  /** Max length 10. */
  prefix?: string | null;
  /** Max length 10. */
  action: "keep" | "force";
  priority: number;
  /** Read-only. */
  readonly id?: number | null;
  outgoingDdiRule: OutgoingDdiRule;
  matchList?: MatchList | null;
  forcedDdi?: Ddi | null;
}

/** `OutgoingDdiRulesPattern-detailedCollection` — the `detailedCollection` serialization of OutgoingDdiRulesPattern. */
export interface OutgoingDdiRulesPatternDetailedCollection {
  /** Max length 20. */
  type: "prefix" | "destination";
  /** Max length 10. */
  prefix?: string | null;
  /** Max length 10. */
  action: "keep" | "force";
  priority: number;
  /** Read-only. */
  readonly id?: number | null;
  outgoingDdiRule: OutgoingDdiRule;
  matchList?: MatchList | null;
  forcedDdi?: Ddi | null;
}

/** `PickUpGroup` */
export interface PickUpGroup {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
}

/** `PickUpGroup-collection` — the `collection` serialization of PickUpGroup. */
export interface PickUpGroupCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 50. */
  name: string;
  /** User ids */
  userIds?: Array<number> | null;
}

/** `PickUpGroup-detailed` — the `detailed` serialization of PickUpGroup. */
export interface PickUpGroupDetailed {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  /** User ids */
  userIds?: Array<number> | null;
}

/** `PickUpGroup-withUsers` — the `withUsers` serialization of PickUpGroup. */
export interface PickUpGroupWithUsers {
  /** Max length 50. */
  name: string;
  /** Read-only. */
  readonly id?: number | null;
  /** User ids */
  userIds?: Array<number> | null;
}

/** `PickUpRelUser` */
export interface PickUpRelUser {
  /** Read-only. */
  readonly id?: number | null;
  pickUpGroup: number;
  user: number;
}

/** `PickUpRelUser-detailed` — the `detailed` serialization of PickUpRelUser. */
export interface PickUpRelUserDetailed {
  /** Read-only. */
  readonly id?: number | null;
  pickUpGroup: PickUpGroup;
  user: User;
}

/** `PickUpRelUser-detailedCollection` — the `detailedCollection` serialization of PickUpRelUser. */
export interface PickUpRelUserDetailedCollection {
  /** Read-only. */
  readonly id?: number | null;
  pickUpGroup: PickUpGroup;
  user: User;
}

/** `Profile` */
export interface Profile {
  restricted?: boolean | null;
  vpbx?: boolean | null;
  residential?: boolean | null;
  retail?: boolean | null;
  wholesale?: boolean | null;
  billingInfo?: boolean | null;
  defaultCountryId?: number | null;
  defaultLocationId?: number | null;
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

/** `Queue` */
export interface Queue {
  /** Max length 128. */
  name?: string | null;
  /** Max length 50. */
  displayName?: string | null;
  maxWaitTime?: number | null;
  /** Max length 25. */
  timeoutTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  timeoutNumberValue?: string | null;
  maxlen?: number | null;
  /** Max length 25. */
  fullTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  fullNumberValue?: string | null;
  periodicAnnounceFrequency?: number | null;
  /** Max length 10. */
  announcePosition?: "yes" | "no" | null;
  announceFrequency?: number | null;
  memberCallRest?: number | null;
  memberCallTimeout?: number | null;
  /** Max length 25. */
  strategy?: "ringall" | "leastrecent" | "fewestcalls" | "random" | "rrmemory" | "linear" | "wrandom" | "rrordered" | null;
  weight?: number | null;
  preventMissedCalls: number;
  /** Read-only. */
  readonly id?: number | null;
  periodicAnnounceLocution?: number | null;
  timeoutLocution?: number | null;
  timeoutExtension?: number | null;
  timeoutVoicemail?: number | null;
  fullLocution?: number | null;
  fullExtension?: number | null;
  fullVoicemail?: number | null;
  timeoutNumberCountry?: number | null;
  fullNumberCountry?: number | null;
}

/** `Queue-collection` — the `collection` serialization of Queue. */
export interface QueueCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 128. */
  name?: string | null;
  weight?: number | null;
  /** Max length 25. */
  strategy?: "ringall" | "leastrecent" | "fewestcalls" | "random" | "rrmemory" | "linear" | "wrandom" | "rrordered" | null;
  memberCallTimeout?: number | null;
  memberCallRest?: number | null;
  maxWaitTime?: number | null;
  maxlen?: number | null;
}

/** `Queue-detailed` — the `detailed` serialization of Queue. */
export interface QueueDetailed {
  /** Max length 128. */
  name?: string | null;
  /** Max length 50. */
  displayName?: string | null;
  maxWaitTime?: number | null;
  /** Max length 25. */
  timeoutTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  timeoutNumberValue?: string | null;
  maxlen?: number | null;
  /** Max length 25. */
  fullTargetType?: "number" | "extension" | "voicemail" | null;
  /** Max length 25. */
  fullNumberValue?: string | null;
  periodicAnnounceFrequency?: number | null;
  /** Max length 10. */
  announcePosition?: "yes" | "no" | null;
  announceFrequency?: number | null;
  memberCallRest?: number | null;
  memberCallTimeout?: number | null;
  /** Max length 25. */
  strategy?: "ringall" | "leastrecent" | "fewestcalls" | "random" | "rrmemory" | "linear" | "wrandom" | "rrordered" | null;
  weight?: number | null;
  preventMissedCalls: number;
  /** Read-only. */
  readonly id?: number | null;
  periodicAnnounceLocution?: Locution | null;
  timeoutLocution?: Locution | null;
  timeoutExtension?: Extension | null;
  timeoutVoicemail?: Voicemail | null;
  fullLocution?: Locution | null;
  fullExtension?: Extension | null;
  fullVoicemail?: Voicemail | null;
  timeoutNumberCountry?: Country | null;
  fullNumberCountry?: Country | null;
}

/** `QueueMember` */
export interface QueueMember {
  penalty?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  queue: number;
  user: number;
}

/** `QueueMember-detailed` — the `detailed` serialization of QueueMember. */
export interface QueueMemberDetailed {
  penalty?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  queue: Queue;
  user: User;
}

/** `QueueMember-detailedCollection` — the `detailedCollection` serialization of QueueMember. */
export interface QueueMemberDetailedCollection {
  penalty?: number | null;
  /** Read-only. */
  readonly id?: number | null;
  queue: Queue;
  user: User;
}

/** `RatingPlanGroup` */
export interface RatingPlanGroup {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
  description?: RatingPlanGroupDescription | null;
}

/** `RatingPlanGroup-collection` — the `collection` serialization of RatingPlanGroup. */
export interface RatingPlanGroupCollection {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
}

/** `RatingPlanGroup-detailed` — the `detailed` serialization of RatingPlanGroup. */
export interface RatingPlanGroupDetailed {
  /** Read-only. */
  readonly id?: number | null;
  name?: RatingPlanGroupName | null;
  description?: RatingPlanGroupDescription | null;
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

/** `RatingPlanPrices` */
export interface RatingPlanPrices {
  ratingPlan?: string | null;
  name?: string | null;
  prefix?: string | null;
  connectFee?: number | null;
  cost?: number | null;
  rateIncrement?: string | null;
  groupIntervalStart?: string | null;
  timeIn?: string | null;
  days?: string | null;
}

/** `RatingProfile-collection` — the `collection` serialization of RatingProfile. */
export interface RatingProfileCollection {
  activationTime: string;
  /** Read-only. */
  readonly id?: number | null;
  ratingPlanGroup: number;
  routingTag?: number | null;
}

/** `RatingProfile-detailed` — the `detailed` serialization of RatingProfile. */
export interface RatingProfileDetailed {
  activationTime: string;
  /** Read-only. */
  readonly id?: number | null;
  ratingPlanGroup: RatingPlanGroup;
  routingTag?: RoutingTag | null;
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
  ddi?: number | null;
  user?: number | null;
  billableCall?: number | null;
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
  ddi?: Ddi | null;
  user?: User | null;
  billableCall?: BillableCall | null;
}

/** `Recording_RecordedFile` */
export interface RecordingRecordedFile {
  fileSize?: number | null;
  /** Max length 80. */
  mimeType?: string | null;
  /** Max length 255. */
  baseName?: string | null;
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

/** `ResidentialDevice` */
export interface ResidentialDevice {
  /** Read-only. Max length 65. */
  readonly name?: string | null;
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
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: number | null;
  outgoingDdi?: number | null;
  language?: number | null;
}

/** `ResidentialDevice-collection` — the `collection` serialization of ResidentialDevice. */
export interface ResidentialDeviceCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 65. */
  readonly name?: string | null;
  /** Max length 500. */
  description: string;
  domain?: number | null;
  directConnectivity: "yes" | "no";
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `ResidentialDevice-detailed` — the `detailed` serialization of ResidentialDevice. */
export interface ResidentialDeviceDetailed {
  /** Read-only. Max length 65. */
  readonly name?: string | null;
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
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: TransformationRuleSet | null;
  outgoingDdi?: Ddi | null;
  language?: Language | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `ResidentialDevice-status` — the `status` serialization of ResidentialDevice. */
export interface ResidentialDeviceStatus {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 65. */
  readonly name?: string | null;
  /** Registration domain */
  domainName?: string | null;
  directConnectivity: "yes" | "no";
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `RetailAccount` */
export interface RetailAccount {
  /** Read-only. Max length 65. */
  readonly name?: string | null;
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
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: number | null;
  outgoingDdi?: number | null;
}

/** `RetailAccount-collection` — the `collection` serialization of RetailAccount. */
export interface RetailAccountCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 65. */
  readonly name?: string | null;
  directConnectivity: "yes" | "no";
  /** Max length 500. */
  description: string;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  domain?: number | null;
}

/** `RetailAccount-detailed` — the `detailed` serialization of RetailAccount. */
export interface RetailAccountDetailed {
  /** Read-only. Max length 65. */
  readonly name?: string | null;
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
  trustSDP: boolean;
  /** Read-only. */
  readonly id?: number | null;
  transformationRuleSet?: TransformationRuleSet | null;
  outgoingDdi?: Ddi | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `RetailAccount-status` — the `status` serialization of RetailAccount. */
export interface RetailAccountStatus {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 65. */
  readonly name?: string | null;
  directConnectivity: "yes" | "no";
  /** Max length 500. */
  description: string;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  /** Registration domain */
  domainName?: string | null;
}

/** `RetailAccount-statusItem` — the `statusItem` serialization of RetailAccount. */
export interface RetailAccountStatusItem {
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. Max length 65. */
  readonly name?: string | null;
  directConnectivity: "yes" | "no";
  /** Max length 500. */
  description: string;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
  /** Registration domain */
  domainName?: string | null;
}

/** `RouteLock` */
export interface RouteLock {
  /** Max length 50. */
  name: string;
  /** Max length 100. */
  description: string;
  open: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Close extension Read-only. */
  readonly closeExtension?: string | null;
  /** Open extension Read-only. */
  readonly openExtension?: string | null;
  /** Toggle extension Read-only. */
  readonly toggleExtension?: string | null;
}

/** `RouteLock-collection` — the `collection` serialization of RouteLock. */
export interface RouteLockCollection {
  /** Max length 50. */
  name: string;
  /** Max length 100. */
  description: string;
  open: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Close extension Read-only. */
  readonly closeExtension?: string | null;
  /** Open extension Read-only. */
  readonly openExtension?: string | null;
  /** Toggle extension Read-only. */
  readonly toggleExtension?: string | null;
}

/** `RouteLock-detailed` — the `detailed` serialization of RouteLock. */
export interface RouteLockDetailed {
  /** Max length 50. */
  name: string;
  /** Max length 100. */
  description: string;
  open: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Close extension Read-only. */
  readonly closeExtension?: string | null;
  /** Open extension Read-only. */
  readonly openExtension?: string | null;
  /** Toggle extension Read-only. */
  readonly toggleExtension?: string | null;
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

/** `Schedule` */
export interface Schedule {
  /** Max length 50. */
  name: string;
  timeIn: string;
  timeout: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Schedule-collection` — the `collection` serialization of Schedule. */
export interface ScheduleCollection {
  /** Max length 50. */
  name: string;
  timeIn: string;
  timeout: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `Schedule-detailed` — the `detailed` serialization of Schedule. */
export interface ScheduleDetailed {
  /** Max length 50. */
  name: string;
  timeIn: string;
  timeout: string;
  monday?: boolean | null;
  tuesday?: boolean | null;
  wednesday?: boolean | null;
  thursday?: boolean | null;
  friday?: boolean | null;
  saturday?: boolean | null;
  sunday?: boolean | null;
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

/** `SurvivalDevice` */
export interface SurvivalDevice {
  /** Max length 80. */
  name: string;
  /** Max length 80. */
  proxy: string;
  /** Max length 80. */
  outboundProxy?: string | null;
  udpPort: number;
  tcpPort: number;
  tlsPort: number;
  wssPort: number;
  /** Max length 1024. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: number;
}

/** `SurvivalDevice-collection` — the `collection` serialization of SurvivalDevice. */
export interface SurvivalDeviceCollection {
  /** Max length 80. */
  name: string;
  /** Max length 80. */
  proxy: string;
  /** Max length 1024. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
}

/** `SurvivalDevice-detailed` — the `detailed` serialization of SurvivalDevice. */
export interface SurvivalDeviceDetailed {
  /** Max length 80. */
  name: string;
  /** Max length 80. */
  proxy: string;
  /** Max length 80. */
  outboundProxy?: string | null;
  udpPort: number;
  tcpPort: number;
  tlsPort: number;
  wssPort: number;
  /** Max length 1024. */
  description?: string | null;
  /** Read-only. */
  readonly id?: number | null;
  company: Company;
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
  /** Read-only. */
  readonly lastProvisionDate?: string | null;
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  /** Read-only. */
  readonly id?: number | null;
  terminalModel?: number | null;
}

/** `Terminal-collection` — the `collection` serialization of Terminal. */
export interface TerminalCollection {
  /** Read-only. */
  readonly id?: number | null;
  /** Max length 100. */
  name: string;
  /** Max length 12. */
  mac?: string | null;
  /** Read-only. */
  readonly lastProvisionDate?: string | null;
  domain?: number | null;
  terminalModel?: number | null;
  /** Registration status */
  status?: Array<RegistrationStatus> | null;
}

/** `Terminal-detailed` — the `detailed` serialization of Terminal. */
export interface TerminalDetailed {
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
  /** Read-only. */
  readonly lastProvisionDate?: string | null;
  t38Passthrough: "yes" | "no";
  rtpEncryption: boolean;
  /** Read-only. */
  readonly id?: number | null;
  terminalModel?: TerminalModel | null;
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
}

/** `TerminalModel` */
export interface TerminalModel {
  /** Max length 100. */
  iden: string;
  /** Max length 100. */
  name: string;
  /** Max length 500. */
  description: string;
  /** Read-only. */
  readonly id?: number | null;
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
  /** Read-only. */
  readonly id?: number | null;
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
  callAcl?: number | null;
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
  voicemail: number;
  contact: number;
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
}

/** `User-detailed` — the `detailed` serialization of User. */
export interface UserDetailed {
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
  callAcl?: CallAcl | null;
  bossAssistant?: User | null;
  bossAssistantWhiteList?: MatchList | null;
  transformationRuleSet?: TransformationRuleSet | null;
  language?: Language | null;
  terminal?: Terminal | null;
  extension?: Extension | null;
  timezone?: Timezone | null;
  outgoingDdi?: Ddi | null;
  outgoingDdiRule?: OutgoingDdiRule | null;
  location?: Location | null;
  voicemail: Voicemail;
  contact: Contact;
  /** Pickup group ids */
  pickupGroupIds?: Array<number> | null;
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
  friend?: number | null;
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
  friend?: Friend | null;
  extension?: Extension | null;
}

/** `Voicemail` */
export interface Voicemail {
  enabled: boolean;
  /** Max length 200. */
  name: string;
  /** Max length 200. */
  email?: string | null;
  sendMail: boolean;
  attachSound: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly user?: number | null;
  /** Read-only. */
  readonly residentialDevice?: number | null;
  company: number;
  locution?: number | null;
}

/** `Voicemail-collection` — the `collection` serialization of Voicemail. */
export interface VoicemailCollection {
  /** Read-only. */
  readonly id?: number | null;
  enabled: boolean;
  /** Max length 200. */
  name: string;
  /** Max length 200. */
  email?: string | null;
  /** Read-only. */
  readonly user?: number | null;
  /** Read-only. */
  readonly residentialDevice?: number | null;
}

/** `Voicemail-detailed` — the `detailed` serialization of Voicemail. */
export interface VoicemailDetailed {
  enabled: boolean;
  /** Max length 200. */
  name: string;
  /** Max length 200. */
  email?: string | null;
  sendMail: boolean;
  attachSound: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly user?: User | null;
  /** Read-only. */
  readonly residentialDevice?: ResidentialDevice | null;
  company: Company;
  locution?: Locution | null;
  /** Voicemail rel users */
  relUserIds?: Array<number> | null;
}

/** `Voicemail-withRelUsers` — the `withRelUsers` serialization of Voicemail. */
export interface VoicemailWithRelUsers {
  enabled: boolean;
  /** Max length 200. */
  name: string;
  /** Max length 200. */
  email?: string | null;
  sendMail: boolean;
  attachSound: boolean;
  /** Read-only. */
  readonly id?: number | null;
  /** Read-only. */
  readonly user?: User | null;
  /** Read-only. */
  readonly residentialDevice?: ResidentialDevice | null;
  company: Company;
  locution?: Locution | null;
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

/** `VoicemailRelUser` */
export interface VoicemailRelUser {
  /** Read-only. */
  readonly id?: number | null;
  user: number;
  voicemail: number;
}

/** `VoicemailRelUser-collection` — the `collection` serialization of VoicemailRelUser. */
export interface VoicemailRelUserCollection {
  /** Read-only. */
  readonly id?: number | null;
  user: number;
  voicemail: number;
}

/** `VoicemailRelUser-detailed` — the `detailed` serialization of VoicemailRelUser. */
export interface VoicemailRelUserDetailed {
  /** Read-only. */
  readonly id?: number | null;
  user: User;
  voicemail: Voicemail;
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
  logo?: Logo | null;
  company?: number | null;
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
  ActiveCalls: ActiveCalls;
  BillableCall: BillableCall;
  "BillableCall-collection": BillableCallCollection;
  "BillableCall-detailed": BillableCallDetailed;
  Calendar: Calendar;
  "Calendar-collection": CalendarCollection;
  "Calendar-detailed": CalendarDetailed;
  CalendarPeriod: CalendarPeriod;
  "CalendarPeriod-collection": CalendarPeriodCollection;
  "CalendarPeriod-detailed": CalendarPeriodDetailed;
  CalendarPeriodsRelSchedule: CalendarPeriodsRelSchedule;
  "CalendarPeriodsRelSchedule-detailed": CalendarPeriodsRelScheduleDetailed;
  "CalendarPeriodsRelSchedule-detailedCollection": CalendarPeriodsRelScheduleDetailedCollection;
  CallAcl: CallAcl;
  "CallAcl-collection": CallAclCollection;
  "CallAcl-detailed": CallAclDetailed;
  CallAclRelMatchList: CallAclRelMatchList;
  "CallAclRelMatchList-detailed": CallAclRelMatchListDetailed;
  "CallAclRelMatchList-detailedCollection": CallAclRelMatchListDetailedCollection;
  "CallCsvReport-collection": CallCsvReportCollection;
  "CallCsvReport-detailed": CallCsvReportDetailed;
  CallCsvReport_Csv: CallCsvReportCsv;
  CallCsvScheduler: CallCsvScheduler;
  "CallCsvScheduler-collection": CallCsvSchedulerCollection;
  "CallCsvScheduler-detailed": CallCsvSchedulerDetailed;
  CallForwardSetting: CallForwardSetting;
  "CallForwardSetting-collection": CallForwardSettingCollection;
  "CallForwardSetting-detailed": CallForwardSettingDetailed;
  "ChannelUsage-collection": ChannelUsageCollection;
  Company: Company;
  "Company-collection": CompanyCollection;
  "Company-detailed": CompanyDetailed;
  CompanyService: CompanyService;
  "CompanyService-collection": CompanyServiceCollection;
  "CompanyService-detailed": CompanyServiceDetailed;
  ConditionalRoute: ConditionalRoute;
  "ConditionalRoute-collection": ConditionalRouteCollection;
  "ConditionalRoute-detailed": ConditionalRouteDetailed;
  ConditionalRoutesCondition: ConditionalRoutesCondition;
  "ConditionalRoutesCondition-collection": ConditionalRoutesConditionCollection;
  "ConditionalRoutesCondition-detailed": ConditionalRoutesConditionDetailed;
  "ConditionalRoutesCondition-withInverseRelationships": ConditionalRoutesConditionWithInverseRelationships;
  ConditionalRoutesConditionsRelCalendar: ConditionalRoutesConditionsRelCalendar;
  "ConditionalRoutesConditionsRelCalendar-detailed": ConditionalRoutesConditionsRelCalendarDetailed;
  "ConditionalRoutesConditionsRelCalendar-detailedCollection": ConditionalRoutesConditionsRelCalendarDetailedCollection;
  ConditionalRoutesConditionsRelMatchlist: ConditionalRoutesConditionsRelMatchlist;
  "ConditionalRoutesConditionsRelMatchlist-detailed": ConditionalRoutesConditionsRelMatchlistDetailed;
  "ConditionalRoutesConditionsRelMatchlist-detailedCollection": ConditionalRoutesConditionsRelMatchlistDetailedCollection;
  ConditionalRoutesConditionsRelRouteLock: ConditionalRoutesConditionsRelRouteLock;
  "ConditionalRoutesConditionsRelRouteLock-detailed": ConditionalRoutesConditionsRelRouteLockDetailed;
  "ConditionalRoutesConditionsRelRouteLock-detailedCollection": ConditionalRoutesConditionsRelRouteLockDetailedCollection;
  ConditionalRoutesConditionsRelSchedule: ConditionalRoutesConditionsRelSchedule;
  "ConditionalRoutesConditionsRelSchedule-detailed": ConditionalRoutesConditionsRelScheduleDetailed;
  "ConditionalRoutesConditionsRelSchedule-detailedCollection": ConditionalRoutesConditionsRelScheduleDetailedCollection;
  ConferenceRoom: ConferenceRoom;
  "ConferenceRoom-collection": ConferenceRoomCollection;
  "ConferenceRoom-detailed": ConferenceRoomDetailed;
  Contact: Contact;
  "Contact-collection": ContactCollection;
  "Contact-detailed": ContactDetailed;
  Country: Country;
  "Country-collection": CountryCollection;
  "Country-detailed": CountryDetailed;
  Country_Name: CountryName;
  Country_Zone: CountryZone;
  Dashboard: Dashboard;
  DashboardBillableCall: DashboardBillableCall;
  DashboardClient: DashboardClient;
  DashboardResidentialDevice: DashboardResidentialDevice;
  DashboardRetailAccount: DashboardRetailAccount;
  DashboardUser: DashboardUser;
  Ddi: Ddi;
  "Ddi-collection": DdiCollection;
  "Ddi-detailed": DdiDetailed;
  "Domain-collection": DomainCollection;
  Extension: Extension;
  "Extension-collection": ExtensionCollection;
  "Extension-detailed": ExtensionDetailed;
  ExtensionsMassImport: ExtensionsMassImport;
  ExternalCallFilter: ExternalCallFilter;
  "ExternalCallFilter-collection": ExternalCallFilterCollection;
  "ExternalCallFilter-detailed": ExternalCallFilterDetailed;
  "ExternalCallFilter-withInverseRelationships": ExternalCallFilterWithInverseRelationships;
  ExternalCallFilterBlackList: ExternalCallFilterBlackList;
  "ExternalCallFilterBlackList-detailed": ExternalCallFilterBlackListDetailed;
  "ExternalCallFilterBlackList-detailedCollection": ExternalCallFilterBlackListDetailedCollection;
  ExternalCallFilterRelCalendar: ExternalCallFilterRelCalendar;
  "ExternalCallFilterRelCalendar-detailed": ExternalCallFilterRelCalendarDetailed;
  "ExternalCallFilterRelCalendar-detailedCollection": ExternalCallFilterRelCalendarDetailedCollection;
  ExternalCallFilterRelSchedule: ExternalCallFilterRelSchedule;
  "ExternalCallFilterRelSchedule-detailed": ExternalCallFilterRelScheduleDetailed;
  "ExternalCallFilterRelSchedule-detailedCollection": ExternalCallFilterRelScheduleDetailedCollection;
  ExternalCallFilterWhiteList: ExternalCallFilterWhiteList;
  "ExternalCallFilterWhiteList-detailed": ExternalCallFilterWhiteListDetailed;
  "ExternalCallFilterWhiteList-detailedCollection": ExternalCallFilterWhiteListDetailedCollection;
  Fax: Fax;
  "Fax-collection": FaxCollection;
  "Fax-detailed": FaxDetailed;
  FaxesInOut: FaxesInOut;
  "FaxesInOut-collection": FaxesInOutCollection;
  "FaxesInOut-detailed": FaxesInOutDetailed;
  FaxesInOut_File: FaxesInOutFile;
  Feature: Feature;
  "FeaturesRelCompany-detailed": FeaturesRelCompanyDetailed;
  "FeaturesRelCompany-detailedCollection": FeaturesRelCompanyDetailedCollection;
  Friend: Friend;
  "Friend-collection": FriendCollection;
  "Friend-detailed": FriendDetailed;
  "Friend-status": FriendStatus;
  FriendsPattern: FriendsPattern;
  "FriendsPattern-collection": FriendsPatternCollection;
  "FriendsPattern-detailed": FriendsPatternDetailed;
  HolidayDate: HolidayDate;
  "HolidayDate-collection": HolidayDateCollection;
  "HolidayDate-detailed": HolidayDateDetailed;
  HolidayDateRange: HolidayDateRange;
  HolidaysMassImport: HolidaysMassImport;
  HuntGroup: HuntGroup;
  "HuntGroup-collection": HuntGroupCollection;
  "HuntGroup-detailed": HuntGroupDetailed;
  HuntGroupMember: HuntGroupMember;
  "HuntGroupMember-detailed": HuntGroupMemberDetailed;
  "HuntGroupMember-detailedCollection": HuntGroupMemberDetailedCollection;
  "Invoice-collection": InvoiceCollection;
  "Invoice-detailed": InvoiceDetailed;
  Invoice_Pdf: InvoicePdf;
  Invoicing: Invoicing;
  Ivr: Ivr;
  "Ivr-collection": IvrCollection;
  "Ivr-detailed": IvrDetailed;
  "Ivr-withExcludedExtensions": IvrWithExcludedExtensions;
  IvrEntry: IvrEntry;
  "IvrEntry-collection": IvrEntryCollection;
  "IvrEntry-detailed": IvrEntryDetailed;
  IvrExcludedExtension: IvrExcludedExtension;
  "IvrExcludedExtension-detailed": IvrExcludedExtensionDetailed;
  "IvrExcludedExtension-detailedCollection": IvrExcludedExtensionDetailedCollection;
  Language: Language;
  "Language-collection": LanguageCollection;
  "Language-detailed": LanguageDetailed;
  Language_Name: LanguageName;
  Location: Location;
  "Location-collection": LocationCollection;
  "Location-detailed": LocationDetailed;
  Locution: Locution;
  "Locution-collection": LocutionCollection;
  "Locution-detailed": LocutionDetailed;
  Locution_EncodedFile: LocutionEncodedFile;
  Locution_OriginalFile: LocutionOriginalFile;
  Logo: Logo;
  MatchList: MatchList;
  "MatchList-collection": MatchListCollection;
  "MatchList-detailed": MatchListDetailed;
  MatchListPattern: MatchListPattern;
  "MatchListPattern-collection": MatchListPatternCollection;
  "MatchListPattern-detailed": MatchListPatternDetailed;
  MetadataFile: MetadataFile;
  MusicOnHold: MusicOnHold;
  "MusicOnHold-collection": MusicOnHoldCollection;
  "MusicOnHold-detailed": MusicOnHoldDetailed;
  MusicOnHold_EncodedFile: MusicOnHoldEncodedFile;
  MusicOnHold_OriginalFile: MusicOnHoldOriginalFile;
  Name: Name;
  NotificationTemplate: NotificationTemplate;
  OutgoingDdiRule: OutgoingDdiRule;
  "OutgoingDdiRule-collection": OutgoingDdiRuleCollection;
  "OutgoingDdiRule-detailed": OutgoingDdiRuleDetailed;
  OutgoingDdiRulesPattern: OutgoingDdiRulesPattern;
  "OutgoingDdiRulesPattern-detailed": OutgoingDdiRulesPatternDetailed;
  "OutgoingDdiRulesPattern-detailedCollection": OutgoingDdiRulesPatternDetailedCollection;
  PickUpGroup: PickUpGroup;
  "PickUpGroup-collection": PickUpGroupCollection;
  "PickUpGroup-detailed": PickUpGroupDetailed;
  "PickUpGroup-withUsers": PickUpGroupWithUsers;
  PickUpRelUser: PickUpRelUser;
  "PickUpRelUser-detailed": PickUpRelUserDetailed;
  "PickUpRelUser-detailedCollection": PickUpRelUserDetailedCollection;
  Profile: Profile;
  ProfileAcl: ProfileAcl;
  Queue: Queue;
  "Queue-collection": QueueCollection;
  "Queue-detailed": QueueDetailed;
  QueueMember: QueueMember;
  "QueueMember-detailed": QueueMemberDetailed;
  "QueueMember-detailedCollection": QueueMemberDetailedCollection;
  RatingPlanGroup: RatingPlanGroup;
  "RatingPlanGroup-collection": RatingPlanGroupCollection;
  "RatingPlanGroup-detailed": RatingPlanGroupDetailed;
  RatingPlanGroup_Description: RatingPlanGroupDescription;
  RatingPlanGroup_Name: RatingPlanGroupName;
  RatingPlanPrices: RatingPlanPrices;
  "RatingProfile-collection": RatingProfileCollection;
  "RatingProfile-detailed": RatingProfileDetailed;
  Recording: Recording;
  "Recording-collection": RecordingCollection;
  "Recording-detailed": RecordingDetailed;
  Recording_RecordedFile: RecordingRecordedFile;
  RegistrationStatus: RegistrationStatus;
  ResidentialDevice: ResidentialDevice;
  "ResidentialDevice-collection": ResidentialDeviceCollection;
  "ResidentialDevice-detailed": ResidentialDeviceDetailed;
  "ResidentialDevice-status": ResidentialDeviceStatus;
  RetailAccount: RetailAccount;
  "RetailAccount-collection": RetailAccountCollection;
  "RetailAccount-detailed": RetailAccountDetailed;
  "RetailAccount-status": RetailAccountStatus;
  "RetailAccount-statusItem": RetailAccountStatusItem;
  RouteLock: RouteLock;
  "RouteLock-collection": RouteLockCollection;
  "RouteLock-detailed": RouteLockDetailed;
  RoutingTag: RoutingTag;
  "RoutingTag-collection": RoutingTagCollection;
  "RoutingTag-detailed": RoutingTagDetailed;
  Schedule: Schedule;
  "Schedule-collection": ScheduleCollection;
  "Schedule-detailed": ScheduleDetailed;
  Service: Service;
  "Service-collection": ServiceCollection;
  "Service-detailed": ServiceDetailed;
  Service_Description: ServiceDescription;
  Service_Name: ServiceName;
  SurvivalDevice: SurvivalDevice;
  "SurvivalDevice-collection": SurvivalDeviceCollection;
  "SurvivalDevice-detailed": SurvivalDeviceDetailed;
  TarificationInfo: TarificationInfo;
  Terminal: Terminal;
  "Terminal-collection": TerminalCollection;
  "Terminal-detailed": TerminalDetailed;
  "Terminal-status": TerminalStatus;
  TerminalModel: TerminalModel;
  "TerminalModel-collection": TerminalModelCollection;
  "TerminalModel-detailed": TerminalModelDetailed;
  Timezone: Timezone;
  "Timezone-collection": TimezoneCollection;
  "Timezone-detailed": TimezoneDetailed;
  Timezone_Label: TimezoneLabel;
  Token: Token;
  TransformationRuleSet: TransformationRuleSet;
  "TransformationRuleSet-collection": TransformationRuleSetCollection;
  "TransformationRuleSet-detailed": TransformationRuleSetDetailed;
  TransformationRuleSet_Name: TransformationRuleSetName;
  User: User;
  "User-collection": UserCollection;
  "User-detailed": UserDetailed;
  UsersCdr: UsersCdr;
  "UsersCdr-collection": UsersCdrCollection;
  "UsersCdr-detailed": UsersCdrDetailed;
  Voicemail: Voicemail;
  "Voicemail-collection": VoicemailCollection;
  "Voicemail-detailed": VoicemailDetailed;
  "Voicemail-withRelUsers": VoicemailWithRelUsers;
  "VoicemailMessage-collection": VoicemailMessageCollection;
  "VoicemailMessage-detailed": VoicemailMessageDetailed;
  VoicemailMessage_RecordingFile: VoicemailMessageRecordingFile;
  VoicemailRelUser: VoicemailRelUser;
  "VoicemailRelUser-collection": VoicemailRelUserCollection;
  "VoicemailRelUser-detailed": VoicemailRelUserDetailed;
  "WebPortal-collection": WebPortalCollection;
  WebTheme: WebTheme;
  Webhook: Webhook;
  "Webhook-collection": WebhookCollection;
  "Webhook-detailed": WebhookDetailed;
}

export type DefinitionName = keyof Definitions;
