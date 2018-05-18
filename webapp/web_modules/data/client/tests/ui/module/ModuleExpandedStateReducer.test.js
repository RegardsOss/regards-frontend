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
        expanded: true,
      },
    }, 'Test 1 initialize action should be correctly reduced')
    initAction = testActions.initialize('test2', true, false)
    nextState = testReduce(nextState, initAction)
    assert.deepEqual(nextState, {
      test1: {
        expandable: false,
        expanded: true,
      },
      test2: {
        expandable: true,
        expanded: false,
      },
    }, 'Test 2 initialize should be correctly reduced, not conflicting with test1 store part')
  })
  it('should reduce correctly expand state actions', () => {
    // prepare a store with 2 modules
    let currentState = testReduce(
      testReduce(undefined, testActions.initialize('test1', true, true)),
      testActions.initialize('test2', true, false))
    // test collapsing the two modules
    let nextState = testReduce(currentState, testActions.setExpanded('test2', false))
    assert.isTrue(nextState.test1.expandable)
    assert.isTrue(nextState.test1.expanded)
    assert.isTrue(nextState.test2.expandable)
    assert.isFalse(nextState.test2.expanded)

    currentState = nextState
    nextState = testReduce(currentState, testActions.setExpanded('test1', false))
    assert.isTrue(nextState.test1.expandable)
    assert.isFalse(nextState.test1.expanded)
    assert.isTrue(nextState.test2.expandable)
    assert.isFalse(nextState.test2.expanded)

    // test expanding them back
    currentState = nextState
    nextState = testReduce(
      testReduce(currentState, testActions.setExpanded('test1', true)),
      testActions.setExpanded('test2', true))
    assert.isTrue(nextState.test1.expandable)
    assert.isTrue(nextState.test1.expanded)
    assert.isTrue(nextState.test2.expandable)
    assert.isTrue(nextState.test2.expanded)
  })
})
