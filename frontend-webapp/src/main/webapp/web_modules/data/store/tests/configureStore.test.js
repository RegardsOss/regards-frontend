import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import configureStore from '../src/configureStore'
import { combineReducers } from 'redux'

describe('[STORE DATA MANAGEMENT] Testing configureStore', () => {
  it('should exists', () => {
    assert.isDefined(configureStore)
    assert.isFunction(configureStore)
  })

  it('should return a useable store', () => {
    // Initial store
    const rootReducer = combineReducers({
      common(state = { item: {} }, action) {
        return state
      },
      portal(state = { item: {} }, action) {
        return state
      },
      admin(state = { item: {} }, action) {
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
