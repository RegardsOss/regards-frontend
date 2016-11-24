export const listProjectRoutes = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectListContainer = require('./containers/ProjectListContainer')
      cb(null, {
        content: ProjectListContainer.default,
      })
    })
  },
}

export const readProjectRoute = {
  path: ':project_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectReadContainer = require('./containers/ProjectReadContainer')
      cb(null, {
        content: ProjectReadContainer.default,
      })
    })
  },
}

export const createProjectRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectCreateContainer = require('./containers/ProjectCreateContainer')
      cb(null, {
        content: ProjectCreateContainer.default,
      })
    })
  },
}

const projectManagementRouter = {
  childRoutes: [
    listProjectRoutes,
    readProjectRoute,
    createProjectRoute,
  ],
}

export default projectManagementRouter
