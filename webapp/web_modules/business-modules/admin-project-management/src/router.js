/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export const listProjectRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectListContainer = require('./containers/project/ProjectListContainer')
      cb(null, {
        content: ProjectListContainer.default,
      })
    })
  },
}

export const createProjectRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/project/ProjectFormContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const editProjectRoute = {
  path: ':project_name/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/project/ProjectFormContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const listProjectConnectionRoute = {
  path: ':project_name/connections',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionListContainer')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const listProjectConnectionGuidedRoute = {
  path: ':project_name/connections/guided',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const editProjectConnectionRoute = {
  path: ':project_name/connections/:project_connection_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

export const createProjectConnectionRoute = {
  path: ':project_name/connections/:microservice_name/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ProjectFormContainer = require('./containers/projectConnection/ProjectConnectionsProvider')
      cb(null, {
        content: ProjectFormContainer.default,
      })
    })
  },
}

const projectManagementRouter = {
  childRoutes: [
    listProjectRoute,
    createProjectRoute,
    editProjectRoute,
    listProjectConnectionRoute,
    listProjectConnectionGuidedRoute,
    editProjectConnectionRoute,
    createProjectConnectionRoute,
  ],
}

export default projectManagementRouter
