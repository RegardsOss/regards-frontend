/**
 * LICENSE_PLACEHOLDER
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


const datasourceDataManagementRouter = {
  childRoutes: [
    listDatasourceRoute,
    createDatasourceRoute,
    pickConnectionDatasourceRoute,
    editDatasourceRoute,
  ],
}

export default datasourceDataManagementRouter
