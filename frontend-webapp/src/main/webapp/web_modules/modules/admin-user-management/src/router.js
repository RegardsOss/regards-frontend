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
    projectUserAdminRouter,
    roleAdminRouter,
  ],
}

export default projectUserManagementRouter
