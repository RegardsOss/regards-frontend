import { assert } from 'chai'
import { combineReducers } from 'redux'
import configureStore from '../src/configureStore'

describe('[STORE DATA MANAGEMENT] Testing configureStore', () => {
  it('should exists', () => {
    assert.isDefined(configureStore)
    assert.isFunction(configureStore)
  })

  it('should return a useable store', () => {
    // Initial store
    const rootReducer = combineReducers({
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
    })
    const store = configureStore(rootReducer)
    assert.isFunction(store.dispatch)
    assert.isFunction(store.subscribe)
    assert.isFunction(store.getState)
    assert.isFunction(store.replaceReducer)
  })
})
