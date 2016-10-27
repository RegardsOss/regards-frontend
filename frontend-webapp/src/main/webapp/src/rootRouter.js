/** Main routes.
 * /      -> PortalApp
 * /user  -> UserApp
 * /admin -> AdminApp
 */
import { PlainRoute } from "react-router"

export const routes: PlainRoute = {
  path: "/",
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const AdminPckg = require("@regardsoss/admin")
      cb(null, [AdminPckg.adminRouter])
    })
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      const PortalPckg = require("@regardsoss/portal")
      cb(null, {
        component: PortalPckg.portalContainer
      })
    })
  }
}


// Log sitemap
function getSiteMap (parentRoute, childRoutes) {
  childRoutes.map((route) => {
    if (route) {
      let path = ''
      if (parentRoute.slice(-1) === '/' || route.path[0] === '/') {
        path = parentRoute + route.path
      } else {
        path = parentRoute + '/' + route.path
      }
      console.log(path)
      if (route.childRoutes) {
        getSiteMap(path, route.childRoutes)
      }
    }
  })
}
// Log sitemap
// getSiteMap("", routes.childRoutes)
