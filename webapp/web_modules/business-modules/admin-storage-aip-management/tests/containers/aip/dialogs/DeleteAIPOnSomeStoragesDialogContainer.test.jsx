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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableSelectionModes } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteAIPOnSomeStoragesDialogComponent from '../../../../src/components/aip/dialogs/DeleteAIPOnSomeStoragesDialogComponent'
import ConfirmDeleteOnSomeStoragesDialogComponent from '../../../../src/components/aip/dialogs/ConfirmDeleteOnSomeStoragesDialogComponent'
import { DeleteAIPOnSomeStoragesDialogContainer } from '../../../../src/containers/aip/dialogs/DeleteAIPOnSomeStoragesDialogContainer'
import styles from '../../../../src/styles'
import { storedAIP, deletedAIP } from '../../../dumps/AIPWithStorages.dump'
import { storage1, storage2 } from '../../../dumps/DataStorages.dump'

const context = buildTestContext(styles)

/**
 * Test DeleteAIPOnSomeStoragesDialogContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing DeleteAIPOnSomeStoragesDialogContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteAIPOnSomeStoragesDialogContainer)
  })
  it('should sort storages and manage data storage selection', () => {
    const props = {
      aipSelectionMode: TableSelectionModes.includeSelected,
      toggleAIPs: [storedAIP],
      appliedFilters: { any: 'any' },
      dataStorages: [storage2, storage1],
      onClose: () => {},
      onRefresh: () => {},
      sendDeleteSelectedAIPs: () => { },
      sendDeleteAIPsByQuery: () => { },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnSomeStoragesDialogContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      storagesSelectionModel: [{ selected: false, storage: storage1 }, { selected: false, storage: storage2 }], // alpha sorting
      canDelete: false,
      onToggleStorage: enzymeWrapper.instance().onToggleStorage,
      onConfirmDelete: enzymeWrapper.instance().onConfirmSelection,
      onClose: props.onClose,
    }, 'Component should define the expected properties')
    // select model 2
    enzymeWrapper.instance().onToggleStorage(1)
    enzymeWrapper.update()
    componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canDelete: true,
      storagesSelectionModel: [{ selected: false, storage: storage1 }, { selected: true, storage: storage2 }],
    })
    // select model 1
    enzymeWrapper.instance().onToggleStorage(0)
    enzymeWrapper.update()
    componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canDelete: false, // cannot delete when all are selected
      storagesSelectionModel: [{ selected: true, storage: storage1 }, { selected: true, storage: storage2 }],
    })
    // unselect both
    enzymeWrapper.instance().onToggleStorage(0)
    enzymeWrapper.instance().onToggleStorage(1)
    enzymeWrapper.update()
    componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      canDelete: false,
      storagesSelectionModel: [{ selected: false, storage: storage1 }, { selected: false, storage: storage2 }],
    })
  })
  it('should work correctly with inclusive selection', () => {
    const spiedDeleteSelected = {
      count: 0,
      toggleAIPs: null,
      dataStorages: null,
    }
    const spiedDeleteByQuery = {
      count: 0,
      currentFilters: null,
      toggleAIPs: null,
      dataStorages: null,
    }
    const props = {
      aipSelectionMode: TableSelectionModes.includeSelected,
      toggleAIPs: [storedAIP],
      currentFilters: { any: 'any' },
      dataStorages: [storage2, storage1],
      onClose: () => {},
      onRefresh: () => {},
      sendDeleteSelectedAIPs: (toggleAIPs, dataStorages) => {
        spiedDeleteSelected.count += 1
        spiedDeleteSelected.toggleAIPs = toggleAIPs
        spiedDeleteSelected.dataStorages = dataStorages
        return new Promise(resolve => resolve(true))
      },
      sendDeleteAIPsByQuery: (currentFilters, toggleAIPs, dataStorages) => {
        spiedDeleteByQuery.count += 1
        spiedDeleteByQuery.toggleAIPs = toggleAIPs
        spiedDeleteByQuery.currentFilters = currentFilters
        spiedDeleteByQuery.dataStorages = dataStorages
        return new Promise(resolve => resolve(true))
      },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnSomeStoragesDialogContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      storagesSelectionModel: [{ selected: false, storage: storage1 }, { selected: false, storage: storage2 }], // alpha sorting
      canDelete: false,
      onToggleStorage: enzymeWrapper.instance().onToggleStorage,
      onConfirmDelete: enzymeWrapper.instance().onConfirmSelection,
      onClose: props.onClose,
    }, 'Component should define the expected properties')
    // toggle storage 1 and send delete selection
    enzymeWrapper.instance().onToggleStorage(0)
    enzymeWrapper.update()
    componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    componentWrapper.props().onConfirmDelete()
    // Now, the confirmation dialog should be shown
    enzymeWrapper.update()
    assert.lengthOf(enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent), 0, 'Selection dialog should be hidden')
    const confirmationWrapper = enzymeWrapper.find(ConfirmDeleteOnSomeStoragesDialogComponent)
    assert.lengthOf(confirmationWrapper, 1, 'Confirmation dialog should be shown')
    testSuiteHelpers.assertWrapperProperties(confirmationWrapper, {
      selectedStorages: [storage1],
      onConfirm: enzymeWrapper.instance().onDelete,
      onCancel: props.onClose,
    })
    // Finally test delete callback
    confirmationWrapper.props().onConfirm()
    assert.equal(spiedDeleteByQuery.count, 0, ' Delete by query should not have been called')
    assert.equal(spiedDeleteSelected.count, 1, ' Delete by selection should should have been called')
    assert.equal(spiedDeleteSelected.toggleAIPs, props.toggleAIPs, 'Delete by selection should have been called with excluded elements')
    assert.deepEqual(spiedDeleteSelected.dataStorages, [storage1], 'Delete by selection should have been called  with selected data storages')
  })
  it('should work correctly with query selection', () => {
    const spiedDeleteSelected = {
      count: 0,
      toggleAIPs: null,
      dataStorages: null,
    }
    const spiedDeleteByQuery = {
      count: 0,
      currentFilters: null,
      toggleAIPs: null,
      dataStorages: null,
    }
    const props = {
      aipSelectionMode: TableSelectionModes.excludeSelected,
      toggleAIPs: [storedAIP, deletedAIP],
      currentFilters: { any: 'any' },
      dataStorages: [storage2, storage1],
      onClose: () => {},
      onRefresh: () => {},
      sendDeleteSelectedAIPs: (toggleAIPs, dataStorages) => {
        spiedDeleteSelected.count += 1
        spiedDeleteSelected.toggleAIPs = toggleAIPs
        spiedDeleteSelected.dataStorages = dataStorages
        return new Promise(resolve => resolve(true))
      },
      sendDeleteAIPsByQuery: (currentFilters, toggleAIPs, dataStorages) => {
        spiedDeleteByQuery.count += 1
        spiedDeleteByQuery.toggleAIPs = toggleAIPs
        spiedDeleteByQuery.currentFilters = currentFilters
        spiedDeleteByQuery.dataStorages = dataStorages
        return new Promise(resolve => resolve(true))
      },
    }
    const enzymeWrapper = shallow(<DeleteAIPOnSomeStoragesDialogContainer {...props} />, { context })
    let componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      storagesSelectionModel: [{ selected: false, storage: storage1 }, { selected: false, storage: storage2 }], // alpha sorting
      canDelete: false,
      onToggleStorage: enzymeWrapper.instance().onToggleStorage,
      onConfirmDelete: enzymeWrapper.instance().onConfirmSelection,
      onClose: props.onClose,
    }, 'Component should define the expected properties')
    // toggle storage 2 and send delete selection
    enzymeWrapper.instance().onToggleStorage(1)
    enzymeWrapper.update()
    componentWrapper = enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent)
    componentWrapper.props().onConfirmDelete()
    // Now, the confirmation dialog should be shown
    enzymeWrapper.update()
    assert.lengthOf(enzymeWrapper.find(DeleteAIPOnSomeStoragesDialogComponent), 0, 'Selection dialog should be hidden')
    const confirmationWrapper = enzymeWrapper.find(ConfirmDeleteOnSomeStoragesDialogComponent)
    assert.lengthOf(confirmationWrapper, 1, 'Confirmation dialog should be shown')
    testSuiteHelpers.assertWrapperProperties(confirmationWrapper, {
      selectedStorages: [storage2],
      onConfirm: enzymeWrapper.instance().onDelete,
      onCancel: props.onClose,
    })
    // Finally test delete callback
    confirmationWrapper.props().onConfirm()
    assert.equal(spiedDeleteSelected.count, 0, ' Delete by selection should not have been called')
    assert.equal(spiedDeleteByQuery.count, 1, ' Delete by query should should have been called')
    assert.equal(spiedDeleteByQuery.toggleAIPs, props.toggleAIPs, ' Delete by query should should have been called with exluded AIPs')
    assert.equal(spiedDeleteByQuery.currentFilters, props.currentFilters, ' Delete by query should should have been called with query filters')
    assert.deepEqual(spiedDeleteByQuery.dataStorages, [storage2], ' Delete by query should should have been called with selected data storages')
  })
})
