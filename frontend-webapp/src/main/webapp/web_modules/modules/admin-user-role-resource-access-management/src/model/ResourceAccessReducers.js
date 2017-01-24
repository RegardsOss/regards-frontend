import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import ResourceAccessActions from './ResourceAccessActions'

class ResourceAccessReducers extends BasicPageableReducers {
  constructor() {
    super(ResourceAccessConfiguration, ResourceAccessActions)
  }
}

const instance = new ResourceAccessReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getResourceAccessReducer(state, action) {
  return instance.reduce(state, action)
}
