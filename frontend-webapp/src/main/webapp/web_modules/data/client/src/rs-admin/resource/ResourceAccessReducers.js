import { BasicListReducers } from '@regardsoss/store-utils'
import { ResourceAccessConfiguration } from '@regardsoss/api'
import ResourceAccessActions from './ResourceAccessActions'

class ResourceAccessReducers extends BasicListReducers {
  constructor(namespace) {
    super(ResourceAccessConfiguration, new ResourceAccessActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ResourceAccessReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}
