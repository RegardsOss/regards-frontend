/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import BasicPartitionActions from '../../src/partition/BasicPartitionActions'


const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

const partitionActions = new BasicPartitionActions({
  namespace: 'partitions-test',
})

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[STORE UTILS] Test partition actions', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('It should dispatch loading start', () => {
    const expectedAction = {
      type: partitionActions.DATA_LOADING_START,
      partitionKey: 'partition1',
    }
    dispatchAndCheck(partitionActions.onDataLoadingStart('partition1'), expectedAction, buildMockStore({}))
  })

  it('should dispatch a loading done action', () => {
    const expectedAction = {
      type: partitionActions.DATA_LOADING_DONE,
      partitionKey: 'partition1',
      data: { aValue: 'aValue' },
    }
    dispatchAndCheck(partitionActions.onDataLoadingDone('partition1', { aValue: 'aValue' }), expectedAction, buildMockStore({}))
  })

  it('should dispatch a loading failed', () => {
    const expectedAction = {
      type: partitionActions.DATA_LOADING_FAILED,
      partitionKey: 'partition1',
      reason: 'Any error',
    }
    dispatchAndCheck(partitionActions.onDataLoadingFailed('partition1', 'Any error'), expectedAction, buildMockStore({}))
  })
})
