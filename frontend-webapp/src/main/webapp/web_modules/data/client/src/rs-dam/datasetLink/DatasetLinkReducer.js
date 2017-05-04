import { BasicSignalReducers } from '@regardsoss/store-utils'
import DatasetLinkActions from './DatasetLinkActions'

class DatasetLinkReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new DatasetLinkActions(namespace))
  }
}


export default (namespace) => {
  const instance = new DatasetLinkReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}

