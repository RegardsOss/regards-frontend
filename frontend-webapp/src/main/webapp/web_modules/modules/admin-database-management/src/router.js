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

const databaseManagementRouter = {
  path: '',
  childRoutes: [
    listProjectConnectionRoute,
  ],
}

export default databaseManagementRouter
