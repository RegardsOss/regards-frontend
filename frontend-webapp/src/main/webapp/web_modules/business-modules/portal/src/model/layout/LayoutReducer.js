/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { LayoutConfiguration } from '@regardsoss/api'
import LayoutActions from './LayoutActions'

/**
 * Redux store reducers for Layout entities
 * @author Sébastien Binda
 */
class LayoutsReducer extends BasicPageableReducers {
  constructor() {
    super(LayoutConfiguration, LayoutActions)
  }

}

const instance = new LayoutsReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getLayoutReducer = (state, action) => instance.reduce(state, action)

export default getLayoutReducer
