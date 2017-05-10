/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import MaintenanceModeActions from './MaintenanceModeActions'

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default microservice => function (state, action) {
  return new BasicSignalReducers(MaintenanceModeActions(microservice)).reduce(state, action)
}
