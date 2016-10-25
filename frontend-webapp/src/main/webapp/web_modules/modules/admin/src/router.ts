import { PlainRoute } from "react-router"
import AdminApp from "./AdminApp"
import ProjectAdminApp from "./ProjectAdminApp"

export const projectAdminRouter: PlainRoute = {
  path: "admin/:project",
  getComponent(nextState: any, cb: any): void {
    require.ensure([], (require: any) => {
      cb(null, ProjectAdminApp)
    })
  }
}


export const projectAdminDataRouter: PlainRoute = {
  path: "admin/:project/datamanagement",
  getChildRoutes(nextState: any, cb: any): void {
    const adminDataManagement = require("@regardsoss/admin-data-management")
    // do asynchronous stuff to find the child routes
    cb(null, [adminDataManagement.dataManagementRouter])
  },
  getComponent(nextState: any, cb: any): void {
    require.ensure([], (require: any) => {
      cb(null, ProjectAdminApp)
    })
  }
}

export const projectAdminUserRouter: PlainRoute = {
  path: "admin/:project/usermanagement",
  getChildRoutes(nextState: any, cb: any): void {
    const adminUserManagement = require("@regardsoss/admin-user-management")
    // do asynchronous stuff to find the child routes
    cb(null, [adminUserManagement.userManagementRouter])
  },
  getComponent(nextState: any, cb: any): void {
    require.ensure([], (require: any) => {
      cb(null, ProjectAdminApp)
    })
  }
}


export const instanceAdminRouter: PlainRoute = {
  path: "admin",
  getComponent(nextState: any, cb: any): void {
    require.ensure([], (require: any) => {
      cb(null, AdminApp)
    })
  }
}


export const adminRouter: PlainRoute = {
  path: "",
  childRoutes: [
    instanceAdminRouter,
    projectAdminRouter,
    projectAdminDataRouter,
    projectAdminUserRouter
  ]
}
