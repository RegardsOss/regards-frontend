/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
