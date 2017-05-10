import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnectionFormComponent } from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

const props = {
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
  onSubmit: () => {
  },
  onCancel: () => {
  },
  submitting: false,
  pristine: false,
  handleSubmit: () => {
  },
  initialize: () => {
  },
  invalid: false,
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionFormComponent', () => {
  it('should exists', () => {
    assert.isDefined(ProjectConnectionFormComponent)
  })

  it('should not be decorated with redux-form', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />)
    assert.isUndefined(enzymeWrapper.props().form)
  })

  it('should render the subcomponents', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />)
    expect(enzymeWrapper.find(Field)).to.have.length(4)
  })
})
