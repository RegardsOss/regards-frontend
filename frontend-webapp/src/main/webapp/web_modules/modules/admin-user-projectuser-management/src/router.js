
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


export const createProjectUserRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserCreateContainer = require('./containers/ProjectUserCreateContainer')
      cb(null, {
        content: ProjectUserCreateContainer.default,
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
    createProjectUserRoute,
    projectAccountEditRoute,
  ],
}

export default projectUserManagementRouter
