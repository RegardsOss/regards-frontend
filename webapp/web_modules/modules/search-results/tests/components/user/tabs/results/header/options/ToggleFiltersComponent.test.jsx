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
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToggleFiltersComponent from '../../../../../../../src/components/user/tabs/results/header/options/ToggleFiltersComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ToggleFiltersComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing ToggleFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleFiltersComponent)
  })
  it('should render correctly with enabled filters', () => {
    const props = {
      filtersEnabled: true,
      onFiltersToggled: () => {},
    }
    const enzymeWrapper = shallow(<ToggleFiltersComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'search.results.toggle.filters',
      onClick: props.onFiltersToggled,
      secondary: true,
    })
  })
  it('should render correctly with disabled filters', () => {
    const props = {
      filtersEnabled: false,
      onFiltersToggled: () => {},
    }
    const enzymeWrapper = shallow(<ToggleFiltersComponent {...props} />, { context })
    const button = enzymeWrapper.find(FlatButton)
    assert.lengthOf(button, 1)
    testSuiteHelpers.assertWrapperProperties(button, {
      label: 'search.results.toggle.filters',
      onClick: props.onFiltersToggled,
      secondary: false,
    })
  })
})
