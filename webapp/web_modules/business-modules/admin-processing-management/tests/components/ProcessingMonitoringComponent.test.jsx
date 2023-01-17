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
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import {
  CardActionsComponent,
  TableFilterSortingAndVisibilityAndChipsComponent,
  CardHeaderActions,
} from '@regardsoss/components'
import ProcessingMonitoringComponent from '../../src/components/ProcessingMonitoringComponent'
import ProcessingMonitoringFiltersComponent from '../../src/components/monitoring/ProcessingMonitoringFiltersComponent'
import ProcessingMonitoringTableComponent from '../../src/components/ProcessingMonitoringTableComponent'
import { processingMonitoringActions, processingMonitoringSelectors } from '../../src/clients/ProcessingMonitoringClient'
import { filtersActions, filtersSelectors } from '../../src/clients/FiltersClient'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Tests for ProcessingMonitoringComponent
 * @author Théo Lasserre
 */
describe('[ADMIN PROCESSING MANAGEMENT] Testing ProcessingMonitoring component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exist', () => {
    assert.isDefined(ProcessingMonitoringComponent)
    assert.isDefined(CardActionsComponent)
    assert.isDefined(ProcessingMonitoringFiltersComponent)
    assert.isDefined(TableFilterSortingAndVisibilityAndChipsComponent)
    assert.isDefined(ProcessingMonitoringTableComponent)
  })

  it('should render correctly', () => {
    const props = {
      project: 'test',
      processingList: DumpProvider.get('ProcessingMonitoringClient', 'ProcessingMonitoring'),
      onRefresh: () => { },
      onBack: () => { },
      entitiesLoading: false,
      resultsCount: 0,
    }

    const enzymeWrapper = shallow(
      <ProcessingMonitoringComponent {...props} />,
      { context },
    )

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
      pageActions: processingMonitoringActions,
      pageSelectors: processingMonitoringSelectors,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: enzymeWrapper.instance().buildFiltersI18n(),
    }, 'Component should define the expected properties and callbacks')
    const filterComponent = enzymeWrapper.find(ProcessingMonitoringFiltersComponent)
    assert.lengthOf(filterComponent, 1, 'ProcessingMonitoringFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      processingList: props.processingList,
    }, 'Component should define the expected properties and callbacks')
    const tableComponent = enzymeWrapper.find(ProcessingMonitoringTableComponent)
    assert.lengthOf(tableComponent, 1, 'ProcessingMonitoringTableComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableComponent, {
      project: props.project,
      entitiesLoading: props.entitiesLoading,
      resultsCount: props.resultsCount,
    }, 'Component should define the expected properties and callbacks')
  })
})
