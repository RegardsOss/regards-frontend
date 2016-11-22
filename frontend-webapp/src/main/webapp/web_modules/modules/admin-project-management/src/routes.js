export const projectsRoutes = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectsContainer = require('./containers/ProjectsContainer')
      cb(null, {
        content: ProjectsContainer.default,
      })
    })
  },
}

export const projectReadRoute = {
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

export const projectCreateRoute = {
  path: 'add',
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
    projectsRoutes,
    projectReadRoute,
    projectCreateRoute,
  ],
}

export default projectManagementRouter
