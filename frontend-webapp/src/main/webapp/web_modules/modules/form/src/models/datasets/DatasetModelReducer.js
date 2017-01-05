/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ModelConfiguration } from '@regardsoss/api'
import DatasetModelActions from './DatasetModelActions'

/**
 * Redux store reducer for Module entities
 */
class DatasetModelReducer extends BasicPageableReducers {
  constructor() {
    super(ModelConfiguration, DatasetModelActions)
  }

}

const instance = new DatasetModelReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getDatasetModelsReducer = (state, action) => instance.reduce(state, action)

export default getDatasetModelsReducer
