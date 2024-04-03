/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  TableLayout, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { FemDomain, CommonDomain } from '@regardsoss/domain'
import HeaderActionsBarContainer from '../../src/containers/HeaderActionsBarContainer'
import { RequestManagerComponent } from '../../src/components/RequestManagerComponent'
import { referencesActions, referencesSelectors } from '../../src/clients/ReferencesClient'
import { creationRequestActions, creationRequestSelectors } from '../../src/clients/CreationRequestsClient'
import { updateRequestActions, updateRequestSelectors } from '../../src/clients/UpdateRequestsClient'
import { deleteRequestActions, deleteRequestSelectors } from '../../src/clients/DeleteRequestsClient'
import { notificationRequestActions, notificationRequestSelectors } from '../../src/clients/NotificationRequestsClient'

import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
  * Test RequestManagerComponent
  * @author Théo Lasserre
  */
describe('[ADMIN FEATURE MANAGEMENT] Testing RequestManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestManagerComponent)
  })
  it('should render correctly REFERENCES tab', () => {
    const props = {
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
      isFetching: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onForceErrorRequests: () => { },
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: referencesActions,
      pageSelectors: referencesSelectors,
    }, 'Component should define the expected properties and callbacks')
  })
  it('should render correctly CREATION tab', () => {
    const props = {
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.CREATION,
      isFetching: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onForceErrorRequests: () => { },
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: creationRequestActions,
      pageSelectors: creationRequestSelectors,
    }, 'Component should define the expected properties and callbacks')
  })
  it('should render correctly UPDATE tab', () => {
    const props = {
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.UPDATE,
      isFetching: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onForceErrorRequests: () => { },
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: updateRequestActions,
      pageSelectors: updateRequestSelectors,
    }, 'Component should define the expected properties and callbacks')
  })
  it('should render correctly DELETE tab', () => {
    const props = {
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.DELETE,
      isFetching: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onForceErrorRequests: () => { },
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: deleteRequestActions,
      pageSelectors: deleteRequestSelectors,
    }, 'Component should define the expected properties and callbacks')
  })
  it('should render correctly NOTIFICATION tab', () => {
    const props = {
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      paneType: FemDomain.REQUEST_TYPES_ENUM.NOTIFICATION,
      isFetching: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onForceErrorRequests: () => { },
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: notificationRequestActions,
      pageSelectors: notificationRequestSelectors,
    }, 'Component should define the expected properties and callbacks')
  })
})
