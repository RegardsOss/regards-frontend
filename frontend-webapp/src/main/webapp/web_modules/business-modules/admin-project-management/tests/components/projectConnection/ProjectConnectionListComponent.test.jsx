import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRow } from 'material-ui/Table'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ProjectConnectionListComponent } from '../../../src/components/projectConnection/ProjectConnectionListComponent'


const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectConnectionListComponent)
  })

  it('should render the subcomponents', () => {
    const props = {
      project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      projectConnections: {
        0: {
          content: {
            id: 0,
            project: {
              id: 0,
              name: 'cdpp',
            },
            microservice: 'ms-1',
            userName: 'Alice',
            password: 'password',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            connectivity: EnumConnectivity.SUCCESS,
          },
          links: [],
        },
        1: {
          content: {
            id: 1,
            project: {
              id: 0,
              name: 'cdpp',
            },
            microservice: 'ms-2',
            userName: 'Bob',
            password: 'azerty',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            connectivity: EnumConnectivity.ERROR,
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            project: {
              id: 0,
              name: 'cdpp',
            },
            microservice: 'ms-3',
            userName: 'Charlie',
            password: 'qsdfgh',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            connectivity: EnumConnectivity.NOT_TESTED,
          },
          links: [],
        },
      },
      onEdit: () => {},
      onCreate: () => {},
      onTestConnection: () => {},
      refreshConnection: () => {},
    }
    const enzymeWrapper = shallow(<ProjectConnectionListComponent {...props} />, options)
    console.log(enzymeWrapper.debug())
    expect(enzymeWrapper.find(TableRow)).to.have.length(6)
  })
},
)
