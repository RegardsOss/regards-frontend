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
  path: ':applicationId/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appModuleContainer = require('./containers/ModulesListAdapter')
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
  path: ':applicationId/:module_id/edit',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormAdapter')
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
  path: ':applicationId/:duplicate_module_id/duplicate',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormAdapter')
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
  path: ':applicationId/create',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./containers/ModuleFormAdapter')
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
