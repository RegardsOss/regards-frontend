/**
* LICENSE_PLACEHOLDER
**/
import { assert } from 'chai'
import TableActions from '../../../src/table/model/TableActions'
import getTableReducer, { DEFAULT_STATE } from '../../../src/table/model/TableReducer'
import getTableSelectors from '../../../src/table/model/TableSelectors'
import TableSelectionModes from '../../../src/table/model/TableSelectionModes'

const tableActionsInstance = new TableActions('test')
const reduce = getTableReducer('test')
const tableSelectorsInstance = getTableSelectors(['test', 'table'])

const buildMockStore = (initState = DEFAULT_STATE) => ({
  test: {
    table: initState,
  },
})

const mockReduce = (store, action) => buildMockStore(reduce(store.test.table, action))

describe('[Components] Test table selectors', () => {
  it('Should select correctly the selection mode', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(tableSelectorsInstance.getSelectionMode(fakeStore), DEFAULT_STATE.selectionMode, 'Should return initial selection mode')
    fakeStore = mockReduce(fakeStore, tableActionsInstance.selectAll())
    assert.deepEqual(tableSelectorsInstance.getSelectionMode(fakeStore), TableSelectionModes.excludeSelected, 'Should return the updated selection mode')
  })

  it('Should select correctly the toggled elements', () => {
    let fakeStore = buildMockStore()
    assert.deepEqual(tableSelectorsInstance.getToggledElements(fakeStore), DEFAULT_STATE.toggledElements, 'Should return default toggled elements')

    fakeStore = mockReduce(fakeStore, tableActionsInstance.toggleElement(1, 'elt1'))
    fakeStore = mockReduce(fakeStore, tableActionsInstance.toggleElement(2, 'elt2'))
    assert.deepEqual(tableSelectorsInstance.getToggledElements(fakeStore), {
      1: 'elt1',
      2: 'elt2',
    })
  })
})
