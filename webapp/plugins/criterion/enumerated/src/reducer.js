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
import getDOPropertiesValuesClient from './clients/EnumeratedDOPropertyValuesClient'


/**
 * Plugin reducer builder function. Note: plugins reducer must be builder functions using pluginInstanceId as paramter and producing
 * an object like:
 * {
 *   reducerFieldKey: reducerFunction,
 *   ...
 * }
 * That meachnism ensures each plugin owns it separated redux store space
 * @param {string} pluginInstanceId plugin instance ID, must be used to generate unique namespaces and store paths
 * @return {*} reducers configuration for plugin instance
 * @author Raphaël Mechali
 */
export default function getReducer(pluginInstanceId) {
  return {
    filteredValues: getDOPropertiesValuesClient(pluginInstanceId).reducer,
  }
}
