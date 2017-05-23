/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { FieldArray } from 'redux-form'
import { Field } from '@regardsoss/form-utils'
import { UnconnectedAttributeRegroupementFormComponent } from '../../src/configuration/AttributeRegroupementFormComponent'


const context = buildTestContext()

/**
 * Tests for FormParametersConfigurationComponent
 * @author Sébastien binda
 */
describe('[ATTRIBUTES COMMON] Testing AttributeRegroupementFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UnconnectedAttributeRegroupementFormComponent)
  })

  it('Should render a AttributeRegroupementFormComponent', () => {
    const props = {
      onClose: () => { },
      onSubmit: () => { },
      selectableAttributes: {},
      validateLabel: () => {},
      submitting: false,
      pristine: false,
      invalid: false,
      handleSubmit: () => { },
      initialize: () => { },
    }

    const wrapper = shallow(
      <UnconnectedAttributeRegroupementFormComponent {...props} />, { context },
    )

    const labelField = wrapper.find(Field).find({ name: 'label' })
    assert.lengthOf(labelField, 1, 'There should be a field for label in this form')

    const attributesField = wrapper.find(FieldArray).find({ name: 'attributes' })
    assert.lengthOf(attributesField, 1, 'There should be a field for attributes in this form')
  })
})
