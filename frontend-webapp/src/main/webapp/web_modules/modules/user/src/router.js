/**
 * LICENSE_PLACEHOLDER
 **/
const userRouter = {
  path: 'user/:project',
  childRoutes: [],
  getComponent(nextState, cb) {
    const UserApp = require('./containers/UserApp')
    require.ensure([], (require) => {
      cb(null, UserApp.default)
    })
  },
}

export default userRouter
