import { PlainRoute } from "react-router"

export const projectsRoutes: PlainRoute = {
  path: 'projects',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectsContainer = require("./containers/ProjectsContainer")
      cb(null, {
        content: ProjectsContainer.default
      })
    })
  }
}

export const projectReadRoute: PlainRoute = {
  path: 'projects/:project_id',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectReadContainer = require("./containers/ProjectReadContainer")
      cb(null, {
        content: ProjectReadContainer.default
      })
    })
  }
}

export const projectCreateRoute: PlainRoute = {
  path: 'projects/create',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectCreateContainer = require("./containers/ProjectCreateContainer")
      cb(null, {
        content: ProjectCreateContainer.default
      })
    })
  }
}


export const projectManagementRouter: PlainRoute = {
  path: '',
  childRoutes: [
    projectsRoutes,
    projectReadRoute,
    projectCreateRoute
  ]
}
