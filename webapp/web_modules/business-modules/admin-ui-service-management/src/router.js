/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
