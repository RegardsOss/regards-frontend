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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { FiltersPaneMainComponent, FilterPaneAutoCompleteField, FilterPaneSelectFieldLegacy } from '@regardsoss/components'
import { DashboardFiltersComponent } from '../../src/components/DashboardFiltersComponent'
import { FILTERS_I18N } from '../../src/domain/filters'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN DASHBOARD MANAGEMENT] Dashboard Filters', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should render correctly', () => {
    const props = {
      inputValues: { },
      requestParameters: { },
      updateFilter: () => { },
      updateRequestParameters: () => { },
      filtersI18n: FILTERS_I18N,
    }
    const enzymeWrapper = shallow(<DashboardFiltersComponent {...props} />, { context })
    const mainComponent = enzymeWrapper.find(FiltersPaneMainComponent)
    assert.lengthOf(mainComponent, 1, 'FiltersPaneMainComponent should be set')
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      updateFilter: props.updateFilter,
      inputValues: props.inputValues,
      filtersI18n: props.filtersI18n,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneAutoCompleteField), 2, 'There should be 2 FilterPaneAutoCompleteField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectFieldLegacy), 2, 'There should be 2 FilterPaneSelectFieldLegacy')
  })
})
