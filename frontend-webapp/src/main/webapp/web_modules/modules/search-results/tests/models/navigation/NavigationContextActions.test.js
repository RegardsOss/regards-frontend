/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
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
    const expectedAction = {
      type: navigationContextActions.INITIALIZE,
      viewObjectType: 'any1',
      initialContextLabel: 'any2',
      searchTag: 'any3',
      dataset: 'any4',
    }
    dispatchAndCheck(navigationContextActions.initialize('any1', 'any2', 'any3', 'any4'), expectedAction, buildMockStore({}))
  })

  it('It should dispatch dataset changing', () => {
    const dataset = {
      content: {
        ipId: 'anIPID',
        label: 'aLabel',
      },
    }
    const expectedAction = {
      type: navigationContextActions.CHANGE_DATASET,
      dataset,
    }
    dispatchAndCheck(navigationContextActions.changeDataset(dataset), expectedAction, buildMockStore({}))
  })

  it('It should dispatch search tag changing', () => {
    const expectedAction = {
      type: navigationContextActions.CHANGE_SEARCH_TAG,
      searchTag: 'hello there!',
    }
    dispatchAndCheck(navigationContextActions.changeSearchTag('hello there!'), expectedAction, buildMockStore({}))
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
