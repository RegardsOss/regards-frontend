/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import BasicPartitionReducers from '../../src/partition/BasicPartitionReducers'
import BasicPartitionActions from '../../src/partition/BasicPartitionActions'
import actionPayloadConverter from '../../src/partition/EntityListPartitionDataHandler'

const partitionActions = new BasicPartitionActions({
  namespace: 'test-partitions',
})

const partitionReducer = new BasicPartitionReducers(partitionActions, actionPayloadConverter('testList'))


describe('[STORE UTILS] Testing partition reducer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should return the initial state', () => {
    assert.deepEqual(partitionReducer.reduce(undefined, {}), {}, 'Reducer should return an empty initial state')
  })

  const checkLifecycleReduction = (testTitle, initialState, partitionKey) => {
    it(`should reduce loading data cycle for partition, incrementally - ${testTitle}`, () => {
      // 1 - loading
      let previousState = initialState
      let nextState = {
        ...initialState,
        [partitionKey]: {
          loading: true,
          hasError: false,
          error: null,
          data: null,
        },
      }
      assert.deepEqual(partitionReducer.reduce(previousState, partitionActions.onDataLoadingStart(partitionKey)), nextState,
        'Failed reducing loading start action')
      // 2 - loading done (check also that elements are extracted in action payload)
      previousState = nextState
      const itemsData = { someData: 'some list data' }
      const otherPayloadFields = { somePayload: 'some payload' }
      // compute next state layout with list items moved into items (see reducers data post treatment)
      nextState = {
        ...initialState,
        [partitionKey]: {
          loading: false,
          hasError: false,
          error: null,
          data: {
            items: itemsData,
            ...otherPayloadFields,
          },
        },
      }
      const doneAtion = partitionActions.onDataLoadingDone(partitionKey, {
        payload: {
          entities: {
            testList: itemsData,
          },
          ...otherPayloadFields,
        },
      })
      assert.deepEqual(partitionReducer.reduce(previousState, doneAtion), nextState,
        'Failed reducing loading done action')

      // 3 - loading failed (order independent)
      previousState = nextState
      const error = 'No choco today!'
      nextState = {
        ...initialState,
        [partitionKey]: {
          loading: false,
          hasError: true,
          error,
          data: null,
        },
      }
      assert.deepEqual(partitionReducer.reduce(previousState, partitionActions.onDataLoadingFailed(partitionKey, error)), nextState,
        'Failed reducing loading error action')
    })
  }

  const tests = [{
    testTitle: 'Simple test',
    partitionKey: 'testPartition1',
    initialState: {},
  }, {
    // checking that other partitions state is preserved
    testTitle: 'Test with other partitions',
    partitionKey: 'testPartition2',
    initialState: {
      testPartition0: {
        loading: true,
        hasError: false,
        error: null,
        data: null,
      },
      testPartition1: {
        loading: false,
        hasError: false,
        error: null,
        data: { anyData: 'any data' },
      },
    },
  }]

  tests.forEach(({ testTitle, partitionKey, initialState }) => checkLifecycleReduction(testTitle, initialState, partitionKey))
})
