/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicArrayReducers } from '@regardsoss/store-utils'
import PluginTypeActions from './PluginTypeActions'

/**
 * Reducers for plugin types
 *
 * @author Xavier-Alexandre Brochard
 */
class PluginTypeReducer extends BasicArrayReducers {
  constructor(namespace) {
    super(new PluginTypeActions(namespace))
  }
}

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getPluginTypeReducer = (namespace) => {
  const instance = new PluginTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}

export default getPluginTypeReducer
