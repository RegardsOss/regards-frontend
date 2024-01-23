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
 */
import get from 'lodash/get'
import { BasicSignalReducers, BasicReducer } from '@regardsoss/store-utils'
import AccountPasswordActions from './AccountPasswordActions'

export class AccountPasswordReducer extends BasicSignalReducers {
  static DEFAULT_STATE = {
    ...BasicSignalReducers.DEFAULT_STATE,
    rules: '', // rules description
    validity: false,
  }

  constructor(namespace) {
    super(new AccountPasswordActions(namespace))
    this.defaultState = AccountPasswordReducer.DEFAULT_STATE
  }

  reduce(state = this.defaultState, action) {
    if (BasicReducer.isCancelled(state, action)) {
      return state
    }

    // in this reducer, we want to keep last rules fetch and last password validation separately
    const { rules, validity } = state
    const nextState = super.reduce(state, action)

    switch (action.type) {
      case this.basicSignalActionInstance.SIGNAL_REQUEST:
      case this.basicSignalActionInstance.SIGNAL_FAILURE:
        // decorate parent state with added fields
        return {
          ...nextState,
          // recover rules and validity from previous state
          rules: state.rules,
          validity: state.validity,
        }
      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...nextState,
          // update rules or validity depending on what the action performed
          rules: get(nextState, 'result.rules', rules),
          validity: get(nextState, 'result.validity', validity),
        }
      default:
        return nextState
    }
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new AccountPasswordReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
