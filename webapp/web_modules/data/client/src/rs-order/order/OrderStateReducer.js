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
import { BasicSignalReducers } from '@regardsoss/store-utils'
import OrderStateActions from './OrderStateActions'

/**
 * Order state reducer, as composed BasicSignalReducers (to handle each corresponding delegate from actions)
 * @author Raphaël Mechali
 */
class OrderStateReducer {
  /**
   * Constructor
   * @param {string} namespace name space
   */
  constructor(namespace = 'common-user-basket') {
    // instantiate corresponding actions
    this.actions = new OrderStateActions(namespace)
    // create a map from action type to reducer delegate
    const allActionsDelegates = [
      this.actions.deleteSuperficiallyDelegate,
      this.actions.deleteCompletelyDelegate,
      this.actions.pauseDelegate,
      this.actions.resumeDelegate,
      this.actions.retryDelegate,
      this.actions.restartDelegate,
    ]
    this.reducerDelegates = allActionsDelegates.reduce((acc, actionDelegate) => {
      const reducerDelegate = new BasicSignalReducers(actionDelegate)
      return {
        ...acc,
        /// this will be used to automatically delegate the action type to the right reducer
        [actionDelegate.SIGNAL_REQUEST]: reducerDelegate,
        [actionDelegate.SIGNAL_SUCCESS]: reducerDelegate,
        [actionDelegate.SIGNAL_FAILURE]: reducerDelegate,
        [actionDelegate.FLUSH]: reducerDelegate,
      }
    }, {})
  }

  /**
   * Reducer function, as expected  by redux
   * @param {*} state current state
   * @param {*} action current action
   */
  reduce(state = BasicSignalReducers.DEFAULT_STATE, action) {
    // find delegeate to handle signal
    const reducerDelegate = this.reducerDelegates[action.type]
    return reducerDelegate ? reducerDelegate.reduce(state, action) : state
  }
}

/**
 * Exports the reducer builder on namespace
 * @param {string} namespace namespace
 * @return {function} reduce function
 */
export default (namespace) => {
  const instance = new OrderStateReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
