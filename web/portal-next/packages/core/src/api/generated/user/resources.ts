/* eslint-disable */
// GENERATED FILE — do not edit by hand.
// Source: web/rest/user/public/apiSpec.json
// Regenerate with: yarn codegen

import type { ResourceManifest } from '../../resourceManifest';

export const resources = {
  call_forward_settings: {
    key: "call_forward_settings",
    itemPath: "/call_forward_settings/{id}",
    operations: {
      list: false,
      create: false,
      read: true,
      update: true,
      delete: true,
    },
    schemas: {
      detail: "CallForwardSetting-detailed",
      write: "CallForwardSetting",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  countries: {
    key: "countries",
    collectionPath: "/countries",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Country-collection",
    },
    filters: {
      code: ["end", "eq", "exact", "neq", "partial", "start"],
      countryCode: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      id: ["exact", "neq"],
      "name.ca": ["end", "eq", "exact", "neq", "partial", "start"],
      "name.en": ["end", "eq", "exact", "neq", "partial", "start"],
      "name.es": ["end", "eq", "exact", "neq", "partial", "start"],
      "name.eu": ["end", "eq", "exact", "neq", "partial", "start"],
      "name.it": ["end", "eq", "exact", "neq", "partial", "start"],
    },
    orderBy: ["code", "countryCode", "id", "name.ca", "name.en", "name.es", "name.eu", "name.it"],
    paginationClientEnabled: true,
    multipart: false,
    subresources: [
    ],
  },
  faxes: {
    key: "faxes",
    collectionPath: "/faxes",
    itemPath: "/faxes/{id}",
    operations: {
      list: true,
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Fax-collection",
      detail: "Fax-detailed",
    },
    filters: {
      email: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      id: ["exact", "neq"],
      name: ["end", "eq", "exact", "neq", "partial", "start"],
      sendByEmail: ["eq"],
    },
    orderBy: ["email", "id", "name", "sendByEmail"],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  faxes_in_outs: {
    key: "faxes_in_outs",
    collectionPath: "/faxes_in_outs",
    itemPath: "/faxes_in_outs/{id}",
    operations: {
      list: true,
      create: true,
      read: true,
      update: false,
      delete: true,
    },
    schemas: {
      list: "FaxesInOut-collection",
      detail: "FaxesInOut-detailed",
      write: "FaxesInOut",
      create: "FaxesInOut",
    },
    filters: {
      calldate: ["eq", "exact", "neq", "start"],
      dst: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      dstCountry: ["eq", "exists", "in"],
      fax: ["eq", "in"],
      "file.baseName": ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      "file.fileSize": ["between", "eq", "exists", "gt", "gte", "lt", "lte", "neq"],
      "file.mimeType": ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      id: ["exact", "neq"],
      src: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      status: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      type: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
    },
    orderBy: ["calldate", "dst", "file.baseName", "file.fileSize", "file.mimeType", "id", "src", "status", "type"],
    paginationClientEnabled: false,
    multipart: true,
    multipartForm: { payloadField: "faxesInOut", fileFields: ["file"] },
    subresources: [
      { name: "file", path: "/faxes_in_outs/{id}/file", method: "GET", scope: "item", summary: "Retrieves a FaxesInOut resource.", binary: true },
      { name: "resend", path: "/faxes_in_outs/{id}/resend", method: "POST", scope: "item", summary: "Resend failed fax", binary: true },
    ],
  },
  "my/call_forward_settings": {
    key: "my/call_forward_settings",
    collectionPath: "/my/call_forward_settings",
    operations: {
      list: true,
      create: true,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "CallForwardSetting-detailedCollection",
      detail: "CallForwardSetting",
      create: "CallForwardSetting",
    },
    filters: {
      callForwardType: ["end", "eq", "exact", "neq", "partial", "start"],
      callTypeFilter: ["end", "eq", "exact", "neq", "partial", "start"],
      enabled: ["eq"],
      extension: ["eq", "exists", "in"],
      "extension.friendValue": ["eq"],
      "extension.number": ["eq"],
      "extension.numberCountry": ["eq"],
      "extension.numberValue": ["eq"],
      "extension.routeType": ["eq"],
      "extension.user": ["eq"],
      "extension.voicemail": ["eq"],
      id: ["exact", "neq"],
      "name.ca": ["eq"],
      "name.en": ["eq"],
      "name.es": ["eq"],
      "name.eu": ["eq"],
      "name.it": ["eq"],
      noAnswerTimeout: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      numberCountry: ["eq", "exists", "in"],
      "numberCountry.code": ["eq"],
      "numberCountry.countryCode": ["eq"],
      numberValue: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      targetType: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      user: ["eq", "exists", "in"],
      "user.active": ["eq"],
      "user.bossAssistant": ["eq"],
      "user.doNotDisturb": ["eq"],
      "user.email": ["eq"],
      "user.extension": ["eq"],
      "user.externalIpCalls": ["eq"],
      "user.gsQRCode": ["eq"],
      "user.isBoss": ["eq"],
      "user.lastname": ["eq"],
      "user.maxCalls": ["eq"],
      "user.multiContact": ["eq"],
      "user.name": ["eq"],
      "user.pass": ["eq"],
      "user.rejectCallMethod": ["eq"],
      "user.timezone": ["eq"],
      "user.useDefaultLocation": ["eq"],
      "user.voicemail": ["eq"],
      voicemail: ["eq", "exists", "in"],
      "voicemail.attachSound": ["eq"],
      "voicemail.email": ["eq"],
      "voicemail.enabled": ["eq"],
      "voicemail.name": ["eq"],
      "voicemail.sendMail": ["eq"],
      "voicemail.user": ["eq"],
      "zone.ca": ["eq"],
      "zone.en": ["eq"],
      "zone.es": ["eq"],
      "zone.eu": ["eq"],
      "zone.it": ["eq"],
    },
    orderBy: ["callForwardType", "callTypeFilter", "enabled", "id", "noAnswerTimeout", "numberValue", "targetType"],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/call_history": {
    key: "my/call_history",
    collectionPath: "/my/call_history",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "UsersCdr",
    },
    filters: {
      callee: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      caller: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      callid: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      direction: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      disposition: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      duration: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      extension: ["eq", "exists", "in"],
      id: ["exact", "neq"],
      numRecordings: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      owner: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      startTime: ["eq", "exact", "neq", "start"],
      user: ["eq", "exists", "in"],
    },
    orderBy: ["callee", "caller", "callid", "direction", "disposition", "duration", "id", "numRecordings", "owner", "startTime"],
    paginationClientEnabled: true,
    multipart: false,
    subresources: [
    ],
  },
  "my/call_stats": {
    key: "my/call_stats",
    collectionPath: "/my/call_stats",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "CallStats",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/company_assistants": {
    key: "my/company_assistants",
    collectionPath: "/my/company_assistants",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "User",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/company_country": {
    key: "my/company_country",
    collectionPath: "/my/company_country",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Country-detailed",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/company_extensions": {
    key: "my/company_extensions",
    collectionPath: "/my/company_extensions",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Extension",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/company_voicemails": {
    key: "my/company_voicemails",
    collectionPath: "/my/company_voicemails",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "User",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/dashboard": {
    key: "my/dashboard",
    collectionPath: "/my/dashboard",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Dashboard",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/last_month_calls": {
    key: "my/last_month_calls",
    collectionPath: "/my/last_month_calls",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "LastMonthCalls",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/logo/{id}/{name}": {
    key: "my/logo/{id}/{name}",
    collectionPath: "/my/logo/{id}/{name}",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "WebTheme",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/profile": {
    key: "my/profile",
    collectionPath: "/my/profile",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "User-myProfile",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/status": {
    key: "my/status",
    collectionPath: "/my/status",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "UserStatus",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "my/theme": {
    key: "my/theme",
    collectionPath: "/my/theme",
    singleton: true,
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "WebTheme",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  recordings: {
    key: "recordings",
    collectionPath: "/recordings",
    itemPath: "/recordings/{id}",
    operations: {
      list: true,
      create: false,
      read: true,
      update: false,
      delete: true,
    },
    schemas: {
      list: "Recording-collection",
      detail: "Recording-detailed",
    },
    filters: {
      calldate: ["eq", "exact", "neq", "start"],
      callee: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      caller: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      callid: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      duration: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      id: ["exact", "neq"],
      recorder: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      type: ["end", "eq", "exact", "neq", "partial", "start"],
      user: ["eq", "exists", "in"],
      usersCdr: ["eq", "exists", "in"],
    },
    orderBy: ["calldate", "callee", "caller", "callid", "duration", "id", "recorder", "type"],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
      { name: "recordedfile", path: "/recordings/{id}/recordedfile", method: "GET", scope: "item", summary: "Retrieves a Recording resource.", binary: true },
      { name: "recorded_files_zip", path: "/recordings/recorded_files_zip", method: "GET", scope: "collection", summary: "Retrieves the collection of Recording resources.", binary: true },
    ],
  },
  timezones: {
    key: "timezones",
    collectionPath: "/timezones",
    operations: {
      list: true,
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      list: "Timezone-collection",
    },
    filters: {
      country: ["eq", "exists", "in"],
      id: ["exact", "neq"],
      tz: ["end", "eq", "exact", "neq", "partial", "start"],
    },
    orderBy: ["id", "tz"],
    paginationClientEnabled: true,
    multipart: false,
    subresources: [
    ],
  },
  "token/exchange": {
    key: "token/exchange",
    collectionPath: "/token/exchange",
    operations: {
      list: false,
      create: true,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
      detail: "Token",
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  "token/refresh": {
    key: "token/refresh",
    collectionPath: "/token/refresh",
    operations: {
      list: false,
      create: true,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  user_login: {
    key: "user_login",
    collectionPath: "/user_login",
    operations: {
      list: false,
      create: true,
      read: false,
      update: false,
      delete: false,
    },
    schemas: {
    },
    filters: {
    },
    orderBy: [],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
  users_cdrs: {
    key: "users_cdrs",
    collectionPath: "/users_cdrs",
    itemPath: "/users_cdrs/{id}",
    operations: {
      list: true,
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    schemas: {
      list: "UsersCdr-collection",
      detail: "UsersCdr-detailed",
    },
    filters: {
      callee: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      caller: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      direction: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      disposition: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      duration: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      extension: ["eq", "exists", "in"],
      id: ["exact", "neq"],
      numRecordings: ["between", "eq", "gt", "gte", "lt", "lte", "neq"],
      owner: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      startTime: ["eq", "exact", "neq", "start"],
      user: ["eq", "exists", "in"],
    },
    orderBy: ["callee", "caller", "direction", "disposition", "duration", "id", "numRecordings", "owner", "startTime"],
    paginationClientEnabled: true,
    multipart: false,
    subresources: [
    ],
  },
  voicemail_messages: {
    key: "voicemail_messages",
    collectionPath: "/voicemail_messages",
    itemPath: "/voicemail_messages/{id}",
    operations: {
      list: true,
      create: false,
      read: true,
      update: false,
      delete: true,
    },
    schemas: {
      list: "VoicemailMessage-collection",
      detail: "VoicemailMessage-detailed",
    },
    filters: {
      calldate: ["eq", "exact", "neq", "start"],
      caller: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      duration: ["between", "eq", "exists", "gt", "gte", "lt", "lte", "neq"],
      folder: ["end", "eq", "exact", "neq", "partial", "start"],
      id: ["exact", "neq"],
      voicemail: ["eq", "exists", "in"],
    },
    orderBy: ["calldate", "caller", "duration", "folder", "id"],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
      { name: "metadatafile", path: "/voicemail_messages/{id}/metadatafile", method: "GET", scope: "item", summary: "Retrieves a VoicemailMessage resource.", binary: true },
      { name: "recordingfile", path: "/voicemail_messages/{id}/recordingfile", method: "GET", scope: "item", summary: "Retrieves a VoicemailMessage resource.", binary: true },
    ],
  },
  voicemails: {
    key: "voicemails",
    collectionPath: "/voicemails",
    itemPath: "/voicemails/{id}",
    operations: {
      list: true,
      create: false,
      read: true,
      update: true,
      delete: false,
    },
    schemas: {
      list: "Voicemail",
      detail: "Voicemail-detailed",
      write: "Voicemail",
    },
    filters: {
      attachSound: ["eq"],
      email: ["end", "eq", "exact", "exists", "neq", "partial", "start"],
      enabled: ["eq"],
      id: ["exact", "neq"],
      name: ["end", "eq", "exact", "neq", "partial", "start"],
      sendMail: ["eq"],
      user: ["eq"],
    },
    orderBy: ["attachSound", "email", "enabled", "id", "name", "sendMail"],
    paginationClientEnabled: false,
    multipart: false,
    subresources: [
    ],
  },
} satisfies Record<string, ResourceManifest>;

export type ResourceKey = keyof typeof resources;

export const apiBasePath = "/api/user";
export const apiTitle = "Ivoz Provider";
export const appName = "user";
