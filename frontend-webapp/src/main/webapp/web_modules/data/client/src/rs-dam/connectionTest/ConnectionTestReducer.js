import { BasicSignalReducers } from '@regardsoss/store-utils'
import ConnectionTestActions from './ConnectionTestActions'

class ConnectionTestReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new ConnectionTestActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ConnectionTestReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
