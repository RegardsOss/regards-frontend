/**
* LICENSE_PLACEHOLDER
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
