import { assert } from 'chai'
import configureStore from '../src/configureStore'
import getReducerRegistry from '../src/ReducerRegistry'


describe('[STORE DATA MANAGEMENT] Testing configureStore and reducer registry', () => {
  it('should exists', () => {
    assert.isDefined(configureStore)
    assert.isFunction(configureStore)
  })

  it('should return a useable store', () => {
    // Initial store
    const rootReducer = {
      common(state = { item: {} }) {
        return state
      },
      portal(state = { item: {} }) {
        return state
      },
      admin(state = { item: {} }) {
        return state
      },
      user(state = { item: {} }) {
        return state
      },
    }
    const reducerRegistry = getReducerRegistry(rootReducer)
    const store = configureStore(reducerRegistry)
    assert.isFunction(store.dispatch)
    assert.isFunction(store.subscribe)
    assert.isFunction(store.getState)
    assert.isFunction(store.replaceReducer)
  })
})
