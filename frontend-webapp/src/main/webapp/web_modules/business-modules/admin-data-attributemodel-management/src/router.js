export const listAttributeModelRoute = {
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

export const createAttributeModelRoute = {
  path: 'create(/fragment/:fragment_name)',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const AttributeModelFormContainer = require('./containers/AttributeModelFormContainer')
      cb(null, {
        content: AttributeModelFormContainer.default,
      })
    })
  },
}

export const editAttributeModelRoute = {
  path: ':attrModel_id/edit',
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
    listAttributeModelRoute,
    createAttributeModelRoute,
    editAttributeModelRoute,
  ],
}

export default modelDataManagementRouter
