/**
 * LICENSE_PLACEHOLDER
 **/
export const listAccessGroupRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const GroupListContainer = require('./containers/AccessGroupListContainer')
      cb(null, {
        content: GroupListContainer.default,
      })
    })
  },
}

export const createAccessGroupRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const GroupFormContainer = require('./containers/AccessGroupFormContainer')
      cb(null, {
        content: GroupFormContainer.default,
      })
    })
  },
}

export const editDuplicateAccessGroupRoute = {
  path: ':accessGroupName/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const GroupFormContainer = require('./containers/AccessGroupFormContainer')
      cb(null, {
        content: GroupFormContainer.default,
      })
    })
  },
}

const accessGroupManagementRouter = {
  childRoutes: [
    listAccessGroupRoute,
    createAccessGroupRoute,
    editDuplicateAccessGroupRoute,
  ],
}

export default accessGroupManagementRouter
