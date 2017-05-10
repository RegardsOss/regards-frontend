/**
 * LICENSE_PLACEHOLDER
 **/
export const listAccessGroupRoute = {
  path: 'edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccessRightContainer = require('./containers/AccessRightContainer')
      cb(null, {
        content: AccessRightContainer.default,
      })
    })
  },
}


const accessRightManagementRouter = {
  childRoutes: [
    listAccessGroupRoute,
  ],
}

export default accessRightManagementRouter
