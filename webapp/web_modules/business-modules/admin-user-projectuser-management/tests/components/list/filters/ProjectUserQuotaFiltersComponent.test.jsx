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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import {
  FiltersPaneMainComponent, FilterPaneCheckboxField, FilterPaneTextField,
} from '@regardsoss/components'
import { ProjectUserQuotaFiltersComponent } from '../../../../src/components/list/filters/ProjectUserQuotaFiltersComponent'
import { FILTERS_I18N } from '../../../../src/domain/filters'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing user quota filters component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserQuotaFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      updateFilter: () => { },
      inputValues: {},
      uiSettings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'pipou',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      filtersI18n: FILTERS_I18N,
    }
    const enzymeWrapper = shallow(<ProjectUserQuotaFiltersComponent {...props} />, { context })
    const mainComponent = enzymeWrapper.find(FiltersPaneMainComponent)
    assert.lengthOf(mainComponent, 1, 'FiltersPaneMainComponent should be set')
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      updateFilter: props.updateFilter,
      inputValues: props.inputValues,
      filtersI18n: props.filtersI18n,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneTextField), 3, 'There should be 2 FilterPaneTextField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneCheckboxField), 1, 'There should be 1 FilterPaneCheckboxField')
  })
})
