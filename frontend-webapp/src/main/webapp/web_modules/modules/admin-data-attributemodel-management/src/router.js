export const listModelRoute = {
  path: 'list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelListContainer = require('./containers/AttributeModelListContainer')
      cb(null, {
        content: AttributeModelListContainer.default,
      })
    })
  },
}

export const createModelRoute = {
  path: 'create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelFormContainer = require('./containers/AttributeModelFormContainer')
      cb(null, {
        content: AttributeModelFormContainer.default,
      })
    })
  },
}

export const editModelRoute = {
  path: ':model_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelFormContainer = require('./containers/AttributeModelFormContainer')
      cb(null, {
        content: AttributeModelFormContainer.default,
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
