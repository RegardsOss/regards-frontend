/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { ProjectConnectionListContainer } from '../../../src/containers/projectConnection/ProjectConnectionListContainer'
import ProjectConnectionListComponent from '../../../src/components/projectConnection/ProjectConnectionListComponent'

// Test a component rendering
describe(
  '[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionListContainer', () => {
    before(testSuiteHelpers.before)
    after(testSuiteHelpers.after)

    it('should exists', () => {
      assert.isDefined(ProjectConnectionListContainer)
    })

    it('should render the subcomponents', () => {
      const props = {
        params: {
          project_name: 'cdpp',
        },
        project: {
          name: 'cdpp',
        },
        projectConnections: {
          0: {
            content: {
              id: 0,
              project: {
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
          1: {
            content: {
              id: 1,
              project: {
                name: 'cdpp',
              },
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
              project: {
                name: 'cdpp',
              },
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
        fetchProject: () => {},
        fetchProjectConnections: () => {},
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
      const enzymeWrapper = shallow(<ProjectConnectionListContainer {...props} />, options)
      expect(enzymeWrapper.find(ProjectConnectionListComponent)).to.have.length(1)
    })
  },
)
