import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'

class AttributeModelReducers extends BasicListReducers {
  constructor() {
    super(ModelConfiguration, AttributeModelActions)
  }
}

const instance = new AttributeModelReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getAttributeModelReducer(state, action) {
  return instance.reduce(state, action)
}
