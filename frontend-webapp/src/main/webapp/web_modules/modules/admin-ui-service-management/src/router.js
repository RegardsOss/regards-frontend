/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * UI-Configuration module routes.
 */

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listModulesRoute = {
  path: 'applications/:applicationId/modules/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appModuleContainer = require('./containers/ModulesListContainer')
      cb(null, {
        content: appModuleContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const editModuleRoute = {
  path: 'applications/:applicationId/modules/:module_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const duplicateModuleRoute = {
  path: 'applications/:applicationId/modules/:duplicate_module_id/duplicate',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const createModuleRoute = {
  path: 'applications/:applicationId/modules/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormContainer')
      cb(null, {
        content: moduleContainer.default,
      })
    })
  },
}
/**
 *
 * @type {{childRoutes: [*]}}
 */
const uiConfigurationRouter = {
  childRoutes: [
    listModulesRoute,
    editModuleRoute,
    duplicateModuleRoute,
    createModuleRoute,
  ],
}

export default uiConfigurationRouter
