/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * UI-Configuration module routes.
 */

/**
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listPluginsRoute = {
  path: 'plugins',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const applicationContainer = require('./containers/PluginListContainer')
      cb(null, {
        content: applicationContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const editPluginRoute = {
  path: 'plugins/:plugin_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/PluginFormContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const createPluginRoute = {
  path: 'plugins/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/PluginFormContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}


/**
 *
 * @type {{childRoutes: [*]}}
 */
const uiPluginsRouter = {
  childRoutes: [
    listPluginsRoute,
    editPluginRoute,
    createPluginRoute,
  ],
}

export default uiPluginsRouter
