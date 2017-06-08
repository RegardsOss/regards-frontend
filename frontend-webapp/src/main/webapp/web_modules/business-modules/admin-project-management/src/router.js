export const listProjectRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectListContainer = require('./containers/project/ProjectListContainer')
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
      const ProjectFormContainer = require('./containers/project/ProjectFormContainer')
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
      const ProjectFormContainer = require('./containers/project/ProjectFormContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const listProjectConnectionRoute = {
  path: ':project_name/connections',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionListContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const listProjectConnectionGuidedRoute = {
  path: ':project_name/connections/guided',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const editProjectConnectionRoute = {
  path: ':project_name/connections/:project_connection_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const createProjectConnectionRoute = {
  path: ':project_name/connections/:microservice_name/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
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
    listProjectConnectionRoute,
    listProjectConnectionGuidedRoute,
    editProjectConnectionRoute,
    createProjectConnectionRoute,
  ],
}

export default projectManagementRouter
