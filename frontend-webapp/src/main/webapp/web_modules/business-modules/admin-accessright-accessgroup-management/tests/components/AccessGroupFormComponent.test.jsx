/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import { AccessGroupFormComponent } from '../../src/components/AccessGroupFormComponent'

const context = buildTestContext()

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessGroupFormComponent)
  })

  it('Render properly', () => {
    const props = {
      onSubmit: () => {},
      backUrl: '#',
      isDuplicating: false,
      isCreating: true,
      isEditing: false,
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<AccessGroupFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(2)
  })
})
