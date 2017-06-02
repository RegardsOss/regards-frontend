/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectConnectionsContainer } from '../../../src/containers/projectConnection/ProjectConnectionsContainer'
import ProjectConnectionFormComponent from '../../../src/components/projectConnection/ProjectConnectionFormComponent'
import GuidedProjectConfigurationComponent from '../../../src/components/projectConnection/GuidedProjectConfigurationComponent'

// Test a component rendering
describe(
  '[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionFormContainer', () => {
    before(testSuiteHelpers.before)
    after(testSuiteHelpers.after)

    const context = buildTestContext()

    it('should exists', () => {
      assert.isDefined(ProjectConnectionsContainer)
    })

    it('should render the subcomponents when the project connection is defined', () => {
      const props = {
        params: {
          project_connection_id: '0',
          microservice_name: 'test',
          project_name: 'cdpp',
        },
        projectConnection: {
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
        project: {
          content: {
            name: 'cdpp',
          },
        },
        fetchProject: () => {},
        fetchProjectConnection: () => {},
        projectIsFetching: false,
        projectConnectionsIsFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
      expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(1)
    })


    it('should render the guided view', () => {
      const props = {
        params: {
          project_name: 'cdpp',
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
        project: {
          content: {
            name: 'cdpp',
          },
        },
        fetchProject: () => {},
        fetchProjectConnection: () => {},
        projectIsFetching: false,
        projectConnectionsIsFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
      expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(0)
      expect(enzymeWrapper.find(GuidedProjectConfigurationComponent)).to.have.length(1)
    })

    it('should render a loading component when fetching data', () => {
      const props = {
        params: {
          project_name: 'cdpp',
          microservice_name: 'test',
          project_connection_id: '0',
        },
        project: {
          content: {
            name: 'cdpp',
          },
        },
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
        fetchProject: () => {},
        fetchProjectConnection: () => {},
        projectIsFetching: true,
        projectConnectionsIsFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
      expect(enzymeWrapper.find(LoadingComponent)).to.have.length(1)
    })

    it('should render an entity-not-found component when the connection is undefined', () => {
      const props = {
        params: {
          project_connection_id: '0',
        },
        fetchProject: () => {},
        fetchProjectConnections: () => {},
        projectConnection: undefined,
        projectIsFetching: false,
        projectConnectionsIsFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
      expect(enzymeWrapper.find(LoadingComponent)).to.have.length(0)
      expect(enzymeWrapper.find(FormEntityNotFoundComponent)).to.have.length(1)
      expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(0)
    })
  },
)
