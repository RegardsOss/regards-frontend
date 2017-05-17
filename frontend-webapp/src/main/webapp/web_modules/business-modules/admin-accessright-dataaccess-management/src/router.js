/**
 * LICENSE_PLACEHOLDER
 **/
export const listAccessGroupRoute = {
  path: ':accessgroup',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccessRightContainer = require('./containers/AccessGroupAccessRightsContainer')
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
