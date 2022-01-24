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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../../src/domain/NavigationItemTypes'
import EditOption from '../../../../../src/components/admin/navigation/options/EditOption'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test EditOption
 * @author Raphaël Mechali
 */
describe('[Menu] Testing EditOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(EditOption)
  })
  it('should render correctly for section', () => {
    const spiedValues = {}
    const props = {
      type: NAVIGATION_ITEM_TYPES_ENUM.SECTION,
      id: 3,
      onEdit: (type, id) => {
        spiedValues.type = type
        spiedValues.id = id
      },
      canEdit: true,
    }

    const enzymeWrapper = shallow(<EditOption {...props} />, { context })
    enzymeWrapper.instance().onEdit()
    assert.equal(spiedValues.type, props.type, 'The callback should trigger the right type')
    assert.equal(spiedValues.id, props.id, 'The callback should trigger the right ID')
    const iconButton = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.equal(iconButton.props().onClick, enzymeWrapper.instance().onEdit, 'The component should set up the right callback')
    assert.isFalse(iconButton.props().disabled, 'The component should be enabled')
  })
  it('should render correctly for editable module', () => {
    const spiedValues = {}
    const props = {
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      id: 99,
      onEdit: (type, id) => {
        spiedValues.type = type
        spiedValues.id = id
      },
      canEdit: true,
    }

    const enzymeWrapper = shallow(<EditOption {...props} />, { context })
    enzymeWrapper.instance().onEdit()
    assert.equal(spiedValues.type, props.type, 'The callback should trigger the right type')
    assert.equal(spiedValues.id, props.id, 'The callback should trigger the right ID')
    const iconButton = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.equal(iconButton.props().onClick, enzymeWrapper.instance().onEdit, 'The component should set up the right callback')
    assert.isFalse(iconButton.props().disabled, 'The component should be enabled')
  })
  it('should render correctly for non editable module (home)', () => {
    const props = {
      type: NAVIGATION_ITEM_TYPES_ENUM.MODULE,
      id: 99,
      onEdit: () => { },
      canEdit: false,
    }

    const enzymeWrapper = shallow(<EditOption {...props} />, { context })
    const iconButton = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.equal(iconButton.props().onClick, enzymeWrapper.instance().onEdit, 'The component should set up the right callback')
    assert.isTrue(iconButton.props().disabled, 'The component should be disabled')
  })
})
