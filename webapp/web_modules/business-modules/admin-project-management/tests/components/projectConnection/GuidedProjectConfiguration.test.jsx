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
import keys from 'lodash/keys'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Step } from 'material-ui/Stepper'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import GuidedProjectConfiguration from '../../../src/components/projectConnection/GuidedProjectConfigurationComponent'
import ProjectConnectionFormComponent from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing GuidedProjectConfiguration', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const options = {
    context: buildTestContext(),
  }

  it('should exists', () => {
    assert.isDefined(GuidedProjectConfiguration)
  })

  const props = {
    project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
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
    configureOneForAll: true,
    onCreate: () => {},
    onUpdate: () => {},
    onChangeConfigurationMode: () => {},
  }

  it('should render the stepper to configure individually all connections', () => {
    props.configureOneForAll = false

    const enzymeWrapper = shallow(<GuidedProjectConfiguration {...props} />, options)
    expect(enzymeWrapper.find(Step)).to.have.length(keys(STATIC_CONF.MSERVICES).length)
  })

  it('should render only one form to configure all connection at the same time', () => {
    props.configureOneForAll = true

    const enzymeWrapper = shallow(<GuidedProjectConfiguration {...props} />, options)
    expect(enzymeWrapper.find(Step)).to.have.length(0)
    expect(enzymeWrapper.find(ProjectConnectionFormComponent)).to.have.length(1)
  })
})
