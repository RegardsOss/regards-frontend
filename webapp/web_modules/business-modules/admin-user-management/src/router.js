/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const homeUserProjectAdminRoute = {
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

export const roleResourceAccessAdminRouter = {
  path: 'role-resource-access',
  getChildRoutes(nextState, cb) {
    const adminResourceAccessProjectUserManagement = require('@regardsoss/admin-user-role-resource-access-management')
    require.ensure([], (require) => {
      cb(null, [adminResourceAccessProjectUserManagement.roleResourceAccessManagementRouter])
    })
  },
}

export const projectUserAdminRouter = {
  path: 'project-user',
  getChildRoutes(nextState, cb) {
    const adminProjectUserManagement = require('@regardsoss/admin-user-projectuser-management')
    require.ensure([], (require) => {
      cb(null, [adminProjectUserManagement.projectUserManagementRouter])
    })
  },
}

export const roleAdminRouter = {
  path: 'role',
  getChildRoutes(nextState, cb) {
    const adminRoleManagement = require('@regardsoss/admin-user-role-management')
    require.ensure([], (require) => {
      cb(null, [adminRoleManagement.roleManagementRouter])
    })
  },
}

export const authenticationPluginsAdminRouter = {
  path: 'authenticationplugins',
  getChildRoutes(nextState, cb) {
    const authenticationPluginsManagement = require('@regardsoss/admin-user-authentication-plugins-management')
    require.ensure([], (require) => {
      cb(null, [authenticationPluginsManagement.authenticationPluginManagementRouter])
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

const projectUserManagementRouter = {
  childRoutes: [
    homeUserProjectAdminRoute,
    roleResourceAccessAdminRouter,
    projectUserAdminRouter,
    roleAdminRouter,
    authenticationPluginsAdminRouter,
    accessGroupAdminRouter,
    accessRightsAdminRouter,
  ],
}

export default projectUserManagementRouter
