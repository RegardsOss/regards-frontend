export const listRoleRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const RoleListContainer = require('./containers/RoleListContainer')
      cb(null, {
        content: RoleListContainer.default,
      })
    })
  },
}

export const createRoleRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const RoleFormContainer = require('./containers/RoleFormContainer')
      cb(null, {
        content: RoleFormContainer.default,
      })
    })
  },
}

export const editRoleRoute = {
  path: ':role_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const RoleFormContainer = require('./containers/RoleFormContainer')
      cb(null, {
        content: RoleFormContainer.default,
      })
    })
  },
}


const roleManagementRouter = {
  childRoutes: [
    listRoleRoute,
    createRoleRoute,
    editRoleRoute,
  ],
}

export default roleManagementRouter
