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
import RaisedButton from 'material-ui/RaisedButton'
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import GroupsFieldComponent from '../../../src/components/admin/GroupsFieldComponent'
import GroupComponent from '../../../src/components/admin/GroupComponent'
import styles from '../../../src/styles'
import { someGroups } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test GroupsFieldComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing GroupsFieldComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GroupsFieldComponent)
  })
  it('should render correctly', () => {
    const props = {
      availableAttributes: {},
      fields: ReduxFormTestHelper.getFieldsProps(someGroups),
    }
    const enzymeWrapper = shallow(<GroupsFieldComponent {...props} />, { context })
    const instance = enzymeWrapper.instance()

    // check add button
    const addGroupWrapper = enzymeWrapper.find(RaisedButton)
    assert.lengthOf(addGroupWrapper, 1, 'There should be the add group button')
    testSuiteHelpers.assertWrapperProperties(addGroupWrapper, {
      label: 'module.description.configuration.add.group',
      onClick: instance.onAddGroup,
    }, 'Add button properties should be correctly set')

    // check added groups
    const groupWrappers = enzymeWrapper.find(GroupComponent)
    assert.lengthOf(groupWrappers, someGroups.length, 'There should be a group edition component for each edited group model')
    someGroups.forEach((group, index) => {
      const groupEditorComponent = groupWrappers.at(index)
      testSuiteHelpers.assertWrapperProperties(groupEditorComponent, {
        index,
        group,
        allGroups: someGroups,
        availableAttributes: props.availableAttributes,
        onGroupUpdated: instance.onGroupUpdated,
        onGroupMoved: instance.onGroupMoved,
        onGroupRemoved: instance.onGroupRemoved,
      })
    })
  })
})
