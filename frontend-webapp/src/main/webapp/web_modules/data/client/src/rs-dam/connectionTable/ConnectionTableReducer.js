/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import ConnectionTableActions from './ConnectionTableActions'

class ConnectionTableReducers extends BasicSignalReducers {
  constructor(namespace) {
    super(new ConnectionTableActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ConnectionTableReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

