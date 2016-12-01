export const datasetListRoute = {
  path: 'dataset',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetListContainer = require('./dataset/containers/DatasetListContainer')
      cb(null, {
        content: DatasetListContainer.default,
      })
    })
  },
}

export const datasetCreateRoute = {
  path: 'dataset/create',
  getComponents(nextState, cb) {
    const DatasetCreateContainer = require('./dataset/containers/DatasetCreateContainer')
    require.ensure([], (require) => {
      cb(null, {
        content: DatasetCreateContainer.default,
      })
    })
  },
}

export const collectionListRoute = {
  path: 'collection',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionListContainer = require('./collection/containers/CollectionListContainer')
      cb(null, {
        content: CollectionListContainer.default,
      })
    })
  },
}


export const collectionCreateRoute = {
  path: 'collection/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const CollectionCreateContainer = require('./collection/containers/CollectionCreateContainer')
      cb(null, {
        content: CollectionCreateContainer.default,
      })
    })
  },
}

export const datasetModelCreateRoute = {
  path: 'datasetmodel/create(/:from)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetModelCreateContainer = require('./datasetmodel/containers/DatasetModelCreateContainer')
      cb(null, {
        content: DatasetModelCreateContainer.default,
      })
    })
  },
}


export const datasetModelListRoute = {
  path: 'datasetmodel',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasetModelListContainer = require('./datasetmodel/containers/DatasetModelListContainer')
      cb(null, {
        content: DatasetModelListContainer.default,
      })
    })
  },
}


export const datasourceCreateRoute = {
  path: 'datasource/create(/:from)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceCreateContainer = require('./datasource/containers/DatasourceCreateContainer')
      cb(null, {
        content: DatasourceCreateContainer.default,
      })
    })
  },
}

export const datasourceListRoute = {
  path: 'datasource',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceListContainer = require('./datasource/containers/DatasourceListContainer')
      cb(null, {
        content: DatasourceListContainer.default,
      })
    })
  },
}


export const datasourceModelCreateRoute = {
  path: 'datasourcemodel/create(/:from)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceModelCreateContainer = require('./datasourcemodel/containers/DatasourceModelCreateContainer')
      cb(null, {
        content: DatasourceModelCreateContainer.default,
      })
    })
  },
}

export const datasourceModelListRoute = {
  path: 'datasourcemodel',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatasourceModelListContainer = require('./datasourcemodel/containers/DatasourceModelListContainer')
      cb(null, {
        content: DatasourceModelListContainer.default,
      })
    })
  },
}

export const connectionCreateRoute = {
  path: 'connection/create(/:from)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionCreateContainer = require('./connection/containers/ConnectionCreateContainer')
      cb(null, {
        content: ConnectionCreateContainer.default,
      })
    })
  },
}


export const connectionListRoute = {
  path: 'connection',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ConnectionListContainer = require('./connection/containers/ConnectionListContainer')
      cb(null, {
        content: ConnectionListContainer.default,
      })
    })
  },
}

export const homeDataRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const DatamanagementContainer = require('./containers/DatamanagementContainer')
      cb(null, {
        content: DatamanagementContainer.default,
      })
    })
  },
}

const dataManagementRouter = {
  path: '',
  childRoutes: [
    homeDataRoute,

    collectionCreateRoute,
    collectionListRoute,
    datasetListRoute,
    datasetCreateRoute,

    // Todo: fusionner l'un des deux
    datasetModelCreateRoute,
    datasetModelListRoute,
    datasourceModelCreateRoute,
    datasourceModelListRoute,

    datasourceCreateRoute,
    datasourceListRoute,
    connectionCreateRoute,
    connectionListRoute,
  ],
}

export default dataManagementRouter
