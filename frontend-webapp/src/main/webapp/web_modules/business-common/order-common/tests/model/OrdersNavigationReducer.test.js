/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { OrdersNavigationActions } from '../../src/model/OrdersNavigationActions'
import { getOrdersNavigationReducer, OrdersNavigationReducer } from '../../src/model/OrdersNavigationReducer'

const actions = new OrdersNavigationActions('test.namespace')
const reduce = getOrdersNavigationReducer('test.namespace')

describe('[Order Common] Test navigation reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), OrdersNavigationReducer.DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non realted actions', () => {
    assert.deepEqual(reduce(OrdersNavigationReducer.DEFAULT_STATE, {
      type: 'anythingElse',
    }), OrdersNavigationReducer.DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('Should reduce successive navigations consistently ', () => {
    // 1 - select an order
    const mockedOrder = { potatoes: 'orderPotatoes' }
    let currentState = OrdersNavigationReducer.DEFAULT_STATE
    let reduced = reduce(currentState, actions.selectOrder(mockedOrder))
    let nextState = { navigationPath: [mockedOrder] }
    assert.deepEqual(reduced, nextState, 'First level selection should be correctly reduced')
    // 2 - select a dataset
    const mockedDataset = { ketchup: 'nope' }
    currentState = reduced
    nextState = { navigationPath: [mockedOrder, mockedDataset] }
    reduced = reduce(currentState, actions.selectDataset(mockedDataset))
    assert.deepEqual(reduced, nextState, 'second level selection should be correctly reduced')

    // 3 - reset to level 1
    currentState = reduced
    nextState = { navigationPath: [mockedOrder] }
    reduced = reduce(currentState, actions.resetToLevel(1))
    assert.deepEqual(reduced, nextState, 'reset to level 1 should be correctly reduced')

    // 4 - reset to level 0
    currentState = reduced
    nextState = { navigationPath: [] }
    reduced = reduce(currentState, actions.resetToLevel(0))
    assert.deepEqual(reduced, nextState, 'reset to level 0 should be correctly reduced')
  })
})
