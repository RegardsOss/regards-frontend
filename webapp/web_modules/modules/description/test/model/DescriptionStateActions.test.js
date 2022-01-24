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
import { DescriptionStateActions } from '../../src/model/DescriptionStateActions'
import { resolvedDataEntity, resolvedDatasetEntity } from '../dumps/resolved.dump'

const actions = new DescriptionStateActions('myNamespace')

const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

/**
 * Test DescriptionStateActions
 * @author Raphaël Mechali
 */
describe('[Description] Test DescriptionStateActions', () => {
  it('should dispatch set description path', () => {
    dispatchAndCheck(actions.setDescriptionPath([resolvedDataEntity, resolvedDatasetEntity]), {
      type: actions.SET_DESCRIPTION_PATH,
      descriptionPath: [resolvedDataEntity, resolvedDatasetEntity],
    }, buildMockStore({}))
  })
  it('should dispatch set tree selection', () => {
    const selection = { section: 'any', child: 1 }
    dispatchAndCheck(actions.setSelectedTreeEntry(0, selection), {
      type: actions.SET_SELECTED_TREE_ENTRY,
      entityIndex: 0,
      treeEntry: selection,
    }, buildMockStore({}))
  })
  it('should dispatch set tree visible', () => {
    dispatchAndCheck(actions.setBrowsingTreeVisible(false), {
      type: actions.SET_BROWSING_TREE_VISIBLE,
      browsingTreeVisible: false,
    }, buildMockStore({}))
  })
})
