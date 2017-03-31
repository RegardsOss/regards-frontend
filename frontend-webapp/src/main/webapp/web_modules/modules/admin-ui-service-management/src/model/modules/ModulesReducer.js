/**
 * LICENSE_PLACEHOLDER
 **/
import { BasicPageableReducers } from '@regardsoss/store-utils'
import { ModuleConfiguration } from '@regardsoss/api'
import ModulesActions from './ModulesActions'

/**
 * Redux store reducer for Module entities
 * @author Sébastien binda
 */
class ModulesReducer extends BasicPageableReducers {
  constructor() {
    super(ModuleConfiguration, ModulesActions)
  }

}

const instance = new ModulesReducer()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getModulesReducer = (state, action) => instance.reduce(state, action)

export default getModulesReducer
