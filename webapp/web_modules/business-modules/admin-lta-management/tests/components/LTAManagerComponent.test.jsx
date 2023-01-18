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
import { TableFilterSortingAndVisibilityAndChipsComponent } from '@regardsoss/components'
import LTAManagerComponent from '../../src/components/LTAManagerComponent'
import RequestFiltersComponent from '../../src/components/RequestFiltersComponent'
import LTAManagerTableComponent from '../../src/components/LTAManagerTableComponent'
import { requestActions, requestSelectors } from '../../src/clients/LTAClient'
import { filtersActions, filtersSelectors } from '../../src/clients/FiltersClient'
import { FILTERS_I18N } from '../../src/domain/filters'

import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test LTAManagerComponent
 * @author Théo Lasserre
 */
describe('[ADMIN LTA MANAGEMENT] Testing LTAManagerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LTAManagerComponent)
  })
  it('should render correctly', () => {
    const props = {
      onBack: () => { },
      isLoading: false,
      onDeleteRequest: () => { },
      numberOfRequests: 1,
      onRefresh: () => { },
    }
    const enzymeWrapper = shallow(<LTAManagerComponent {...props} />, { context })
    const tableVisibilityWrapper = enzymeWrapper.find(TableFilterSortingAndVisibilityAndChipsComponent)
    assert.lengthOf(tableVisibilityWrapper, 1, 'There should be a TableFilterSortingAndVisibilityAndChipsComponent')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityWrapper, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      onDeleteRequest: props.onDeleteRequest,
      isPagePostFetching: true,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
      filtersActions,
      filtersSelectors,
      filtersI18n: FILTERS_I18N,
    }, 'Component should define the expected properties')
    const tableWrapper = enzymeWrapper.find(LTAManagerTableComponent)
    assert.lengthOf(tableWrapper, 1, 'There should be a LTAManagerTableComponent')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      isLoading: props.isLoading,
      numberOfRequests: props.numberOfRequests,
    }, 'Component should define the expected properties')
    const filterWrapper = enzymeWrapper.find(RequestFiltersComponent)
    assert.lengthOf(filterWrapper, 1, 'There should be a RequestFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(filterWrapper, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties')
  })
})
