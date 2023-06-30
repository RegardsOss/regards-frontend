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
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AddLevelOption from '../../../../src/components/admin/levels/AddLevelOption'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AddLevelOption
 * @author Raphaël Mechali
 */
describe('[Search Graph] Testing AddLevelOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddLevelOption)
  })
  it('should render correctly empty', () => {
    const props = {
      selectableLevels: [],
      onAddLevel: () => { },
    }
    const enzymeWrapper = shallow(<AddLevelOption {...props} />, { context })
    const dropdown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropdown, 1, 'There should be a drop down button')
    testSuiteHelpers.assertWrapperProperties(dropdown, {
      disabled: true,
      onChange: props.onAddLevel,
    })
  })
  it('should render correctly with content', () => {
    const props = {
      selectableLevels: [{
        content: {
          id: 0,
          description: 'M1',
          name: 'M1',
        },
      }, {
        content: {
          id: 1,
          description: 'M2',
          name: 'M2',
        },
      }],
      onAddLevel: () => { },
    }
    const enzymeWrapper = shallow(<AddLevelOption {...props} />, { context })
    const dropdown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropdown, 1, 'There should be a drop down button')
    testSuiteHelpers.assertWrapperProperties(dropdown, {
      disabled: false,
      onChange: props.onAddLevel,
    })
    assert.lengthOf(dropdown.find(MenuItem), 2, 'There should be one item for each model')
  })
})
