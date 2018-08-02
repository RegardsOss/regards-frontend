/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DialogRequestsActions from '../../../src/ui/dialog/DialogRequestsActions'
import getDialogRequestsReducer, { DialogRequestsReducer } from '../../../src/ui/dialog/DialogRequestsReducer'
import getDialogRequestsSelectors from '../../../src/ui/dialog/DialogRequestsSelectors'

const testActions = new DialogRequestsActions('tests')
const testReduce = getDialogRequestsReducer('tests')
const testSelectors = getDialogRequestsSelectors(['test', 'dialogRequest'])


const buildMockStore = (initState = DialogRequestsReducer.DEFAULT_STATE) => ({
  test: {
    dialogRequest: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReduce(store.test.dialogRequest, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[Client] Testing DialogRequestsSelectors', () => {
  it('should exists', () => {
    assert.isDefined(getDialogRequestsSelectors)
  })
  it('should select correctly state as it changes changes', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(testSelectors.getDialogState(fakeStore), DialogRequestsReducer.DEFAULT_STATE, 'Should selected initial state')
    assert.isFalse(testSelectors.isVisible(fakeStore), 'Should be initially hidden')
    assert.isNull(testSelectors.getParameters(fakeStore), 'Should have initially no parameter')
    assert.isNull(testSelectors.getConsumerID(fakeStore), 'Should initially no consumer ID')

    fakeStore = mockReduce(fakeStore, testActions.show({
      testP1: 'p1',
      values: [1],
    }, 'my-test-consumer'))
    assert.deepEqual(testSelectors.getDialogState(fakeStore), {
      visible: true,
      parameters: {
        testP1: 'p1',
        values: [1],
      },
      consumerID: 'my-test-consumer',
    }, 'Should selected correctly visible state')
    assert.isTrue(testSelectors.isVisible(fakeStore), 'Should be visible after show action')
    assert.deepEqual(testSelectors.getParameters(fakeStore), {
      testP1: 'p1',
      values: [1],
    }, 'Should retrieve parameters after show action')
    assert.equal(testSelectors.getConsumerID(fakeStore), 'my-test-consumer', 'Should retrieve consumer ID after show action')

    fakeStore = mockReduce(fakeStore, testActions.hide())
    assert.deepEqual(testSelectors.getDialogState(fakeStore), DialogRequestsReducer.DEFAULT_STATE, 'Should selected initial state after hide action')
    assert.isFalse(testSelectors.isVisible(fakeStore), 'Should be hidden after hide action')
    assert.isNull(testSelectors.getParameters(fakeStore), 'Should have no parameter after hide action')
    assert.isNull(testSelectors.getConsumerID(fakeStore), 'Should have no consumer ID after hide action')
  })
})
