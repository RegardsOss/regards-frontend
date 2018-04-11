/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const boardContainer = require('./containers/BoardUIContainer')
      cb(null, {
        content: boardContainer.default,
      })
    })
  },
}


export const moduleUiManagementRouter = {
  path: 'module',
  getChildRoutes(nextState, cb) {
    const moduleUiConfiguration = require('@regardsoss/admin-ui-module-management')
    require.ensure([], (require) => {
      cb(null, [moduleUiConfiguration.moduleUIRouter])
    })
  },
}


export const pluginUiManagementRouter = {
  path: 'plugin',
  getChildRoutes(nextState, cb) {
    const pluginUiManagement = require('@regardsoss/admin-ui-plugin-management')
    require.ensure([], (require) => {
      cb(null, [pluginUiManagement.pluginUIRouter])
    })
  },
}

export const serviceUiManagementRouter = {
  path: 'service',
  getChildRoutes(nextState, cb) {
    const serviceUiManagement = require('@regardsoss/admin-ui-service-management')
    require.ensure([], (require) => {
      cb(null, [serviceUiManagement.serviceUIRouter])
    })
  },
}

export const themeUiManagementRouter = {
  path: 'theme',
  getChildRoutes(nextState, cb) {
    const themeUiManagement = require('@regardsoss/admin-ui-theme-management')
    require.ensure([], (require) => {
      cb(null, [themeUiManagement.themeUIRouter])
    })
  },
}

export const layoutUiManagementRouter = {
  path: 'layout',
  getChildRoutes(nextState, cb) {
    const layoutUiManagement = require('@regardsoss/admin-ui-layout-management')
    require.ensure([], (require) => {
      cb(null, [layoutUiManagement.layoutUIRouter])
    })
  },
}

/**
 *
 * @type {{childRoutes: [*]}}
 */
const uiConfigurationRouter = {
  childRoutes: [
    boardRoute,
    moduleUiManagementRouter,
    serviceUiManagementRouter,
    themeUiManagementRouter,
    pluginUiManagementRouter,
    layoutUiManagementRouter,
  ],
}

export default uiConfigurationRouter
