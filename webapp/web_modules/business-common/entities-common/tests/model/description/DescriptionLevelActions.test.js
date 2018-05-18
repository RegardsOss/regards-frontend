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
      tab: DescriptionLevelActions.TABS_ENUM.DESCRIPTION,
      entity,
    }
    dispatchAndCheck(descriptionLevelActions.show(entity, DescriptionLevelActions.TABS_ENUM.DESCRIPTION), expectedAction, buildMockStore({}))
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


  it('It should dispatch change tab action', () => {
    const expectedAction = {
      type: descriptionLevelActions.CHANGE_TAB,
      tab: DescriptionLevelActions.TABS_ENUM.PROPERTIES,
    }
    dispatchAndCheck(descriptionLevelActions.changeTab(DescriptionLevelActions.TABS_ENUM.PROPERTIES), expectedAction, buildMockStore({}))
  })
})
