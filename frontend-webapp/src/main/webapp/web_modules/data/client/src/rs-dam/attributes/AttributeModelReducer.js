/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelAction from './AttributeModelAction'
/**
 * Redux store reducer for Attribute Model entities
 */
class AttributeModelReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(AttributeModelConfiguration, new AttributeModelAction(namespace))
  }
}

export default (namespace, actionsInstance) => {
  const instance = new AttributeModelReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
