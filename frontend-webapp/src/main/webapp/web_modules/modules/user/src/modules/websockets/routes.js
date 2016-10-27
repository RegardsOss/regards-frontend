import WebSockets from "./WebSockets"
import { PlainRoute } from "react-router"

export const websocketsRoutes: PlainRoute = {
  path: "time",

  getComponent(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      cb(null, {
        content: WebSockets
      })
    })
  }
}
