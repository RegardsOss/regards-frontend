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
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import ProjectUserQuotaFiltersComponent from '../../../../src/components/list/filters/ProjectUserQuotaFiltersComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing user access right filters component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserQuotaFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      uiSettings: {
        showVersion: true,
        documentModels: [],
        primaryQuicklookGroup: '',
        quotaWarningCount: 50,
        rateWarningCount: 50,
      },

      // table sorting, column visiblity & filters management
      filters: {},
      updateFilter: () => { },
      clearFilters: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserQuotaFiltersComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TextField), 3, 'There should be 3 TextField')
    assert.lengthOf(enzymeWrapper.find(Checkbox), 1, 'There should be 1 Checkbox')
    assert.lengthOf(enzymeWrapper.find(IconButton), 1, 'There should be 1 IconButton')
  })
})
