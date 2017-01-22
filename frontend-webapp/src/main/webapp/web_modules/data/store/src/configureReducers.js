/**
 * LICENSE_PLACEHOLDER
 **/
import {combineReducers} from 'redux'

/**
 * Combine given reducers to be added in redux store
 * @param reducers
 * @returns {Reducer<S>}
 */
const configureReducers = (reducers) => {
  return combineReducers({
    ...reducers
  })
}
export default configureReducers
