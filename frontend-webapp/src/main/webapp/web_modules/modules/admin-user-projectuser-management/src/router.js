
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



const projectUserManagementRouter = {
  childRoutes: [
    listProjectUserRoute,
    createProjectUserRoute,
  ],
}

export default projectUserManagementRouter
