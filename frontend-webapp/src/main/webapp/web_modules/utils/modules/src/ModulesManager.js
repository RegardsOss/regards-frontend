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

/**
 * Dynamic module types that can be instantiated by the administrator
 */
const VisibleModuleTypes = {
  // AIP_STATUS: 'archival-storage-aip-status',
  LICENSE: 'licenses',
  MENU: 'menu',
  // NEWS: 'news',
  ORDER_CART: 'order-cart',
  ORDER_HISTORY: 'order-history',
  PROJECT_LIST: 'projects-list',
  PROJECT_ABOUT_PAGE: 'project-about-page',
  SEARCH_FORM: 'search-form',
  SEARCH_GRAPH: 'search-graph',
  SEARCH_RESULTS: 'search-results',
  STORAGE_MONITORING: 'archival-storage-plugins-monitoring',
}

/**
 * Dynamic module types that cannot be instantiated by administrator (their UI needs external activation)
 */
const HiddenModuleTypes = {
  AUTHENTICATION: 'authentication',
  SEARCH_FACETS: 'search-facets',
}

/** All dynamic module types (mainly for REGARDS programmers use) */
const AllDynamicModuleTypes = {
  ...VisibleModuleTypes,
  ...HiddenModuleTypes,
}

/** Defines all module types for application available for project administration and as user module  */
const ALL_MODULE_TYPES = values(VisibleModuleTypes)

/**
 * Builds a promise to load a module from its type
 * @param {*} moduleType module type.
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
 * Returns a promise to resolve VISIBLE available modules types (for project administrator or user)
 * @param moduleFilter optional, method to filter loaded modules like (module) => bool (true if module is OK, false otherwise)
 * @return A promise to load all modules. Promise results (then) is the array of available module types (containing only loadable and filtered modules)
 */
function getAvailableVisibleModuleTypes(dependenciesFilter = trueFunction) {
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
  VisibleModuleTypes,
  HiddenModuleTypes,
  AllDynamicModuleTypes,
  loadModule,
  getAvailableVisibleModuleTypes,
  getModuleURL,
}

