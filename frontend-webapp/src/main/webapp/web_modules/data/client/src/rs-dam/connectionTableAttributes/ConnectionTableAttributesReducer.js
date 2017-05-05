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

export default (namespace) => {
  const instance = new ConnectionTableAttributesReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

