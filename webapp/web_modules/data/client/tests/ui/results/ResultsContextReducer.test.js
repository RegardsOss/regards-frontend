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
import ResultsContextActions from '../../../src/ui/results/ResultsContextActions'
import getResultsContextReducer, { ResultsContextReducer } from '../../../src/ui/results/ResultsContextReducer'

const testActions = new ResultsContextActions('tests')
const testReduce = getResultsContextReducer('tests')

/**
 * Test SelectedDynamicModuleReducer
 * @author Raphaël Mechali
 */
describe('[Client] Testing ResultsContextReducer', () => {
  it('should exists', () => {
    assert.isDefined(getResultsContextReducer)
    assert.isDefined(ResultsContextReducer)
  })
  it('should initialize correctly', () => {
    const initState = testReduce(undefined, {})
    assert.deepEqual(initState, ResultsContextReducer.DEFAULT_STATE)
  })
  it('should ignore non related actions', () => {
    const nonRelatedAction = { type: 'IAmNotRelated' }
    const nextState = testReduce(undefined, nonRelatedAction)
    assert.deepEqual(nextState, ResultsContextReducer.DEFAULT_STATE)
  })
  it('should reduce correctly setContext action', () => {
    let nextState = testReduce(undefined, testActions.setContext('m1', { a: 'a', b: true }))
    assert.deepEqual(nextState, {
      m1: { a: 'a', b: true },
    })
    nextState = testReduce(nextState, testActions.setContext('m2', { a: 'b', b: false }))
    assert.deepEqual(nextState, {
      m1: { a: 'a', b: true },
      m2: { a: 'b', b: false },
    })
    nextState = testReduce(nextState, testActions.setContext('m1', { a: 'b', b: false }))
    assert.deepEqual(nextState, {
      m1: { a: 'b', b: false },
      m2: { a: 'b', b: false },
    })
  })
  it('should reduce correctly updateResultsContext action', () => {
    // set initial context
    let nextState = testReduce(undefined, testActions.setContext('m1', { a: 'a', b: true }))
    nextState = testReduce(nextState, testActions.setContext('m2', { a: 'b', b: false }))
    assert.deepEqual(nextState, {
      m1: { a: 'a', b: true },
      m2: { a: 'b', b: false },
    })
    // Update m1
    nextState = testReduce(nextState, testActions.updateResultsContext('m1', { b: false, c: { c1: 1, c2: ['x'], c3: 3 } }))
    assert.deepEqual(nextState, {
      m1: { a: 'a', b: false, c: { c1: 1, c2: ['x'], c3: 3 } },
      m2: { a: 'b', b: false },
    })
    // Update m1 (deep)
    nextState = testReduce(nextState, testActions.updateResultsContext('m1', { a: 'b', c: { c1: null, c2: ['y', 'z'] } }))
    assert.deepEqual(nextState, {
      m1: { a: 'b', b: false, c: { c1: null, c2: ['y', 'z'], c3: 3 } },
      m2: { a: 'b', b: false },
    })
    // Update m2
    nextState = testReduce(nextState, testActions.updateResultsContext('m2', { a: 'z', x: 18 }))
    assert.deepEqual(nextState, {
      m1: { a: 'b', b: false, c: { c1: null, c2: ['y', 'z'], c3: 3 } },
      m2: { a: 'z', b: false, x: 18 },
    })
  })
})
