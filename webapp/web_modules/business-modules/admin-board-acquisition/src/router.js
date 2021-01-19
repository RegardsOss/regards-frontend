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
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleContainer')
      cb(null, { content: moduleContainer.default })
    })
  },
}

export const processingChainManagementRouter = {
  path: 'chain',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const processingChainManagement = require('@regardsoss/admin-ingest-processing-chain-management')
      cb(null, [processingChainManagement.processingChainManagementRouter])
    })
  },
}

export const dataproviderManagementRouter = {
  path: 'dataprovider',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataProviderManagement = require('@regardsoss/admin-data-provider-management')
      cb(null, [adminDataProviderManagement.dataProviderManagementRouter])
    })
  },
}

export const datasourceManagementRouter = {
  path: 'datasource',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataDatasourceManagement = require('@regardsoss/admin-data-datasource-management')
      cb(null, [adminDataDatasourceManagement.datasourceDataManagementRouter])
    })
  },
}

export const connectionManagementRouter = {
  path: 'connection',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const adminDataConnectionManagement = require('@regardsoss/admin-data-connection-management')
      cb(null, [adminDataConnectionManagement.connectionDataManagementRouter])
    })
  },
}

export const storageManagementRouter = {
  path: 'storage',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const storageManagement = require('@regardsoss/admin-storage-management')
      cb(null, [storageManagement.storageManagementRouter])
    })
  },
}

export const oaisManagementRouter = {
  path: 'oais',
  getChildRoutes(nextState, cb) {
    require.ensure([], (require) => {
      const oaisManagement = require('@regardsoss/admin-oais-management')
      cb(null, [oaisManagement.oaisManagementRouter])
    })
  },
}

const acquisitionRouter = {
  childRoutes: [
    boardRoute,
    processingChainManagementRouter,
    dataproviderManagementRouter,
    datasourceManagementRouter,
    connectionManagementRouter,
    storageManagementRouter,
    oaisManagementRouter,
  ],
}

export default acquisitionRouter
