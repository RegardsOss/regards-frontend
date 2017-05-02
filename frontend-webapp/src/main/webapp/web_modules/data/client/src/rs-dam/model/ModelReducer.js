import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelConfiguration } from '@regardsoss/api'
import ModelActions from './ModelActions'


class ModelReducer extends BasicListReducers {
  constructor(namespace) {
    super(ModelConfiguration, new ModelActions(namespace))
  }
}

export default (namespace) => {
  const instance = new ModelReducer(namespace)
  return (state, action) => instance.reduce(state, action)
}
