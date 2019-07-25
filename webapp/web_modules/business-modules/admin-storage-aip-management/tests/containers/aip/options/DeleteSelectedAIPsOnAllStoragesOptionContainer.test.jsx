/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableSelectionModes } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteSelectedAIPsOnAllStoragesComponent from '../../../../src/components/aip/options/DeleteSelectedAIPsOnAllStoragesOptionComponent'
import { DeleteSelectedAIPsOnAllStoragesOptionContainer } from '../../../../src/containers/aip/options/DeleteSelectedAIPsOnAllStoragesOptionContainer'
import styles from '../../../../src/styles'
import { storedAIP, deletedAIP } from '../../../dumps/AIPWithStorages.dump'

const context = buildTestContext(styles)

/**
 * Test DeleteSelectedAIPsOnAllStoragesOptionContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing DeleteSelectedAIPsOnAllStoragesOptionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteSelectedAIPsOnAllStoragesOptionContainer)
  })
  it('should render correctly, disabling when not available', () => {
    const props = {
      onDelete: () => {},
      toggledAIPs: [],
      selectionMode: TableSelectionModes.includeSelected,
      canDelete: false,
    }
    const enzymeWrapper = shallow(<DeleteSelectedAIPsOnAllStoragesOptionContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteSelectedAIPsOnAllStoragesComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: true,
      onDelete: enzymeWrapper.instance().onDelete,
    })
  })
  it('should invoke callback correctly', () => {
    const spiedDelete = {
      count: 0,
      selectionMode: null,
      toggledAIPs: null,
    }
    const props = {
      onDelete: (selectionMode, toggledAIPs) => {
        spiedDelete.count += 1
        spiedDelete.selectionMode = selectionMode
        spiedDelete.toggledAIPs = toggledAIPs
      },
      toggledAIPs: [storedAIP],
      selectionMode: TableSelectionModes.includeSelected,
      canDelete: true,
    }
    const enzymeWrapper = shallow(<DeleteSelectedAIPsOnAllStoragesOptionContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteSelectedAIPsOnAllStoragesComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      disabled: false,
      onDelete: enzymeWrapper.instance().onDelete,
    })
    assert.equal(spiedDelete.count, 0, 'Callback should not have been invoked yet')
    componentWrapper.props().onDelete()
    assert.equal(spiedDelete.count, 1, 'Callback should have been called')
    assert.deepEqual(spiedDelete.selectionMode, props.selectionMode, 'Callback should have been called')
    assert.deepEqual(spiedDelete.toggledAIPs, props.toggledAIPs, 'Callback should have been called')
  })
  it('should compute disabled state correctly', () => {
    // 1 - HatOAS link
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.hasLink([]))
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.hasLink([{ rel: 'anything1' }, { rel: 'anything2' }]))
    assert.isTrue(DeleteSelectedAIPsOnAllStoragesOptionContainer.hasLink(
      [{ rel: DeleteSelectedAIPsOnAllStoragesOptionContainer.LINK }, { rel: 'anything2' }]))
    // 2 - Selection:
    // A - Fetching should always return an empty selection state
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [storedAIP], { totalElements: 5 }, true))
    assert.isTrue(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [storedAIP], { totalElements: 5 }, false))
    // B - No data should always return empty selection state
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [storedAIP], { totalElements: 0 }, false))
    assert.isTrue(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [storedAIP], { totalElements: 2 }, false))
    // C - Inclusive selection
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [], {}, false))
    assert.isTrue(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.includeSelected,
      [storedAIP, deletedAIP], { totalElements: 2 }, false))
    // D - exlusive selection
    assert.isFalse(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.excludeSelected,
      [deletedAIP, storedAIP], { totalElements: 2 }, false)) // all selected
    assert.isTrue(DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(TableSelectionModes.excludeSelected,
      [storedAIP], { totalElements: 2 }, false))
  })
})
