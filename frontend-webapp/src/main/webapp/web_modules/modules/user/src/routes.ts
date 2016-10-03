import { pluginRoutes } from "./modules/plugin/routes"
import { websocketsRoutes } from "./modules/websockets/routes"
import UserApp from "./UserApp"
import { PlainRoute } from "react-router"

export const userAppRoutes: PlainRoute = {
  path: 'user/:project',
  childRoutes: [
    pluginRoutes,
    websocketsRoutes
  ],
  getComponent(nextState: any, cb: any): void {
    require.ensure([], (require: any) => {
      cb(null, UserApp)
    })
  }
}
