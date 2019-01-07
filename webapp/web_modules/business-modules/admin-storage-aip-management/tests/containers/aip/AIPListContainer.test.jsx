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
import AIPListComponent from '../../../src/components/aip/AIPListComponent'
import AIPDeletionErrorDialog from '../../../src/components/aip/dialogs/AIPDeletionErrorDialog'
import { AIPListContainer } from '../../../src/containers/aip/AIPListContainer'
import styles from '../../../src/styles'
import { storage1, storage2 } from '../../dumps/DataStorages.dump'

const context = buildTestContext(styles)
const router = require('react-router')


/**
 * Test AIPListContainer
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPListContainer', () => {
  before(() => {
    // mock browser history for container
    router.browserHistory = {
      getCurrentLocation: () => ({ query: {}, pathname: '' }),
      router: () => {},
    }
    testSuiteHelpers.before()
  })
  after(() => {
    delete router.browserHistory
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(AIPListContainer)
  })
  it('should render correctly and show last AIP errors dialog on need', () => {
    const props = {
      params: {
        project: 'any',
        session: 's02',
      },
      meta: {
        number: 2,
        size: 20,
        totalElements: 50,
      },
      dataStorages: [storage1, storage2],

      clearSelection: () => {},
      fetchPage: () => {},
      fetchCommonTags: () => new Promise(resolve => resolve(true)),
      addTags: () => {},
      removeTags: () => {},
      onRetry: () => {},

      entitiesLoading: false,
      isEmptySelection: false,
      selectionMode: TableSelectionModes.excludeSelected,

      lastAIPInErrorOAS: [],
      lastAIPInErrorOSS: [],
      elementsSelected: [],
      areAllSelected: true,
    }
    const enzymeWrapper = shallow(<AIPListContainer {...props} />, { context })
    const state = enzymeWrapper.state()
    const wrapperInstance = enzymeWrapper.instance()
    const componentWrapper = enzymeWrapper.find(AIPListComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      pageSize: AIPListContainer.PAGE_SIZE,
      resultsCount: props.meta.totalElements,
      entitiesLoading: props.entitiesLoading,
      isEmptySelection: props.isEmptySelection,
      tags: state.tags,
      searchingTags: state.searchingTags,
      sessionTags: state.sessionTags,
      searchingSessionTags: state.searchingSessionTags,
      initialFilters: state.urlFilters,
      currentFilters: state.currentFilters,
      dataStorages: props.dataStorages,
      session: props.params.session,
      onGoBack: wrapperInstance.onGoBack,
      onRefresh: wrapperInstance.onRefresh,
      onRetryAIPStorage: wrapperInstance.onRetryAIPStorage,
      onApplyFilters: wrapperInstance.onApplyFilters,
      goToAipFiles: wrapperInstance.goToAipFiles,
      fetchCommonTags: wrapperInstance.fetchCommonTags,
      addTags: wrapperInstance.addTags,
      removeTags: wrapperInstance.removeTags,
    }, 'Component should define the expected properties and callbacks')

    let errorDialog = enzymeWrapper.find(AIPDeletionErrorDialog)
    assert.lengthOf(errorDialog, 1, 'There should be error dialog')
    assert.isFalse(errorDialog.props().show, 'It should be hidden')
    assert.equal(errorDialog.props().onClose, wrapperInstance.onCloseDeletionErrors, 'Close callback should be correctly set')
    // Pop a deletion error on all storages
    const lastAIPInErrorOAS = [
      { aipId: 'someAIP', reason: 'Just because' },
      { aipId: 'someAIP2', reason: 'Just because 2' },
    ]
    enzymeWrapper.setProps({
      ...props,
      lastAIPInErrorOAS,
    })
    errorDialog = enzymeWrapper.find(AIPDeletionErrorDialog)
    assert.isTrue(errorDialog.props().show, 'It should be visible for error on all storages')
    assert.deepEqual(errorDialog.props().errors, lastAIPInErrorOAS, 'Right errors set should be provided (1)')
    // Simulate closing error message
    errorDialog.props().onClose()
    errorDialog = enzymeWrapper.find(AIPDeletionErrorDialog)
    assert.isFalse(errorDialog.props().show, 'Error dialog should have been closed (1)')
    // Pop a deletion error on some storages
    const lastAIPInErrorOSS = [
      { aipId: 'someAIP', reason: 'Just because' },
      { aipId: 'someAIP2', reason: 'Just because 2' },
    ]
    enzymeWrapper.setProps({
      ...props,
      lastAIPInErrorOSS,
    })
    errorDialog = enzymeWrapper.find(AIPDeletionErrorDialog)
    assert.isTrue(errorDialog.props().show, 'It should be visible for error on some storages')
    assert.deepEqual(errorDialog.props().errors, lastAIPInErrorOSS, 'Right errors set should be provided (2)')
    // Simulate closing error message
    errorDialog.props().onClose()
    errorDialog = enzymeWrapper.find(AIPDeletionErrorDialog)
    assert.isFalse(errorDialog.props().show, 'Error dialog should have been closed (2)')
  })
})
