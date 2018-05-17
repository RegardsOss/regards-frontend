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
import { UIDomain } from '@regardsoss/domain'
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
    assert.isNotOk(testSelectors.getFullState(fakeStore, 'test1'), 'test1 element full state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.getPresentationState(fakeStore, 'test1'), 'test1 getPresentationState state should not yet be defined')
    assert.isNotOk(testSelectors.getFullState(fakeStore, 'test2'), 'test2 element full state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.getPresentationState(fakeStore, 'test2'), 'test2 getPresentationState state should not yet be defined')

    // init test1
    fakeStore = mockReduce(fakeStore, testActions.initialize('test1', false, true))
    assert.isOk(testSelectors.getFullState(fakeStore, 'test1'), 'test1 element state should now be defined')
    assert.isFalse(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 isExpandable should be false')
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test1'), UIDomain.PRESENTATION_STATE_ENUM.NORMAL, 'test1 should be in normal state')
    assert.isNotOk(testSelectors.getFullState(fakeStore, 'test2'), 'test2 element state should not yet be defined')
    assert.isNotOk(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable state should not yet be defined')
    assert.isNotOk(testSelectors.getPresentationState(fakeStore, 'test2'), 'test2 getPresentationState state should not yet be defined')

    // init test2
    fakeStore = mockReduce(fakeStore, testActions.initialize('test2', true, false))
    assert.isFalse(testSelectors.isExpandable(fakeStore, 'test1'), 'test1 should not have changed')
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test1'), UIDomain.PRESENTATION_STATE_ENUM.NORMAL, 'test1 state should not have changed')
    assert.isOk(testSelectors.getFullState(fakeStore, 'test2'), 'test2 element state should now be defined')
    assert.isTrue(testSelectors.isExpandable(fakeStore, 'test2'), 'test2 isExpandable should be true')
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test2'), UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED, 'test2 should be in minimized state')

    // maximize test 2
    fakeStore = mockReduce(fakeStore, testActions.setMaximized('test2'))
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test2'), UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED, 'test2 should be in maximized state')

    // collapse test 1
    fakeStore = mockReduce(fakeStore, testActions.setMinimized('test1'))
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test1'), UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED, 'test1 should be in minimized state')

    // expand back test 1
    fakeStore = mockReduce(fakeStore, testActions.setNormal('test1'))
    assert.equal(testSelectors.getPresentationState(fakeStore, 'test1'), UIDomain.PRESENTATION_STATE_ENUM.NORMAL, 'test1 should be back in normal state')
  })
})
