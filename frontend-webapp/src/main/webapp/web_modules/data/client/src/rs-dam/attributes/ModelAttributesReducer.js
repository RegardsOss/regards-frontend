/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeConfiguration } from '@regardsoss/api'

/**
 * Redux store reducer for association model to attribute model
 */
class ModelAttributesReducer extends BasicListReducers {
  constructor(actionsInstance) {
    super(ModelAttributeConfiguration, actionsInstance)
  }
}

export default (actionsInstance) => {
  const instance = new ModelAttributesReducer(actionsInstance)
  return (state, action) => instance.reduce(state, action)
}
