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
export const listDatasetRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetListContainer = require('./containers/DatasetListContainer')
      cb(null, {
        content: DatasetListContainer.default,
      })
    })
  },
}

export const pickDatasourceDatasetRoute = {
  path: 'create/datasource',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetFormContainer = require('./containers/DatasetCreateOrPickDatasourceContainer')
      cb(null, {
        content: DatasetFormContainer.default,
      })
    })
  },
}

export const createDatasetRoute = {
  path: 'create/:datasourceId',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetFormContainer = require('./containers/DatasetFormContainer')
      cb(null, {
        content: DatasetFormContainer.default,
      })
    })
  },
}


export const editDatasetRoute = {
  path: ':datasetId/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetFormContainer = require('./containers/DatasetFormContainer')
      cb(null, {
        content: DatasetFormContainer.default,
      })
    })
  },
}


export const editLinksDatasetRoute = {
  path: ':datasetId/links',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetEditLinksContainer = require('./containers/DatasetEditLinksContainer')
      cb(null, {
        content: DatasetEditLinksContainer.default,
      })
    })
  },
}

export const editPluginDatasetRoute = {
  path: ':datasetId/:datasetIpId/plugins',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetEditPluginContainer = require('./containers/DatasetEditPluginContainer')
      cb(null, {
        content: DatasetEditPluginContainer.default,
      })
    })
  },
}

export const editUIServicesDatasetRoute = {
  path: ':datasetId/:datasetIpId/ui-services',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetEditUIServicesContainer = require('./containers/DatasetEditUIServicesContainer')
      cb(null, {
        content: DatasetEditUIServicesContainer.default,
      })
    })
  },
}


const datasetDataManagementRouter = {
  childRoutes: [
    listDatasetRoute,
    pickDatasourceDatasetRoute,
    createDatasetRoute,
    editDatasetRoute,
    editLinksDatasetRoute,
    editPluginDatasetRoute,
    editUIServicesDatasetRoute,
  ],
}

export default datasetDataManagementRouter
