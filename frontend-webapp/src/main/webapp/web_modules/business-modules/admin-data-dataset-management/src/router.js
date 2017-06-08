/**
 * LICENSE_PLACEHOLDER
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
