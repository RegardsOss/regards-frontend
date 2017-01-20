/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeConfiguration } from '@regardsoss/api'
import ModelAttributeFragmentActions from './ModelAttributeFragmentActions'

class ModelAttributeFragmentReducers extends BasicListReducers {
  constructor() {
    super(ModelAttributeConfiguration, ModelAttributeFragmentActions)
  }
}

const instance = new ModelAttributeFragmentReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
