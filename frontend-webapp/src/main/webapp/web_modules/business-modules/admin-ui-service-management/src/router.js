/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * UI-Configuration module routes.
 */

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listServiceRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const serviceListContainer = require('./containers/ServiceListContainer')
      cb(null, {
        content: serviceListContainer.default,
      })
    })
  },
}


/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listConfigurationServiceRoute = {
  path: ':uiPluginId/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceConfigurationListContainer = require('./containers/ServiceConfigurationListContainer')
      cb(null, {
        content: ServiceConfigurationListContainer.default,
      })
    })
  },
}


export const editServiceConfigurationRoute = {
  path: ':uiPluginId/:uiPluginConfId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceConfigurationFormContainer = require('./containers/ServiceConfigurationFormContainer')
      cb(null, {
        content: ServiceConfigurationFormContainer.default,
      })
    })
  },
}
export const createServiceConfigurationRoute = {
  path: ':uiPluginId/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ServiceConfigurationFormContainer = require('./containers/ServiceConfigurationFormContainer')
      cb(null, {
        content: ServiceConfigurationFormContainer.default,
      })
    })
  },
}


/**
 *
 * @type {{childRoutes: [*]}}
 */
const serviceUIRouter = {
  childRoutes: [
    listServiceRoute,
    listConfigurationServiceRoute,
    editServiceConfigurationRoute,
    createServiceConfigurationRoute,
  ],
}

export default serviceUIRouter
