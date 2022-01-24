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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import SelectField from 'material-ui/SelectField'
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableLayout, TableSelectionModes, PageableInfiniteTableContainer } from '@regardsoss/components'
import Dialog from 'material-ui/Dialog'
import { requestActions, requestSelectors } from '../../../src/clients/RequestClient'
import { OAISRequestManagerComponent } from '../../../src/components/requests/OAISRequestManagerComponent'
import RequestOperationsMenuContainer from '../../../src/containers/requests/RequestOperationsMenuContainer'
import VersionOptionSelectionDialog from '../../../src/components/requests/VersionOptionSelectionDialog'
import RequestRetryDialog from '../../../src/components/requests/RequestRetryDialog'
import AbortAllRequestsDialog from '../../../src/components/requests/AbortAllRequestsDialog'
import RequestDeleteDialog from '../../../src/components/requests/RequestDeleteDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPModifyDialogComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISRequestManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OAISRequestManagerComponent)
  })

  it('should render correctly', () => {
    const props = {
      pageSize: 1,
      pageMeta: {
        number: 2,
        size: 20,
        totalElements: 112,
        totalPages: 6,
      },
      pageLoading: false,
      featureManagerFilters: {},
      requestFilters: {},
      modeSelectionAllowed: true,
      selectionMode: TableSelectionModes.includeSelected,
      tableSelection: [],
      fetchPage: () => {},
      updateStateFromRequestManager: () => {},
      deleteRequests: () => {},
      retryRequests: () => {},
      clearSelection: () => {},
      selectVersionOption: () => {},
      abortRequests: () => {},
    }
    const enzymeWrapper = shallow(<OAISRequestManagerComponent {...props} />, { context })
    // Filters
    const selectFields = enzymeWrapper.find(SelectField)
    assert.lengthOf(selectFields, 2, 'There should be all filter fields')
    assert.lengthOf(selectFields.findWhere((n) => n.props().onChange === enzymeWrapper.instance().onChangeTypeFilter), 1, 'There should be type filter selector')
    assert.lengthOf(selectFields.findWhere((n) => n.props().onChange === enzymeWrapper.instance().onChangeStateFilter), 1, 'There should be state filter selector')
    const tableLayoutWrapper = enzymeWrapper.find(TableLayout)
    assert.lengthOf(tableLayoutWrapper, 1, 'There should be a TableLayout')
    // Options
    const menuWrapper = enzymeWrapper.find(RequestOperationsMenuContainer)
    assert.lengthOf(menuWrapper, 1, 'There should be menu wrapper')
    testSuiteHelpers.assertWrapperProperties(menuWrapper, {
      selectionMode: props.selectionMode,
      tableSelection: props.tableSelection,
      pageMeta: props.pageMeta,
      onSelectVersionOption: enzymeWrapper.instance().onSelectVersionOption,
      onRetrySelection: enzymeWrapper.instance().onRetry,
      onDeleteSelection: enzymeWrapper.instance().onDelete,
      onAbort: enzymeWrapper.instance().onAbort,
    }, 'Options menu properties should be correctly set')
    const refreshWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(refreshWrapper, 1, 'There should be refresh wrapper button')
    testSuiteHelpers.assertWrapperProperties(refreshWrapper, {
      label: 'oais.packages.switch-to.refresh',
      onClick: enzymeWrapper.instance().onRefresh,
    }, 'Refresh button properties should be correctly set')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be the table')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      pageSize: props.pageSize,
      requestParams: enzymeWrapper.state().contextRequestURLParameters,
      bodyParams: enzymeWrapper.state().contextRequestBodyParameters,
      emptyComponent: OAISRequestManagerComponent.EMPTY_COMPONENT,
      fetchUsingPostMethod: true,
    }, 'Table properties should be correctly set (columns ignored)')

    // Dialogs
    // 1 - Errors
    const errorsDialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(errorsDialog, 1, 'There should be errors dialog')
    testSuiteHelpers.assertWrapperProperties(errorsDialog, {
      title: 'oais.aips.list.aip-details.title',
      open: enzymeWrapper.state()[OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog].open,
    }, 'Errors dialog properties should be correctly set')
    // 2 - version option selection
    const versionModeSelectionDialog = enzymeWrapper.find(VersionOptionSelectionDialog)
    assert.lengthOf(versionModeSelectionDialog, 1, 'There should be version mode selection dialog')
    testSuiteHelpers.assertWrapperProperties(versionModeSelectionDialog, {
      selection: enzymeWrapper.state()[OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog],
      onClose: enzymeWrapper.instance().onCloseVersionOptionSelectionDialog,
      onConfirm: enzymeWrapper.instance().onConfirmVersionOptionSelectionDialog,
    }, 'Version option selection dialog properties should be correctly set')
    // 3. retry
    const retryDialog = enzymeWrapper.find(RequestRetryDialog)
    assert.lengthOf(retryDialog, 1, 'There should be retry dialog')
    testSuiteHelpers.assertWrapperProperties(retryDialog, {
      open: enzymeWrapper.state()[OAISRequestManagerComponent.DIALOG_TYPES.retryDialog].open,
      onConfirmRetry: enzymeWrapper.instance().onConfirmRetry,
      onClose: enzymeWrapper.instance().onCloseRetryDialog,
    }, 'Retry dialog properties should be correctly set')
    // 4 - Delete
    const deleteDialog = enzymeWrapper.find(RequestDeleteDialog)
    assert.lengthOf(deleteDialog, 1, 'There should be delete dialog')
    testSuiteHelpers.assertWrapperProperties(deleteDialog, {
      open: enzymeWrapper.state()[OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog].open,
      onConfirmDelete: enzymeWrapper.instance().onConfirmDelete,
      onClose: enzymeWrapper.instance().onCloseDeleteDialog,
    }, 'Delete dialog properties should be correctly set')
    // Abort all dialog
    const abortAllDialog = enzymeWrapper.find(AbortAllRequestsDialog)
    assert.lengthOf(abortAllDialog, 1, 'There should be abort all requests dialog')
    testSuiteHelpers.assertWrapperProperties(abortAllDialog, {
      open: enzymeWrapper.state()[OAISRequestManagerComponent.DIALOG_TYPES.abortDialog].open,
      onConfirmAbort: enzymeWrapper.instance().onConfirmAbort,
      onClose: enzymeWrapper.instance().onCloseAbortDialog,
    }, 'Abort all requests dialog properties should be correctly set')
  })
})
