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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ParameterPresentation from '../../src/common/ParameterPresentation'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  ParameterPresentation
* @author Sébastien Binda
*/
describe('[Entities Common] Testing  ParameterPresentation', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ParameterPresentation)
  })
  it('should render correctly with description', () => {
    const props = {
      label: 'label',
      description: 'description',
    }
    const enzymeWrapper = shallow(<ParameterPresentation name {...props} />, { context })
    const icon = enzymeWrapper.find(IconButton)
    assert.lengthOf(icon, 1, 'The description icon should be displayed')
  })
  it('should render correctly without description', () => {
    const props = {
      label: 'label',
    }
    const enzymeWrapper = shallow(<ParameterPresentation name {...props} />, { context })
    const icon = enzymeWrapper.find(IconButton)
    assert.lengthOf(icon, 0, 'The description icon should not be displayed')
  })
})
