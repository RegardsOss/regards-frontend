/**
 * LICENSE_PLACEHOLDER
 **/
import getDatasetsReducer from './models/datasets/DatasetReducer'
import getDatasetModelsReducer from './models/datasets/DatasetModelReducer'

const formReducers = {
  datasets: getDatasetsReducer,
  models: getDatasetModelsReducer,
}

export default formReducers
