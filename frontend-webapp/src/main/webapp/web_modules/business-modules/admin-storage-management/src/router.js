/*
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Route to the view listing all plugin meta data for a microservice.
 * @author Sébastien Binda
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const storagePluginConfRoute = {
  path: ':pluginType',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginMetaDataListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storageLocationPluginListRoute = {
  path: 'storages/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginStorageConfigurationListContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storageLocationCreateFormRoute = {
  path: 'storages/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginStorageConfigurationFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storageLocationEditFormRoute = {
  path: 'storages/:pluginId/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PluginStorageConfigurationFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storagePluginMonitoringRoute = {
  path: 'storages/monitoring',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./components/PluginStorageMonitoringComponent')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const storageManagementRouter = {
  childRoutes: [
    storageLocationPluginListRoute,
    storageLocationCreateFormRoute,
    storageLocationEditFormRoute,
    storagePluginConfRoute,
    storagePluginMonitoringRoute,
  ],
}

export default storageManagementRouter
