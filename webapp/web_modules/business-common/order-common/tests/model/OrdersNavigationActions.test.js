/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { OrdersNavigationActions } from '../../src/model/OrdersNavigationActions'

const actions = new OrdersNavigationActions()

const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Order Common] Test navigation actions', () => {
  it('should dispatch an order selection', () => {
    const potatoesOrder = { potatoes: 'O YEAH!' }
    dispatchAndCheck(actions.selectOrder(potatoesOrder), {
      type: actions.SELECT_ORDER,
      order: potatoesOrder,
    }, buildMockStore({}))
  })

  it('should dispatch a dataset selection', () => {
    const potatoesDataset = { potatoes: 'O YEAH!' }
    dispatchAndCheck(actions.selectDataset(potatoesDataset), {
      type: actions.SELECT_DATASET,
      dataset: potatoesDataset,
    }, buildMockStore({}))
  })

  it('should dispatch a reset level', () => {
    dispatchAndCheck(actions.resetToLevel(9915), {
      type: actions.RESET_TO_LEVEL,
      level: 9915,
    }, buildMockStore({}))
  })
})
