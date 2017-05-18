/**
 * LICENSE_PLACEHOLDER
 **/

export const homeAccessRightAdminRoute = {
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

export const accessGroupAdminRouter = {
  path: 'access-group',
  getChildRoutes(nextState, cb) {
    const adminAccessGroupManagement = require('@regardsoss/admin-accessright-accessgroup-management')
    require.ensure([], (require) => {
      cb(null, [adminAccessGroupManagement.accessGroupManagementRouter])
    })
  },
}

export const accessRightsAdminRouter = {
  path: 'access-rights',
  getChildRoutes(nextState, cb) {
    const adminDataAccessManagement = require('@regardsoss/admin-accessright-dataaccess-management')
    require.ensure([], (require) => {
      cb(null, [adminDataAccessManagement.accessRightManagementRouter])
    })
  },
}


const accessRightManagementRouter = {
  childRoutes: [
    homeAccessRightAdminRoute,
    accessGroupAdminRouter,
    accessRightsAdminRouter,
  ],
}

export default accessRightManagementRouter
