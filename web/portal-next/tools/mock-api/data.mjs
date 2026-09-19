/**
 * Fixture data for the mock API.
 *
 * Shapes follow the generated schemas exactly — including the detail the real
 * API is fussy about: unset foreign keys come back as explicit `null`, not
 * omitted, and collections are bare arrays with the totals in headers.
 */

const CALLERS = [
  '+34944000111',
  '+34944000222',
  '201',
  '202',
  '+34600123456',
  '+441632960111',
];
const CALLEES = ['+34911223344', '203', '+34655998877', '+33142685300', '210'];

function pick(list, seed) {
  return list[seed % list.length];
}

export const theme = {
  name: 'Axion',
  color: '#0277bd',
  logo: null,
  title: 'Axion Self Care',
  productName: 'Axion Self Care',
};

export const status = {
  userName: 'Alex Ibarra',
  companyName: 'Northwind Telecom',
  companyDomain: 'northwind.example.net',
  language: 'en',
  voiceMail: '*95',
  gsQRCode: null,
  userAgent: 'Yealink T46S 66.85.0.5',
  ipRegistered: '81.45.22.104:5060',
  statusTerminal: 'registered',
  terminalName: 'alex-desk',
  terminalPassword: null,
  extensionNumber: 201,
  features: ['recordings', 'faxes', 'queues'],
};

export const dashboard = {
  userName: 'Alex',
  userLastName: 'Ibarra',
  extension: '201',
  terminal: 'alex-desk',
  email: 'alex.ibarra@northwind.example.net',
  outgoingDdi: '+34 944 000 100',
  productName: 'Axion Self Care',
};

export const callStats = { totalCalls: 318, totalDetours: 24 };
export const lastMonthCalls = { inbound: 176, outbound: 142, total: 318 };

/** 137 calls spread back over three weeks, newest first. */
export const callHistory = Array.from({ length: 137 }, (_, index) => {
  const startedAt = new Date(Date.now() - index * 3.4 * 3600 * 1000);
  const inbound = index % 3 !== 0;
  const disposition =
    index % 9 === 0
      ? 'missed'
      : index % 13 === 0
        ? 'busy'
        : index % 29 === 0
          ? 'error'
          : 'answered';

  return {
    id: 5000 - index,
    startTime: startedAt.toISOString(),
    owner: '201',
    direction: inbound ? 'inbound' : 'outbound',
    caller: inbound ? pick(CALLERS, index) : '201',
    callee: inbound ? '201' : pick(CALLEES, index),
    duration: disposition === 'answered' ? 20 + ((index * 37) % 900) : 0,
    disposition,
    numRecordings: disposition === 'answered' && index % 6 === 0 ? 1 : 0,
  };
});

export const callForwardSettings = [
  {
    id: 1,
    callTypeFilter: 'both',
    callForwardType: 'noAnswer',
    targetType: 'voicemail',
    numberValue: null,
    noAnswerTimeout: 20,
    enabled: true,
    user: 12,
    extension: null,
    voicemail: 3,
    numberCountry: null,
  },
  {
    id: 2,
    callTypeFilter: 'external',
    callForwardType: 'userNotRegistered',
    targetType: 'number',
    numberValue: '600123456',
    noAnswerTimeout: 0,
    enabled: true,
    user: 12,
    extension: null,
    voicemail: null,
    numberCountry: 68,
  },
  {
    id: 3,
    callTypeFilter: 'internal',
    callForwardType: 'busy',
    targetType: 'extension',
    numberValue: null,
    noAnswerTimeout: 0,
    enabled: false,
    user: 12,
    extension: 44,
    voicemail: null,
    numberCountry: null,
  },
];

export const voicemailMessages = Array.from({ length: 12 }, (_, index) => ({
  id: 900 - index,
  caller: pick(CALLERS, index + 2),
  callerId: `"Caller ${index + 1}" <${pick(CALLERS, index + 2)}>`,
  duration: 12 + index * 7,
  mailboxUser: '201',
}));

export const recordings = Array.from({ length: 23 }, (_, index) => ({
  id: 700 - index,
  callid: `a1b2c3-${700 - index}@northwind`,
  calldate: new Date(Date.now() - index * 26 * 3600 * 1000).toISOString(),
  type: index % 4 === 0 ? 'ondemand' : 'ddi',
  caller: pick(CALLERS, index),
  callee: pick(CALLEES, index + 1),
  duration: 45 + ((index * 53) % 600),
}));

export const faxes = Array.from({ length: 8 }, (_, index) => ({
  id: 300 - index,
  calldate: new Date(Date.now() - index * 52 * 3600 * 1000).toISOString(),
  type: index % 2 === 0 ? 'In' : 'Out',
  src: pick(CALLERS, index),
  dst: pick(CALLEES, index),
  pages: 1 + (index % 5),
  status: index % 7 === 0 ? 'error' : 'completed',
  fax: 1,
  file: null,
}));

export const countries = [
  { id: 68, countryCode: '+34', name: { en: 'Spain' } },
  { id: 74, countryCode: '+33', name: { en: 'France' } },
  { id: 222, countryCode: '+44', name: { en: 'United Kingdom' } },
];

export const companyExtensions = [
  { id: 41, number: '200' },
  { id: 44, number: '202' },
  { id: 45, number: '203' },
];

export const companyVoicemails = [
  { id: 3, name: 'Alex Ibarra' },
  { id: 4, name: 'Support' },
];

export const faxBoxes = [{ id: 1, name: 'Main fax' }];
