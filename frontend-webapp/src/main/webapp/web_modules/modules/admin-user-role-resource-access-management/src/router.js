export const editRoleResourceAccessRoute = {
  path: ':role_name/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ResourceAccessFormContainer = require('./containers/ResourceAccessFormContainer')
      cb(null, {
        content: ResourceAccessFormContainer.default,
      })
    })
  },
}

const roleResourceAccessManagementRouter = {
  childRoutes: [
    editRoleResourceAccessRoute,
  ],
}

export default roleResourceAccessManagementRouter
