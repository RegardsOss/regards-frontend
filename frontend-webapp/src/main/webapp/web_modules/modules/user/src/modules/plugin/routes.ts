import Plugin from "./Plugin"
import { PlainRoute } from "react-router"

export const pluginRoutes: PlainRoute = {
  path: "plugins/:plugin",

  getComponent(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      cb(null, {
        content: Plugin
      })
    })
  }
}
