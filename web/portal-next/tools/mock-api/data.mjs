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
  '202',
  '205',
  '+34600123456',
  '+441632960111',
];
const CALLEES = ['+34911223344', '203', '+34655998877', '+33142685300', '210'];

function pick(list, seed) {
  return list[seed % list.length];
}

export const theme = {
  name: 'Tervian One',
  color: '#087F6D',
  logo: null,
  title: 'Tervian One',
  productName: 'Tervian One',
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
  productName: 'Tervian One',
};

export const callStats = { totalCalls: 318, totalDetours: 24 };
export const lastMonthCalls = { inbound: 176, outbound: 142, total: 318 };

/**
 * A deterministic pseudo-random source, so the fixtures are identical on
 * every run and screenshots stay comparable.
 */
function prng(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * About four months of one user's calls, newest first: busier on weekdays,
 * mostly during office hours, with the occasional quiet day — enough shape
 * for the trend, hour and period-comparison views to have something to show.
 */
export const callHistory = (() => {
  const random = prng(201);
  const calls = [];
  const now = Date.now();
  const DAY = 24 * 3600 * 1000;

  for (let daysAgo = 0; daysAgo < 120; daysAgo++) {
    const day = new Date(now - daysAgo * DAY);
    const weekday = day.getUTCDay();
    const weekend = weekday === 0 || weekday === 6;
    const base = weekend ? 1 : 5;
    const count = Math.max(
      0,
      Math.round(base + (random() - 0.35) * (weekend ? 3 : 9))
    );

    for (let n = 0; n < count; n++) {
      const hour = 8 + Math.floor(random() ** 1.3 * 11);
      const minute = Math.floor(random() * 60);
      const start = new Date(
        Date.UTC(
          day.getUTCFullYear(),
          day.getUTCMonth(),
          day.getUTCDate(),
          hour,
          minute
        )
      );
      if (start.getTime() > now) continue;

      const inbound = random() < 0.58;
      const roll = random();
      const disposition =
        roll < 0.12
          ? 'missed'
          : roll < 0.19
            ? 'busy'
            : roll < 0.22
              ? 'error'
              : 'answered';
      const counterpart = inbound
        ? CALLERS[Math.floor(random() * CALLERS.length)]
        : CALLEES[Math.floor(random() * CALLEES.length)];

      calls.push({
        startTime: start.toISOString(),
        owner: '201',
        direction: inbound ? 'inbound' : 'outbound',
        caller: inbound ? counterpart : '201',
        callee: inbound ? '201' : counterpart,
        duration:
          disposition === 'answered'
            ? 15 + Math.floor(random() ** 2 * 1400)
            : 0,
        disposition,
        numRecordings: disposition === 'answered' && random() < 0.15 ? 1 : 0,
      });
    }
  }

  calls.sort((a, b) => b.startTime.localeCompare(a.startTime));
  return calls.map((call, index) => ({ id: 90000 - index, ...call }));
})();

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
