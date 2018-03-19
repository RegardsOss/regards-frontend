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
import { BasicSignalReducers } from '@regardsoss/store-utils'
import OrderBasketActions from './OrderBasketActions'

/**
 * Order basket reducer, as composed BasicSignalReducers (to handle each corresponding delegate from actions)
 * @author Raphaël Mechali
 */
class OrderBasketReducer {
  /**
   * Constructor. Exactly like corresponding actions, leave the namespace empty to get common reducer instance
   * @param {string} namespace actions namespace
   */
  constructor(namespace = 'common-user-basket') {
    // instantiate corresponding actions
    this.actions = new OrderBasketActions(namespace)
    // create a map from action type to reducer delegate
    const allActionsDelegates = [
      this.actions.rootDelegate,
      this.actions.selectionDelegate,
      this.actions.datasetDelegate,
      this.actions.datasetItemDelegate]
    this.SELECTION_SUCCESS_TYPE = this.actions.selectionDelegate.SIGNAL_SUCCESS
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
    let nextState = state
    const reducerDelegate = this.reducerDelegates[action.type]
    if (reducerDelegate) {
      /// Signal handled by this reducer
      nextState = reducerDelegate.reduce(state, action)
      // there is one specific case with add to basket success:
      // when adding an empty element, the server may return 203: empty content.
      // in such case, we must prevent the basket to be cleared
      if (action.type === this.SELECTION_SUCCESS_TYPE && nextState.statusCode !== 200) {
        // recover basket content from preview request (avoid emptying the basket in frontend)
        nextState = {
          ...nextState,
          result: state.result,
        }
      }
    }
    return nextState
  }
}

/**
 * Exports the reducer builder on namespace, leave parameter blank to get default client reducer instance
 * @param {string} namespace namespace (leave undefined to get default one)
 * @return {function} reduce function
 */
export default (namespace) => {
  const instance = new OrderBasketReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
