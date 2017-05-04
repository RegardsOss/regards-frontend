import { BasicPageableReducers } from '@regardsoss/store-utils'
import { DatasetConfiguration } from '@regardsoss/api'
import DatasetActions from './DatasetActions'

class DatasetReducers extends BasicPageableReducers {
  constructor(namespace) {
    super(DatasetConfiguration, new DatasetActions(namespace))
  }
}


export default (namespace) => {
  const instance = new DatasetReducers(namespace)
  return (state, action) => instance.reduce(state, action)
}

