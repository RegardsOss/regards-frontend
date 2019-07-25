/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
