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
  path: ':project_name/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/ProjectFormContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const createProjectRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/ProjectFormContainer')
      cb(null, {
        content: ProjectFormContainer.default,
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
