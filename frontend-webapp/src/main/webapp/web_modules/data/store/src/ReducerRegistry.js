/**
 * LICENSEPLACEHOLDER
 **/
import { forEach, keys, isEmpty } from 'lodash'
// Based on https://github.com/rackt/redux/issues/37#issue-85098222
/**
 * Registry to handle add of new dynamic reducers during application runtime
  */
class ReducerRegistry {
  constructor(initialReducers = {}) {
    this.reducers = { ...initialReducers }
    this.emitChange = null
  }
  register(newReducers) {
    const reducersToAdd = {}
    forEach(keys(newReducers), (key, idx) => {
      if (!this.reducers[key]) {
        reducersToAdd[key] = newReducers[key]
      } else {
        console.warn('Reducer already initialized for key', key)
      }
    })
    if (!isEmpty(reducersToAdd)) {
      this.reducers = { ...this.reducers, ...reducersToAdd }
      if (this.emitChange != null) {
        this.emitChange(this.getReducers())
      }
    } else {
      console.warn('No new reducers to initialize')
    }
  }
  getReducers() {
    return { ...this.reducers }
  }
  setChangeListener(listener) {
    if (this.emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this.emitChange = listener
  }
}

let reducerRegistryInstance = null

const getReducerRegistry = (reducers) => {
  if (reducerRegistryInstance === null) {
    reducerRegistryInstance = new ReducerRegistry(reducers)
  }
  return reducerRegistryInstance
}

export default getReducerRegistry
