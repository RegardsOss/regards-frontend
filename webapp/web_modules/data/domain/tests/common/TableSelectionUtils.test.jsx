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
import { TableSelectionModes } from '@regardsoss/components'
import TableSelectionUtils from '../../common/TableSelectionUtils'

/**
 * Test TableSelectionUtils
 * @author Léo Mieulet
 */
describe('[Domain] Testing TableSelectionUtils', () => {
  it('should isSeveralEntitiesSelected be correct', () => {
    // testing A - includeSelected
    assert.isNotOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.includeSelected, []))
    assert.isNotOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.includeSelected, [{}]))
    assert.isOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.includeSelected, [{}, {}]))

    // testing B - excludeSelected
    assert.isNotOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.excludeSelected, [], { totalElements: 1 }))
    assert.isOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.excludeSelected, [], { totalElements: 2 }))
    assert.isNotOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.excludeSelected, [{}], { totalElements: 2 }))
    assert.isNotOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.excludeSelected, [{}, {}], { totalElements: 2 }))
    assert.isOk(TableSelectionUtils.isSeveralEntitiesSelected(TableSelectionModes.excludeSelected, [{}], { totalElements: 3 }))
  })
})
