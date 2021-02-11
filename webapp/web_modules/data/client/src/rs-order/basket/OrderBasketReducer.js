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
import { BasicSignalReducers } from '@regardsoss/store-utils'
import OrderBasketActions from './OrderBasketActions'

/**
 * Order basket reducer, as composed BasicSignalReducers (to handle each corresponding delegate from actions)
 * @author Raphaël Mechali
 */
class OrderBasketReducer {
  static DEFAULT_STATE = {
    ...BasicSignalReducers.DEFAULT_STATE,
    // adds the adding to basket operation fetching information (required by feedbacks)
    addingToBasket: false,
  }

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
  reduce(state = OrderBasketReducer.DEFAULT_STATE, action) {
    // find delegeate to handle signal
    const reducerDelegate = this.reducerDelegates[action.type]
    if (reducerDelegate) {
      // Signal handled by this reducer
      const nextState = reducerDelegate.reduce(state, action)
      // specific cases:
      // selection delegate: update addingToBasket (used by feedbacks displayer)
      // selection SUCCESS: do not update the result when server does not answer with 200 (avoids
      // emptying the basket when user performs a void operation)
      switch (action.type) {
        case this.actions.selectionDelegate.SIGNAL_REQUEST:
          return {
            ...nextState,
            addingToBasket: true,
          }
        case this.actions.selectionDelegate.SIGNAL_FAILURE:
          return {
            ...nextState,
            addingToBasket: false,
          }
        case this.actions.selectionDelegate.SIGNAL_SUCCESS:
          return {
            ...nextState,
            addingToBasket: false,
            // preserve previous on 204 like codes
            result: nextState.statusCode !== 200 ? state.result : nextState.result,
          }
        default:
          return {
            ...nextState,
            addingToBasket: false,
          }
      }
    }
    return state
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
