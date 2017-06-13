/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicSignalReducers } from '@regardsoss/store-utils'
import DatasetValidSubsettingTestActions from './DatasetValidSubsettingTestActions'

class DatasetValidSubsettingTestReducer extends BasicSignalReducers {
  constructor(namespace) {
    super(new DatasetValidSubsettingTestActions(namespace))
  }
}

export default (namespace) => {
  const instance = new DatasetValidSubsettingTestReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
