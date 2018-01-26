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
import { CatalogClient } from '@regardsoss/client'

/**
 * Redux client to fetch and consume the property values required by this plugin
 * @author Raphaël Mechali
 */

const namespace = 'namespace'
const enumeratedDOPropertyValuesActions = new CatalogClient.EnumeratedDOPropertyValuesActions(namespace)
const enumeratedDOPropertyValuesReducer = CatalogClient.getEnumeratedDOPropertyValuesReducer(namespace)
// store path for plugin is always: 
// 1 - "plugins."{pluginName}
// 2 - field configured in plugin reducer.js file
const enumeratedDOPropertyValuesSelectors = CatalogClient.getEnumeratedDOPropertyValuesSelectors(['plugins.enumerated-criteria', 'filteredValues'])

module.exports = {
  enumeratedDOPropertyValuesActions,
  enumeratedDOPropertyValuesReducer,
  enumeratedDOPropertyValuesSelectors,
}
