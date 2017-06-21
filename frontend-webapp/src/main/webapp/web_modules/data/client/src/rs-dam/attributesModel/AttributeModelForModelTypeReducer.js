/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import AttributeModelForModelTypeActions from './AttributeModelForModelTypeActions'
/**
 * Redux store reducer for
 */
/**
 * Redux Reducer for  Attribute Model entities
 * @author Léo Mieulet
 */
class AttributeModelForModelTypeReducer extends BasicListReducers {
  constructor(namespace) {
    super(AttributeModelConfiguration, new AttributeModelForModelTypeActions(namespace))
  }
}

export default (namespace) => {
  const instance = new AttributeModelForModelTypeReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
