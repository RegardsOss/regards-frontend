export const createDatabaseRoute = {
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

export const readDatabaseRoute = {
  path: './:database_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountReadComponent = require('./containers/ProjectAccountReadContainer')
      cb(null, {
        content: ProjectAccountReadComponent.default,
      })
    })
  },
}

export const editDatabaseRoute = {
  path: './:database_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAccountEditContainer = require('./containers/ProjectAccountEditContainer')
      cb(null, {
        content: ProjectAccountEditContainer.default,
      })
    })
  },
}

export const listDatabaseRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectAcountsContainer = require('./containers/ProjectAccountsContainer')
      cb(null, {
        content: ProjectAcountsContainer.default,
      })
    })
  },
}


const databaseManagementRouter = {
  path: '',
  childRoutes: [
    listDatabaseRoute,
    editDatabaseRoute,
    createDatabaseRoute,
    readDatabaseRoute,
  ],
}

export default databaseManagementRouter
