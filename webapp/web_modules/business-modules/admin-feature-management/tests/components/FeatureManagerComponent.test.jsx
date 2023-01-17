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
import { Card } from 'material-ui/Card'
import { FemDomain } from '@regardsoss/domain'
import { CardHeaderActions, FiltersChipsContainer, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import RequestManagerComponent from '../../src/components/RequestManagerComponent'
import RequestManagerFiltersComponent from '../../src/components/filters/RequestManagerFiltersComponent'
import ReferenceManagerFiltersComponent from '../../src/components/filters/ReferenceManagerFiltersComponent'
import ReferencesManagerComponent from '../../src/components/ReferencesManagerComponent'
import { deleteRequestActions, deleteRequestSelectors } from '../../src/clients/DeleteRequestsClient'
import { creationRequestActions, creationRequestSelectors } from '../../src/clients/CreationRequestsClient'
import { notificationRequestActions, notificationRequestSelectors } from '../../src/clients/NotificationRequestsClient'
import { referencesSelectors, referencesActions } from '../../src/clients/ReferencesClient'
import { updateRequestActions, updateRequestSelectors } from '../../src/clients/UpdateRequestsClient'
import { filtersActions, filtersSelectors } from '../../src/clients/FiltersClient'
import { FILTERS_I18N } from '../../src/domain/filters'
import SwitchTables from '../../src/containers/SwitchTables'
import FeatureManagerComponent from '../../src/components/FeatureManagerComponent'
import styles from '../../src/styles'

// mock router
const router = require('react-router')

const context = buildTestContext(styles)

/**
 * Test FeatureManagerComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing FeatureManagerComponent', () => {
  let currentLocation = {}
  before(() => {
    testSuiteHelpers.before()
    router.browserHistory.setMockedResult(currentLocation)
    router.browserHistory.setReplaceSpy((location) => {
      currentLocation = location
    })
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(FeatureManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'any',
      },
      onBack: () => { },
      onRefresh: () => { },
      isFetching: false,
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      onNotifyRequests: () => { },
    }
    const enzymeWrapper = shallow(<FeatureManagerComponent {...props} />, { context })
    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

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
    const switchWrapper = enzymeWrapper.find(SwitchTables)
    assert.lengthOf(switchWrapper, 1, 'There should be a SwitchTables')
    testSuiteHelpers.assertWrapperProperties(switchWrapper, {
      params: props.params,
      onSwitchToPane: enzymeWrapper.instance().onSwitchToPane,
      featureManagerFilters: enzymeWrapper.instance().state.currentRequestParameters,
      paneType: enzymeWrapper.instance().state.paneType,
    }, 'Component should define the expected properties')

    // REFERENCES TAB
    let tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: referencesActions,
      pageSelectors: referencesSelectors,
      onDeleteRequests: props.onDeleteRequests,
      onNotifyRequests: props.onNotifyRequests,
      onRetryRequests: props.onRetryRequests,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    let filterComponent = enzymeWrapper.find(ReferenceManagerFiltersComponent)
    assert.lengthOf(filterComponent, 1, 'ReferenceManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    let tableComponent = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(tableComponent, 1, 'ReferenceManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(tableComponent, {
      isFetching: props.isFetching,
      paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
    }, 'Component should define the expected properties and callbacks')
    let requestFilterComponent = enzymeWrapper.find(RequestManagerFiltersComponent)
    assert.lengthOf(requestFilterComponent, 0, 'RequestManagerFiltersComponent should not be set')
    let requestComponent = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(requestComponent, 0, 'RequestManagerComponent should not be set')

    // Change tab
    enzymeWrapper.setState({
      paneType: FemDomain.REQUEST_TYPES_ENUM.CREATION,
    })

    // CREATION TAB
    tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: creationRequestActions,
      pageSelectors: creationRequestSelectors,
      onDeleteRequests: props.onDeleteRequests,
      onNotifyRequests: props.onNotifyRequests,
      onRetryRequests: props.onRetryRequests,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    filterComponent = enzymeWrapper.find(ReferenceManagerFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(tableComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    requestFilterComponent = enzymeWrapper.find(RequestManagerFiltersComponent)
    assert.lengthOf(requestFilterComponent, 1, 'RequestManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    requestComponent = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(requestComponent, 1, 'RequestManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestComponent, {
      isFetching: props.isFetching,
      paneType: FemDomain.REQUEST_TYPES_ENUM.CREATION,
    }, 'Component should define the expected properties and callbacks')

    // Change tab
    enzymeWrapper.setState({
      paneType: FemDomain.REQUEST_TYPES_ENUM.UPDATE,
    })

    // UPDATE TAB
    tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: updateRequestActions,
      pageSelectors: updateRequestSelectors,
      onDeleteRequests: props.onDeleteRequests,
      onNotifyRequests: props.onNotifyRequests,
      onRetryRequests: props.onRetryRequests,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    filterComponent = enzymeWrapper.find(ReferenceManagerFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(tableComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    requestFilterComponent = enzymeWrapper.find(RequestManagerFiltersComponent)
    assert.lengthOf(requestFilterComponent, 1, 'RequestManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    requestComponent = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(requestComponent, 1, 'RequestManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestComponent, {
      isFetching: props.isFetching,
      paneType: FemDomain.REQUEST_TYPES_ENUM.UPDATE,
    }, 'Component should define the expected properties and callbacks')

    // Change tab
    enzymeWrapper.setState({
      paneType: FemDomain.REQUEST_TYPES_ENUM.DELETE,
    })

    // DELETE TAB
    tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: deleteRequestActions,
      pageSelectors: deleteRequestSelectors,
      onDeleteRequests: props.onDeleteRequests,
      onNotifyRequests: props.onNotifyRequests,
      onRetryRequests: props.onRetryRequests,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    filterComponent = enzymeWrapper.find(ReferenceManagerFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(tableComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    requestFilterComponent = enzymeWrapper.find(RequestManagerFiltersComponent)
    assert.lengthOf(requestFilterComponent, 1, 'RequestManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    requestComponent = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(requestComponent, 1, 'RequestManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestComponent, {
      isFetching: props.isFetching,
      paneType: FemDomain.REQUEST_TYPES_ENUM.DELETE,
    }, 'Component should define the expected properties and callbacks')

    // Change tab
    enzymeWrapper.setState({
      paneType: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION,
    })

    // DELETE TAB
    tableVisibilityComponent = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityComponent, 1, 'TableFilterSortingAndVisibilityContainer should be set')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityComponent, {
      pageActions: notificationRequestActions,
      pageSelectors: notificationRequestSelectors,
      onDeleteRequests: props.onDeleteRequests,
      onNotifyRequests: props.onNotifyRequests,
      onRetryRequests: props.onRetryRequests,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties and callbacks')
    filterComponent = enzymeWrapper.find(ReferenceManagerFiltersComponent)
    assert.lengthOf(filterComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    tableComponent = enzymeWrapper.find(ReferencesManagerComponent)
    assert.lengthOf(tableComponent, 0, 'ReferenceManagerFiltersComponent should not be set')
    requestFilterComponent = enzymeWrapper.find(RequestManagerFiltersComponent)
    assert.lengthOf(requestFilterComponent, 1, 'RequestManagerFiltersComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestFilterComponent, {
      isPaneOpened: enzymeWrapper.instance().state.isFilterPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties and callbacks')
    requestComponent = enzymeWrapper.find(RequestManagerComponent)
    assert.lengthOf(requestComponent, 1, 'RequestManagerComponent should be set')
    testSuiteHelpers.assertWrapperProperties(requestComponent, {
      isFetching: props.isFetching,
      paneType: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION,
    }, 'Component should define the expected properties and callbacks')
  })
})
