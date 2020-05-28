/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import BasicPartitionReducers from '../../src/partition/BasicPartitionReducers'
import BasicPartitionActions from '../../src/partition/BasicPartitionActions'

const testActions = new BasicPartitionActions({ namespace: 'test-partitions' })
const testReducer = new BasicPartitionReducers(testActions, num => num * 2)
const testReduce = (state, action) => testReducer.reduce(state, action)

describe('[STORE UTILS] Testing partition reducer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the initial state', () => {
    assert.deepEqual(testReduce(undefined, { type: 'anything' }), {})
  })
  it('should ignore non related actions', () => {
    assert.deepEqual(testReduce({},
      new BasicPartitionActions({ namespace: 'anything-else' }).onManyLoadingStart(['A', 'B'])), {})
  })
  /** Apply successive update and check reducer behaves correctly */
  const testCases = [{
    label: 'should initialize many partitions',
    action: testActions.onManyLoadingStart(['A', 'B', 'D']),
    expectedState: {
      A: {
        loading: true, hasError: false, error: null, data: null,
      },
      B: {
        loading: true, hasError: false, error: null, data: null,
      },
      D: {
        loading: true, hasError: false, error: null, data: null,
      },
    },
  }, {
    label: 'should initialize one partition',
    action: testActions.onDataLoadingStart('C'),
    expectedState: {
      A: {
        loading: true, hasError: false, error: null, data: null,
      },
      B: {
        loading: true, hasError: false, error: null, data: null,
      },
      C: {
        loading: true, hasError: false, error: null, data: null,
      },
      D: {
        loading: true, hasError: false, error: null, data: null,
      },
    },
  }, {
    label: 'should mark partition loaded, applying post treatment',
    action: testActions.onDataLoadingDone('B', 8),
    expectedState: {
      A: {
        loading: true, hasError: false, error: null, data: null,
      },
      B: {
        loading: false, hasError: false, error: null, data: 16,
      },
      C: {
        loading: true, hasError: false, error: null, data: null,
      },
      D: {
        loading: true, hasError: false, error: null, data: null,
      },
    },
  }, {
    label: 'should mark partition in error',
    action: testActions.onDataLoadingFailed('D', 'potatoes'),
    expectedState: {
      A: {
        loading: true, hasError: false, error: null, data: null,
      },
      B: {
        loading: false, hasError: false, error: null, data: 16,
      },
      C: {
        loading: true, hasError: false, error: null, data: null,
      },
      D: {
        loading: false, hasError: true, error: 'potatoes', data: null,
      },
    },
  }]
  let currentState = {}
  testCases.forEach(({ label, action, expectedState }) => it(label, () => {
    const nextState = testReduce(currentState, action)
    assert.deepEqual(nextState, expectedState)
    currentState = nextState
  }))
})
