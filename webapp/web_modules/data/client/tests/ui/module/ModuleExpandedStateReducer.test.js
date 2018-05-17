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
import { ModuleExpandedStateReducer, getModuleExpandedStateReducer } from '../../../src/ui/module/ModuleExpandedStateReducer'

const testActions = new ModuleExpandedStateActions('tests')
const testReduce = getModuleExpandedStateReducer('tests')


/**
 * Test ModuleExpandedStateReducer
 * @author Raphaël Mechali
 */
describe('[Client] Testing ModuleExpandedStateReducer', () => {
  it('should exists', () => {
    assert.isDefined(getModuleExpandedStateReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReduce(undefined, {})
    assert.deepEqual(initState, ModuleExpandedStateReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReduce(undefined, nonRelatedAction)
    assert.deepEqual(nextState, ModuleExpandedStateReducer.DEFAULT_STATE)
  })
  it('should reduce correctly initialize action', () => {
    let initAction = testActions.initialize('test1', false, true)
    let nextState = testReduce(undefined, initAction)
    assert.deepEqual(nextState, {
      test1: {
        expandable: false,
        state: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
      },
    }, 'Test 1 initialize action should be correctly reduced')
    initAction = testActions.initialize('test2', true, false)
    nextState = testReduce(nextState, initAction)
    assert.deepEqual(nextState, {
      test1: {
        expandable: false,
        state: UIDomain.PRESENTATION_STATE_ENUM.NORMAL,
      },
      test2: {
        expandable: true,
        state: UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED,
      },
    }, 'Test 2 initialize should be correctly reduced, not conflicting with test1 store part')
  })
  it('should reduce correctly change state actions', () => {
    // prepare a store with 2 modules
    let currentState = testReduce(
      testReduce(undefined, testActions.initialize('test1', true, true)),
      testActions.initialize('test2', true, false))
    // test collapsing the two modules
    let nextState = testReduce(currentState, testActions.setMinimized('test2'))
    assert.isTrue(nextState.test1.expandable, '(1) test1 component should be expandable')
    assert.equal(nextState.test1.state, UIDomain.PRESENTATION_STATE_ENUM.NORMAL, '(1) test1 component should be in normal state')
    assert.isTrue(nextState.test2.expandable, '(1) test2 component should be expandable')
    assert.equal(nextState.test2.state, UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED, '(1) test2 component should be minimized')

    currentState = nextState
    nextState = testReduce(currentState, testActions.setMaximized('test1'))
    assert.isTrue(nextState.test1.expandable, '(2) test1 component should be expandable')
    assert.equal(nextState.test1.state, UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED, '(2) test1 component should be maximized')
    assert.isTrue(nextState.test2.expandable, '(2) test2 component should be expandable')
    assert.equal(nextState.test2.state, UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED, '(2) test2 component should be minimized')

    currentState = nextState
    nextState = testReduce(currentState, testActions.setNormal('test1'))
    assert.isTrue(nextState.test1.expandable, '(3) test1 component should be expandable')
    assert.equal(nextState.test1.state, UIDomain.PRESENTATION_STATE_ENUM.NORMAL, '(3) test1 component should be in normal state')
    assert.isTrue(nextState.test2.expandable, '(3) test2 component should be expandable')
    assert.equal(nextState.test2.state, UIDomain.PRESENTATION_STATE_ENUM.MINIMIZED, '(3) test2 component should be minimized')
  })
})
