export const createAccountRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountFormContainer = require('./containers/AccountFormContainer')
      cb(null, {
        content: AccountFormContainer.default,
      })
    })
  },
}


export const editAccountRoute = {
  path: ':account_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountFormContainer = require('./containers/AccountFormContainer')
      cb(null, {
        content: AccountFormContainer.default,
      })
    })
  },
}

export const listAccountRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AccountListContainer = require('./containers/AccountListContainer')
      cb(null, {
        content: AccountListContainer.default,
      })
    })
  },
}


const accountManagementRouter = {
  childRoutes: [
    listAccountRoute,
    createAccountRoute,
    editAccountRoute,
  ],
}

export default accountManagementRouter
