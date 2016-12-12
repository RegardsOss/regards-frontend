export const projectAdminDataRouter = {
  path: ':project/data',
  getChildRoutes(nextState, cb) {
    const adminDataManagement = require('@regardsoss/admin-data-management')
    require.ensure([], (require) => {
      cb(null, [adminDataManagement.dataManagementRouter])
    })
  },
}

export const projectAdminUserProjectRouter = {
  path: ':project/user',
  getChildRoutes(nextState, cb) {
    const adminUserManagement = require('@regardsoss/admin-user-management')
    require.ensure([], (require) => {
      cb(null, [adminUserManagement.userManagementRouter])
    })
  },
}

export const projectAdminRouter = {
  path: ':project',
}

export const projectRouter = {
  path: 'project',
  getChildRoutes(nextState, cb) {
    const adminProjectManagement = require('@regardsoss/admin-project-management')
    require.ensure([], (require) => {
      cb(null, [adminProjectManagement.projectManagementRouter])
    })
  },
}

export const accountRouter = {
  path: 'account',
  getChildRoutes(nextState, cb) {
    const adminAccountManagement = require('@regardsoss/admin-account-management')
    require.ensure([], (require) => {
      cb(null, [adminAccountManagement.accountManagementRouter])
    })
  },
}

export const databaseRouter = {
  path: 'database',
  getChildRoutes(nextState, cb) {
    const adminDatabaseManagement = require('@regardsoss/admin-database-management')
    require.ensure([], (require) => {
      cb(null, [adminDatabaseManagement.databaseManagementRouter])
    })
  },
}


export default {
  path: 'admin',
  childRoutes: [
    projectRouter,
    accountRouter,
    databaseRouter,
    projectAdminDataRouter,
    projectAdminUserProjectRouter,
    projectAdminRouter,
  ],
  getComponent(nextState, cb) {
    const AdminApp = require('./containers/AdminApp')
    require.ensure([], (require) => {
      cb(null, AdminApp)
    })
  },
}
