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
      const UserPckg = require('@regardsoss/user')
      const notFoundRoutes = {
        path: '*',
        getComponent(otherNextState, ocb) {
          const comp = require('@regardsoss/components')
          require.ensure([], (orequire) => {
            ocb(null, comp.PageNotFoundComponent)
          })
        },
      }
      cb(null, [AdminPckg.adminRouter, UserPckg.userRouter, notFoundRoutes])
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

