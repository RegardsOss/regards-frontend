/**
 * LICENSE_PLACEHOLDER
 **/
const userRouter = {
  path: 'project/:project',
  childRoutes: [],
  getComponent(nextState, cb) {
    const UserApp = require('./containers/UserApp')
    require.ensure([], (require) => {
      cb(null, UserApp.default)
    })
  },
}

export default userRouter
