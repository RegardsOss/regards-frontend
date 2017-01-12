/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { PluginConfiguration } from '@regardsoss/api'
import CriterionActions from './CriterionActions'

/**
 * Redux store reducer for Module entities
 */
class CriterionReducer extends BasicPageableReducers {
  constructor() {
    super(PluginConfiguration, CriterionActions)
  }

}

const instance = new CriterionReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getCriterionReducer = (state, action) => instance.reduce(state, action)

export default getCriterionReducer
