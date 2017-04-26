/**
* LICENSE_PLACEHOLDER
**/
import { BasicSignalReducers } from '@regardsoss/store-utils'

/**
 * Reducer closure in actions context
 */
const getReduceMethod = (downloadDescriptionActions) => {
  // stored actions instance in context
  const reducerInstance = new BasicSignalReducers(downloadDescriptionActions)
  // return reduce method
  return (state, action) => reducerInstance.reduce(state, action)
}

export default getReduceMethod
