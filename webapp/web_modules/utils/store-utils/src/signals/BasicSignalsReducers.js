/**
 * Copyright 2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import reduce from 'lodash/reduce'
import BasicSignalReducers from '../signal/BasicSignalReducers'
/**
 * reduce action from several Actions saved in a BasicSignalsActions instance
 * @author Léo Mieulet
 */
export default class BasicSignalsReducers {
  /**
   * Constructor
   * @param {BasicSignalsActions} instance of the action
   */
  constructor(basicSignalsActionInstance) {
    const subActionsKeys = basicSignalsActionInstance.getSubActionKeys()
    // iterates over all Signals Actions
    this.internalReducers = reduce(subActionsKeys, (accumulatedResult, actionKey) => {
      const subReducer = new BasicSignalReducers(basicSignalsActionInstance.getSubAction(actionKey))
      const {
        SIGNAL_REQUEST, SIGNAL_SUCCESS, SIGNAL_FAILURE, FLUSH,
      } = subReducer.basicSignalActionInstance
      return {
        ...accumulatedResult,
        /// this will be used to automatically delegates the action type to the right reducer
        [SIGNAL_REQUEST]: subReducer,
        [SIGNAL_SUCCESS]: subReducer,
        [SIGNAL_FAILURE]: subReducer,
        [FLUSH]: subReducer,
      }
    }, {})
  }

  /**
   * Reducer function, as expected by redux, that receive an action and check if it corresponds to some of its actions
   * @param {*} state current state
   * @param {*} action current action
   */
  reduce(state = BasicSignalReducers.DEFAULT_STATE, action) {
    // find delegeate to handle signal
    const reducerDelegate = this.internalReducers[action.type]
    return reducerDelegate ? reducerDelegate.reduce(state, action) : state
  }
}
