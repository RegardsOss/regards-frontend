
const websocketsRoutes = {
  path: 'time',

  getComponent(nextState, cb) {
    const WebSockets = require('./WebSockets')
    require.ensure([], () => {
      cb(null, {
        content: WebSockets.default,
      })
    })
  },
}

export default websocketsRoutes
