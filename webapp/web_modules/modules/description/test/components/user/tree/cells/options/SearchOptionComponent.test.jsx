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
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SearchOptionComponent from '../../../../../../src/components/user/tree/cells/options/SearchOptionComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SearchOptionComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing SearchOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SearchOptionComponent)
  })
  it('should render correctly', () => {
    const props = {
      tooltip: 'My tooltip',
      onSearch: () => {},
    }
    const enzymeWrapper = shallow(<SearchOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: props.tooltip,
      onClick: props.onSearch,
    }, 'Button properties should be correctly set')
  })
})
