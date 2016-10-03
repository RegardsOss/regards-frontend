import { PlainRoute } from "react-router"

export const projectAccountCreateRoute: PlainRoute = {
  path: 'users/create',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectAccountCreateContainer = require("./containers/ProjectAccountCreateContainer")
      cb(null, {
        content: ProjectAccountCreateContainer.default
      })
    })
  }
}

export const projectAccountReadRoute: PlainRoute = {
  path: 'users/:user_id',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectAccountReadComponent = require("./containers/ProjectAccountReadComponent")
      cb(null, {
        content: ProjectAccountReadComponent.default
      })
    })
  }
}

export const projectAccountEditRoute: PlainRoute = {
  path: 'users/:user_id/edit',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectAccountEditContainer = require("./containers/ProjectAccountEditContainer")
      cb(null, {
        content: ProjectAccountEditContainer.default
      })
    })
  }
}

export const projectAccountsRoutes: PlainRoute = {
  path: 'users',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ProjectAcountsContainer = require("./containers/ProjectAcountsContainer")
      cb(null, {
        content: ProjectAcountsContainer.default
      })
    })
  }
}

export const userManagementRouter: PlainRoute = {
  path: '',
  childRoutes: [
    projectAccountCreateRoute,
    projectAccountReadRoute,
    projectAccountEditRoute,
    projectAccountsRoutes
  ]
}
