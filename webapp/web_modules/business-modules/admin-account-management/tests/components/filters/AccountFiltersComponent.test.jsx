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
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import IconButton from 'material-ui/IconButton'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AccountFiltersComponent from '../../../src/components/filters/AccountFiltersComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN ACCOUNT MANAGEMENT] Testing account filters component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      origins: [],
      projects: {},

      // table sorting, column visiblity & filters management
      filters: {},
      updateFilter: () => { },
      clearFilters: () => { },
    }
    const enzymeWrapper = shallow(<AccountFiltersComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TextField), 3, 'There should be 3 TextField')
    assert.lengthOf(enzymeWrapper.find(SelectField), 3, 'There should be 3 SelectField')
    assert.lengthOf(enzymeWrapper.find(IconButton), 1, 'There should be 1 IconButton')
  })
})
