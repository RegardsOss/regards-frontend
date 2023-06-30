/*
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import { ProjectConnectionListContainer } from '../../../src/containers/projectConnection/ProjectConnectionListContainer'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionListContainer', () => {
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
      project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
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
            connectivity: EnumConnectivity.ERROR,
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
    const subComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFunction(subComponent.prop('children'))
    assert.deepEqual(subComponent.prop('children'), enzymeWrapper.instance().getComponent)
  })
})
