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
import { OrdersNavigationActions } from './OrdersNavigationActions'

/**
 * Reducer for order navigation actions. Stores in redux state the navigation levels (none, order, order>dataset task)
 * @author Raphaël Mechali
 */
export class OrdersNavigationReducer {
  /**
   * Default reducer state
   */
  static DEFAULT_STATE = {
    navigationPath: [],
  }

  /**
   * Constructor
   * @param {string} namespace actions / reducer namespace
   */
  constructor(namespace) {
    // build a local actions instance to get the actions namespace
    this.actions = new OrdersNavigationActions(namespace)
  }

  /**
   * Reduce method implementation: handles order / dataset change in state
   * @param {*} state state
   * @param {*} action action
   * @return {*} new state for this reducer
   */
  reduce(state = OrdersNavigationReducer.DEFAULT_STATE, action) {
    switch (action.type) {
      case this.actions.SELECT_ORDER:
        // select order
        return { navigationPath: [action.order] }
      case this.actions.SELECT_DATASET:
        // select dataset
        if (state.navigationPath.length !== 1) {
          throw new Error('Cannot select a dataset task outside an order context')
        }
        return { navigationPath: [state.navigationPath[0], action.dataset] }
      case this.actions.RESET_TO_LEVEL:
        if (action.level === state.navigationPath.length) {
          // avoid useless updates
          return state
        }
        if (action.level < 0 || action.level > state.navigationPath.length) {
          throw new Error(`Invalid level index in current context: ${action.level}`)
        }
        return {
          navigationPath: action.level ? state.navigationPath.slice(0, action.level) : [],
        }
      default:
        return state
    }
  }
}

/**
 * Export reduce function closure builder
 * @param {string} namespace actions / reducer namespace
 */
export function getOrdersNavigationReducer(namespace) {
  const instance = new OrdersNavigationReducer(namespace)
  return function reduceOrdersNavigation(state, action) {
    return instance.reduce(state, action)
  }
}
