/**
 * LICENSE_PLACEHOLDER
 **/
const userRouter = {
  path: 'project/:project',
  childRoutes: [],
  getComponent(nextState, cb) {
    const UserApp = require('./containers/UserApp')
    require.ensure([], (require) => {
      console.log(UserApp)
      cb(null, UserApp)
    })
  },
}

export default userRouter
