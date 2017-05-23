/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AttributeModelConfiguration } from '@regardsoss/api'
import DatasetDataAttributesActions from './DatasetDataAttributesActions'

/**
 * Redux reducer to manage DatasetDataAttributes (AttributeModel) entities.
 * @author Sébastien Binda
 */
class DatasetDataAttributesReducer extends BasicPageableReducers {
  constructor(namespace) {
    super(AttributeModelConfiguration, new DatasetDataAttributesActions(namespace))
  }
}


export default (namespace) => {
  const instance = new DatasetDataAttributesReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}

