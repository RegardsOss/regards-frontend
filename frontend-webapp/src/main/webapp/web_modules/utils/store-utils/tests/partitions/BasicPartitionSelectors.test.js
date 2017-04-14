/**
* LICENSE_PLACEHOLDER
**/
import forEach from 'lodash/forEach'
import { assert } from 'chai'
import BasicPartitionSelectors from '../../src/partition/BasicPartitionSelectors'
import BasicPartitionReducers from '../../src/partition/BasicPartitionReducers'
import BasicPartitionActions from '../../src/partition/BasicPartitionActions'

describe('[STORE UTILS] Testing partition selectors', () => {
  // 1 - we create here a mock reduced objects with some partitions and there expected state from selector
  const partitionActions = new BasicPartitionActions({ namespace: 'test' })
  const partitions = {
    // loading partition
    p1: {
      key: 'testPartition1',
      expected: {
        loading: true,
        hasError: false,
        error: null,
        data: null,
      },
    },
    // loaded partition
    p2: {
      key: 'testPartition2',
      expected: {
        loading: false,
        hasError: false,
        error: null,
        data: {
          someData: 'some data',
        },
      },
    },
    // in error partition
    p3: {
      key: 'testPartition3',
      expected: {
        loading: false,
        hasError: true,
        error: 'Arg I am so hangry, I want chocos!',
        data: null,
      },
    },
    // undefined partition
    p4: {
      key: 'testPartition4',
      expected: {
        loading: false,
        hasError: false,
        error: null,
        data: null,
      },
    },
  }

  // reduce all partitions actions (no post treatment on data)
  const partitionReducers = new BasicPartitionReducers(partitionActions)
  const localPartitionState = [
    // p1: loading
    partitionActions.onDataLoadingStart(partitions.p1.key),
    // p2: loading done
    partitionActions.onDataLoadingDone(partitions.p2.key, partitions.p2.expected.data),
    // p3: loading failed
    partitionActions.onDataLoadingFailed(partitions.p3.key, partitions.p3.expected.error),
    // p4 is left undefined

  ].reduce((state, action) => partitionReducers.reduce(state, action), {})

  // set up the fake store
  const fakeStore = {
    test: {
      data: {
        testPartitions: localPartitionState,
      },
    },
  }

  // 2 - select every values from partitions and compare them with expected state
  const partitionSelectors = new BasicPartitionSelectors(['test', 'data', 'testPartitions'])
  forEach(partitions, ({ key, expected }) => {
    // test expected partition data
    it(`should return the correct value for partition "${key}"`, () => {
      assert.deepEqual(partitionSelectors.getPartition(fakeStore, key), expected, `Failed selecting partition "${key}"`)
    })

    it(`should return the correct value for partition "${key}" > loading`, () => {
      assert.deepEqual(partitionSelectors.isLoading(fakeStore, key), expected.loading, `Failed selecting partition "${key}"`)
    })
    it(`should return the correct value for partition "${key}" > hasError`, () => {
      assert.deepEqual(partitionSelectors.hasError(fakeStore, key), expected.hasError, `Failed selecting partition "${key}"`)
    })
    it(`should return the correct value for partition "${key}" > error`, () => {
      assert.deepEqual(partitionSelectors.getError(fakeStore, key), expected.error, `Failed selecting partition "${key}"`)
    })
    it(`should return the correct value for partition "${key}" > data`, () => {
      assert.deepEqual(partitionSelectors.getData(fakeStore, key), expected.data, `Failed selecting partition "${key}"`)
    })
  })
})
