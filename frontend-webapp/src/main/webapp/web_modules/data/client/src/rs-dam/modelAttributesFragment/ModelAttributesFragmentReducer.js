/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeConfiguration } from '@regardsoss/api'
import ModelAttributesFragmentActions from './ModelAttributesFragmentActions'

/**
 * Redux store reducer for association fragment (and its attributes) to model
 */
class ModelAttributesFragmentReducer extends BasicListReducers {
  constructor(namespace) {
    super(ModelAttributeConfiguration, new ModelAttributesFragmentActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ModelAttributesFragmentReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}