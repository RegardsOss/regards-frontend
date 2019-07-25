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
import DeleteAIPOnAllStoragesDialogComponent from '../../../../src/components/aip/dialogs/DeleteAIPOnAllStoragesDialogComponent'
import { DeleteAIPOnAllStoragesDialogContainer } from '../../../../src/containers/aip/dialogs/DeleteAIPOnAllStoragesDialogContainer'
import styles from '../../../../src/styles'
import { storedAIP, deletedAIP } from '../../../dumps/AIPWithStorages.dump'

const context = buildTestContext(styles)

/**
 * Test DeleteAIPOnAllStoragesDialogContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing DeleteAIPOnAllStoragesDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteAIPOnAllStoragesDialogContainer)
  })
  it('should work correctly with inclusive selection', () => {
    const spiedDeleteSelected = {
      count: 0,
      toggleAIPs: null,
    }
    const spiedDeleteByQuery = {
      count: 0,
      currentFilters: null,
      toggleAIPs: null,
    }
    const props = {
      aipSelectionMode: TableSelectionModes.includeSelected,
      toggleAIPs: [storedAIP],
      currentFilters: { any: 'any' },
      onClose: () => {},
      onRefresh: () => {},
      sendDeleteSelectedAIPs: (toggleAIPs) => {
        spiedDeleteSelected.count += 1
        spiedDeleteSelected.toggleAIPs = toggleAIPs
        return new Promise(resolve => resolve(true))
      },
      sendDeleteAIPsByQuery: (currentFilters, toggleAIPs) => {
        spiedDeleteByQuery.count += 1
        spiedDeleteByQuery.toggleAIPs = toggleAIPs
        spiedDeleteByQuery.currentFilters = currentFilters
        return new Promise(resolve => resolve(true))
      },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnAllStoragesDialogContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteAIPOnAllStoragesDialogComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onDelete: enzymeWrapper.instance().onDelete,
      onClose: props.onClose,
    }, 'Component should define the expected properties')

    componentWrapper.props().onDelete()
    assert.equal(spiedDeleteByQuery.count, 0, ' Delete by query should not have been called')
    assert.equal(spiedDeleteSelected.count, 1, ' Delete by selection should should have been called')
    assert.equal(spiedDeleteSelected.toggleAIPs, props.toggleAIPs, 'Delete by selection should have been called for right selection')
  })
  it('should work correctly with query selection', () => {
    const spiedDeleteSelected = {
      count: 0,
      toggleAIPs: null,
    }
    const spiedDeleteByQuery = {
      count: 0,
      currentFilters: null,
      toggleAIPs: null,
    }
    const props = {
      aipSelectionMode: TableSelectionModes.excludeSelected,
      toggleAIPs: [storedAIP, deletedAIP],
      currentFilters: { any: 'any' },
      onClose: () => {},
      onRefresh: () => {},
      sendDeleteSelectedAIPs: (toggleAIPs) => {
        spiedDeleteSelected.count += 1
        spiedDeleteSelected.toggleAIPs = toggleAIPs
        return new Promise(resolve => resolve(true))
      },
      sendDeleteAIPsByQuery: (currentFilters, toggleAIPs) => {
        spiedDeleteByQuery.count += 1
        spiedDeleteByQuery.toggleAIPs = toggleAIPs
        spiedDeleteByQuery.currentFilters = currentFilters
        return new Promise(resolve => resolve(true))
      },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnAllStoragesDialogContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteAIPOnAllStoragesDialogComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      onDelete: enzymeWrapper.instance().onDelete,
      onClose: props.onClose,
    }, 'Component should define the expected properties')

    componentWrapper.props().onDelete()
    assert.equal(spiedDeleteSelected.count, 0, ' Delete by selection should not have been called')
    assert.equal(spiedDeleteByQuery.count, 1, ' Delete by query should should have been called')
    assert.equal(spiedDeleteByQuery.toggleAIPs, props.toggleAIPs, 'Delete by query should have been called with excluded elements')
    assert.equal(spiedDeleteByQuery.currentFilters, props.currentFilters, 'Delete by query should have been called with query parameters')
  })
})
