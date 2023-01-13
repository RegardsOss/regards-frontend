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
import { IngestDomain } from '@regardsoss/domain'
import { TableFilterSortingAndVisibilityContainer, FiltersChipsContainer, CardHeaderActions } from '@regardsoss/components'
import OAISFeatureManagerComponent from '../../src/components/OAISFeatureManagerComponent'
import OAISRequestManagerComponent from '../../src/components/requests/OAISRequestManagerComponent'
import RequestsFeatureManagerFiltersComponent from '../../src/components/RequestsFeatureManagerFiltersComponent'
import OAISPackageManagerComponent from '../../src/components/packages/OAISPackageManagerComponent'
import AIPFeatureManagerFiltersComponent from '../../src/components/AIPFeatureManagerFiltersComponent'
import { aipSelectors, aipActions } from '../../src/clients/AIPClient'
import { filtersActions, filtersSelectors } from '../../src/clients/FiltersClient'
import { requestSelectors, requestActions } from '../../src/clients/RequestClient'
import OAISSwitchTables from '../../src/components/OAISSwitchTables'
import { FILTERS_I18N } from '../../src/domain/filters'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test OAISFeatureManagerComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISFeatureManagerComponent', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })
  it('should exists', () => {
    assert.isDefined(OAISFeatureManagerComponent)
  })

  it('should render correctly', () => {
    const props = {
      params: {
        type: 'test',
      },
      modeSelectionAllowed: true,
      isLoading: false,
      onRefresh: () => { },
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      onAbortRequests: () => { },
      onSelectVersionOption: () => { },
      onModifyAip: () => { },
      onBack: () => { },
      storages: [],
    }
    const enzymeWrapper = shallow(<OAISFeatureManagerComponent {...props} />, { context })
    const headerComponent = enzymeWrapper.find(CardHeaderActions)
    assert.lengthOf(headerComponent, 1, 'CardHeaderActions should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      secondaryButtonClick: enzymeWrapper.instance().handleFiltersPane,
      thirdButtonClick: props.onBack,
    })
    const chipsContainer = enzymeWrapper.find(FiltersChipsContainer)
    assert.lengthOf(chipsContainer, 1, 'FiltersChipsContainer should be set')
    testSuiteHelpers.assertWrapperProperties(chipsContainer, {
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    })
    const switchComponent = enzymeWrapper.find(OAISSwitchTables)
    assert.lengthOf(switchComponent, 1, 'OAISSwitchTables should be set')
    testSuiteHelpers.assertWrapperProperties(switchComponent, {
      params: props.params,
      onSwitchToPane: enzymeWrapper.instance().onSwitchToPane,
      openedPane: enzymeWrapper.instance().state.paneType,
      bodyParameters: enzymeWrapper.instance().state.currentRequestParameters,
    })

    // AIP TAB
    let tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: aipActions,
      pageSelectors: aipSelectors,
      isPagePostFetching: true,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      onDeleteRequests: props.onDeleteRequests,
      onRetryRequests: props.onRetryRequests,
      onAbortRequests: props.onAbortRequests,
      onSelectVersionOption: props.onSelectVersionOption,
      onModifyAip: props.onModifyAip,
    }, 'Component should define the expected properties and callbacks')

    let aipFiltersComponent = enzymeWrapper.find(AIPFeatureManagerFiltersComponent)
    assert.lengthOf(aipFiltersComponent, 1, 'AIPFeatureManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(aipFiltersComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      filtersActions,
      filtersSelectors,
      storages: props.storages,
    })
    let packageComponent = enzymeWrapper.find(OAISPackageManagerComponent)
    assert.lengthOf(packageComponent, 1, 'OAISPackageManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(packageComponent, {
      isLoading: props.isLoading,
      paneType: IngestDomain.REQUEST_TYPES_ENUM.AIP,
    })
    let requestFiltersComponent = enzymeWrapper.find(RequestsFeatureManagerFiltersComponent)
    assert.lengthOf(requestFiltersComponent, 0, 'RequestsFeatureManagerFiltersComponent should not be set')
    let requestComponent = enzymeWrapper.find(OAISRequestManagerComponent)
    assert.lengthOf(requestComponent, 0, 'OAISRequestManagerComponent should not be set')

    // Change tab
    enzymeWrapper.setState({
      paneType: IngestDomain.REQUEST_TYPES_ENUM.REQUEST,
    })

    // REQUEST TAB
    tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      isPagePostFetching: true,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      onDeleteRequests: props.onDeleteRequests,
      onRetryRequests: props.onRetryRequests,
      onAbortRequests: props.onAbortRequests,
      onSelectVersionOption: props.onSelectVersionOption,
      onModifyAip: props.onModifyAip,
    }, 'Component should define the expected properties and callbacks')

    aipFiltersComponent = enzymeWrapper.find(AIPFeatureManagerFiltersComponent)
    assert.lengthOf(aipFiltersComponent, 0, 'AIPFeatureManagerFiltersComponent should not be set')
    packageComponent = enzymeWrapper.find(OAISPackageManagerComponent)
    assert.lengthOf(packageComponent, 0, 'OAISPackageManagerComponent should not be set')
    requestFiltersComponent = enzymeWrapper.find(RequestsFeatureManagerFiltersComponent)
    assert.lengthOf(requestFiltersComponent, 1, 'RequestsFeatureManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestFiltersComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
      filtersActions,
      filtersSelectors,
    })
    requestComponent = enzymeWrapper.find(OAISRequestManagerComponent)
    assert.lengthOf(requestComponent, 1, 'OAISRequestManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestComponent, {
      isLoading: props.isLoading,
      paneType: IngestDomain.REQUEST_TYPES_ENUM.REQUEST,
      modeSelectionAllowed: props.modeSelectionAllowed,
    })
  })
})
