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
import RemoveOption from '../../../../src/configuration/multiple/selected/RemoveOption'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RemoveOption
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing RemoveOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RemoveOption)
  })
  it('should render correctly', () => {
    let spiedRemoveData = null
    const props = {
      rowIndex: 99,
      onRemove: (rowIndex) => {
        spiedRemoveData = rowIndex
      },
    }
    const enzymeWrapper = shallow(<RemoveOption {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    assert.equal(button.props().onClick, enzymeWrapper.instance().onRemove, 'Callback should be correctly reported')
    // test callback
    assert.isNull(spiedRemoveData, 'Callback should not have yet been called')
    enzymeWrapper.instance().onRemove()
    assert.equal(spiedRemoveData, props.rowIndex, 'Callback should provide the row index to remove element')
  })
})
