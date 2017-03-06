/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import SetMaintenanceModeActions from './SetMaintenanceModeActions'
// import microservices from '../data/microservices.json'

// const instances = {}
// microservices.forEach(
//   microservice => (instances[microservice.name] = new BasicSignalReducers(SetMaintenanceModeActions(microservice.name))),
// )

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */

export default microservice => function (state, action) {
  return new BasicSignalReducers(SetMaintenanceModeActions(microservice)).reduce(state, action)
}
