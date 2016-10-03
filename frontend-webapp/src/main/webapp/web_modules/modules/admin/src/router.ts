import { PlainRoute } from "react-router"
import AdminApp from "./AdminApp"
import ProjectAdminApp from "./ProjectAdminApp"


export const projectAdminRouter: PlainRoute = {
  path: "admin/:project",
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
    projectAdminRouter
  ]
}
