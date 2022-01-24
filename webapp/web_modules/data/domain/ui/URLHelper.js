/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Provides REGARDS UI URL builders and tools
 */

/**
 * Returns admin application URL to reach project admin root
 * @param {string} project project
 * @return {string} admin root URL
 */
export function getAdminURL(project) {
  return `/admin/${project}`
}

/**
 * Returns user application URL to reach a project module
 * @param {string} project project
 * @param {number} moduleId module ID
 * @return {string} module URL on UI
 */
export function getModuleURL(project, moduleId) {
  return `/user/${project}/modules/${moduleId}`
}

/**
 * Returns module default icon path
 * @param {string} moduleType module type
 * @return {string} icon path
 */
export function getModuleDefaultIconURL(moduleType) {
  return `/modules-icon/${moduleType}.svg`
}
