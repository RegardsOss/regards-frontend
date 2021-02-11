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
import { TableHeaderAutoCompleteFilterContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SessionsMonitoringFilterClearComponent } from '../../../src/components/session/filters/SessionsMonitoringFilterClearComponent'
import { SessionsMonitoringFilterApplyComponent } from '../../../src/components/session/filters/SessionsMonitoringFilterApplyComponent'
import { SessionsMonitoringChooseColumnsComponent } from '../../../src/components/session/filters/SessionsMonitoringChooseColumnsComponent'
import { SessionsMonitoringFilterToComponent } from '../../../src/components/session/filters/SessionsMonitoringFilterToComponent'
import { SessionsMonitoringFilterFromComponent } from '../../../src/components/session/filters/SessionsMonitoringFilterFromComponent'
import { SessionsMonitoringFiltersComponent } from '../../../src/components/session/SessionsMonitoringFiltersComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SessionsMonitoringFiltersComponent
 * @author Kévin Picart
 */
describe('[ADMIN DATA PROVIDER MANAGEMENT] Testing SessionsMonitoringFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionsMonitoringFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      initialFilters: {
        source: '',
        session: '',
        lastSessionOnly: false,
        errorsOnly: true,
        from: null,
        to: null,
      },
      onApplyFilters: () => {},
      onClearFilters: () => {},
      filtersEdited: false,
      canEmptyFilters: false,
      onToggleErrorsOnly: () => {},
      onToggleLastSession: () => {},
      onChangeFrom: () => {},
      onChangeTo: () => {},
      onChangeSource: () => {},
      onChangeSession: () => {},
      onChangeColumnsVisibility: () => {},
      columns: [{
        key: 'mavhcin',
        label: 'string',
        visible: true,
      }],
    }
    const enzymeWrapper = shallow(<SessionsMonitoringFiltersComponent {...props} />, { context })
    // 2 autocompletes
    const tableHeaderAutoCompleteFilterContainer = enzymeWrapper.find(TableHeaderAutoCompleteFilterContainer)
    assert.lengthOf(tableHeaderAutoCompleteFilterContainer, 2, 'There should be 2 tableHeaderAutoCompleteFilterContainer')
    const sessionsMonitoringFilterFromComponent = enzymeWrapper.find(SessionsMonitoringFilterFromComponent)
    assert.lengthOf(sessionsMonitoringFilterFromComponent, 1, 'There should be 1 SessionsMonitoringFilterFromComponent')
    const sessionsMonitoringFilterToComponent = enzymeWrapper.find(SessionsMonitoringFilterToComponent)
    assert.lengthOf(sessionsMonitoringFilterToComponent, 1, 'There should be 1 sessionsMonitoringFilterToComponent')
    const sessionsMonitoringFilterClearComponent = enzymeWrapper.find(SessionsMonitoringFilterClearComponent)
    assert.lengthOf(sessionsMonitoringFilterClearComponent, 1, 'There should be 1 SessionsMonitoringFilterClearComponent')
    const sessionsMonitoringFilterApplyComponent = enzymeWrapper.find(SessionsMonitoringFilterApplyComponent)
    assert.lengthOf(sessionsMonitoringFilterApplyComponent, 1, 'There should be 1 SessionsMonitoringFilterApplyComponent')
    const sessionsMonitoringChooseColumnsComponent = enzymeWrapper.find(SessionsMonitoringChooseColumnsComponent)
    assert.lengthOf(sessionsMonitoringChooseColumnsComponent, 1, 'There should be 1 SessionsMonitoringChooseColumnsComponent')
  })
})
