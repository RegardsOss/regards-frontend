/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'

/**
 * Redux store reducer for Module entities
 * @author Sébastien binda
 */
class AttributeModelReducer extends BasicPageableReducers {
  constructor() {
    super(AttributeModelConfiguration, AttributeModelActions)
  }
}

const instance = new AttributeModelReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getModelAttributeReducer = (state, action) => instance.reduce(state, action)

export default getModelAttributeReducer
