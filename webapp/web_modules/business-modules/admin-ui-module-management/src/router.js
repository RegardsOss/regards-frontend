/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
  path: ':applicationId/:moduleId/edit',
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
  path: ':applicationId/:duplicateModuleId/duplicate',
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
