import { EntityForm, EntityList } from '@axion/portal-core';
import { Navigate, Route, Routes } from 'react-router-dom';

import {
  CallForwardSetting,
  FaxesInOut,
  Recording,
  VoicemailMessage,
} from './entities';
import { CallHistoryScreen } from './screens/CallHistory';
import { DashboardScreen } from './screens/Dashboard';

/**
 * Screens are bespoke where the task deserves it and generic where it does not.
 *
 * The dashboard and call history are hand-built. Voicemail, recordings, faxes
 * and the forwarding rules ride the descriptor-driven CRUD engine — which is the
 * point of having one.
 */
export function AppRoutes(): React.JSX.Element {
  return (
    <Routes>
      <Route index element={<DashboardScreen />} />
      <Route path='calls' element={<CallHistoryScreen />} />

      <Route path='forwarding'>
        <Route index element={<EntityList descriptor={CallForwardSetting} />} />
        <Route
          path='new'
          element={<EntityForm descriptor={CallForwardSetting} />}
        />
        <Route
          path=':id'
          element={<EntityForm descriptor={CallForwardSetting} />}
        />
      </Route>

      <Route
        path='voicemail'
        element={<EntityList descriptor={VoicemailMessage} />}
      />
      <Route
        path='recordings'
        element={<EntityList descriptor={Recording} />}
      />

      <Route path='faxes'>
        <Route index element={<EntityList descriptor={FaxesInOut} />} />
        <Route path='new' element={<EntityForm descriptor={FaxesInOut} />} />
      </Route>

      <Route path='*' element={<Navigate to='' replace />} />
    </Routes>
  );
}
