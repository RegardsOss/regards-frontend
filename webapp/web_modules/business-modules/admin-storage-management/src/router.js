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
 * Route to the view listing all plugin meta data for a microservice.
 * @author Sébastien Binda
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const storagePluginListRoute = {
  path: 'storages',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      //const container = require('./containers/PluginStorageConfigurationListContainer')
      const container = require('./components/PrioritizedDataStoragesComponent')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storagePluginCreateFormRoute = {
  path: 'storages/:type/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PrioritizedDataStorageFormContainer')
      cb(null, {
        content: container.default,
      })
    })
  },
}

export const storagePluginEditFormRoute = {
  path: 'storages/:type/:id/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const container = require('./containers/PrioritizedDataStorageFormContainer')
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
      const container = require('./components/StoragePluginMonitoringComponent')
      cb(null, {
        content: container.default,
      })
    })
  },
}

const storageManagementRouter = {
  childRoutes: [
    storagePluginListRoute,
    storagePluginCreateFormRoute,
    storagePluginEditFormRoute,
    storagePluginMonitoringRoute,
  ],
}

export default storageManagementRouter
