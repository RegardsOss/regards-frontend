/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * Provides tools to save, by project, module ID, element type and current user some user data.
 * @author Raphaël Mechali
 */
export default class LocalStorageUserData {
  /** Public user key */
  static PUBLIC_USER_KEY = 'public-user'

  /**
   * Builds local storage access key data for project / user / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {string} user user (or undefined if public user)
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   * @return {string} access key
   */
  static getLocalStorageKey(application = 'user', project = 'instance', user = LocalStorageUserData.PUBLIC_USER_KEY, moduleId, elementName) {
    return `${application}/${project}/${elementName}:${moduleId}/${user}`
  }

  /**
   * Returns data for application / project / user / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {string} user user (or undefined if public user)
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   * @return {*} saved data or undefined if none
   */
  static getUserData(application, project, user, moduleId, elementName) {
    return root.localStorage.getItem(
      LocalStorageUserData.getLocalStorageKey(application, project, user, moduleId, elementName))
  }

  /**
   * Saves data for application / project / user / module ID / element
   * @param {string} application current application
   * @param {string} project current project
   * @param {string} user user (or undefined if public user)
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   */
  static saveUserData(application, project, user, moduleId, elementName, data) {
    root.localStorage.setItem(LocalStorageUserData.getLocalStorageKey(application, project, user, moduleId, elementName), data)
  }

  /**
   * Clears data for application / project / user / module ID / element.
   * @param {string} application current application
   * @param {string} project current project
   * @param {string} user user (or undefined if public user)
   * @param {number} moduleId module ID
   * @param {string} elementName logical name of the data related elements
   */
  static clearUserDataUserData(application, project, user, moduleId, elementName) {
    root.localStorage.removeItem(LocalStorageUserData.getLocalStorageKey(application, project, user, moduleId, elementName))
  }
}
