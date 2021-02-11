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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import IconButton from 'material-ui/IconButton'
import EditOption from '../../../../src/configuration/table/options/EditOption'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EditOption
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing EditOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditOption)
  })
  it('should render correctly and provide row index on edit', () => {
    let spiedEditCall = null
    const props = {
      rowIndex: 99,
      onEdit: (rowIndex) => {
        spiedEditCall = rowIndex
      },
    }
    const enzymeWrapper = shallow(<EditOption {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.equal(button.props().onClick, enzymeWrapper.instance().onEditClicked, 'Callback should be correctly set')
    // test callback
    assert.isNull(spiedEditCall, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onEditClicked()
    assert.equal(spiedEditCall, 99, 'Row index should have been provided when editing')
  })
})
