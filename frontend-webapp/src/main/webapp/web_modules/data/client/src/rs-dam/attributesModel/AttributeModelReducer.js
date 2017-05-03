/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelActions from './AttributeModelActions'
/**
 * Redux store reducer for
 */
/**
 * Redux Reducer for  Attribute Model entities
 * @author Léo Mieulet
 */
class AttributeModelReducer extends BasicListReducers {
  constructor(namespace) {
    super(AttributeModelConfiguration, new AttributeModelActions(namespace))
  }
}

export default (namespace) => {
  const instance = new AttributeModelReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
