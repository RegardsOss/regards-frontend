import { BasicListReducers } from '@regardsoss/store-utils'
import { ConnectionConfiguration } from '@regardsoss/api'
import ConnectionActions from './ConnectionActions'

/**
 * Redux store reducer for Connection entities
 * @author Léo Mieulet
 */
class ConnectionReducers extends BasicListReducers {
  constructor(namespace) {
    super(ConnectionConfiguration, new ConnectionActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ConnectionReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

