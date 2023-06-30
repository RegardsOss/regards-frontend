/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */

/** Main routes.
 * /      -> PortalApp
 * /user  -> UserApp
 * /admin -> AdminApp
 * /authenticate -> AuthenticateRedirectApp
 */
const rootRouter = {
  path: '/',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const AdminPckg = require('@regardsoss/admin')
      const UserPckg = require('@regardsoss/user')
      const AuthenticateRedirectionPckg = require('@regardsoss/authenticate')
      const notFoundRoutes = {
        path: '*',
        getComponent(otherNextState, ocb) {
          const comp = require('@regardsoss/components')
          require.ensure([], (orequire) => {
            ocb(null, comp.PageNotFoundComponent)
          })
        },
      }
      cb(null, [AdminPckg.adminRouter, UserPckg.userRouter, AuthenticateRedirectionPckg.authenticateRedirectionRouter, notFoundRoutes])
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
