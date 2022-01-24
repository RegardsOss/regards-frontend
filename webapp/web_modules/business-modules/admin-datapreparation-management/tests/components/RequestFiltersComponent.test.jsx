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
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import { DatePickerField } from '@regardsoss/components'
import DataPreparationComponent from '../../src/components/DataPreparationComponent'
import RequestFiltersComponent from '../../src/components/RequestFiltersComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RequestFiltersComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing RequestFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RequestFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      // table sorting, column visiblity & filters management
      filters: DataPreparationComponent.DEFAULT_FILTERS_STATE,
      updateFilter: () => {},
      updateValuesFilter: () => {},
      updateDatesFilter: () => {},
      clearFilters: () => {},
    }
    const enzymeWrapper = shallow(<RequestFiltersComponent {...props} />, { context })
    const dateWrapper = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(dateWrapper, 2, 'There should be 2 DatePickerField')

    const textWrapper = enzymeWrapper.find(TextField)
    assert.lengthOf(textWrapper, 4, 'There should be 4 TextField')

    const selectWrapper = enzymeWrapper.find(SelectField)
    assert.lengthOf(selectWrapper, 1, 'There should be a SelectField')

    const iconWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconWrapper, 1, 'There should be a IconButton')
  })
})
