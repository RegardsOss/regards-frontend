/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'
/**
 * Redux store reducer for Attribute Model entities
 */
class AttributeModelReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(AttributeModelConfiguration, new AttributeModelActions(namespace))
  }
}

export default (namespace, actionsInstance) => {
  const instance = new AttributeModelReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
