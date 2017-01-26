/**
 * LICENSE_PLACEHOLDER
 */
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { AIPStatusConfiguration } from '@regardsoss/api'
import AIPStatusActions from './AIPStatusActions'

class AIPStatusReducers extends BasicPageableReducers {
  constructor() {
    super(AIPStatusConfiguration, AIPStatusActions)
  }
}

const instance = new AIPStatusReducers()
/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
