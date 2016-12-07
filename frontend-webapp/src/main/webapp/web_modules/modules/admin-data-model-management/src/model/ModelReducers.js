import { BasicListReducers } from '@regardsoss/store-utils'
import { ModelConfiguration } from '@regardsoss/api'
import ModelActions from './ModelActions'

class ModelReducers extends BasicListReducers {
  constructor() {
    super(ModelConfiguration, ModelActions)
  }
}

const instance = new ModelReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getModelReducer(state, action) {
  return instance.reduce(state, action)
}
