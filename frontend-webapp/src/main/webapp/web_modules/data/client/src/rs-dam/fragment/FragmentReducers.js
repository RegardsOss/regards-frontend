/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { FragmentConfiguration } from '@regardsoss/api'

/**
 * Redux Reducer for Fragment actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Léo Mieulet
 */
class FragmentReducers extends BasicListReducers {
  constructor(actionsInstance) {
    super(FragmentConfiguration, actionsInstance)
  }
}


export default (namespace, actionsInstance) => {
  const instance = new FragmentReducers(namespace, actionsInstance)
  return (state, action) => instance.reduce(state, action)
}
