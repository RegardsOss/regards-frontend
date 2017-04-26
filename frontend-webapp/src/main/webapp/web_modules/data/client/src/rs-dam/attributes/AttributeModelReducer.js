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
 *
 * To use those actions, you need to pass the <namespace> parameter
 *
 * namespace : String, must be the same namespace defined in the associated Reducer.
 *
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
