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

/** Management tools and definitions for regards front end modules  */

/** Defines all module types for application available for project administration and as user module  */
const AVAILABLE_MODULES = [
  'menu',
  // 'news',
  'projects-list',
  'search-form',
  'search-graph',
  'search-results',
  // 'archival-storage-aip-status',
  // 'archival-storage-plugins-monitoring',
  'embedded-html',
  'home-page',
  'licenses',
]

/**
 * Returns all modules available for application
 * @returns {Array(string)} all module types
 */
function getAllModuleTypes() {
  return AVAILABLE_MODULES
}

/**
 * Builds a promise to load a module from its type
 * @param {*} moduleType module type. Note that it is not necessary defined in AVAILABLE_MODULES (case of the runtime only modules)
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
  const allModuleTypes = getAllModuleTypes()
  const modules = Promise.all(allModuleTypes.map(loadModule))
    .then(loadedModules => loadedModules.reduce((acc, module, index) => {
      // filter null modules and replace module content by its type
      if (isNil(module) || !dependenciesFilter(module)) {
        return acc
      }
      return [...acc, allModuleTypes[index]]
    }, []))
  console.error('MODULES', modules)

  return modules
}

export default {
  getAllModuleTypes,
  loadModule,
  getAvailableModuleTypes,
}

