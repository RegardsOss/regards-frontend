import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRow } from 'material-ui/Table'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnectionListComponent } from '../../src/components/ProjectConnectionListComponent'

// Test a component rendering
describe(
  '[ADMIN DATABASE MANAGEMENT] Testing ProjectConnectionListComponent', () => {
    it('should exists', () => {
      assert.isDefined(ProjectConnectionListComponent)
    })

    it('should render the subcomponents', () => {
      const props = {
        projectConnections: {
          0: {
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
          1: {
            content: {
              id: 1,
              projectName: 'cdpp',
              microservice: 'rs-cloud',
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
              projectName: 'cdpp',
              microservice: 'rs-dam',
              userName: 'Charlie',
              password: 'qsdfgh',
              driverClassName: 'PostgreSQL',
              url: 'http://google.com',
              connectivity: EnumConnectivity.NOT_TESTED,
            },
            links: [],
          },
        },
      }
      const options = {
        context: {
          muiTheme: {
            palette: {
              primary1Color: 'color0',
              accent1Color: 'color1',
              warningColor: 'orange',
            },
          },
        },
      }
      const enzymeWrapper = shallow(<ProjectConnectionListComponent {...props} />, options)
      expect(enzymeWrapper.find(TableRow)).to.have.length(4)
    })
  },
)
