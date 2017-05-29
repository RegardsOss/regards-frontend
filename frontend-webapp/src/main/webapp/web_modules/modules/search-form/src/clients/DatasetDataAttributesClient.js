/*
 * LICENSE_PLACEHOLDER
 */
import { DataManagementClient } from '@regardsoss/client'

/**
 * Dataset entities client.
 *
 * @author Sébastien Binda
 */
const ENTITIES_STORE_PATH = ['modules.search-form', 'dataset-data-attributes']
const REDUX_ACTION_NAMESPACE = 'form/datasets/data/attributes'

const datasetDataAttributesReducer = DataManagementClient.DatasetDataAttributesReducer(REDUX_ACTION_NAMESPACE)
const datasetDataAttributesActions = new DataManagementClient.DatasetDataAttributesActions(REDUX_ACTION_NAMESPACE)
const datasetDataAttributesSelectors = DataManagementClient.DatasetDataAttributesSelectors(ENTITIES_STORE_PATH)


export default {
  datasetDataAttributesReducer,
  datasetDataAttributesActions,
  datasetDataAttributesSelectors,
}
