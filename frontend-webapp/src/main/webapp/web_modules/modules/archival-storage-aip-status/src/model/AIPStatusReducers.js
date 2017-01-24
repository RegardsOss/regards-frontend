/**
 * LICENSE_PLACEHOLDER
 */
import { BasicListReducers } from '@regardsoss/store-utils'
import { AIPStatusConfiguration } from '@regardsoss/api'
import AIPStatusActions from './AIPStatusActions'

class AIPStatusReducers extends BasicListReducers {
  constructor() {
    super(AIPStatusConfiguration, AIPStatusActions)
  }
}

const instance = new AIPStatusReducers()
export default (state, action) => instance.reduce(state, action)
