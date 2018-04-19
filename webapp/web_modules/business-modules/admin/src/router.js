/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminUserProjectRouter = {
  path: ':project/user',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminUserManagement = require('@regardsoss/admin-user-management')
      cb(null, [adminUserManagement.userManagementRouter])
    })
  },
}

/**
 * @type {{path: string}}
 */
export const projectAdminRouter = {
  path: ':project',
}

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectRouter = {
  path: 'projects',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminProjectManagement = require('@regardsoss/admin-project-management')
      cb(null, [adminProjectManagement.projectManagementRouter])
    })
  },
}

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const accountRouter = {
  path: 'account',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminAccountManagement = require('@regardsoss/admin-account-management')
      cb(null, [adminAccountManagement.accountManagementRouter])
    })
  },
}

/**
 * Main route to access UI-Confiuration module functionalities
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const uiConfigurationRouter = {
  path: 'ui',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminUiConfiguration = require('@regardsoss/admin-ui-management')
      cb(null, [adminUiConfiguration.uiManagementRouter])
    })
  },
}

/**
 * Main route to access UI  functionalities
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminUiConfigurationRouter = {
  path: ':project/ui',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminUiConfiguration = require('@regardsoss/admin-ui-management')
      cb(null, [adminUiConfiguration.uiManagementRouter])
    })
  },
}

/**
 * Main route to access Microservice Management module functionalities
 *
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const adminMicroserviceManagementRouter = {
  path: ':project/microservice',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminMicroserviceManagement = require('@regardsoss/admin-microservice-management')
      cb(null, [adminMicroserviceManagement.microserviceManagementRouter])
    })
  },
}


/**
 * Main route to manage Access rights between Dataset and AccessGroup
 *
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const adminAccessRightManagementRouter = {
  path: ':project/data/access-right',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminAccessRightManagement = require('@regardsoss/admin-accessright-management')
      cb(null, [adminAccessRightManagement.accessRightManagementRouter])
    })
  },
}

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const modelsRouter = {
  path: ':project/data/models',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const board = require('@regardsoss/admin-board-models')
      cb(null, [board.modelsRouter])
    })
  },
}

/**
 * Main route to manage ingest processes
 *
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const acquisitionRouter = {
  path: ':project/data/acquisition',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const board = require('@regardsoss/admin-board-acquisition')
      cb(null, [board.acquisitionRouter])
    })
  },
}

/**
 * Main route to manage ingest processes
 *
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const collectionsRouter = {
  path: ':project/data/collections',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const board = require('@regardsoss/admin-board-collections')
      cb(null, [board.collectionsRouter])
    })
  },
}


/**
 * Main Routes for administration application
 */
module.exports = {
  path: 'admin',
  childRoutes: [
    projectRouter,
    accountRouter,
    uiConfigurationRouter,
    projectAdminUserProjectRouter,
    projectAdminUiConfigurationRouter,
    projectAdminRouter,
    adminMicroserviceManagementRouter,
    adminAccessRightManagementRouter,
    acquisitionRouter,
    collectionsRouter,
    modelsRouter,
  ],
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const AdminApp = require('./containers/AdminApp')
      cb(null, AdminApp.default)
    })
  },
}