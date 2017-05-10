export const listModelRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelListContainer = require('./containers/ModelListContainer')
      cb(null, {
        content: ModelListContainer.default,
      })
    })
  },
}

export const createModelRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelFormContainer = require('./containers/ModelFormContainer')
      cb(null, {
        content: ModelFormContainer.default,
      })
    })
  },
}

export const editModelRoute = {
  path: ':model_id/:mode',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelFormContainer = require('./containers/ModelFormContainer')
      cb(null, {
        content: ModelFormContainer.default,
      })
    })
  },
}


const modelDataManagementRouter = {
  childRoutes: [
    listModelRoute,
    createModelRoute,
    editModelRoute,
  ],
}

export default modelDataManagementRouter
