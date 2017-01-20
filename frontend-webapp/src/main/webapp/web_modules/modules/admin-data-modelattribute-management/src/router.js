/**
 * LICENSE_PLACEHOLDER
 **/
export const editModelAttributeRoute = {
  path: ':model_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ModelAttributeFormContainer = require('./containers/ModelAttributeFormContainer')
      cb(null, {
        content: ModelAttributeFormContainer.default,
      })
    })
  },
}


const modelAttributeDataManagementRouter = {
  childRoutes: [
    editModelAttributeRoute,
  ],
}

export default modelAttributeDataManagementRouter
