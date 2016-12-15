/**
 * LICENSE_PLACEHOLDER
 **/
import pluginRoutes from './modules/plugin/routes'
import websocketsRoutes from './modules/websockets/routes'


const userAppRoutes = {
  path: 'user/:project',
  childRoutes: [
    pluginRoutes,
    websocketsRoutes,
  ],
  getComponent(nextState, cb) {
    const UserApp = require('./containers/UserApp')
    require.ensure([], () => {
      cb(null, {
        content: UserApp.default,
      })
    })
  },
}

export default userAppRoutes
