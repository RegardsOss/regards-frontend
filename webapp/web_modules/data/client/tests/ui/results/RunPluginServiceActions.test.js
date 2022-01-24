/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RunPluginServiceActions from '../../../src/ui/results/RunPluginServiceActions'

const actions = new RunPluginServiceActions('test-namespace')
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
      type: actions.RUN_SERVICE,
      serviceRunModel: { id: 'I am a service' },
    }
    dispatchAndCheck(actions.runService({ id: 'I am a service' }), expectedAction, buildMockStore({}))
  })

  it('It should dispatch close service action', () => {
    const expectedAction = {
      type: actions.CLOSE_SERVICE,
    }
    dispatchAndCheck(actions.closeService(), expectedAction, buildMockStore({}))
  })
})
