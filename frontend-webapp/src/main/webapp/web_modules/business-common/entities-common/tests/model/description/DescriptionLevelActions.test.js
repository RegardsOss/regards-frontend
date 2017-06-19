/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import DescriptionLevelActions from '../../../src/model/description/DescriptionLevelActions'


const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)
const descriptionLevelActions = new DescriptionLevelActions('test')

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Entities Common] Test description level actions', () => {
  it('It should dispatch show action', () => {
    const entity = 'jesuisuntest'
    const expectedAction = {
      type: descriptionLevelActions.SHOW,
      entity,
    }
    dispatchAndCheck(descriptionLevelActions.show(entity), expectedAction, buildMockStore({}))
  })

  it('It should dispatch show related entity action', () => {
    const entity = 'jesuisuntest2'
    const expectedAction = {
      type: descriptionLevelActions.SHOW_RELATED_ENTITY,
      entity,
    }
    dispatchAndCheck(descriptionLevelActions.showRelatedEntity(entity), expectedAction, buildMockStore({}))
  })

  it('It should dispatch jump to level action', () => {
    const expectedAction = {
      type: descriptionLevelActions.JUMP_TO_LEVEL,
      levelIndex: 2,
    }
    dispatchAndCheck(descriptionLevelActions.jumpToLevel(2), expectedAction, buildMockStore({}))
  })

  it('It should dispatch hide action', () => {
    const expectedAction = {
      type: descriptionLevelActions.HIDE,
    }
    dispatchAndCheck(descriptionLevelActions.hide(), expectedAction, buildMockStore({}))
  })
})
