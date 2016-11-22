export const projectAdminDataRouter = {
  path: ':project/data',
  getChildRoutes(nextState, cb) {
    const adminDataManagement = require('@regardsoss/admin-data-management')
    require.ensure([], (require) => {
      cb(null, [adminDataManagement.dataManagementRouter])
    })
  },
}

export const projectAdminUserRouter = {
  path: ':project/user',
  getChildRoutes(nextState, cb) {
    const adminUserManagement = require('@regardsoss/admin-user-management')
    require.ensure([], (require) => {
      cb(null, [adminUserManagement.userManagementRouter])
    })
  },
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
    const adminDatabaseanagement = require('@regardsoss/admin-database-management')
    require.ensure([], (require) => {
      cb(null, [adminDatabaseanagement.databaseManagementRouter])
    })
  },
}


export const adminRouter = {
  path: 'admin',
  childRoutes: [
    projectRouter,
    accountRouter,
    databaseRouter,
    projectAdminDataRouter,
    projectAdminUserRouter,
  ],
  getComponent(nextState, cb) {
    const AdminApp = require('./containers/AdminApp')
    require.ensure([], (require) => {
      cb(null, [AdminApp])
    })
  },
}
