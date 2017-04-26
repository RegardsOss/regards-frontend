/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeConfiguration } from '@regardsoss/api'
import ModelAttributesActions from './ModelAttributesActions'

/**
 * Redux store reducer for association model to attribute model
 */
class ModelAttributesReducer extends BasicListReducers {
  constructor(namespace) {
    super(ModelAttributeConfiguration, new ModelAttributesActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ModelAttributesReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
