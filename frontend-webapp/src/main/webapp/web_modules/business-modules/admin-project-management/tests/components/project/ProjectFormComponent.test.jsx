/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectFormComponent } from '../../../src/components/project/ProjectFormComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ProjectFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentProject: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      backUrl: '/some/url',
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(8)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(8)
  })
})
