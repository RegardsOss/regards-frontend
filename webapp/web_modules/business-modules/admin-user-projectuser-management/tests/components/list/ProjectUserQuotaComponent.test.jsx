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
import {
  TableLayout, PageableInfiniteTableContainer, TableHeaderContentBox, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import { CommonDomain } from '@regardsoss/domain'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import HeaderActionsBar from '../../../src/components/list/HeaderActionsBar'
import { projectUserActions, projectUserSelectors } from '../../../src/clients/ProjectUserClient'
import ProjectUserQuotaComponent from '../../../src/components/list/ProjectUserQuotaComponent'
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
      totalElements: 50,
      pageSize: 20,
      isLoading: false,
      onEdit: () => { },
      onDeleteAccount: () => { },
      onSetMaxQuota: () => { },
      onDownloadCSV: () => { },
      showQuota: false,
      uiSettings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'pipou',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },

      // table sorting, column visiblity & filters management
      requestParameters: {},
      bodyParameters: {},
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onSort: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserQuotaComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(TableHeaderContentBox), 1, 'TableHeaderContentBox should be set')
    assert.lengthOf(enzymeWrapper.find(TableHeaderLoadingComponent), 1, 'TableHeaderLoadingComponent should be set')
    const headerComponent = enzymeWrapper.find(HeaderActionsBar)
    assert.lengthOf(headerComponent, 1, 'HeaderActionsBar should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      onDownloadCSV: props.onDownloadCSV,
      bodyParameters: props.bodyParameters,
      onChangeColumnsVisibility: props.onChangeColumnsVisibility,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: projectUserActions,
      pageSelectors: projectUserSelectors,
      requestParams: enzymeWrapper.instance().state.requestParameters,
      bodyParams: props.bodyParameters,
    }, 'Component should define the expected properties and callbacks')
  })
})
