/**
 * LICENSE_PLACEHOLDER
 **/
export const listConnectionRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionListContainer = require('./containers/ConnectionListContainer')
      cb(null, {
        content: ConnectionListContainer.default,
      })
    })
  },
}

export const createConnectionRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionFormContainer = require('./containers/ConnectionFormContainer')
      cb(null, {
        content: ConnectionFormContainer.default,
      })
    })
  },
}


export const editConnectionRoute = {
  path: ':connectionId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionFormContainer = require('./containers/ConnectionFormContainer')
      cb(null, {
        content: ConnectionFormContainer.default,
      })
    })
  },
}


const connectionDataManagementRouter = {
  childRoutes: [
    listConnectionRoute,
    createConnectionRoute,
    editConnectionRoute,
  ],
}

export default connectionDataManagementRouter
