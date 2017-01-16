import { BasicArrayReducers } from '@regardsoss/store-utils'
import ControllerActions from './ControllerActions'

class ControllerReducers extends BasicArrayReducers {
  constructor() {
    super(ControllerActions)
  }
}

const instance = new ControllerReducers()
export default instance

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export function getControllerReducer(state, action) {
  return instance.reduce(state, action)
}
