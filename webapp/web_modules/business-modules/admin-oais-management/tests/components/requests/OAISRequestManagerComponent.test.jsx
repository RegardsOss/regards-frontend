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
import { IngestDomain, CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableLayout, PageableInfiniteTableContainer } from '@regardsoss/components'
import HeaderActionsBarContainer from '../../../src/containers/HeaderActionsBarContainer'
import { requestActions, requestSelectors } from '../../../src/clients/RequestClient'
import { OAISRequestManagerComponent } from '../../../src/components/requests/OAISRequestManagerComponent'
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
      pageLoading: false,
      pageSize: 1,
      modeSelectionAllowed: true,
      onDeleteRequests: () => { },
      onRetryRequests: () => { },
      onSelectVersionOption: () => { },
      onAbortRequests: () => { },
      paneType: IngestDomain.REQUEST_TYPES_ENUM.REQUEST,
      isLoading: false,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
    }
    const enzymeWrapper = shallow(<OAISRequestManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerContainer = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerContainer, 1, 'HeaderActionsBarContainer should be set')
    testSuiteHelpers.assertWrapperProperties(headerContainer, {
      paneType: props.paneType,
      onSelectVersionOption: enzymeWrapper.instance().onSelectVersionOption,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
      onRetry: enzymeWrapper.instance().onRetrySelection,
      onAbort: enzymeWrapper.instance().onAbort,
    })
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      requestParams: props.requestParameters,
      bodyParams: props.bodyParameters,
      fetchUsingPostMethod: true,
    })
  })
})
