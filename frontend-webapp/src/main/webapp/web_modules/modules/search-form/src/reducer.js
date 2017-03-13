/**
 * LICENSE_PLACEHOLDER
 **/
import getAttributesReducer from './models/attributes/AttributeModelReducer'
import getDatasetsReducer from './models/datasets/DatasetReducer'
import getDatasetModelsReducer from './models/datasets/DatasetModelReducer'
import getCriterionReducer from './models/criterion/CriterionReducer'

/**
 * Reducers for searc-form module
 * @type {{attributes: ((p1?:*, p2?:*)), datasets: ((p1?:*, p2?:*)), models: ((p1?:*, p2?:*)), criterion: ((p1?:*, p2?:*)), results: ((p1?:*, p2?:*))}}
 * @author Sébastien binda
 */
const formReducers = {
  attributes: getAttributesReducer,
  datasets: getDatasetsReducer,
  models: getDatasetModelsReducer,
  criterion: getCriterionReducer,
}

export default formReducers
