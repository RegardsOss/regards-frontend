/**
 * LICENSE_PLACEHOLDER
 **/
import getDatasetsReducer from './models/datasets/DatasetReducer'
import getDatasetModelsReducer from './models/datasets/DatasetModelReducer'
import getCriterionReducer from './models/criterion/CriterionReducer'

const formReducers = {
  datasets: getDatasetsReducer,
  models: getDatasetModelsReducer,
  criterion: getCriterionReducer,
}

export default formReducers
