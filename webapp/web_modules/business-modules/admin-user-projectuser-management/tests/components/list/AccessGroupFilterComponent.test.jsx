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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import AccessGroupFilterComponent from '../../../src/components/list/AccessGroupFilterComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AccessGroupFilterComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing AccessGroupFilterComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupFilterComponent)
  })
  it('should render no data', () => {
    const props = {
      selectedGroup: null,
      groups: {},
      isLoading: false,
      onSelectGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFilterComponent {...props} />, { context })
    const dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, 'There should be the drop down button')
    assert.isTrue(dropDownWrapper.props().disabled, 'Button should be disabled as there is no group available')
    assert.equal(dropDownWrapper.props().value, props.selectedGroup, 'Selected group value should be correctly reported')
    assert.equal(dropDownWrapper.props().onChange, props.onSelectGroup, 'Callback should be set from props')
    assert.lengthOf(dropDownWrapper.find(MenuItem), 1, 'There should only be the ALL option')
  })
  it('should render correctly loading', () => {
    const props = {
      selectedGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isLoading: true,
      onSelectGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFilterComponent {...props} />, { context })
    const dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, 'There should be the drop down button')
    assert.isTrue(dropDownWrapper.props().disabled, 'Button should be disabled as it is loading')
    assert.equal(dropDownWrapper.props().value, props.selectedGroup, 'Selected group value should be correctly reported')
    assert.equal(dropDownWrapper.props().onChange, props.onSelectGroup, 'Callback should be set from props')
    assert.lengthOf(dropDownWrapper.find(MenuItem), 1 + values(props.groups).length, 'There should ALL option plus one option by group')
  })
  it('should render correctly in default case', () => {
    const props = {
      selectedGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isLoading: false,
      onSelectGroup: () => { },
    }
    const enzymeWrapper = shallow(<AccessGroupFilterComponent {...props} />, { context })
    const dropDownWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDownWrapper, 1, 'There should be the drop down button')
    assert.isFalse(dropDownWrapper.props().disabled, 'Button should be enabled')
    assert.equal(dropDownWrapper.props().value, props.selectedGroup, 'Selected group value should be correctly reported')
    assert.equal(dropDownWrapper.props().onChange, props.onSelectGroup, 'Callback should be set from props')
    assert.lengthOf(dropDownWrapper.find(MenuItem), 1 + values(props.groups).length, 'There should ALL option plus one option by group')
  })
})
