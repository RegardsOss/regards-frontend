/*
 * LICENSE_PLACEHOLDER
 */
export const listProjectConnectionRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectConnectionListContainer = require('./containers/ProjectConnectionListContainer')
      cb(null, {
        content: ProjectConnectionListContainer.default,
      })
    })
  },
}


export const editProjectConnectionRoute = {
  path: ':project_connection_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectConnectionEditContainer = require('./containers/ProjectConnectionEditContainer')
      cb(null, {
        content: ProjectConnectionEditContainer.default,
      })
    })
  },
}

export const projectConnectionsConfiguration = {
  path: 'projects/:project_name',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const GuidedProjectConfigurationContainer = require('./containers/GuidedProjectConfigurationContainer')
      cb(null, {
        content: GuidedProjectConfigurationContainer.default,
      })
    })
  },
}

const databaseManagementRouter = {
  path: '',
  childRoutes: [
    listProjectConnectionRoute,
    editProjectConnectionRoute,
    projectConnectionsConfiguration,
  ],
}

export default databaseManagementRouter
