import { CsvColumn, CsvRecord } from '../../../components/CsvImport/csvRecords';

/**
 * Carrier server CSV: the fields of the portal's server form. The schema's
 * ip, hostname and port are not in the form, so they are not in the file;
 * updates keep their current values.
 * Servers have no unique column; within one carrier they are matched by
 * SIP Proxy + Outbound Proxy (one domain can be reached via several IPs).
 */
export const URI_SCHEMES: Record<string, number> = { sip: 1, sips: 2 };
export const TRANSPORTS: Record<string, number> = { udp: 1, tcp: 2, tls: 3 };

export const SERVER_COLUMNS: CsvColumn[] = [
  {
    key: 'sipProxy',
    label: 'SIP Proxy',
    required: true,
    maxLength: 128,
  },
  { key: 'outboundProxy', label: 'Outbound Proxy', maxLength: 128 },
  { key: 'uriScheme', label: 'URI scheme', choices: Object.keys(URI_SCHEMES) },
  { key: 'transport', label: 'Transport', choices: ['UDP', 'TCP', 'TLS'] },
  {
    key: 'authNeeded',
    label: 'Authentication required',
    choices: ['yes', 'no'],
  },
  { key: 'authUser', label: 'Auth username', maxLength: 64 },
  { key: 'authPassword', label: 'Auth password', maxLength: 64 },
  { key: 'sendPAI', label: 'Send PAI', choices: ['yes', 'no'] },
  { key: 'sendRPID', label: 'Send RPID', choices: ['yes', 'no'] },
  { key: 'fromUser', label: 'From user', maxLength: 64 },
  { key: 'fromDomain', label: 'From domain', maxLength: 190 },
];

export interface ServerRow {
  id: number;
  ip: string | null;
  hostname: string | null;
  port: number | null;
  uriScheme: number | null;
  transport: number | null;
  sendPAI: boolean | null;
  sendRPID: boolean | null;
  authNeeded: string | null;
  authUser: string | null;
  authPassword?: string | null;
  sipProxy: string | null;
  outboundProxy: string | null;
  fromUser: string | null;
  fromDomain: string | null;
}

const nameOf = (map: Record<string, number>, value: number | null): string =>
  Object.keys(map).find((key) => map[key] === value) ?? '';

/** Export never includes the auth password. */
export const toRecord = (row: ServerRow): CsvRecord => ({
  sipProxy: row.sipProxy ?? '',
  outboundProxy: row.outboundProxy ?? '',
  uriScheme: nameOf(URI_SCHEMES, row.uriScheme),
  transport: nameOf(TRANSPORTS, row.transport).toUpperCase(),
  authNeeded: row.authNeeded === 'yes' ? 'yes' : 'no',
  authUser: row.authUser ?? '',
  authPassword: '',
  sendPAI: row.sendPAI ? 'yes' : 'no',
  sendRPID: row.sendRPID ? 'yes' : 'no',
  fromUser: row.fromUser ?? '',
  fromDomain: row.fromDomain ?? '',
});

const yes = (value: string | undefined, fallback: boolean): boolean =>
  value ? value.toLowerCase() === 'yes' : fallback;
const orNull = (value: string | undefined): string | null =>
  value ? value : null;

/**
 * Request body. Empty cells take the portal form's defaults (sip, UDP,
 * no auth, Send PAI on, Send RPID off). An empty password on update keeps
 * the stored one.
 */
export function toServerPayload(
  record: CsvRecord,
  carrierId: number,
  existing?: ServerRow
): Record<string, unknown> {
  const authNeeded = yes(record.authNeeded, false) ? 'yes' : 'no';

  return {
    ip: existing?.ip ?? null,
    hostname: existing?.hostname ?? null,
    port: existing?.port ?? 5060,
    sipProxy: record.sipProxy,
    outboundProxy: orNull(record.outboundProxy),
    uriScheme: URI_SCHEMES[(record.uriScheme || 'sip').toLowerCase()],
    transport: TRANSPORTS[(record.transport || 'udp').toLowerCase()],
    authNeeded,
    authUser: authNeeded === 'yes' ? orNull(record.authUser) : null,
    authPassword:
      authNeeded === 'yes'
        ? orNull(record.authPassword) ?? existing?.authPassword ?? null
        : null,
    sendPAI: yes(record.sendPAI, true),
    sendRPID: yes(record.sendRPID, false),
    fromUser: orNull(record.fromUser),
    fromDomain: orNull(record.fromDomain),
    carrier: carrierId,
  };
}

export const serverKey = (
  sipProxy: string | null | undefined,
  outboundProxy: string | null | undefined
): string =>
  `${(sipProxy ?? '').trim().toLowerCase()}|${(outboundProxy ?? '')
    .trim()
    .toLowerCase()}`;
