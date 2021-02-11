/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import BasicPartitionActions from '../../src/partition/BasicPartitionActions'

const testActions = new BasicPartitionActions({
  namespace: 'partitions-test',
})

describe('[STORE UTILS] Test partition actions', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('It should dispatch loading start for many partitions', () => {
    assert.deepEqual(testActions.onManyLoadingStart(['partitionA', 'partitionB']), {
      type: testActions.INITIALIZE_PARTITIONS,
      partitionKeys: ['partitionA', 'partitionB'],
    })
  })
  it('It should dispatch loading start', () => {
    assert.deepEqual(testActions.onDataLoadingStart('partition1'), {
      type: testActions.INITIALIZE_PARTITIONS,
      partitionKeys: ['partition1'],
    })
  })
  it('should dispatch a loading done action', () => {
    assert.deepEqual(testActions.onDataLoadingDone('partition1', { aValue: 'aValue' }), {
      type: testActions.DATA_LOADING_DONE,
      partitionKey: 'partition1',
      data: { aValue: 'aValue' },
    })
  })

  it('should dispatch a loading failed', () => {
    assert.deepEqual(testActions.onDataLoadingFailed('partition1', 'Any error'), {
      type: testActions.DATA_LOADING_FAILED,
      partitionKey: 'partition1',
      reason: 'Any error',
    })
  })
})
