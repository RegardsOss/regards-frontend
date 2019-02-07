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

export const createDatasourcePickInterfaceRoute = {
  path: 'create/interface',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasoucePickInterfaceContainer = require('./containers/DatasoucePickInterfaceContainer')
      cb(null, {
        content: DatasoucePickInterfaceContainer.default,
      })
    })
  },
}

export const createDBDatasourcePickConnectionRoute = {
  path: 'db/create/connection',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DBDatasourceCreateOrPickConnectionContainer = require('./containers/DBDatasourceCreateOrPickConnectionContainer')
      cb(null, {
        content: DBDatasourceCreateOrPickConnectionContainer.default,
      })
    })
  },
}

export const createDBDatasourceRoute = {
  path: 'db/create/:connectionId',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DBDatasourceFormContainer = require('./containers/DBDatasourceFormContainer')
      cb(null, {
        content: DBDatasourceFormContainer.default,
      })
    })
  },
}

export const editDBDatasourceRoute = {
  path: 'db/:datasourceId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DBDatasourceFormContainer = require('./containers/DBDatasourceFormContainer')
      cb(null, {
        content: DBDatasourceFormContainer.default,
      })
    })
  },
}

export const editAIPDatasourceRoute = {
  path: 'aip/:datasourceId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AIPDatasourceFormContainer = require('./containers/AIPDatasourceFormContainer')
      cb(null, {
        content: AIPDatasourceFormContainer.default,
      })
    })
  },
}

export const createAIPDatasourceRoute = {
  path: 'aip/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AIPDatasourceFormContainer = require('./containers/AIPDatasourceFormContainer')
      cb(null, {
        content: AIPDatasourceFormContainer.default,
      })
    })
  },
}

export const createOSDatasourceCrawlerRoute = {
  path: 'opensearch/create/crawler',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const OSCrawlerConfigurationContainer = require('./containers/OSCrawlerConfigurationContainer')
      cb(null, {
        content: OSCrawlerConfigurationContainer.default,
      })
    })
  },
}

export const createOSDatasourceQueryRoute = {
  path: 'opensearch/create/query',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const OSQueryConfigurationContainer = require('./containers/OSQueryConfigurationContainer')
      cb(null, {
        content: OSQueryConfigurationContainer.default,
      })
    })
  },
}

export const createOSDatasourceResultsRoute = {
  path: 'opensearch/create/results',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const OSResultsConfigurationContainer = require('./containers/OSResultsConfigurationContainer')
      cb(null, {
        content: OSResultsConfigurationContainer.default,
      })
    })
  },
}

export const monitorDatasourcesRoute = {
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
    createDatasourcePickInterfaceRoute,
    createDBDatasourcePickConnectionRoute,
    createDBDatasourceRoute,
    editDBDatasourceRoute,
    monitorDatasourcesRoute,
    editAIPDatasourceRoute,
    createAIPDatasourceRoute,
    createOSDatasourceCrawlerRoute,
    createOSDatasourceQueryRoute,
    createOSDatasourceResultsRoute,
  ],
}

export default datasourceDataManagementRouter
