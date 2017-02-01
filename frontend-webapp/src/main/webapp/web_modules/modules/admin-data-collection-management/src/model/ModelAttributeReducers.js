/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelAttributeConfiguration } from '@regardsoss/api'
import ModelAttributeActions from './ModelAttributeActions'

class ModelAttributeReducers extends BasicListReducers {
  constructor() {
    super(ModelAttributeConfiguration, ModelAttributeActions)
  }
}

const instance = new ModelAttributeReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
