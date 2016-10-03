import { PlainRoute } from "react-router"

export const datasetListRoute: PlainRoute = {
  path: 'datamanagement/dataset',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasetListContainer = require("./dataset/containers/DatasetListContainer")
      cb(null, {
        content: DatasetListContainer.default
      })
    })
  }
}

export const datasetCreateRoute: PlainRoute = {
  path: 'datamanagement/dataset/create',
  getComponents(nextState: any, cb: any): any {
    const DatasetCreateContainer = require("./dataset/containers/DatasetCreateContainer")
    require.ensure([], (require: any) => {
      cb(null, {
        content: DatasetCreateContainer.default
      })
    })
  }
}

export const collectionListRoute: PlainRoute = {
  path: 'datamanagement/collection',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const CollectionListContainer = require("./collection/containers/CollectionListContainer")
      cb(null, {
        content: CollectionListContainer.default
      })
    })
  }
}


export const collectionCreateRoute: PlainRoute = {
  path: 'datamanagement/collection/create',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const CollectionCreateContainer = require("./collection/containers/CollectionCreateContainer")
      cb(null, {
        content: CollectionCreateContainer.default
      })
    })
  }
}

export const datasetModelCreateRoute: PlainRoute = {
  path: 'datamanagement/datasetmodel/create(/:from)',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasetModelCreateContainer = require("./datasetmodel/containers/DatasetModelCreateContainer")
      cb(null, {
        content: DatasetModelCreateContainer.default
      })
    })
  }
}


export const datasetModelListRoute: PlainRoute = {
  path: 'datamanagement/datasetmodel',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasetModelListContainer = require("./datasetmodel/containers/DatasetModelListContainer")
      cb(null, {
        content: DatasetModelListContainer.default
      })
    })
  }
}



export const datasourceCreateRoute: PlainRoute = {
  path: 'datamanagement/datasource/create(/:from)',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasourceCreateContainer = require("./datasource/containers/DatasourceCreateContainer")
      cb(null, {
        content: DatasourceCreateContainer.default
      })
    })
  }
}

export const datasourceListRoute: PlainRoute = {
  path: 'datamanagement/datasource',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasourceListContainer = require("./datasource/containers/DatasourceListContainer")
      cb(null, {
        content: DatasourceListContainer.default
      })
    })
  }
}



export const datasourceModelCreateRoute: PlainRoute = {
  path: 'datamanagement/datasourcemodel/create(/:from)',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasourceModelCreateContainer = require("./datasourcemodel/containers/DatasourceModelCreateContainer")
      cb(null, {
        content: DatasourceModelCreateContainer.default
      })
    })
  }
}

export const datasourceModelListRoute: PlainRoute = {
  path: 'datamanagement/datasourcemodel',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatasourceModelListContainer = require("./datasourcemodel/containers/DatasourceModelListContainer")
      cb(null, {
        content: DatasourceModelListContainer.default
      })
    })
  }
}

export const connectionCreateRoute: PlainRoute = {
  path: 'datamanagement/connection/create(/:from)',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ConnectionCreateContainer = require("./connection/containers/ConnectionCreateContainer")
      cb(null, {
        content: ConnectionCreateContainer.default
      })
    })
  }
}


export const connectionListRoute: PlainRoute = {
  path: 'datamanagement/connection',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const ConnectionListContainer = require("./connection/containers/ConnectionListContainer")
      cb(null, {
        content: ConnectionListContainer.default
      })
    })
  }
}

export const dataManagementHomeRoute: PlainRoute = {
  path: 'datamanagement',
  getComponents(nextState: any, cb: any): any {
    require.ensure([], (require: any) => {
      const DatamanagementContainer = require("./containers/DatamanagementContainer")
      cb(null, {
        content: DatamanagementContainer.default
      })
    })
  }
}

export const dataManagementRouter: PlainRoute = {
  path: '',
  childRoutes: [
    dataManagementHomeRoute,

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
    connectionListRoute
  ]
}
