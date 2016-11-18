/** Main routes.
 * /      -> PortalApp
 * /user  -> UserApp
 * /admin -> AdminApp
 */
const routes = {
  path: '/',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const AdminPckg = require('@regardsoss/admin')
      cb(null, [AdminPckg.adminRouter])
    })
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      const PortalPckg = require('@regardsoss/portal')
      cb(null, {
        component: PortalPckg.PortalHomepageContainer,
      })
    })
  },
}
export default routes


/*

// Log sitemap
function getSiteMap(parentRoute, childRoutes) {
  childRoutes.forEach((route) => {
    if (route) {
      let path = ''
      if (parentRoute.slice(-1) === '/' || route.path[0] === '/') {
        path = parentRoute + route.path
      } else {
        path = `${parentRoute}/${route.path}`
      }
      console.log(path)
      if (route.childRoutes) {
        getSiteMap(path, route.childRoutes)
      }
    }
  })
}
// Log sitemap
getSiteMap('', routes.getChildRoutes())
*/
