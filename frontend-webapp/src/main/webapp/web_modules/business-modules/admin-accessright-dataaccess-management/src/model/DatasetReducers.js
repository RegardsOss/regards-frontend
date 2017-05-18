/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { DatasetConfiguration } from '@regardsoss/api'
import DatasetActions from './DatasetActions'

class DatasetReducers extends BasicPageableReducers {
  constructor() {
    super(DatasetConfiguration, DatasetActions)
  }
}

const instance = new DatasetReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
