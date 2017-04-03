/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LayoutConfiguration } from '@regardsoss/api'
import LayoutActions from './LayoutActions'

/**
 * Redux store reducers for Layout entities
 * @author Sébastien binda
 */
class LayoutReducer extends BasicPageableReducers {
  constructor() {
    super(LayoutConfiguration, LayoutActions)
  }

}

const instance = new LayoutReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
export default (state, action) => instance.reduce(state, action)
