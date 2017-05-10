/**
 * LICENSE_PLACEHOLDER
 **/


/**
 * Main route to access UI-Confiuration module fonctioanlities
 * @author Sébastien binda
 */
export const dynamicModuleRoot = {
  path: 'modules/:moduleId',
  getComponent(nextState, cb) {
    const content = require('./containers/DynamicContentContainer')
    require.ensure([], (require) => {
      cb(null, {
        content,
      })
    })
  },
}

const userRouter = {
  path: 'user/:project',
  childRoutes: [dynamicModuleRoot],
  getComponent(nextState, cb) {
    const UserApp = require('./containers/UserApp')
    require.ensure([], (require) => {
      cb(null, UserApp.default)
    })
  },
}

export default userRouter
