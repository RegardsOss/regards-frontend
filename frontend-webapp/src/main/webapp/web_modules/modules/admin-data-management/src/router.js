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


export const modelAttributeManagementRouter = {
  path: 'model-attribute',
  getChildRoutes(nextState, cb) {
    const adminDataModelAttributeManagement = require('@regardsoss/admin-data-modelattribute-management')
    require.ensure([], (require) => {
      cb(null, [adminDataModelAttributeManagement.modelAttributeDataManagementRouter])
    })
  },
}


export const attributeModelManagementRouter = {
  path: 'attribute/model',
  getChildRoutes(nextState, cb) {
    const adminDataAttrModelManagement = require('@regardsoss/admin-data-attributemodel-management')
    require.ensure([], (require) => {
      cb(null, [adminDataAttrModelManagement.attributeModelDataManagementRouter])
    })
  },
}

export const fragmentModelManagementRouter = {
  path: 'fragment',
  getChildRoutes(nextState, cb) {
    const adminDataFragmentManagement = require('@regardsoss/admin-data-fragment-management')
    require.ensure([], (require) => {
      cb(null, [adminDataFragmentManagement.fragmentDataManagementRouter])
    })
  },
}


const dataManagementRouter = {
  childRoutes: [
    homeDataRoute,
    modelManagementRouter,
    modelAttributeManagementRouter,
    attributeModelManagementRouter,
    fragmentModelManagementRouter,
  ],
}

export default dataManagementRouter
