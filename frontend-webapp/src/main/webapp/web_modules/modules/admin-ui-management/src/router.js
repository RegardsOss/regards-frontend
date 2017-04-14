/**
 * LICENSE_PLACEHOLDER
 **/
/**
 * UI-Configuration module routes.
 */

/**
 * @type {{path: string, getComponents: ((nextState, cb))}}
 */
export const boardRoute = {
  path: 'board',
  getComponents(nextState, cb) {
    require.ensure([], (require) => {
      const boardContainer = require('./containers/BoardUIContainer')
      cb(null, {
        content: boardContainer.default,
      })
    })
  },
}


export const moduleUiManagementRouter = {
  path: 'module',
  getChildRoutes(nextState, cb) {
    const moduleUiConfiguration = require('@regardsoss/admin-ui-module-management')
    require.ensure([], (require) => {
      cb(null, [moduleUiConfiguration.moduleUIRouter])
    })
  },
}


export const pluginUiManagementRouter = {
  path: 'plugin',
  getChildRoutes(nextState, cb) {
    const pluginUiManagement = require('@regardsoss/admin-ui-plugin-management')
    require.ensure([], (require) => {
      cb(null, [pluginUiManagement.pluginUIRouter])
    })
  },
}

export const serviceUiManagementRouter = {
  path: 'service',
  getChildRoutes(nextState, cb) {
    const serviceUiManagement = require('@regardsoss/admin-ui-service-management')
    require.ensure([], (require) => {
      cb(null, [serviceUiManagement.serviceUIRouter])
    })
  },
}

export const themeUiManagementRouter = {
  path: 'theme',
  getChildRoutes(nextState, cb) {
    const themeUiManagement = require('@regardsoss/admin-ui-theme-management')
    require.ensure([], (require) => {
      cb(null, [themeUiManagement.themeUIRouter])
    })
  },
}

export const layoutUiManagementRouter = {
  path: 'layout',
  getChildRoutes(nextState, cb) {
    const layoutUiManagement = require('@regardsoss/admin-ui-layout-management')
    require.ensure([], (require) => {
      cb(null, [layoutUiManagement.layoutUIRouter])
    })
  },
}

/**
 *
 * @type {{childRoutes: [*]}}
 */
const uiConfigurationRouter = {
  childRoutes: [
    boardRoute,
    moduleUiManagementRouter,
    serviceUiManagementRouter,
    themeUiManagementRouter,
    pluginUiManagementRouter,
    layoutUiManagementRouter,
  ],
}

export default uiConfigurationRouter
