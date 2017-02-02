/**
 * LICENSE_PLACEHOLDER
 **/
import getAttributesReducer from './models/attributes/AttributeModelReducer'
import getDatasetsReducer from './models/datasets/DatasetReducer'
import getDatasetModelsReducer from './models/datasets/DatasetModelReducer'
import getCriterionReducer from './models/criterion/CriterionReducer'
import CatalogEntityReducer from './models/catalog/CatalogEntityReducer'

const formReducers = {
  attributes: getAttributesReducer,
  datasets: getDatasetsReducer,
  models: getDatasetModelsReducer,
  criterion: getCriterionReducer,
  results: CatalogEntityReducer,
}

export default formReducers
