/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminDataRouter = {
  path: ':project/data',
  getChildRoutes(nextState, cb) {
    const adminDataManagement = require('@regardsoss/admin-data-management')
    require.ensure([], (require) => {
      cb(null, [adminDataManagement.dataManagementRouter])
    })
  },
}

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminUserProjectRouter = {
  path: ':project/user',
  getChildRoutes(nextState, cb) {
    const adminUserManagement = require('@regardsoss/admin-user-management')
    require.ensure([], (require) => {
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
  path: 'project',
  getChildRoutes(nextState, cb) {
    const adminProjectManagement = require('@regardsoss/admin-project-management')
    require.ensure([], (require) => {
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
    const adminAccountManagement = require('@regardsoss/admin-account-management')
    require.ensure([], (require) => {
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
    const adminUiConfiguration = require('@regardsoss/admin-ui-management')
    require.ensure([], (require) => {
      cb(null, [adminUiConfiguration.uiManagementRouter])
    })
  },
}

/**
 * Main route to access UI-Confiuration module functionalities
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminUiPluginsRouter = {
  path: ':project/ui-plugins',
  getChildRoutes(nextState, cb) {
    const adminUiPlugins = require('@regardsoss/admin-ui-plugin-management')
    require.ensure([], (require) => {
      cb(null, [adminUiPlugins.uiPluginsRouter])
    })
  },
}

/**
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const databaseRouter = {
  path: 'project-connection',
  getChildRoutes(nextState, cb) {
    const adminDatabaseManagement = require('@regardsoss/admin-database-management')
    require.ensure([], (require) => {
      cb(null, [adminDatabaseManagement.databaseManagementRouter])
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
    const adminUiConfiguration = require('@regardsoss/admin-ui-management')
    require.ensure([], (require) => {
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
    const adminMicroserviceManagement = require('@regardsoss/admin-microservice-management')
    require.ensure([], (require) => {
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
  path: ':project/access-right',
  getChildRoutes(nextState, cb) {
    const adminAccessRightManagement = require('@regardsoss/admin-accessright-management')
    require.ensure([], (require) => {
      cb(null, [adminAccessRightManagement.accessRightManagementRouter])
    })
  },
}


/**
 * Main Routes for administration application
 */
export default {
  path: 'admin',
  childRoutes: [
    projectRouter,
    accountRouter,
    databaseRouter,
    uiConfigurationRouter,
    projectAdminDataRouter,
    projectAdminUserProjectRouter,
    projectAdminUiConfigurationRouter,
    projectAdminUiPluginsRouter,
    projectAdminRouter,
    adminMicroserviceManagementRouter,
    adminAccessRightManagementRouter,
  ],
  getComponent(nextState, cb) {
    const AdminApp = require('./containers/AdminApp')
    require.ensure([], (require) => {
      cb(null, AdminApp)
    })
  },
}
