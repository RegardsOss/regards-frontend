
export const listProjectUserRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserListContainer = require('./containers/ProjectUserListContainer')
      cb(null, {
        content: ProjectUserListContainer.default,
      })
    })
  },
}


export const projectAccountCreateRoute = {
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


export const projectAccountEditRoute = {
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


const projectUserManagementRouter = {
  childRoutes: [
    listProjectUserRoute,
    projectAccountCreateRoute,
    projectAccountEditRoute,
  ],
}

export default projectUserManagementRouter
