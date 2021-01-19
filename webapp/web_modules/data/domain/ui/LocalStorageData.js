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
import root from 'window-or-global'
import { APPLICATIONS_ENUM } from './Applications'

/**
 * Provides tools to save, by project, module ID and element type some user data.
 * @author Raphaël Mechali
 */
export default class LocalStorageData {
  /**
   * Builds local storage access key data for project / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   * @return {string} access key
   */
  static getLocalStorageKey(application = APPLICATIONS_ENUM.USER, project = 'instance', moduleId, elementName) {
    return `${application}/${project}/${elementName}:${moduleId}`
  }

  /**
   * Returns data for application / project / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   * @return {*} saved data or undefined if none
   */
  static getData(application = APPLICATIONS_ENUM.USER, project, moduleId, elementName) {
    return root.localStorage.getItem(
      LocalStorageData.getLocalStorageKey(application, project, moduleId, elementName))
  }

  /**
   * Saves data for application / project / module ID / element
   * @param {string} application current application
   * @param {string} project current project
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   */
  static saveData(application = APPLICATIONS_ENUM.USER, project, moduleId, elementName, data) {
    root.localStorage.setItem(LocalStorageData.getLocalStorageKey(application, project, moduleId, elementName), data)
  }

  /**
   * Clears data for application / project  / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   */
  static clearData(application = APPLICATIONS_ENUM.USER, project, moduleId, elementName) {
    root.localStorage.removeItem(LocalStorageData.getLocalStorageKey(application, project, moduleId, elementName))
  }
}
