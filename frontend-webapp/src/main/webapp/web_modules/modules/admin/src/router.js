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
 * Main route to access UI-Confiuration module fonctioanlities
 * @type {{path: string, getChildRoutes: ((nextState, cb))}}
 */
export const projectAdminUiConfigurationRouter = {
  path: ':project/ui-configuration',
  getChildRoutes(nextState, cb) {
    const adminUiConfiguration = require('@regardsoss/ui-configuration')
    require.ensure([], (require) => {
      cb(null, [adminUiConfiguration.uiConfigurationRouter])
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
    projectAdminDataRouter,
    projectAdminUserProjectRouter,
    projectAdminUiConfigurationRouter,
    projectAdminRouter,
  ],
  getComponent(nextState, cb) {
    const AdminApp = require('./containers/AdminApp')
    require.ensure([], (require) => {
      cb(null, AdminApp)
    })
  },
}
