export const listProjectRoute = {
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

export const editProjectRoute = {
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


const projectManagementRouter = {
  childRoutes: [
    listProjectRoute,
    createProjectRoute,
    editProjectRoute,
  ],
}

export default projectManagementRouter
