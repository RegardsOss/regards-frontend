/**
 * LICENSE_PLACEHOLDER
 **/
import getAttributesReducer from './models/attributes/ModelAttributeReducer'
import getDatasetsReducer from './models/datasets/DatasetReducer'
import getDatasetModelsReducer from './models/datasets/DatasetModelReducer'
import getCriterionReducer from './models/criterion/CriterionReducer'

const formReducers = {
  attributes: getAttributesReducer,
  datasets: getDatasetsReducer,
  models: getDatasetModelsReducer,
  criterion: getCriterionReducer,
}

export default formReducers
