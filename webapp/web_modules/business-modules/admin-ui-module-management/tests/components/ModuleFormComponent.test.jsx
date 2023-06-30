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
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import styles from '../../src/styles/styles'
import { UnconnectedModuleFormComponent } from '../../src/components/ModuleFormComponent'
import DynamicModuleFormComponent from '../../src/components/DynamicModuleFormComponent'

const context = buildTestContext(styles)

/**
 * Tests for ModuleFormComponent
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Modules form component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const testContainers = [
    {
      id: 'main',
      type: 'test',
      dynamicContent: false,
    },
    {
      id: 'second',
      type: 'test',
      dynamicContent: false,
    },
    {
      id: 'third',
      type: 'test',
      dynamicContent: false,
    },
  ]

  const options = {
    context,
  }

  it('Should render correctly form to create a new module', () => {
    const props = {
      project: 'test',
      availableModuleTypes: ['aModule'],
      containers: testContainers,
      onSubmit: () => { },
      onBack: () => { },
      applicationId: 'test',
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
      adminForm: {
        isEditing: false,
        isCreating: true,
        isDuplicating: false,
        form: { // required for module form display
          aValue: 'a value',
        },
      },
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />,
      options,
    )

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.lengthOf(staticFields.find(Field).find({ name: 'description' }), 1, 'Description field should be displayed')
    assert.lengthOf(staticFields.find(Field).find({ name: 'type' }), 1, 'Type field should be displayed')
    const containerFieldWrapper = staticFields.find(Field).find({ name: 'container' })
    assert.lengthOf(containerFieldWrapper, 1, 'Container field should be displayed')
    assert.lengthOf(containerFieldWrapper.find(MenuItem), props.containers.length, 'Container field should display one option for each container')

    // Check page fields: no container (initial)
    let pageFields = wrapper.find({ id: 'pageFields' })
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.home' }), 0, 'Page field "page.home" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.iconType' }), 0, 'Page field "page.iconType" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.customIconURL' }), 0, 'Page field "page.customIconURL" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.en' }), 0, 'Page field "page.title.en" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.fr' }), 0, 'Page field "page.title.fr" (initial) should be hidden')

    // Check page fields: with dynamic container
    wrapper.setState({ dynamicContainerSelected: true })
    pageFields = wrapper.find({ id: 'pageFields' })
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.home' }), 1, 'Page field "page.home" (dynamic container) should be displayed')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.iconType' }), 1, 'Page field "page.iconType" (dynamic container) should be displayed')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.customIconURL' }), 1, 'Page field "page.customIconURL" (dynamic container) should be displayed')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.en' }), 1, 'Page field "page.title.en" (dynamic container) should be displayed')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.fr' }), 1, 'Page field "page.title.fr" (dynamic container) should be displayed')

    // check page fields: with non dynamic container
    wrapper.setState({ dynamicContainerSelected: false })
    pageFields = wrapper.find({ id: 'pageFields' })
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.home' }), 0, 'Page field "page.home" (non dynamic container) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.iconType' }), 0, 'Page field "page.iconType" (non dynamic container) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.customIconURL' }), 0, 'Page field "page.customIconURL" (non dynamic container) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.en' }), 0, 'Page field "page.title.en" (non dynamic container) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.fr' }), 0, 'Page field "page.title.fr" (non dynamic container) should be hidden')

    // check dynamic module form: initially hidden
    let dynamicForm = wrapper.find(DynamicModuleFormComponent)
    assert.lengthOf(dynamicForm, 0, 'The dynamic form should be hidden (no module selected)')

    // Simulate module selection and check module form is displayed
    staticFields.find(Field).find({ name: 'type' }).simulate('select', null, 0, props.availableModuleTypes[0], { onChange: () => { } })
    dynamicForm = wrapper.find(DynamicModuleFormComponent)
    assert.lengthOf(dynamicForm, 1, 'The dynamic form should be displayed after module selection')

    // Finally, verify that the form buttons are available
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')
  })

  it('Should render correctly form to edit an existing module', () => {
    const moduleToEdit = {
      id: 1,
      type: 'menu',
      description: 'Test de menu',
      active: true,
      applicationId: 'test',
      container: 'main',
      conf: {

      },
    }
    const props = {
      project: 'test',
      module: moduleToEdit,
      availableModuleTypes: ['menu'],
      containers: testContainers,
      onSubmit: () => { },
      onBack: () => { },
      applicationId: 'test',
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
      adminForm: {
        isEditing: false,
        isCreating: true,
        isDuplicating: false,
        form: {
          aValue: 'a value',
        },
      },
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />,
      options,
    )
    wrapper.setState({
      moduleSelected: true,
    })

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.lengthOf(staticFields.find(Field).find({ name: 'description' }), 1, 'Description field should be displayed')
    assert.lengthOf(staticFields.find(Field).find({ name: 'type' }), 1, 'Type field should be displayed')
    const containerFieldWrapper = staticFields.find(Field).find({ name: 'container' })
    assert.lengthOf(containerFieldWrapper, 1, 'Container field should be displayed')
    assert.lengthOf(containerFieldWrapper.find(MenuItem), props.containers.length, 'Container field should display one option for each container')

    // Check for page fields (not displayed)
    const pageFields = wrapper.find({ id: 'pageFields' })
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.home' }), 0, 'Page field "page.home" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.iconType' }), 0, 'Page field "page.iconType" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.customIconURL' }), 0, 'Page field "page.customIconURL" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.en' }), 0, 'Page field "page.title.en" (initial) should be hidden')
    assert.lengthOf(pageFields.find(Field).find({ name: 'page.title.fr' }), 0, 'Page field "page.title.fr" (initial) should be hidden')

    // as module is selected, we should find here the dynamic module fields
    const dynamicForm = wrapper.find(DynamicModuleFormComponent)
    assert.lengthOf(dynamicForm, 1, 'The dynamic form should be displayed  in edition')

    // Check for buttons
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')
  })
})
