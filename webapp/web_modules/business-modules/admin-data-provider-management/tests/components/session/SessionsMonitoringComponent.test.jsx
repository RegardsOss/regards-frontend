/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import {
  PageableInfiniteTableContainer, TableLayout, ConfirmDialogComponent, CardActionsComponent,
} from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringComponent } from '../../../src/components/session/SessionsMonitoringComponent'
import styles from '../../../src/styles'
import { SessionsMonitoringFiltersComponent } from '../../../src/components/session/SessionsMonitoringFiltersComponent'
import SessionDeleteDialogComponent from '../../../src/components/session/SessionDeleteDialogComponent'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringComponent
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringComponent)
  })
  it('should render correctly', () => {
    const props = {
      columnsSorting: [{
        columnKey: 'column.source',
        order: 'NO_SORT',
      }],
      availableDependencies: [],
      requestParameters: {},
      onBack: () => {},
      onAcknowledge: () => {},
      onSort: () => {},
      initialFilters: {
        source: '',
        session: '',
        lastSessionOnly: false,
        errorsOnly: true,
        from: null,
        to: null,
      },
      onApplyFilters: () => {},
      onClearFilters: () => {},
      filtersEdited: false,
      canEmptyFilters: false,
      onToggleErrorsOnly: () => {},
      onToggleLastSession: () => {},
      onChangeFrom: () => {},
      onChangeTo: () => {},
      onChangeSource: () => {},
      onChangeSession: () => {},
      onChangeColumnsVisibility: () => {},
      columnsVisibility: {},
      onDeleteSession: () => {},
      onRelaunchProducts: () => {},
      onViewProductsOAIS: () => {},
      onViewRequestsOAIS: () => {},
      onRelaunchProductsOAIS: () => {},
      onRefresh: () => {},
      onGoToDatasources: () => {},
    }
    const enzymeWrapper = shallow(<SessionsMonitoringComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()

    // Exist components
    const card = enzymeWrapper.find(Card)
    assert.lengthOf(card, 1, 'There should be 1 card')
    const cardTitle = enzymeWrapper.find(CardTitle)
    assert.lengthOf(cardTitle, 1, 'There should be 1 cardTitle')
    const cardText = enzymeWrapper.find(CardText)
    assert.lengthOf(cardText, 1, 'There should be 1 cardText')
    const cardAction = enzymeWrapper.find(CardActions)
    assert.lengthOf(cardAction, 1, 'There should be 1 cardAction')
    const pageableInfiniteTableContainer = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(pageableInfiniteTableContainer, 1, 'There should be 1 pageableInfiniteTableContainer')
    const tableLayout = enzymeWrapper.find(TableLayout)
    assert.lengthOf(tableLayout, 1, 'There should be 1 tableLayout')
    const deleteDialogComponents = enzymeWrapper.find(SessionDeleteDialogComponent)
    assert.lengthOf(deleteDialogComponents, 1, 'There should be 1 SessionDeleteDialogComponent')
    const confirmDialogComponents = enzymeWrapper.find(ConfirmDialogComponent)
    assert.lengthOf(confirmDialogComponents, 1, 'There should be 1 confirmDialogComponent')
    testSuiteHelpers.assertWrapperProperties(confirmDialogComponents.at(0), {
      dialogType: { messageId: 'confirm.dialog.confirm' },
      onConfirm: wrapperInstance.onConfirmAcknowledge,
      onClose: wrapperInstance.onCloseAcknowledge,
      open: false,
    }, 'The delete confirmDialogComponent should be correctly configured')
    const cardActionsComponent = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionsComponent, 1, 'There should be 1 cardActionsComponent')
    const sessionsMonitoringFiltersComponent = enzymeWrapper.find(SessionsMonitoringFiltersComponent)
    assert.lengthOf(sessionsMonitoringFiltersComponent, 1, 'There should be 1 SessionsMonitoringFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(sessionsMonitoringFiltersComponent, {
      initialFilters: {
        source: '',
        session: '',
        lastSessionOnly: false,
        errorsOnly: true,
        from: null,
        to: null,
      },
      onApplyFilters: props.onApplyFilters,
      onClearFilters: props.onClearFilters,
      onChangeSource: props.onChangeSource,
      onChangeSession: props.onChangeSession,
      onToggleErrorsOnly: props.onToggleErrorsOnly,
      onToggleLastSession: props.onToggleLastSession,
      onChangeFrom: props.onChangeFrom,
      onChangeTo: props.onChangeTo,
      filtersEdited: false,
      canEmptyFilters: false,
      onChangeColumnsVisibility: props.onChangeColumnsVisibility,
    }, 'The sessionsMonitoringFiltersComponent should be correctly configured')
  })
})
