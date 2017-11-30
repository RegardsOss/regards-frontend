/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import Styles from '../../src/styles/styles'
import { UnconnectedModuleFormComponent } from '../../src/components/ModuleFormComponent'
import DynamicModuleFormComponent from '../../src/components/DynamicModuleFormComponent'

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

  const muiTheme = getMuiTheme({
    linkWithoutDecoration: {},
  })
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: opt => opt.id,
        formatTime: () => { },
        formatDate: () => { },
        formatRelative: () => { },
        formatNumber: () => { },
        formatPlural: () => { },
        formatHTMLMessage: () => { },
        now: () => { },
      },
    },
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
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />
      , options,
    )

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.equal(staticFields.find(ShowableAtRender).prop('show'), true, 'Static field name should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'name' }), 'Name field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'description' }), 'Description field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'container' }), 'Container field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'container' }).find(MenuItem).length === props.containers.length)
    assert.isDefined(staticFields.find(Field).find({ name: 'active' }), 'Active field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'type' }).find(MenuItem).length === props.availableModuleTypes.length)

    // Check for dynamic fields
    let dynamicFields = wrapper.find(DynamicModuleFormComponent)
    assert.isTrue(dynamicFields.length === 0, 'The dynamic fields should not be displayed since no module is selected')

    // Check for buttons
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')

    // Simulate module selection
    staticFields.find(Field).find({ name: 'type' }).simulate('select', null, 0, props.availableModuleTypes[0], { onChange: () => { } })
    dynamicFields = wrapper.find(DynamicModuleFormComponent)
    assert.isTrue(dynamicFields.length === 1, 'The dynamic fields should be displayed since a module is selected')
  })

  it('Should render correctly form to edit an existing module', () => {
    const moduleToEdit = {
      id: 1,
      type: 'menu',
      description: 'Test de menu',
      active: true,
      applicationId: 'test',
      container: 'main',
      conf: {},
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
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />
      , options,
    )

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.equal(staticFields.find(ShowableAtRender).prop('show'), false, 'Static field name should not be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'name' }), 'Name field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'description' }), 'Description field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'container' }), 'Container field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'container' }).find(MenuItem).length === props.containers.length)
    assert.isDefined(staticFields.find(Field).find({ name: 'active' }), 'Active field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'type' }).find(MenuItem).length === props.availableModuleTypes.length)

    // Check for dynamic fields
    const dynamicFields = wrapper.find(DynamicModuleFormComponent)
    assert.isTrue(dynamicFields.length === 1, 'The dynamic fields should be displayed since a module is selected')

    // Check for buttons
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')
  })
})
