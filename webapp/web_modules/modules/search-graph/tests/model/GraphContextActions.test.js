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
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import graphContextActions from '../../src/model/graph/GraphContextActions'

const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Search Graph] Test GraphContextActions', () => {
  it('It should dispatch entity selection reset by level', () => {
    const expectedAction = {
      type: graphContextActions.ENTITY_SELECTED,
      levelIndex: 0,
      entity: null,
    }
    dispatchAndCheck(graphContextActions.selectEntity(0, null), expectedAction, buildMockStore({}))
  })

  it('It should dispatch entity selection by level', () => {
    const entity = {
      aField: 'aValue',
    }
    dispatchAndCheck(graphContextActions.selectEntity(99, entity), {
      type: graphContextActions.ENTITY_SELECTED,
      levelIndex: 99,
      entity,
    }, buildMockStore({}))
  })

  it('It should dispatch dataset attributes visible change event', () => dispatchAndCheck(graphContextActions.setDatasetAttributesVisible(true), {
    type: graphContextActions.SET_DATASET_ATTRIBUTES_VISIBLE,
    visible: true,
  }, buildMockStore({})))
})
