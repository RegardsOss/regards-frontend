/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ConnectionTableActions from './ConnectionTableActions'

class ConnectionTableReducers extends BasicSignalReducers {
  constructor() {
    super(ConnectionTableActions)
  }
}

const instance = new ConnectionTableReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
