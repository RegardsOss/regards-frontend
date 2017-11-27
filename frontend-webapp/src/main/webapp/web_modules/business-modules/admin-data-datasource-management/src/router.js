/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
export const listDatasourceRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceListContainer = require('./containers/DatasourceListContainer')
      cb(null, {
        content: DatasourceListContainer.default,
      })
    })
  },
}

export const createDatasourceRoute = {
  path: 'create/connection',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceCreateOrPickConnectionContainer = require('./containers/DatasourceCreateOrPickConnectionContainer')
      cb(null, {
        content: DatasourceCreateOrPickConnectionContainer.default,
      })
    })
  },
}

export const pickConnectionDatasourceRoute = {
  path: 'create/:connectionId',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceFormContainer = require('./containers/DatasourceFormContainer')
      cb(null, {
        content: DatasourceFormContainer.default,
      })
    })
  },
}

export const editDatasourceRoute = {
  path: ':datasourceId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceFormContainer = require('./containers/DatasourceFormContainer')
      cb(null, {
        content: DatasourceFormContainer.default,
      })
    })
  },
}

export const manitorDatasourcesRoute = {
  path: 'monitor',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceMonitorContainer = require('./containers/DataSourceMonitoringContainer')
      cb(null, {
        content: DatasourceMonitorContainer.default,
      })
    })
  },
}


const datasourceDataManagementRouter = {
  childRoutes: [
    listDatasourceRoute,
    createDatasourceRoute,
    pickConnectionDatasourceRoute,
    editDatasourceRoute,
    manitorDatasourcesRoute,
  ],
}

export default datasourceDataManagementRouter
