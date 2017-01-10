export const listRoleResourceAccessRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ResourceAccessListContainer = require('./containers/ResourceAccessListContainer')
      cb(null, {
        content: ResourceAccessListContainer.default,
      })
    })
  },
}

export const editRoleResourceAccessRoute = {
  path: ':role_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const RoleResourceAccessEditContainer = require('./containers/RoleResourceAccessEditContainer')
      cb(null, {
        content: RoleResourceAccessEditContainer.default,
      })
    })
  },
}


const roleManagementRouter = {
  childRoutes: [
    listRoleResourceAccessRoute,
    editRoleResourceAccessRoute,
  ],
}

export default roleManagementRouter
