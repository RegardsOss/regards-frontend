/**
 * LICENSE_PLACEHOLDER
 **/

// Based on https://github.com/rackt/redux/issues/37#issue-85098222
/**
 * Registry to handle add of new dynamic reducers during application runtime
  */
class ReducerRegistry {
  constructor(initialReducers = {}) {
    this._reducers = { ...initialReducers }
    this._emitChange = null
  }
  register(newReducers) {
    console.log('Registered reducers', this._reducers)
    console.log('Registering reducers', newReducers)
    this._reducers = { ...this._reducers, ...newReducers }
    if (this._emitChange != null) {
      this._emitChange(this.getReducers())
    }
  }
  getReducers() {
    return { ...this._reducers }
  }
  setChangeListener(listener) {
    if (this._emitChange != null) {
      throw new Error('Can only set the listener for a ReducerRegistry once.')
    }
    this._emitChange = listener
  }
}

let ReducerRegistryInstance = null

const getReducerRegistry = (reducers) => {
  console.log('Getting Registry', ReducerRegistryInstance)
  ReducerRegistryInstance ? ReducerRegistryInstance : ReducerRegistryInstance = new ReducerRegistry(reducers)
  return ReducerRegistryInstance
}

export default getReducerRegistry
