/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * Theme module routes.
 */


/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const themeRoute = {
  path: 'edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ApplicationThemeContainer = require('./containers/ApplicationThemeContainer')
      cb(null, {
        content: ApplicationThemeContainer.default,
      })
    })
  },
}

export default themeRoute
