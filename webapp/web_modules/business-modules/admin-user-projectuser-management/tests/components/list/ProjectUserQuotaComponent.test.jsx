/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  TableLayout, PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { CommonDomain } from '@regardsoss/domain'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import ProjectUserQuotaComponent from '../../../src/components/list/ProjectUserQuotaComponent'
import ProjectUserQuotaFiltersComponent from '../../../src/components/list/filters/ProjectUserQuotaFiltersComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user quota list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserQuotaComponent)
  })
  it('should render correctly', () => {
    const props = {
      csvLink: '',
      allAccounts: {},
      pageSize: 20,
      isLoading: false,
      onEdit: () => { },
      onDeleteAccount: () => { },
      uiSettings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: '',
        quotaWarningCount: 50,
        rateWarningCount: 50,
      },
      onSetMaxQuota: () => { },
      showQuota: false,

      // table sorting, column visiblity & filters management
      requestParameters: {},
      columnsVisibility: {},
      filters: {},
      onRefresh: () => { },
      updateFilter: () => { },
      clearFilters: () => { },
      onChangeColumnsVisibility: () => { },
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onSort: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserQuotaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const filterComponent = enzymeWrapper.find(ProjectUserQuotaFiltersComponent)
    testSuiteHelpers.assertWrapperProperties(filterComponent, {
      onToggleOnlyLowQuotaUsers: enzymeWrapper.instance().onToggleOnlyLowQuotaUsers,
      filters: props.filters,
      updateFilter: props.updateFilter,
      clearFilters: enzymeWrapper.instance().onClearFilters,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(ProjectUserQuotaFiltersComponent), 1, 'ProjectUserQuotaFiltersComponent should be set')
    assert.lengthOf(enzymeWrapper.find(PageableInfiniteTableContainer), 1, 'There should be 1 PageableInfiniteTableContainer')
  })
})
