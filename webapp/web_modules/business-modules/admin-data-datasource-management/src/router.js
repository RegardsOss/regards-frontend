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
      const DBDatasourceCreateOrPickConnectionContainer = require('./containers/db/DBDatasourceCreateOrPickConnectionContainer')
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
      const DBDatasourceFormContainer = require('./containers/db/DBDatasourceFormContainer')
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
      const DBDatasourceFormContainer = require('./containers/db/DBDatasourceFormContainer')
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
      const AIPDatasourceFormContainer = require('./containers/aip/AIPDatasourceFormContainer')
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
      const AIPDatasourceFormContainer = require('./containers/aip/AIPDatasourceFormContainer')
      cb(null, {
        content: AIPDatasourceFormContainer.default,
      })
    })
  },
}

export const createOSDatasourceRoute = {
  path: 'opensearch/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const OSConfigurationFormContainer = require('./containers/opensearch/OSConfigurationFormContainer')
      cb(null, {
        content: OSConfigurationFormContainer.default,
      })
    })
  },
}

export const editOSDatasourceRoute = {
  path: 'opensearch/:datasourceId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const OSConfigurationFormContainer = require('./containers/opensearch/OSConfigurationFormContainer')
      cb(null, {
        content: OSConfigurationFormContainer.default,
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

export const editFEMDatasourceRoute = {
  path: 'feature/:datasourceId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FeatureDatasourceFormContainer = require('./containers/feature/FeatureDatasourceFormContainer')
      cb(null, {
        content: FeatureDatasourceFormContainer.default,
      })
    })
  },
}

export const createFEMDatasourceRoute = {
  path: 'feature/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const FeatureDatasourceFormContainer = require('./containers/feature/FeatureDatasourceFormContainer')
      cb(null, {
        content: FeatureDatasourceFormContainer.default,
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
    createOSDatasourceRoute,
    editOSDatasourceRoute,
    editFEMDatasourceRoute,
    createFEMDatasourceRoute,
  ],
}

export default datasourceDataManagementRouter
