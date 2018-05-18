/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/

export const homeAccessRightAdminRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const BoardContainer = require('./containers/BoardContainer')
      cb(null, {
        content: BoardContainer.default,
      })
    })
  },
}

export const accessGroupAdminRouter = {
  path: 'access-group',
  getChildRoutes(nextState, cb) {
    const adminAccessGroupManagement = require('@regardsoss/admin-accessright-accessgroup-management')
    require.ensure([], (require) => {
      cb(null, [adminAccessGroupManagement.accessGroupManagementRouter])
    })
  },
}

export const accessRightsAdminRouter = {
  path: 'access-rights',
  getChildRoutes(nextState, cb) {
    const adminDataAccessManagement = require('@regardsoss/admin-accessright-dataaccess-management')
    require.ensure([], (require) => {
      cb(null, [adminDataAccessManagement.accessRightManagementRouter])
    })
  },
}


const accessRightManagementRouter = {
  childRoutes: [
    homeAccessRightAdminRoute,
    accessGroupAdminRouter,
    accessRightsAdminRouter,
  ],
}

export default accessRightManagementRouter
