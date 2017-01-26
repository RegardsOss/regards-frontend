/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import EndpointActions from './EndpointActions'

class EndpointReducers extends BasicPageableReducers {
  constructor() {
    super(ResourceAccessConfiguration, EndpointActions)
  }
}

const instance = new EndpointReducers()

/**
 * Return an function where the reducer instance exists
 *
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
