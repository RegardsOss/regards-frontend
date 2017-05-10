/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'

class AttributeModelReducers extends BasicListReducers {
  constructor() {
    super(AttributeModelConfiguration, AttributeModelActions)
  }
}

const instance = new AttributeModelReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
