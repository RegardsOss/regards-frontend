/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { FieldArray } from 'redux-form'
import { Field } from '@regardsoss/form-utils'
import Styles from '../../../src/styles/styles'
import { UnconnectedAttributeRegroupementFormComponent } from '../../../src/components/admin/AttributeRegroupementFormComponent'

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[RESULTS MODULE] Testing AttributeRegroupementFormComponent', () => {
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

  it('Should render a AttributeRegroupementFormComponent', () => {
    const props = {
      onClose: () => {},
      onSubmit: () => {},
      selectableAttributes: {},
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
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
