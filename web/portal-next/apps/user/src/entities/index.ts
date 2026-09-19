import type { EntityDescriptor } from '@axion/portal-core';

import { CallForwardSetting } from './CallForwardSetting';
import { FaxesInOut } from './FaxesInOut';
import { Recording } from './Recording';
import { VoicemailMessage } from './VoicemailMessage';

export { CallForwardSetting, FaxesInOut, Recording, VoicemailMessage };

export const entities: EntityDescriptor[] = [
  CallForwardSetting,
  VoicemailMessage,
  Recording,
  FaxesInOut,
];
