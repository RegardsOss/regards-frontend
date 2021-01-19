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
import Checkbox from 'material-ui/Checkbox'
import FlatButton from 'material-ui/FlatButton'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { DropDownButton } from '@regardsoss/components'
import { AttributesListConfigurationComponent } from '@regardsoss/attributes-common'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import GroupComponent from '../../../src/components/admin/GroupComponent'
import styles from '../../../src/styles'
import { someGroups } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)

/**
 * Test GroupComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing GroupComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(GroupComponent)
  })
  it('should render correctly', () => {
    const props = {
      index: 1,
      group: someGroups[1],
      allGroups: someGroups,
      availableAttributes: {},
      onGroupUpdated: () => { },
      onGroupMoved: () => { },
      onGroupRemoved: () => { },
    }
    const enzymeWrapper = shallow(<GroupComponent {...props} />, { context })
    const wrapperInstance = enzymeWrapper.instance()
    const enableTitleWrapper = enzymeWrapper.find(Checkbox)
    assert.lengthOf(enableTitleWrapper, 1, 'There should be the check box to enable title')
    assert.isFalse(enableTitleWrapper.props().checked, 'Title option should not be checked')
    assert.equal(enableTitleWrapper.props().onCheck, wrapperInstance.onShowTitleChanged, 'Title option callback should be correctly set')

    const titlesTextFields = enzymeWrapper.find(TextField)
    assert.lengthOf(titlesTextFields, 2, 'There should be the titles text fields')
    testSuiteHelpers.assertWrapperProperties(titlesTextFields.at(0), {
      value: props.group.title.en,
      onChange: wrapperInstance.onTitleENChanged,
      disabled: true,
    }, 'English title text field properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(titlesTextFields.at(1), {
      value: props.group.title.fr,
      onChange: wrapperInstance.onTitleFRChanged,
      disabled: true,
    }, 'French title text field properties should be correctly set')

    const attributesListEditor = enzymeWrapper.find(AttributesListConfigurationComponent)
    assert.lengthOf(attributesListEditor, 1, 'There should be the attributes list editor component')
    testSuiteHelpers.assertWrapperProperties(attributesListEditor, {
      selectableAttributes: props.availableAttributes,
      attributesList: props.group.elements,
      allowLabel: true,
      allowAttributesGroups: true,
      hintMessageKey: 'module.description.configuration.group.elements.hint',
      changeField: wrapperInstance.onElementsChanged,
    }, 'Attributes list editor component properties should be correctly set')

    const moveButtonWrapper = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(moveButtonWrapper, 1, 'There should be the move group button')
    testSuiteHelpers.assertWrapperProperties(moveButtonWrapper, {
      getLabel: wrapperInstance.getMoveButtonLabel,
      title: 'module.description.configuration.group.move.action.tooltip',
      disabled: false, // as there are 2 groups
      onChange: wrapperInstance.onGroupMoved,
    }, 'Move button properties should be correctly set')

    const menuItems = moveButtonWrapper.find(MenuItem)
    assert.lengthOf(menuItems, 2, 'There should be 2 menu items options (first and after group 1)')
    assert.isFalse(menuItems.at(0).props().disabled, 'Move at first array position should be enabled')
    assert.isTrue(menuItems.at(1).props().disabled, 'Move at second array position should be disabled')

    const deleteButton = enzymeWrapper.find(FlatButton)
    assert.lengthOf(deleteButton, 1, 'There should be the delete button')
    testSuiteHelpers.assertWrapperProperties(deleteButton, {
      label: 'module.description.configuration.group.remove.action.label',
      title: 'module.description.configuration.group.remove.action.tooltip',
      onClick: wrapperInstance.onGroupRemoved,
    })
  })
})
