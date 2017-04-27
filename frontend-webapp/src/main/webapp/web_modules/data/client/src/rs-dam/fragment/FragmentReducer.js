/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { FragmentConfiguration } from '@regardsoss/api'
import FragmentActions from './FragmentActions'

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
  constructor(namespace) {
    super(FragmentConfiguration, new FragmentActions(namespace))
  }
}


export default (namespace, actionsInstance) => {
  const instance = new FragmentReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
