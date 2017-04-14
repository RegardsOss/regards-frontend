/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'

/**
 * Redux store reducer for Module entities
 */
class AttributeModelReducer extends BasicPageableReducers {
  constructor(namespace, actionsInstance) {
    super(AttributeModelConfiguration, actionsInstance)
  }
}

export default (namespace, actionsInstance) => {
  const instance = new AttributeModelReducer(namespace, actionsInstance)
  return (state, action) => instance.reduce(state, action)
}
