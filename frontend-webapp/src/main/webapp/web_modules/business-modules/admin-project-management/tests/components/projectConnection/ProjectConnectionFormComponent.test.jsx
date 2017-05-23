import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnectionFormComponent } from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

const options = {
  context: buildTestContext(),
}

const props = {
  microservice: 'some microservice name',
  project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
  projectConnection: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'PostgreSQL',
      url: 'http://google.com',
      connectivity: EnumConnectivity.SUCCESS,
    },
    links: [],
  },
  onUpdate: () => {},
  onSubmit: () => {},
  onCancel: () => {},
  // This props allow to define if the current form is displayed in a stepper
  // or as a single form
  isStep: false,
  onNext: () => {},
  // from reduxForm
  submitting: false,
  pristine: false,
  handleSubmit: () => {},
  initialize: () => {},
  invalid: false,
}


// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ProjectConnectionFormComponent)
  })

  it('should not be decorated with redux-form', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />, options)
    assert.isUndefined(enzymeWrapper.props().form)
  })

  it('should render the subcomponents', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />, options)
    expect(enzymeWrapper.find(Field)).to.have.length(4)
  })
})
