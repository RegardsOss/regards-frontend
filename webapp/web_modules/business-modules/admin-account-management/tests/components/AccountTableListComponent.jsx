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
import { CommonDomain } from '@regardsoss/domain'
import { TableColumnsVisibilityOption, PageableInfiniteTableContainer } from '@regardsoss/components'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AccountTableListComponent from '../../src/components/AccountTableListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account table list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountTableListComponent)
  })
  it('should render correctly', () => {
    const props = {
      allAccounts: {},
      isFetching: true,
      pageSize: 20,
      onAccept: () => { },
      onRefuse: () => { },
      onEnable: () => { },
      onEdit: () => { },
      onDelete: () => { },
      isFetchingActions: false,

      // table sorting, column visiblity & filters management
      requestParameters: {},
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onSort: () => { },
    }
    const enzymeWrapper = shallow(<AccountTableListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be 1 TableColumnsVisibilityOption')
    assert.lengthOf(enzymeWrapper.find(PageableInfiniteTableContainer), 1, 'There should be 1 PageableInfiniteTableContainer')
  })
})
