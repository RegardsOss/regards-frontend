/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TAG_TYPES_ENUM } from '@regardsoss/domain/catalog'
import { Tag } from '../../../src/models/navigation/Tag'
import navigationContextActions from '../../../src/models/navigation/NavigationContextActions'


const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Search Results] Test navigation context actions', () => {
  it('It should dispatch state initialization (from URL)', () => {
    const tags = [new Tag(TAG_TYPES_ENUM.WORD, 'fries', 'fries')]
    const expectedAction = {
      type: navigationContextActions.INITIALIZE,
      viewObjectType: 'any1',
      displayMode: 'any2',
      initialLevels: [],
      tags,
    }
    dispatchAndCheck(navigationContextActions.initialize('any1', 'any2', [], tags), expectedAction, buildMockStore({}))
  })
  it('It should dispatch state initialization (externally driven)', () => {
    const initialTags = [new Tag(TAG_TYPES_ENUM.WORD, 'fries', 'fries')]
    const expectedAction = {
      type: navigationContextActions.INITIALIZE,
      viewObjectType: 'any1',
      displayMode: 'any2',
      initialLevels: initialTags,
      tags: [],
    }
    dispatchAndCheck(navigationContextActions.initialize('any1', 'any2', initialTags, []), expectedAction, buildMockStore({}))
  })

  it('It should dispatch search tag add', () => {
    const tag = new Tag(TAG_TYPES_ENUM.DATASET, 'The fries dataset', 'URN:ip1')
    const expectedAction = {
      type: navigationContextActions.ADD_SEARCH_TAG,
      tag,
    }
    dispatchAndCheck(navigationContextActions.addSearchTag(tag), expectedAction, buildMockStore({}))
  })


  it('It should dispatch view objects type changing', () => {
    const expectedAction = {
      type: navigationContextActions.CHANGE_VIEW_OBJECT_TYPE,
      viewObjectType: 'any-type',
    }
    dispatchAndCheck(navigationContextActions.changeViewObjectType('any-type'), expectedAction, buildMockStore({}))
  })

  it('It should dispatch level changing', () => {
    const expectedAction = {
      type: navigationContextActions.GOTO_LEVEL,
      levelIndex: 1,
    }
    dispatchAndCheck(navigationContextActions.gotoLevel(1), expectedAction, buildMockStore({}))
  })
})
