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
import RemoveLevelOption from '../../../../src/components/admin/levels/RemoveLevelOption'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test RemoveLevelOption
 * @author Raphaël Mechali
 */
describe('[Search Graph] Testing RemoveLevelOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RemoveLevelOption)
  })
  it('should render correctly', () => {
    let spiedCall = null
    const props = {
      rowIndex: 4,
      onDelete: (index) => {
        spiedCall = { index }
      },
    }
    const enzymeWrapper = shallow(<RemoveLevelOption {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1, 'There should be the button')
    testSuiteHelpers.assertWrapperProperties(button, {
      onClick: enzymeWrapper.instance().onDeleteClicked,
    })

    // simulate click and check callback is correctly called
    assert.isNull(spiedCall, 'callback should not yest have been called')
    enzymeWrapper.instance().onDeleteClicked()
    assert.deepEqual(spiedCall, { index: 4 }, 'Callback should have been called with right index')
  })
})
