/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginConfiguration } from '@regardsoss/api'
import UIPluginDefinitionActions from './UIPluginDefinitionActions'

/**
 * Redux Reducer for UIPluginDefinition actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Léo Mieulet
 */
class UIPluginDefinitionReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(PluginConfiguration, new UIPluginDefinitionActions(namespace))
  }
}

export default (namespace) => {
  const instance = new UIPluginDefinitionReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
