import { BasicListReducers } from '@regardsoss/store-utils'
import { ConnectionConfiguration } from '@regardsoss/api'
import ConnectionActions from './ConnectionActions'

class ConnectionReducers extends BasicListReducers {
  constructor() {
    super(ConnectionConfiguration, ConnectionActions)
  }
}

const instance = new ConnectionReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default function (state, action) {
  return instance.reduce(state, action)
}
