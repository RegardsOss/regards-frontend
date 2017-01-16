/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import ModelAttributeActions from './ModelAttributeActions'

/**
 * Redux store reducer for Module entities
 */
class ModelAttributeReducer extends BasicPageableReducers {
  constructor() {
    super(AttributeModelConfiguration, ModelAttributeActions)
  }
}

const instance = new ModelAttributeReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getModelAttributeReducer = (state, action) => instance.reduce(state, action)

export default getModelAttributeReducer
