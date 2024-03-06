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
import { aipActions, aipSelectors } from '../../../src/clients/AIPClient'
import { OAISPackageManagerComponent } from '../../../src/components/packages/OAISPackageManagerComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPModifyDialogComponent
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing OAISPackageManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OAISPackageManagerComponent)
  })

  it('should render correctly', () => {
    const props = {
      isLoading: false,
      onDeleteRequests: () => { },
      onModifyAip: () => { },
      paneType: IngestDomain.REQUEST_TYPES_ENUM.AIP,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      recipientList: [],
      onNotifyAip: () => { },
    }
    const enzymeWrapper = shallow(<OAISPackageManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerComponent = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerComponent, 1, 'HeaderActionsBarContainer should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      paneType: props.paneType,
      onModify: enzymeWrapper.instance().onModifySelection,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: aipActions,
      pageSelectors: aipSelectors,
      fetchUsingPostMethod: true,
      requestParams: props.requestParameters,
      bodyParams: props.bodyParameters,
    }, 'Component should define the expected properties and callbacks')
  })
})
