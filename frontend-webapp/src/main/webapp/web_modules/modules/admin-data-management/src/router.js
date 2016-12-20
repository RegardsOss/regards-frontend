/**
 * LICENSE_PLACEHOLDER
 **/
export const homeDataRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleContainer')
      cb(null, {
        content: moduleContainer,
      })
    })
  },
}

export const modelManagementRouter = {
  path: 'model',
  getChildRoutes(nextState, cb) {
    const adminDataModelManagement = require('@regardsoss/admin-data-model-management')
    require.ensure([], (require) => {
      cb(null, [adminDataModelManagement.modelDataManagementRouter])
    })
  },
}


export const attributeModelManagementRouter = {
  path: 'attribute/model',
  getChildRoutes(nextState, cb) {
    const adminDataModelManagement = require('@regardsoss/admin-data-attributemodel-management')
    require.ensure([], (require) => {
      cb(null, [adminDataModelManagement.attributeModelDataManagementRouter])
    })
  },
}


const dataManagementRouter = {
  childRoutes: [
    homeDataRoute,
    modelManagementRouter,
    attributeModelManagementRouter,
  ],
}

export default dataManagementRouter
