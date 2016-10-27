import { pluginRoutes } from './modules/plugin/routes';
import { websocketsRoutes } from './modules/websockets/routes';
import UserApp from './UserApp';
import { PlainRoute } from 'react-router';

export const userAppRoutes = {
  path: 'user/:project',
  childRoutes: [
    pluginRoutes,
    websocketsRoutes,
  ],
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, UserApp);
    });
  },
};
