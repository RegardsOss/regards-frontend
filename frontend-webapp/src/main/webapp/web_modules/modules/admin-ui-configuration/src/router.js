/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * UI-Configuration module routes.
 */

/**
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listApplicationsRoute = {
  path: 'applications',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const applicationContainer = require('./containers/ApplicationListContainer')
      cb(null, {
        content: applicationContainer.default,
      })
    })
  },
}

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
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const layoutRoute = {
  path: 'applications/:applicationId/layout',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appLayoutContainer = require('./containers/ApplicationLayoutContainer')
      cb(null, {
        content: appLayoutContainer.default,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const themesRoute = {
  path: 'applications/:applicationId/themes/list',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const ApplicationThemeContainer = require('./containers/ApplicationThemeContainer')
      cb(null, {
        content: ApplicationThemeContainer.default,
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
    listApplicationsRoute,
    listModulesRoute,
    editModuleRoute,
    duplicateModuleRoute,
    createModuleRoute,
    layoutRoute,
    themesRoute,
  ],
}

export default uiConfigurationRouter
