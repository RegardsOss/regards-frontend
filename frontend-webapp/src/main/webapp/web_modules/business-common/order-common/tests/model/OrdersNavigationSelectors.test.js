/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
import { OrdersNavigationActions } from '../../src/model/OrdersNavigationActions'
import { getOrdersNavigationReducer } from '../../src/model/OrdersNavigationReducer'
import { getOrdersNavigationSelectors } from '../../src/model/OrdersNavigationSelectors'

const actions = new OrdersNavigationActions('test.namespace')
const reduce = getOrdersNavigationReducer('test.namespace')
const selectors = getOrdersNavigationSelectors(['test.cool', 'veryCool'])

const buildMockStore = (initState = reduce(undefined, {})) => ({
  'test.cool': {
    veryCool: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store['test.cool'].veryCool, action))

describe('[Order Common] Test navigation selectors', () => {
  it('Should select correctly navigation path', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(selectors.getNavigationPath(fakeStore), [], 'Should return initial path')
    // select an order
    const fakeOrder = { restaurant: 'MacDonald\'s', menu: 'potatoes', ketchup: true }
    fakeStore = mockReduce(fakeStore, actions.selectOrder(fakeOrder))
    assert.deepEqual(selectors.getNavigationPath(fakeStore), [fakeOrder], 'Should return selected order in path')
    // select a dataset
    const fakeDataset = { table: 'Jimmy\'s 214', server: false }
    fakeStore = mockReduce(fakeStore, actions.selectDataset(fakeDataset))
    assert.deepEqual(selectors.getNavigationPath(fakeStore), [fakeOrder, fakeDataset], 'Should return selected order and dataset in path')
    // reset to level and reselect
    fakeStore = mockReduce(fakeStore, actions.resetToLevel(0))
    assert.deepEqual(selectors.getNavigationPath(fakeStore), [], 'Should return empty navigation path after resetting to level 0')
  })
})
