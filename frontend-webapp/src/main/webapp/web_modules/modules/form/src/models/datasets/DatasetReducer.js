/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { DatasetConfiguration } from '@regardsoss/api'
import DatasetActions from './DatasetActions'

/**
 * Redux store reducer for Module entities
 */
class DatasetReducer extends BasicPageableReducers {
  constructor() {
    super(DatasetConfiguration, DatasetActions)
  }

}

const instance = new DatasetReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getDatasetsReducer = (state, action) => instance.reduce(state, action)

export default getDatasetsReducer
