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
import { FemDomain, CommonDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  TableLayout, PageableInfiniteTableContainer, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import HeaderActionsBarContainer from '../../src/containers/HeaderActionsBarContainer'
import { ReferencesManagerComponent } from '../../src/components/ReferencesManagerComponent'
import { referencesActions, referencesSelectors } from '../../src/clients/ReferencesClient'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ReferencesManagerComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing ReferencesManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ReferencesManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      onDeleteRequests: () => { },
      onNotifyRequests: () => { },
      isFetching: false,
      paneType: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
    }
    const enzymeWrapper = shallow(<ReferencesManagerComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerComponent = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerComponent, 1, 'There should be 1 HeaderActionsBarContainer')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      paneType: props.paneType,
      onNotify: enzymeWrapper.instance().onNotify,
      onDelete: enzymeWrapper.instance().onDelete,
    })
    assert.lengthOf(enzymeWrapper.find(TableHeaderLoadingComponent), 1, 'There should be 1 TableHeaderLoadingComponent')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: referencesActions,
      pageSelectors: referencesSelectors,
      requestParams: props.requestParameters,
    })
  })
})
