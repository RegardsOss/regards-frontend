/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
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
    const tags = [new Tag(TagTypes.WORD, 'fries', 'fries')]
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
    const initialTags = [new Tag(TagTypes.WORD, 'fries', 'fries')]
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
    const tag = new Tag(TagTypes.DATASET, 'The fries dataset', 'URN:ip1')
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
