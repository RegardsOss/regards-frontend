/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import datasetServicesActions from '../../../src/models/services/RunPluginServiceActions'


const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Search Results] Test RunPluginServiceActions', () => {
  it('It should dispatch run service action', () => {
    const expectedAction = {
      type: datasetServicesActions.RUN_SERVICE,
      serviceRunModel: { id: 'I am a service' },
    }
    dispatchAndCheck(datasetServicesActions.runService({ id: 'I am a service' }), expectedAction, buildMockStore({}))
  })

  it('It should dispatch close service action', () => {
    const expectedAction = {
      type: datasetServicesActions.CLOSE_SERVICE,
    }
    dispatchAndCheck(datasetServicesActions.closeService(), expectedAction, buildMockStore({}))
  })
})
