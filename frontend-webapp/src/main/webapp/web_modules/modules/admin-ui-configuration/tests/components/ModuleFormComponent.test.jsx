/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import { CardTitle } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem'
import { Field } from '@regardsoss/form-utils'
import { ShowableAtRender, CardActionsComponent } from '@regardsoss/components'
import { AvailableModules } from '@regardsoss/modules'
import Styles from '../../src/styles/styles'
import { UnconnectedModuleFormComponent } from '../../src/components/ModuleFormComponent'

/**
 * Tests for ModuleFormComponent
 * @author Sébastien binda
 */
describe('[ADMIN UI-CONFIGURATION] Testing Modules form component', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  const muiTheme = getMuiTheme({
    linkWithoutDecoration: {},
  })
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: opt => opt.id,
        formatTime: () => {},
        formatDate: () => {},
        formatRelative: () => {},
        formatNumber: () => {},
        formatPlural: () => {},
        formatHTMLMessage: () => {},
        now: () => {},
      },
    },
  }

  it('Should render correctly form to create a new module', () => {
    const props = {
      project: 'test',
      containers: ['main', 'second', 'third'],
      onSubmit: () => {},
      onBack: () => {},
      applicationId: 'test',
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />
      , options)

    // Check form title
    const titleCard = wrapper.find(CardTitle)
    const titleWrapper = titleCard.dive(options)
    const title = titleWrapper.find(FormattedMessage).prop('id')
    assert.equal(title, 'module.form.title.create', 'Should render a create form not an update form')

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.equal(staticFields.find(ShowableAtRender).prop('show'), true, 'Static field name should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'name' }), 'Name field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'description' }), 'Description field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'container' }), 'Container field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'container' }).find(MenuItem).length === props.containers.length)
    assert.isDefined(staticFields.find(Field).find({ name: 'active' }), 'Active field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'name' }).find(MenuItem).length === AvailableModules.length)

    // Check for dynamic fields
    let dynamicFields = wrapper.find({ id: 'dynamicFields' })
    assert.isTrue(dynamicFields.length === 0, 'The dynamic fields should not be displayed since no module is selected')

    // Check for buttons
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')

    // Simulate module selection
    staticFields.find(Field).find({ name: 'name' }).simulate('select', null, 0, AvailableModules[0], { onChange: () => {} })
    dynamicFields = wrapper.find({ id: 'dynamicFields' })
    assert.isTrue(dynamicFields.length === 1, 'The dynamic fields should be displayed since a module is selected')
  })

  it('Should render correctly form to edit an existing module', () => {
    const moduleToEdit = {
      id: 1,
      name: 'menu',
      description: 'Test de menu',
      active: true,
      applicationId: 'test',
      container: 'main',
      conf: {},
    }
    const props = {
      project: 'test',
      module: moduleToEdit,
      containers: ['main', 'second', 'third'],
      onSubmit: () => {},
      onBack: () => {},
      applicationId: 'test',
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const wrapper = shallow(
      <UnconnectedModuleFormComponent {...props} />
      , options)

    // Check form title
    const titleCard = wrapper.find(CardTitle)
    const titleWrapper = titleCard.dive(options)
    const title = titleWrapper.find(FormattedMessage).prop('id')
    assert.equal(title, 'module.form.title.update', 'Should render an update form not a create one')

    // Check form static fields
    const staticFields = wrapper.find({ id: 'staticFields' })
    assert.equal(staticFields.find(ShowableAtRender).prop('show'), false, 'Static field name should not be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'name' }), 'Name field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'description' }), 'Description field should be displayed')
    assert.isDefined(staticFields.find(Field).find({ name: 'container' }), 'Container field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'container' }).find(MenuItem).length === props.containers.length)
    assert.isDefined(staticFields.find(Field).find({ name: 'active' }), 'Active field should be displayed')
    assert.isTrue(staticFields.find(Field).find({ name: 'name' }).find(MenuItem).length === AvailableModules.length)

    // Check for dynamic fields
    const dynamicFields = wrapper.find({ id: 'dynamicFields' })
    assert.isTrue(dynamicFields.length === 1, 'The dynamic fields should be displayed since a module is selected')

    // Check for buttons
    const buttons = wrapper.find(CardActionsComponent)
    assert.isTrue(buttons.length === 1, 'Buttons should be displayed')
  })
})
