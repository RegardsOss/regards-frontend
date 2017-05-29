/**
 * LICENSE_PLACEHOLDER
 **/
import { datasetReducer } from './clients/DatasetClient'
import { modelReducer } from './clients/ModelClient'
import { uiPluginDefinitionReducers } from './clients/UIPluginDefinitionClient'
import { datasetDataAttributesReducer } from './clients/DatasetDataAttributesClient'
import { AttributeModelReducer } from './clients/AttributeModelClient'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const formReducers = {
  'dataset-data-attributes': datasetDataAttributesReducer,
  attributes: AttributeModelReducer,
  datasets: datasetReducer,
  models: modelReducer,
  criterion: uiPluginDefinitionReducers,
}

export default formReducers
