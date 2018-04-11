/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { BasicListReducers } from '@regardsoss/store-utils'
import { StorageMonitoringConfiguration } from '@regardsoss/api'
import StorageMonitoringActions from './StorageMonitoringActions'

/**
 * Storage plugins fetch reducer
 * @author Raphaël Mechali
 */
class StorageMonitoringReducers extends BasicListReducers {
  constructor(namespace) {
    super(StorageMonitoringConfiguration, new StorageMonitoringActions(namespace))
  }
}

/**
 * Exports the reducer builder on namespace
 * @param {string} namespace namespace
 * @return {function} reduce function
 */
export default (namespace) => {
  const instance = new StorageMonitoringReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
