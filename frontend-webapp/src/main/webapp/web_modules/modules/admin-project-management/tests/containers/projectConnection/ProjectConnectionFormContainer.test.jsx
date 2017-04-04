import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectConnectionFormContainer } from '../../../src/containers/projectConnection/ProjectConnectionFormContainer'
import ProjectConnectionFormComponent from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

// Test a component rendering
describe(
  '[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionEditContainer', () => {
    it('should exists', () => {
      assert.isDefined(ProjectConnectionFormContainer)
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
      const enzymeWrapper = shallow(<ProjectConnectionFormContainer {...props} />)
      console.log('SEB', enzymeWrapper.debug())
      expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(1)
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
      const enzymeWrapper = shallow(<ProjectConnectionFormContainer {...props} />)
      expect(enzymeWrapper.find(LoadingComponent)).to.have.length(1)
    })

    it('should render an entity-not-found component when the connection is undefined', () => {
      const props = {
        params: {
          project_connection_id: '0',
        },
        fetchProject: () => {},
        fetchProjectConnection: () => {},
        projectConnection: undefined,
        projectIsFetching: false,
        projectConnectionsIsFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionFormContainer {...props} />)
      expect(enzymeWrapper.find(LoadingComponent)).to.have.length(0)
      expect(enzymeWrapper.find(FormEntityNotFoundComponent)).to.have.length(1)
      expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(0)
    })
  },
)
