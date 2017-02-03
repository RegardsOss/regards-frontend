/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { LayoutConfiguration } from '@regardsoss/api'
import LayoutActions from './LayoutActions'

/**
 * Redux store reducers for Layout entities
 * @author Sébastien binda
 */
class LayoutsReducer extends BasicListReducers {
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
