import { BasicPageableReducers } from '@regardsoss/store-utils'
import PluginActions from './PluginActions'

class PluginReducers extends BasicPageableReducers {
  constructor() {
    //super(ProjectConfiguration, PluginActions)
  }

}

const instance = new PluginReducers()

/**
 * Return an function where the reducer instance exists
 * @param state redux previous state
 * @param action redux action received
 * @return new state
 */
const getPluginReducer = (state, action) => instance.reduce(state, action)

export default getPluginReducer
