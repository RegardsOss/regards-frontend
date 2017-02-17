/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import sinon from 'sinon'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MenuItem from 'material-ui/MenuItem'
import { Field } from '@regardsoss/form-utils'
import { DefaultLayout } from '@regardsoss/layout'
import { Card } from 'material-ui/Card'
import { PluginProvider } from '@regardsoss/plugins'
import Styles from '../../../../src/styles/styles'
import CriteriaConfigurationComponent from '../../../../src/components/admin/criterion/CriteriaConfigurationComponent'
import { UnconnectedFormCriteriaComponent } from '../../../../src/components/admin/criterion/FormCriteriaComponent'

/**
 * Tests for FormCriteriaComponent
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing FormCriteriaComponent', () => {
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a new criteria criteria form', () => {
    const saveCriteriaCallback = sinon.spy()
    const cancelCallback = sinon.spy()
    const reduxFormInitialize = sinon.spy()
    const handleSubmitCallback = sinon.spy()
    const onChangeCallback = sinon.spy()

    const props = {
      criteria: null,
      saveCriteria: saveCriteriaCallback,
      cancel: cancelCallback,
      layout: JSON.stringify(DefaultLayout),
      selectableAttributes: {},
      availableCriterion: {},
      criterionFetching: false,
      initialize: reduxFormInitialize,
      handleSubmit: handleSubmitCallback,
    }

    const wrapper = shallow(
      <UnconnectedFormCriteriaComponent {...props} />, options,
    )

    // Check for Card
    const card = wrapper.find(Card)
    assert(reduxForm.length === 1, 'The Card should be rendered')

    // Check for plugin selection field
    const pluginIdField = reduxForm.find(Field).find({ name: 'pluginId' })
    assert(pluginIdField.length === 1, 'The pluginId field should be rendered')

    // Check for container selection field
    const containerField = reduxForm.find(Field).find({ name: 'container' })
    assert(containerField.length === 1, 'The container field should be rendered')
    const containerElements = containerField.find(MenuItem)
    assert.lengthOf(containerElements, 1, 'There should be 1 selectable container')
    assert.equal(containerElements.first().prop('value'), 'application', 'The selectable container from defaultFormLayout should be application')

    // Check for specific criteria configuration
    let criteriaConf = reduxForm.find(CriteriaConfigurationComponent)
    assert(criteriaConf.length === 0, 'The CriteriaConfigurationComponent should not be rendered as no plugin as been selected yet')

    // Check redux form initialization
    assert.isFalse(reduxFormInitialize.called, 'The redux from initialize method should not be called as no criteria is provided')

    // Simulate selection of a criteria of id 0
    assert.isFalse(onChangeCallback.called, 'The redux change value method should not be called yet')
    const event = null
    const index = 0
    const pluginId = 0
    const reduxInput = {
      onChange: onChangeCallback,
    }
    pluginIdField.simulate('select', event, index, pluginId, reduxInput)
    criteriaConf = wrapper.find(CriteriaConfigurationComponent)
    const pluginProvider = wrapper.find(PluginProvider)
    assert(pluginProvider.length === 1, 'The plugin provider should be rendered as a plugin is selected')
    assert.equal(pluginProvider.prop('pluginId'), 0, 'The pluginProvider should be initialize with selected plugin id = 0')
    assert.equal(pluginProvider.prop('displayPlugin'), false, 'The pluginProvider should be initialize without plugin display')
    assert(criteriaConf.length === 1, 'The CriteriaConfigurationComponent should be rendered as a plugin as been selected')
    assert(onChangeCallback.calledOnce, 'The redux change value method should be called')
  })

  it('Should render a edit criteria form', () => {
    const saveCriteriaCallback = sinon.spy()
    const cancelCallback = sinon.spy()
    const reduxFormInitialize = sinon.spy()
    const handleSubmitCallback = sinon.spy()

    const props = {
      criteria: {
        id: 0,
        label: 'criteria de test',
        pluginId: 0,
        container: 'main',
        pluginConf: {
          attributes: {
            searchField: 0,
          },
        },
      },
      saveCriteria: saveCriteriaCallback,
      cancel: cancelCallback,
      layout: JSON.stringify(DefaultLayout),
      selectableAttributes: {},
      availableCriterion: {},
      criterionFetching: false,
      initialize: reduxFormInitialize,
      handleSubmit: handleSubmitCallback,
    }

    const wrapper = shallow(
      <UnconnectedFormCriteriaComponent {...props} />, options,
    )

    // Check for Card
    const card = wrapper.find(Card)
    assert(reduxForm.length === 1, 'The Card should be rendered')

    // Check for plugin selection field
    const pluginIdField = reduxForm.find(Field).find({ name: 'pluginId' })
    assert(pluginIdField.length === 1, 'The pluginId field should be rendered')

    // Check for container selection field
    const containerField = reduxForm.find(Field).find({ name: 'container' })
    assert(containerField.length === 1, 'The container field should be rendered')
    const containerElements = containerField.find(MenuItem)
    assert.lengthOf(containerElements, 1, 'There should be 1 selectable container')
    assert.equal(containerElements.first().prop('value'), 'application', 'The selectable container from defaultFormLayout should be application')

    // Check for specific criteria configuration
    const criteriaConf = reduxForm.find(CriteriaConfigurationComponent)
    assert(criteriaConf.length === 1, 'The CriteriaConfigurationComponent should be rendered')

    // Check redux form initialization
    assert(reduxFormInitialize.called, 'The redux form initialize method should be called')
  })
})
