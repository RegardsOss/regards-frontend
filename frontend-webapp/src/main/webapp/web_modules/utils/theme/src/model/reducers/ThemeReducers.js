/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicListReducers } from '@regardsoss/store-utils'
import { ThemeConfiguration } from '@regardsoss/api'
import ThemeActions from '../actions/ThemeActions'

/**
 * Define CRUD reducers
 */
class ThemeReducers extends BasicListReducers {
  constructor() {
    super(ThemeConfiguration, ThemeActions)
  }
}
const instance = new ThemeReducers()
const reducers = (state, action) => instance.reduce(state, action)
export default reducers
