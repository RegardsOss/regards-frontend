import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import EnumConnectivity from '@regardsoss/model/src/admin/EnumConnectivity'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectConnectionEditContainer } from '../../src/containers/ProjectConnectionEditContainer'
import { ProjectConnectionEditComponent } from '../../src/components/ProjectConnectionEditComponent'

// Test a component rendering
describe(
  '[ADMIN DATABASE MANAGEMENT] Testing ProjectConnectionEditContainer', () => {
    it('should exists', () => {
      assert.isDefined(ProjectConnectionEditContainer)
    })

    it('should render the subcomponents when the project connection is defined', () => {
      const props = {
        params: {
          project_connection_id: '0',
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
        isFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionEditContainer {...props} />)
      expect(enzymeWrapper.find(ProjectConnectionEditComponent)).to.have.length(1)
    })

    it('should render a loading component when fetching data', () => {
      const props = {
        params: {
          project_connection_id: '0',
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
        isFetching: true,
      }
      const enzymeWrapper = shallow(<ProjectConnectionEditContainer {...props} />)
      expect(enzymeWrapper.find(FormLoadingComponent)).to.have.length(1)
    })

    it('should render an entity-not-found component when the connection is undefined', () => {
      const props = {
        params: {
          project_connection_id: '0',
        },
        projectConnection: undefined,
        isFetching: false,
      }
      const enzymeWrapper = shallow(<ProjectConnectionEditContainer {...props} />)
      expect(enzymeWrapper.find(FormEntityNotFoundComponent)).to.have.length(1)
    })
  },
)
