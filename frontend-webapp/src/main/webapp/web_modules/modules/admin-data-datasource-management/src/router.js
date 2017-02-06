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
  path: 'create',
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
  path: ':datasourceId/:mode',
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
    editDatasourceRoute,
  ],
}

export default datasourceDataManagementRouter
