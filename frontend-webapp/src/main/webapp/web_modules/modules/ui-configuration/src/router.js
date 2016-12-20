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
        content: applicationContainer,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const listModulesRoute = {
  path: 'applications/:application_id/modules',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appMoulesContainer = require('./containers/ModulesListContainer')
      cb(null, {
        content: appMoulesContainer,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const editModuleRoute = {
  path: 'applications/:application_id/modules/:module_id',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const moduleContainer = require('./components/ModuleConfigurationComponent')
      cb(null, {
        content: moduleContainer,
      })
    })
  },
}

/**
 *
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const layoutRoute = {
  path: 'applications/:application_id/layout',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const appLayoutContainer = require('./containers/ApplicationLayoutContainer')
      cb(null, {
        content: appLayoutContainer,
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
    layoutRoute,
  ],
}

export default uiConfigurationRouter
