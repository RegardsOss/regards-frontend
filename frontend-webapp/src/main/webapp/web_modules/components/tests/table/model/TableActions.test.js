/**
* LICENSE_PLACEHOLDER
**/
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { assert } from 'chai'
import TableActions from '../../../src/table/model/TableActions'
import TableSelectionModes from '../../../src/table/model/TableSelectionModes'


const tableActionsInstance = new TableActions('test')
const middlewares = [thunk]
const buildMockStore = configureStore(middlewares)

function dispatchAndCheck(action, expectedAction, store) {
  store.dispatch(action)
  assert.includeDeepMembers(store.getActions(), [expectedAction], `There shoud be the action in action store
  \tAction: ${JSON.stringify(expectedAction)}
  \tStore actions: ${JSON.stringify(store.getActions())}`)
}

describe('[Components] Test table actions', () => {
  it('It should dispatch selection state change', () => {
    let expectedAction = {
      type: tableActionsInstance.SET_SELECTION,
      selectionMode: TableSelectionModes.includeSelected,
      toggledElements: { 1: 'ouaich', 2: 'gros' },
    }
    dispatchAndCheck(tableActionsInstance.setSelection(TableSelectionModes.includeSelected, { 1: 'ouaich', 2: 'gros' }), expectedAction, buildMockStore({}))

    // also test shorthand methods
    expectedAction = {
      type: tableActionsInstance.SET_SELECTION,
      selectionMode: TableSelectionModes.excludeSelected,
      toggledElements: {},
    }
    dispatchAndCheck(tableActionsInstance.selectAll(), expectedAction, buildMockStore({}))

    expectedAction = {
      type: tableActionsInstance.SET_SELECTION,
      selectionMode: TableSelectionModes.includeSelected,
      toggledElements: {},
    }
    dispatchAndCheck(tableActionsInstance.unselectAll(), expectedAction, buildMockStore({}))
  })


  it('It should dispatch toggle element', () => {
    const expectedAction = {
      type: tableActionsInstance.TOGGLE_ELEMENT,
      rowIndex: 3,
      element: { id: 'IamanElement' },
    }
    dispatchAndCheck(tableActionsInstance.toggleElement(3, { id: 'IamanElement' }), expectedAction, buildMockStore({}))
  })
})
