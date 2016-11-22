export const createAccountRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountCreateContainer = require('./containers/ProjectAccountCreateContainer')
      cb(null, {
        content: ProjectAccountCreateContainer.default,
      })
    })
  },
}

export const readAccountRoute = {
  path: ':user_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountReadComponent = require('./containers/ProjectAccountReadContainer')
      cb(null, {
        content: ProjectAccountReadComponent.default,
      })
    })
  },
}

export const editAccountRoute = {
  path: ':user_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountEditContainer = require('./containers/ProjectAccountEditContainer')
      cb(null, {
        content: ProjectAccountEditContainer.default,
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
    readAccountRoute,
    editAccountRoute,
  ],
}

export default accountManagementRouter
