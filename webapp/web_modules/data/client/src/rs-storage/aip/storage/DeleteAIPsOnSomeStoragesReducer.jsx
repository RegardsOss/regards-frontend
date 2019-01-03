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
import get from 'lodash/get'
import { BasicSignalReducers } from '@regardsoss/store-utils'
import DeleteAIPsOnSomeStoragesActions from './DeleteAIPsOnSomeStoragesActions'

/**
 * Reducer for delete AIP on some storages actions. It works like the basic signal reducer but stores any
 * AIP in error on action success
 * @author Raphaël Mechali
 */
class DeleteAIPsOnSomeStoragesReducer extends BasicSignalReducers {
  /**
   * Constructor
   * @param {string} namespace actions namespace
   */
  constructor(namespace) {
    super(new DeleteAIPsOnSomeStoragesActions(namespace))
  }

  /**
   * Reduce function: builds next state
   * @param {*} state state
   * @param {*} action action
   */
  reduce(state = this.defaultState, action) {
    if (this.isCancelled(state, action)) {
      return state
    }
    const newState = super.reduce(state, action)
    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        // store last AIP errors if any
        return {
          ...newState,
          lastAIPInError: get(action, 'payload', []), // AIP in error are action payload (expected string array)
        }
      default:
        return newState
    }
  }
}

/**
 * Builds reduce function for DeleteAIPsOnSomeStoragesActions
 * @param {string} namespace namespace
 * @return {Function} reducer function
 * @author Raphaël Mechali
 */
export default function getDeleteAIPsOnSomeStoragesReducer(namespace) {
  const instance = new DeleteAIPsOnSomeStoragesReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
