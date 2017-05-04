/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { DatasourceConfiguration } from '@regardsoss/api'
import DatasourceActions from './DatasourceActions'

class DatasourceReducer extends BasicListReducers {
  constructor(namespace) {
    super(DatasourceConfiguration, new DatasourceActions(namespace))
  }
}


export default function (namespace) {
  const instance = new DatasourceReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
