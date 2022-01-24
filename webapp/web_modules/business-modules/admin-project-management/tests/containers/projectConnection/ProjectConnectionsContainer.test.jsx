/*
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import { LoadingComponent } from '@regardsoss/display-control'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ProjectConnectionsContainer } from '../../../src/containers/projectConnection/ProjectConnectionsContainer'
import ProjectConnectionFormComponent from '../../../src/components/projectConnection/ProjectConnectionFormComponent'
import GuidedProjectConfigurationComponent from '../../../src/components/projectConnection/GuidedProjectConfigurationComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionsContainer', () => {
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
          project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.SUCCESS,
        },
        links: [],
      },
      project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      fetchProject: () => { },
      fetchProjectConnections: () => { },
      updateProjectConnection: () => { },
      createProjectConnection: () => { },
    }
    const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
    enzymeWrapper.setState({ projectIsFetching: false, projectConnectionsIsFetching: false })
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
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
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
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
            microservice: 'rs-cloud',
            userName: 'Bob',
            password: 'azerty',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
            microservice: 'rs-dam',
            userName: 'Charlie',
            password: 'qsdfgh',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            connectivity: EnumConnectivity.SUCCESS,
          },
          links: [],
        },
      },
      project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      fetchProject: () => new Promise(() => { }),
      fetchProjectConnections: () => new Promise(() => { }),
      updateProjectConnection: () => { },
      createProjectConnection: () => { },
    }
    const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
    enzymeWrapper.setState({ projectIsFetching: false, projectConnectionsIsFetching: false })
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
      fetchProject: () => new Promise(() => { }),
      fetchProjectConnections: () => new Promise(() => { }),
      updateProjectConnection: () => { },
      createProjectConnection: () => { },
    }
    const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadingComponent)).to.have.length(1)
  })

  it('should render an entity-not-found component when the connection is undefined', () => {
    const props = {
      params: {
        project_connection_id: '0',
      },
      fetchProject: () => new Promise(() => { }),
      fetchProjectConnections: () => new Promise(() => { }),
      updateProjectConnection: () => { },
      createProjectConnection: () => { },
      projectConnection: undefined,
    }
    const enzymeWrapper = shallow(<ProjectConnectionsContainer {...props} />, { context })
    enzymeWrapper.setState({ projectIsFetching: false, projectConnectionsIsFetching: false })
    expect(enzymeWrapper.find(LoadingComponent)).to.have.length(0)
    expect(enzymeWrapper.find(FormEntityNotFoundComponent)).to.have.length(1)
    expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(0)
  })
})
