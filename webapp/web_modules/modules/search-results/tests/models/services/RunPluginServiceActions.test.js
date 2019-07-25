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
