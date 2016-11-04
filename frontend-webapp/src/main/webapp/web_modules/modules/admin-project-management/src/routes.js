export const projectsRoutes = {
  path: 'projects',
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
  path: 'projects/:project_id',
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
  path: 'projects/create',
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
  path: '',
  childRoutes: [
    projectsRoutes,
    projectReadRoute,
    projectCreateRoute,
  ],
}

export default projectManagementRouter
