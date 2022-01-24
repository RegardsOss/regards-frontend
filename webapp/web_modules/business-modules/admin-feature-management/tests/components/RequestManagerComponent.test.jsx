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
  TableLayout, PageableInfiniteTableContainer, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import { FemDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'
import { RequestManagerComponent } from '../../src/components/RequestManagerComponent'
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
  it('should render correctly', () => {
    const props = {
      onRefresh: () => { },
      featureManagerFilters: {},
      onApplyRequestFilter: () => { },
      deleteRequests: () => { },
      retryRequests: () => { },
      tableSelection: [],
      paneType: FemDomain.REQUEST_TYPES_ENUM.CREATION,
      clients: {},
      selectionMode: 'include.selected',
      links: [],
      areAllSelected: false,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<RequestManagerComponent {...props} />, { context })
    const tableWrapper = enzymeWrapper.find(TableLayout)
    assert.lengthOf(tableWrapper, 1, 'There should be a TableLayout')

    const refreshButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(refreshButton, 1, 'There should be a FlatButton')

    const loadingComponent = enzymeWrapper.find(TableHeaderLoadingComponent)
    assert.lengthOf(loadingComponent, 1, 'There should be a TableHeaderLoadingComponent')

    const tableContainer = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableContainer, 1, 'There should be a PageableInfiniteTableContainer')
  })
})
