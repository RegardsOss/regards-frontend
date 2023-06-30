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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import {
  FiltersPaneMainComponent, FilterPaneDatePickerField, FilterPaneSelectFieldLegacy, FilterPaneTextFieldValues,
  FilterPaneSelectField,
} from '@regardsoss/components'
import { FILTERS_I18N } from '../../../src/domain/filters'
import { ProcessingMonitoringFiltersComponent } from '../../../src/components/monitoring/ProcessingMonitoringFiltersComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ProcessingMonitoringFiltersComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing ProcessingMonitoringFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProcessingMonitoringFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      inputValues: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE,
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      isPaneOpened: true,
      onCloseFiltersPane: () => { },
      processingList: {},
      filtersI18n: FILTERS_I18N,
    }
    const enzymeWrapper = shallow(<ProcessingMonitoringFiltersComponent {...props} />, { context })
    const mainComponent = enzymeWrapper.find(FiltersPaneMainComponent)
    assert.lengthOf(mainComponent, 1, 'FiltersPaneMainComponent should be set')
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      updateFilter: props.updateFilter,
      updateDatesFilter: props.updateDatesFilter,
      updateValuesFilter: props.updateValuesFilter,
      inputValues: props.inputValues,
      filtersI18n: props.filtersI18n,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneDatePickerField), 1, 'There should be 1 FilterPaneDatePickerField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneTextFieldValues), 1, 'There should be 1 FilterPaneTextFieldValues')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectFieldLegacy), 1, 'There should be 1 FilterPaneSelectFieldLegacy')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectField), 1, 'There should be 1 FilterPaneSelectField')
  })
})
