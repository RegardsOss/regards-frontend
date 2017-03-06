/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ConnectionTableAttributesActions from './ConnectionTableAttributesActions'

class ConnectionTableAttributesReducers extends BasicSignalReducers {
  constructor() {
    super(ConnectionTableAttributesActions)
  }
}

const instance = new ConnectionTableAttributesReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
