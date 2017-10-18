/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import values from 'lodash/values'

/**
 * Definitions and management tools and  for regards front end modules
 * @author Raphaël Mechali
 */
const ModuleTypes = {
  // AIP_STATUS: 'archival-storage-aip-status',
  HOME_PAGE: 'home-page',
  LICENSE: 'licenses',
  MENU: 'menu',
  // NEWS: 'news',
  ORDER_CART: 'order-cart',
  ORDER_HISTORY: 'order-history',
  PROJECT_LIST: 'projects-list',
  SEARCH_FORM: 'search-form',
  SEARCH_GRAPH: 'search-graph',
  SEARCH_RESULTS: 'search-results',
  STORAGE_MONITORING: 'archival-storage-plugins-monitoring',
}

/** Defines all module types for application available for project administration and as user module  */
const ALL_MODULE_TYPES = values(ModuleTypes)

/**
 * Builds a promise to load a module from its type
 * @param {*} moduleType module type. Note that it is not necessary defined in ModuleTypes (case of the runtime only modules)
 * @return promise for loading module. The promise will return (then) the loaded module or null if loading failed
 */
function loadModule(moduleType) {
  return new Promise(
    (resolve, reject) => {
      // load module through webpack chunk loader, see https://webpack.js.org/guides/code-splitting-async/#require-ensure-
      require.ensure([], (require) => {
        try {
          // eslint-disable-next-line import/no-dynamic-require
          resolve(require(`@regardsoss-modules/${moduleType}/src/main.js`))
        } catch (e) {
          resolve(null)
        }
      })
    })
}

const trueFunction = any => true

/**
 * Returns a promise to resolve available modules types
 * @param moduleFilter optional, method to filter loaded modules like (module) => bool (true if module is OK, false otherwise)
 * @return A promise to load all modules. Promise results (then) is the array of available module types (containing only loadable and filtered modules)
 */
function getAvailableModuleTypes(dependenciesFilter = trueFunction) {
  return Promise.all(ALL_MODULE_TYPES.map(loadModule))
    .then(loadedModules => loadedModules.reduce((acc, module, index) => {
      // filter null modules and replace module content by its type
      if (isNil(module) || !dependenciesFilter(module)) {
        return acc
      }
      return [...acc, ALL_MODULE_TYPES[index]]
    }, []))
}

/**
 * Returns UI URL to reach a project module
 * @param {string} project project
 * @param {number} moduleId module ID
 * @return {string} module URL on UI
 */
function getModuleURL(project, moduleId) {
  return `/user/${project}/modules/${moduleId}`
}

export default {
  ModuleTypes,
  loadModule,
  getAvailableModuleTypes,
  getModuleURL,
}

