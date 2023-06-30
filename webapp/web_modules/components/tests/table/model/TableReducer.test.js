/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TableSelectionModes from '../../../src/table/model/TableSelectionModes'

const tableActionsInstance = new TableActions('test')
const reduce = getTableReducer('test')

describe('[Component] Test table reducer', () => {
  it('should return the initial state', () => {
    assert.deepEqual(reduce(undefined, {}), DEFAULT_STATE, 'Reducer should return an empty initial state')
  })

  it('should ignore non related actions', () => {
    assert.deepEqual(reduce(DEFAULT_STATE, {
      type: 'anythingElse',
    }), DEFAULT_STATE, 'Reducer should ignore non related actions')
  })

  it('should reduce correctly the selection mode change', () => {
    assert.deepEqual(reduce(
      { selectionMode: TableSelectionModes.includeSelected, toggledElements: { 1: 'x', 2: 'y' } },
      tableActionsInstance.selectAll(),
    ), {
      selectionMode: TableSelectionModes.excludeSelected,
      toggledElements: {},
    }, 'reducer should clear selected element and switch the selection mode (1)')

    assert.deepEqual(reduce(
      {
        selectionMode: TableSelectionModes.excludeSelected,
        toggledElements: {},
      },
      tableActionsInstance.unselectAll(),
    ), {
      selectionMode: TableSelectionModes.includeSelected,
      toggledElements: {},
    }, 'reducer should switch the selection mode')
  })

  it('should reduce correctly toggle element', () => {
    assert.deepEqual(reduce(
      {
        selectionMode: TableSelectionModes.includeSelected,
        toggledElements: {},
      },
      tableActionsInstance.toggleElement(3, 'elt'),
    ), {
      selectionMode: TableSelectionModes.includeSelected,
      toggledElements: { 3: 'elt' },
    }, 'reducer should add the element to toggled dictionary')

    assert.deepEqual(reduce(
      {
        selectionMode: TableSelectionModes.excludeSelected,
        toggledElements: { 99: 'elt' },
      },
      tableActionsInstance.toggleElement(99, 'elt'),
    ), {
      selectionMode: TableSelectionModes.excludeSelected,
      toggledElements: {},
    }, 'reducer should add the element to toggled dictionary')
  })
})
