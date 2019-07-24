/*
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
 * Allows to export / import microservices configuration.
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const microserviceConfBackupRoute = {
  path: ':microserviceName/conf-backup',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const MicroserviceConfBackupContainer = require('./containers/MicroserviceConfBackupContainer')
      cb(null, {
        content: MicroserviceConfBackupContainer.default,
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
      const container = require('./containers/plugin/PluginMetaDataListContainer')
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
      const container = require('./containers/plugin/PluginConfigurationListContainer')
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
      const container = require('./containers/plugin/PluginConfigurationFormContainer')
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
      const container = require('./containers/plugin/PluginConfigurationFormContainer')
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
    microserviceConfBackupRoute,
  ],
}

export default microserviceManagementRouter
