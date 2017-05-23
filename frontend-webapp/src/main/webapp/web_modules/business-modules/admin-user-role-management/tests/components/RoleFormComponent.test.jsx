/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { RoleFormComponent } from '../../src/components/RoleFormComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentRole: DumpProvider.getFirstEntity('AdminClient', 'Role'),
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(2)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(2)
  })
})
