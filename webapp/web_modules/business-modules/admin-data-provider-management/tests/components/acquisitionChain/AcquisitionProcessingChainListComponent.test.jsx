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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  TableFilterSortingAndVisibilityAndChipsComponent, CardHeaderActions, CardActionsComponent,
} from '@regardsoss/components'
import { AcquisitionProcessingChainListComponent } from '../../../src/components/acquisitionChain/AcquisitionProcessingChainListComponent'
import AcquisitionProcessingChainListFiltersComponent from '../../../src/components/acquisitionChain/AcquisitionProcessingChainListFiltersComponent'
import AcquisitionProcessingChainTableComponent from '../../../src/components/acquisitionChain/AcquisitionProcessingChainTableComponent'
import { filtersActions, filtersSelectors } from '../../../src/clients/FiltersClient'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../../src/clients/AcquisitionProcessingChainClient'
import { FILTERS_I18N } from '../../../src/domain/filters'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AcquisitionProcessingChainListComponent
* @author Sébastien Binda
*/
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionProcessingChainListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainListComponent)
  })
  it('should render correctly', () => {
    const props = {
      resultsCount: 10,
      entitiesLoading: false,
      onRefresh: () => new Promise(() => { }),
      onBack: () => new Promise(() => { }),
      onDelete: () => {},
      onEdit: () => {},
      onDuplicate: () => {},
      onRunChain: () => new Promise(() => { }),
      onStopChain: () => new Promise(() => { }),
      onListSessions: () => {},
      onCreate: () => {},
      onMultiToggleSelection: () => {},
      onToggle: () => {},
      isOneCheckboxToggled: true,
      hasAccess: true,
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainListComponent {...props} />, { context })
    const headerComponent = enzymeWrapper.find(CardHeaderActions)
    assert.lengthOf(headerComponent, 1, 'CardHeaderActions should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      mainButtonClick: enzymeWrapper.instance().onRefresh,
      secondaryButtonClick: enzymeWrapper.instance().handleFiltersPane,
      thirdButtonClick: props.onBack,
    })
    const tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityAndChipsComponent)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityAndChipsComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: AcquisitionProcessingChainActions,
      pageSelectors: AcquisitionProcessingChainSelectors,
      onToggle: props.onToggle,
      onDelete: props.onDelete,
      onStopChain: props.onStopChain,
      onRunChain: props.onRunChain,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    const filtersComponent = enzymeWrapper.find(AcquisitionProcessingChainListFiltersComponent)
    testSuiteHelpers.assertWrapperProperties(filtersComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    })
    const tableComponent = enzymeWrapper.find(AcquisitionProcessingChainTableComponent)
    assert.lengthOf(tableComponent, 1, 'AcquisitionProcessingChainTableComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableComponent, {
      hasAccess: props.hasAccess,
      updateErrorMessage: enzymeWrapper.instance().updateErrorMessage,
      onListSessions: props.onListSessions,
      onDuplicate: props.onDuplicate,
      onEdit: props.onEdit,
      entitiesLoading: props.entitiesLoading,
      resultsCount: props.resultsCount,
      isOneCheckboxToggled: props.isOneCheckboxToggled,
    })
    const cardActionComponent = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionComponent, 1, 'CardActionsComponent should be set')
    testSuiteHelpers.assertWrapperProperties(cardActionComponent, {
      mainButtonClick: props.onCreate,
    })
  })
})
