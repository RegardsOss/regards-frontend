/**
 * LICENSE_PLACEHOLDER
 **/

export const homeUserProjectAdminRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const BoardContainer = require('./containers/BoardContainer')
      cb(null, {
        content: BoardContainer.default,
      })
    })
  },
}


export const projectUserAdminRouter = {
  path: 'project-user',
  getChildRoutes(nextState, cb) {
    const adminProjectUserManagement = require('@regardsoss/admin-user-projectuser-management')
    require.ensure([], (require) => {
      cb(null, [adminProjectUserManagement.projectUserManagementRouter])
    })
  },
}


export const roleResourceAccessAdminRouter = {
  path: 'role-resource-access',
  getChildRoutes(nextState, cb) {
    const adminResourceAccessProjectUserManagement = require('@regardsoss/admin-user-role-resource-access-management')
    require.ensure([], (require) => {
      cb(null, [adminResourceAccessProjectUserManagement.roleResourceAccessManagementRouter])
    })
  },
}


export const roleAdminRouter = {
  path: 'role',
  getChildRoutes(nextState, cb) {
    const adminRoleManagement = require('@regardsoss/admin-user-role-management')
    require.ensure([], (require) => {
      cb(null, [adminRoleManagement.roleManagementRouter])
    })
  },
}


const projectUserManagementRouter = {
  childRoutes: [
    homeUserProjectAdminRoute,
    roleResourceAccessAdminRouter,
    projectUserAdminRouter,
    roleAdminRouter,
  ],
}

export default projectUserManagementRouter
