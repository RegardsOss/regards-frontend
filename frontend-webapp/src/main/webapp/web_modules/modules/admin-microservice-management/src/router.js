/*
 * LICENSE_PLACEHOLDER
 */

/**
 * Route to the board listing all configurable microservices.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microserviceBoardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const microserviceBoardContainer = require('./containers/MicroserviceBoardContainer')
      cb(null, {
        content: microserviceBoardContainer.default,
      })
    })
  },
}

/**
 * Route to the view listing all plugin meta data for a microservice.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microservicePluginMetaDataListRoute = {
  path: ':microserviceName/plugin/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginMetaDataListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

/**
 * Route to the view listing all plugin meta data for a microservice.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microservicePluginConfigurationsListRoute = {
  path: ':microserviceName/plugin/:pluginId/configuration/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginConfigurationListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

/**
 * Route to show the create plugin configuration route.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microservicePluginConfigurationCreateRoute = {
  path: ':microserviceName/plugin/:pluginId/configuration/:formMode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginConfigurationFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

/**
 * Route to edit or copy a plugin configuration.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microservicePluginConfigurationEditOrCopyRoute = {
  path: ':microserviceName/plugin/:pluginId/configuration/:pluginConfigurationId/:formMode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginConfigurationFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const microserviceManagementRouter = {
  childRoutes: [
    microserviceBoardRoute,
    microservicePluginMetaDataListRoute,
    microservicePluginConfigurationsListRoute,
    microservicePluginConfigurationCreateRoute,
    microservicePluginConfigurationEditOrCopyRoute,
  ],
}

export default microserviceManagementRouter
