/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Layout routes.
 */

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const layoutRoute = {
  path: ':applicationId',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appLayoutContainer = require('./containers/ApplicationLayoutContainer')
      cb(null, {
        content: appLayoutContainer.default,
      })
    })
  },
}


export default layoutRoute
