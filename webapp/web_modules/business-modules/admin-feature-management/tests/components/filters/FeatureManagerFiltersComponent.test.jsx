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
  TableLayout, TableHeaderAutoCompleteFilterContainer, DatePickerField, TableHeaderTextField,
} from '@regardsoss/components'
import SelectField from 'material-ui/SelectField'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FeatureManagerFiltersComponent from '../../../src/components/filters/FeatureManagerFiltersComponent'
import styles from '../../../src/styles'

// mock router
const router = require('react-router')

const context = buildTestContext(styles)

/**
 * Test FeatureManagerFiltersComponent
 * @author Théo Lasserre
 */
describe('[ADMIN FEATURE MANAGEMENT] Testing FeatureManagerFiltersComponent', () => {
  let currentLocation = {}
  before(() => {
    testSuiteHelpers.before()
    router.browserHistory.setMockedResult(currentLocation)
    router.browserHistory.setReplaceSpy((location) => {
      currentLocation = location
    })
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(FeatureManagerFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      onApplyFilters: () => { },
      featureManagerFilters: {},
    }
    const enzymeWrapper = shallow(<FeatureManagerFiltersComponent {...props} />, { context })
    const tableWrapper = enzymeWrapper.find(TableLayout)
    assert.lengthOf(tableWrapper, 1, 'There should be a TableLayout')

    const autoCompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilterContainer)
    assert.lengthOf(autoCompleteWrapper, 2, 'There should be 2 TableHeaderAutoCompleteFilterContainer')

    const textFieldWrapper = enzymeWrapper.find(TableHeaderTextField)
    assert.lengthOf(textFieldWrapper, 1, 'There should be a TableHeaderTextField')

    const selectWrapper = enzymeWrapper.find(SelectField)
    assert.lengthOf(selectWrapper, 2, 'There should be 2 SelectField')

    const dateWrapper = enzymeWrapper.find(DatePickerField)
    assert.lengthOf(dateWrapper, 2, 'There should be 2 DatePickerField')
  })
})
