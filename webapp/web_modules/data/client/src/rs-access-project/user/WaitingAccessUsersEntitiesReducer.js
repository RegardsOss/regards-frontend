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
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ProjectUserConfiguration } from '@regardsoss/api'
import WaitingAccessUsersEntitiesActions from './WaitingAccessUsersEntitiesActions'

export class WaitingAccessUserEntitiesReducer extends BasicPageableReducers {
  /**
   * Constructor
   * @param {string} namespace namespace (leave empty to get default namespace for admin)
   */
  constructor(namespace) {
    super(ProjectUserConfiguration, new WaitingAccessUsersEntitiesActions(namespace))
  }
}

/**
 * Closure builder for reducer function
 * @param {string} namespace actions namespace (leave empty to get default namespace for admin)
 * @return {Function} reducer function
 */
export default (namespace) => {
  const reducerInstance = new WaitingAccessUserEntitiesReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
