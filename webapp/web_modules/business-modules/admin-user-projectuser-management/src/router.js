/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

export const listProjectUserRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserListContainer = require('./containers/ProjectUserListContainer')
      cb(null, {
        content: ProjectUserListContainer.default,
      })
    })
  },
}

export const createProjectUserRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserFormContainer = require('./containers/ProjectUserFormContainer')
      cb(null, {
        content: ProjectUserFormContainer.default,
      })
    })
  },
}

export const editProjectUserRoute = {
  path: ':user_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserFormContainer = require('./containers/ProjectUserFormContainer')
      cb(null, {
        content: ProjectUserFormContainer.default,
      })
    })
  },
}
export const settingsProjectUserRoute = {
  path: 'settings',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectUserSettingsFormContainer = require('./containers/ProjectUserSettingsFormContainer')
      cb(null, {
        content: ProjectUserSettingsFormContainer.default,
      })
    })
  },
}

const projectUserManagementRouter = {
  childRoutes: [
    listProjectUserRoute,
    createProjectUserRoute,
    editProjectUserRoute,
    settingsProjectUserRoute,
  ],
}

export default projectUserManagementRouter
