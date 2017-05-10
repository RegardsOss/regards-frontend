/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { UIPluginConfConfiguration } from '@regardsoss/api'
import UIServiceActions from './UIServiceActions'

export class UIServiceReducer extends BasicListReducers {
  constructor(namespace) {
    super(UIPluginConfConfiguration, new UIServiceActions(namespace))
  }
}

/** Closure builder for reducer function */
export default (namespace) => {
  const reducerInstance = new UIServiceReducer(namespace)
  return (state, action) => reducerInstance.reduce(state, action)
}
