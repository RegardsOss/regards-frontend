/**
 * LICENSE_PLACEHOLDER
 **/

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

export const editProjectUserRoute = {
  path: ':user_id/edit',
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
    editProjectUserRoute,
  ],
}

export default projectUserManagementRouter
