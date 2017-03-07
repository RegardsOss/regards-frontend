/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { DatasourceConfiguration } from '@regardsoss/api'
import DatasourceActions from './DatasourceActions'

class DatasourceReducers extends BasicPageableReducers {
  constructor() {
    super(DatasourceConfiguration, DatasourceActions)
  }
}

const instance = new DatasourceReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
