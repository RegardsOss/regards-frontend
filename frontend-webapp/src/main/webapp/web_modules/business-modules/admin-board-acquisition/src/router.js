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
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleContainer')
      cb(null, {
        content: moduleContainer,
      })
    })
  },
}

export const processingChainManagementRouter = {
  path: 'chain',
  getChildRoutes(nextState, cb) {
    const processingChainManagement = require('@regardsoss/admin-ingest-processing-chain-management')
    require.ensure([], (require) => {
      cb(null, [processingChainManagement.processingChainManagementRouter])
    })
  },
}

export const documentManagementRouter = {
  path: 'document',
  getChildRoutes(nextState, cb) {
    const adminDataDocumentManagement = require('@regardsoss/admin-data-document-management')
    require.ensure([], (require) => {
      cb(null, [adminDataDocumentManagement.documentDataManagementRouter])
    })
  },
}

export const datasourceManagementRouter = {
  path: 'datasource',
  getChildRoutes(nextState, cb) {
    const adminDataDatasourceManagement = require('@regardsoss/admin-data-datasource-management')
    require.ensure([], (require) => {
      cb(null, [adminDataDatasourceManagement.datasourceDataManagementRouter])
    })
  },
}

export const connectionManagementRouter = {
  path: 'connection',
  getChildRoutes(nextState, cb) {
    const adminDataConnectionManagement = require('@regardsoss/admin-data-connection-management')
    require.ensure([], (require) => {
      cb(null, [adminDataConnectionManagement.connectionDataManagementRouter])
    })
  },
}

const acquisitionRouter = {
  childRoutes: [
    boardRoute,
    processingChainManagementRouter,
    documentManagementRouter,
    datasourceManagementRouter,
    connectionManagementRouter,
  ],
}

export default acquisitionRouter
