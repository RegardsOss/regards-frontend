/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { assert } from 'chai'
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
