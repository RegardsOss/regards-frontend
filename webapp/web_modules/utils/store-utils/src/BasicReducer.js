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
import get from 'lodash/get'

/**
 * Basic reducer, able to determine if an action has been cancelled (see BasicActions#flush, BasicActions#buildSuccessMeta)
 * Sub reducers must use:
 * - this reducer reduce method for flush actions
 * - this isCancelled metohd before handling a success action (may also be done before handling any action)
 * @author Raphaël Mechali
 */
class BasicReducer {
  constructor(basicActionsInstance, defaultState) {
    this.basicActionsInstance = basicActionsInstance
    this.defaultState = defaultState
  }

  /**
   * Checks if action is cancelled
   * @param {cancelTime: number,...} state state
   * @param {*} action action of any action type, action without meta will alway pass through
   * @return {boolean} False when cancelPendingAfter time has not been set up, or action meta requestTime has not
   * been set up or action request time is older than cancelPendingAfter time. True when action is cancelled
   */
  static isCancelled(state, action) {
    return get(state, 'cancelPendingAfter', 0) > get(action, 'meta.requestTime', Number.MAX_SAFE_INTEGER)
  }

  reduce(state = this.defaultState, action) {
    switch (action.type) {
      case this.basicActionsInstance.FLUSH:
        return {
          ...this.defaultState,
          // store, when flush should cancel pending actions, the flush action time
          cancelPendingAfter: action.cancelPending ? action.flushTime : null,
        }
      default:
        return state
    }
  }
}

export default BasicReducer
