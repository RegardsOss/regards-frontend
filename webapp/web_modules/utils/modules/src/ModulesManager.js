/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import find from 'lodash/find'
import values from 'lodash/values'

/**
 * Definitions and management tools and  for regards front end modules
 * @author Raphaël Mechali
 */

/**
 * Dynamic module types that can be instantiated by the administrator
 */
const VisibleModuleTypes = {
  DESCRIPTION: 'description',
  EMBEDDED_HMTL: 'embedded-html',
  LICENSE: 'licenses',
  MAP: 'map',
  MENU: 'menu',
  ORDER_CART: 'order-cart',
  ORDER_HISTORY: 'order-history',
  PROJECT_ABOUT_PAGE: 'project-about-page',
  PROJECT_LIST: 'projects-list',
  SEARCH_GRAPH: 'search-graph',
  SEARCH_RESULTS: 'search-results',
}

/**
 * Dynamic module types that cannot be instantiated by administrator (their UI needs external activation)
 */
const HiddenModuleTypes = {
  AUTHENTICATION: 'authentication',
  NEWS: 'news', // XXX visible in later versions
}

/** All dynamic module types (mainly for REGARDS programmers use) */
const AllDynamicModuleTypes = {
  ...VisibleModuleTypes,
  ...HiddenModuleTypes,
}

/** Defines all module types for application available for project administration and as user module  */
const ALL_MODULE_TYPES = values(VisibleModuleTypes)

/**
 * Finds the first available module by type
 * @param {*} modules modules list, as provided by AccessProjectClient.getModuleSelectors().getList(state) (normalized results)
 * @param {string} moduleType searched module type, from ALL_MODULE_TYPES
 * @return {{content: {*}, links: [*]}} found module as a {} object or null if not found
 */
function findFirstModuleByType(modules, moduleType) {
  return find(modules, (module) => get(module, 'content.type', null) === moduleType) || null
}

/**
 * Builds a promise to load a module from its type
 * @param {*} moduleType module type.
 * @return promise for loading module. The promise will return (then) the loaded module or null if loading failed
 */
function loadModule(moduleType) {
  return new Promise((resolve, reject) => {
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

const trueFunction = (any) => true

/**
 * Returns a promise to resolve VISIBLE available modules types (for project administrator or user)
 * @param moduleFilter optional, method to filter loaded modules like (module) => bool (true if module is OK, false otherwise)
 * @return A promise to load all modules. Promise results (then) is the array of available module types (containing only loadable and filtered modules)
 */
function getAvailableVisibleModuleTypes(dependenciesFilter = trueFunction) {
  return Promise.all(ALL_MODULE_TYPES.map(loadModule))
    .then((loadedModules) => loadedModules.reduce((acc, module, index) => {
      // filter null modules and replace module content by its type
      if (isNil(module) || !dependenciesFilter(module)) {
        return acc
      }
      return [...acc, ALL_MODULE_TYPES[index]]
    }, []))
}

export default {
  VisibleModuleTypes,
  HiddenModuleTypes,
  AllDynamicModuleTypes,
  findFirstModuleByType,
  loadModule,
  getAvailableVisibleModuleTypes,
}
