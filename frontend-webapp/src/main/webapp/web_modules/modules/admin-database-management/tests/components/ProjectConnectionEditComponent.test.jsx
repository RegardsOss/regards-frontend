import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import ProjectConnectionEditComponent from '../../src/components/ProjectConnectionEditComponent'
import ProjectConnectionFormComponent from '../../src/components/ProjectConnectionFormComponent'

// Test a component rendering
describe('[ADMIN DATABASE MANAGEMENT] Testing ProjectConnectionEditComponent', () => {
  it('should exists', () => {
    assert.isDefined(ProjectConnectionEditComponent)
  })

  it('should render the subcomponents', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          project: {
            id: 0,
            name: 'cdpp',
          },
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.SUCCESS,
        },
        links: [],
      },
      onSubmit: () => console.log('onSubmit'),
      onCancel: () => console.log('onCancel'),
    }
    const enzymeWrapper = shallow(<ProjectConnectionEditComponent {...props} />)
    expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(1)
  })
})
