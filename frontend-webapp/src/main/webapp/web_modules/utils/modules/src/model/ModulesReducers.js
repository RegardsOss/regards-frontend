/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { combineReducers } from 'redux'
import AvailableModules from '../AvailableModules'

/**
 * Generate reducers for all available modules
 * @type {{}}
 */
const reducers = {}
forEach(AvailableModules, (module) => {
  // eslint-disable-next-line import/no-dynamic-require
  const moduleReducers = require(`@regardsoss/${module}/src/reducer.js`)
  forEach(moduleReducers, (reducer, key) => {
    reducers[`${module}.${key}`] = reducer
  })
})


export default combineReducers(reducers)
