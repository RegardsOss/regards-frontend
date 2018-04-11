/**
* LICENSE_PLACEHOLDER
**/
import { DataManagementClient } from '@regardsoss/client'

/**
 * Client to retrieve DataSets attributes.
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-form', 'datasetAttributes']
const REDUX_ACTION_NAMESPACE = 'form/datasets/attributes'

export const dataSetAttributesActions = new DataManagementClient.DatasetAttributesActions(REDUX_ACTION_NAMESPACE)
export const dataSetAttributesReducer = DataManagementClient.DatasetAttributesReducer(REDUX_ACTION_NAMESPACE)
export const dataSetAttributesSelectors = DataManagementClient.DatasetAttributesSelectors(ENTITIES_STORE_PATH)

module.exports = {
  dataSetAttributesActions,
  dataSetAttributesReducer,
  dataSetAttributesSelectors,
}
