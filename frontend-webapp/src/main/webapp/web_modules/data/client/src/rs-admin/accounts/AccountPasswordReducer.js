/**
 * LICENSE_PLACEHOLDER
 */
import { BasicSignalReducers } from '@regardsoss/store-utils'
import AccountPasswordActions from './AccountPasswordActions'

export class AccountPasswordReducer extends BasicSignalReducers {

  static DEFAULT_STATE = {
    ...BasicSignalReducers.DEFAULT_STATE,
    rules: [],
    validity: false,
  }

  constructor(namespace) {
    super(new AccountPasswordActions(namespace))
  }


  reduce(state = AccountPasswordReducer.DEFAULT_STATE, action) {
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
      case this.basicSignalActionInstance.FLUSH:
        return {
          ...nextState,
          // reset rules and validity to defaults
          rules: AccountPasswordReducer.DEFAULT_STATE.rules,
          validity: AccountPasswordReducer.DEFAULT_STATE.validity,
        }

      case this.basicSignalActionInstance.SIGNAL_SUCCESS:
        return {
          ...nextState,
          // update rules or validity depending on what the action performed
          rules: nextState.result.type === AccountPasswordActions.FetchingTypes.passwordRules ? nextState.result.content : rules,
          validity: nextState.result.type === AccountPasswordActions.FetchingTypes.passwordValidity ? nextState.result.content : validity,
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
