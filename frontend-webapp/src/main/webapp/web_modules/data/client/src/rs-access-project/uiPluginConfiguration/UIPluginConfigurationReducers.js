/*
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { UIPluginConfConfiguration } from '@regardsoss/api'
import UIPluginConfigurationActions from './UIPluginConfigurationActions'

/**
 * Redux Reducer for UIPluginConfiguration actions.
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
 * @author Léo Mieulet
 */
class UIPluginConfigurationReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(UIPluginConfConfiguration, new UIPluginConfigurationActions(namespace))
  }
}

export default (namespace) => {
  const instance = new UIPluginConfigurationReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
