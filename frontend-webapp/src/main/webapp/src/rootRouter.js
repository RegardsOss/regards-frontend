/*
 * LICENSE_PLACEHOLDER
 */

/** Main routes.
 * /      -> PortalApp
 * /user  -> UserApp
 * /admin -> AdminApp
 */
const rootRouter = {
  path: '/',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const AdminPckg = require('@regardsoss/admin')
      require.ensure([], () => {
        cb(null, [AdminPckg.adminRouter])
      })
    })
  },
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      const PortalPckg = require('@regardsoss/portal')
      cb(null, {
        component: PortalPckg.PortalApp,
      })
    })
  },
}
export default rootRouter

