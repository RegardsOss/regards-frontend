/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import MicroserviceInfosActions from './MicroserviceInfosActions'

class MicroserviceInfosReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new MicroserviceInfosActions(namespace))
  }
}

export default (namespace) => {
  const instance = new MicroserviceInfosReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
