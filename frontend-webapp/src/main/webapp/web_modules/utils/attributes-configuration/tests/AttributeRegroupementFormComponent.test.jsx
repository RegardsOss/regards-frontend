/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { FieldArray } from 'redux-form'
import { Field } from '@regardsoss/form-utils'
import { UnconnectedAttributeRegroupementFormComponent } from '../src/AttributeRegroupementFormComponent'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES CONFIGURATION] Testing AttributeRegroupementFormComponent', () => {
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
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: {},
      intl: {
        formatMessage: id => (id.id),
      },
    },
  }

  it('Should render a AttributeRegroupementFormComponent', () => {
    const props = {
      onClose: () => { },
      onSubmit: () => { },
      selectableAttributes: {},
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }

    const wrapper = shallow(
      <UnconnectedAttributeRegroupementFormComponent {...props} />, options,
    )

    const labelField = wrapper.find(Field).find({ name: 'label' })
    assert.lengthOf(labelField, 1, 'There should be a field for label in this form')

    const attributesField = wrapper.find(FieldArray).find({ name: 'attributes' })
    assert.lengthOf(attributesField, 1, 'There should be a field for attributes in this form')
  })
})
