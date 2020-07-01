/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import { shallow } from 'enzyme'
import size from 'lodash/size'
import { expect, assert } from 'chai'
import { TableRow } from 'material-ui/Table'
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
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
            microservice: 'ms-1',
            userName: 'Alice',
            password: 'password',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            state: 'ENABLED',
          },
          links: [],
        },
        1: {
          content: {
            id: 1,
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
            microservice: 'ms-2',
            userName: 'Bob',
            password: 'azerty',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            state: 'ENABLED',
          },
          links: [],
        },
        2: {
          content: {
            id: 2,
            project: DumpProvider.getFirstEntityContent('AdminClient', 'Project'),
            microservice: 'ms-3',
            userName: 'Charlie',
            password: 'qsdfgh',
            driverClassName: 'PostgreSQL',
            url: 'http://google.com',
            state: 'ENABLED',
          },
          links: [],
        },
      },
      onEdit: () => { },
      onReCreateConnection: () => { },
      onCreate: () => { },
      onTestConnection: () => { },
      refreshConnection: () => { },
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<ProjectConnectionListComponent {...props} />, options)
    const NB_ROW = 1 + size(STATIC_CONF.MSERVICES)
    expect(enzymeWrapper.find(TableRow)).to.have.length(NB_ROW)
  })
})
