/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { ModuleExpandedStateActions } from '../../../src/ui/module/ModuleExpandedStateActions'
import { getModuleExpandedStateReducer, ModuleExpandedStateReducer } from '../../../src/ui/module/ModuleExpandedStateReducer'
import { ModuleExpandedStateSelectors, getModuleExpandedStateSelectors } from '../../../src/ui/module/ModuleExpandedStateSelectors'

const testActions = new ModuleExpandedStateActions('tests')
const testReduce = getModuleExpandedStateReducer('tests')
const testSelectors = getModuleExpandedStateSelectors(['test', 'expandedState'])


const buildMockStore = (initState = ModuleExpandedStateReducer.DEFAULT_STATE) => ({
  test: {
    expandedState: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(testReduce(store.test.expandedState, action))

/**
 * Test ModuleExpandedStateSelectors
 * @author Raphaël Mechali
 */
describe('[Client] Testing ModuleExpandedStateSelectors', () => {
  it('should exists', () => {
    assert.isDefined(ModuleExpandedStateSelectors)
    assert.isDefined(getModuleExpandedStateSelectors)
  })
  it('should select correctly expandable and expanded states as it changes', () => {
    let fakeStore = buildMockStore()
    assert.isNotOk(testSelectors.getExpandState(fakeStore, 'test1'), 'test1 element state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.isExpanded(fakeStore, 'test1'), 'test1 isExpanded state should not yet be defined')
    assert.isNotOk(testSelectors.getExpandState(fakeStore, 'test2'), 'test2 element state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.isExpanded(fakeStore, 'test2'), 'test2 isExpanded state should not yet be defined')

    // init test1
    fakeStore = mockReduce(fakeStore, testActions.initialize('test1', false, true))
    assert.isOk(testSelectors.getExpandState(fakeStore, 'test1'), 'test1 element state should now be defined')
    assert.isFalse(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 isExpandable should be false')
    assert.isTrue(testSelectors.isExpanded(fakeStore, 'test1'), 'test1 isExpanded should be true')
    assert.isNotOk(testSelectors.getExpandState(fakeStore, 'test2'), 'test2 element state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.isExpanded(fakeStore, 'test2'), 'test2 isExpanded state should not yet be defined')

    // init test2
    fakeStore = mockReduce(fakeStore, testActions.initialize('test2', true, false))
    assert.isFalse(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 should not have changed')
    assert.isTrue(testSelectors.isExpanded(fakeStore, 'test1'), 'test1 should not have changed')
    assert.isOk(testSelectors.getExpandState(fakeStore, 'test2'), 'test2 element state should now be defined')
    assert.isTrue(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable should be true')
    assert.isFalse(testSelectors.isExpanded(fakeStore, 'test2'), 'test2 isExpanded show be false')

    // expand test 2
    fakeStore = mockReduce(fakeStore, testActions.setExpanded('test2', true))
    assert.isTrue(testSelectors.isExpanded(fakeStore, 'test2'), 'test2 show now be expanded')

    // collapse test 1 (should be refused due to not expandable state)
    fakeStore = mockReduce(fakeStore, testActions.setExpanded('test1', false))
    assert.isTrue(testSelectors.isExpanded(fakeStore, 'test1'), 'test1 show not be collapsed')
  })
})
