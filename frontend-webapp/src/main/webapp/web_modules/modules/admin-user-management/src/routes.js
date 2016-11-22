export const projectAccountCreateRoute = {
  path: './create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountCreateContainer = require('./containers/ProjectAccountCreateContainer')
      cb(null, {
        content: ProjectAccountCreateContainer.default,
      })
    })
  },
}

export const projectAccountReadRoute = {
  path: './:user_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountReadComponent = require('./containers/ProjectAccountReadContainer')
      cb(null, {
        content: ProjectAccountReadComponent.default,
      })
    })
  },
}

export const projectAccountEditRoute = {
  path: './:user_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountEditContainer = require('./containers/ProjectAccountEditContainer')
      cb(null, {
        content: ProjectAccountEditContainer.default,
      })
    })
  },
}

export const projectAccountsRoutes = {
  path: '',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAcountsContainer = require('./containers/ProjectAccountsContainer')
      cb(null, {
        content: ProjectAcountsContainer.default,
      })
    })
  },
}


const userManagementRouter = {
  path: '',
  childRoutes: [
    projectAccountCreateRoute,
    projectAccountReadRoute,
    projectAccountEditRoute,
    projectAccountsRoutes,
  ],
}

export default userManagementRouter
