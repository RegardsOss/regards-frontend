/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import { TagTypes } from '@regardsoss/domain/catalog'
import graphContextActions from '../../src/model/graph/GraphContextActions'


const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Search Graph] Test graph context actions', () => {
  it('It should dispatch selection reset by level', () => {
    const expectedAction = {
      type: graphContextActions.ENTITY_SELECTED,
      levelIndex: 0,
      entity: null,
    }
    dispatchAndCheck(graphContextActions.selectEntity(0, null), expectedAction, buildMockStore({}))
  })

  it('It should dispatch object selection by level', () => {
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

  it('It should dispatch module collapsed change event', () => {
    dispatchAndCheck(graphContextActions.setModuleCollapsed(false), {
      type: graphContextActions.SET_MODULE_COLLAPSED,
      collapsed: false,
    }, buildMockStore({}))
  })

  it('It should dispatch set search tag event', () => {
    dispatchAndCheck(graphContextActions.setSearchTag({ type: TagTypes.WORD, data: 'xxx' }), {
      type: graphContextActions.SET_SEARCH_TAG,
      searchTag: {
        type: TagTypes.WORD,
        data: 'xxx',
      },
    }, buildMockStore({}))
  })
})
