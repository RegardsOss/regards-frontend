/**
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
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import IconButton from 'material-ui/IconButton'
import PlayArrow from 'mdi-material-ui/Play'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import DatabaseConnectionTesterIconButton from '../../../src/components/projectConnection/DatabaseConnectionTesterIconButton'
import ConnectionTesterProgress from '../../../src/components/projectConnection/ConnectionTesterProgress'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing DatabaseConnectionTesterIconButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatabaseConnectionTesterIconButton)
  })

  const context = buildTestContext()

  it('should render the test button if connectivity is NOT_TESTED', () => {
    const props = {
      testConnection: () => ({ error: false }),
      refreshConnection: () => { },
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.NOT_TESTED,
        },
        links: [],
      },
    }
    const options = { context }
    const enzymeWrapper = shallow(<DatabaseConnectionTesterIconButton {...props} />, options)
    expect(enzymeWrapper.find(IconButton)).to.have.length(1)
    expect(enzymeWrapper.find(PlayArrow)).to.have.length(1)
  })

  it('should render the test button at render', () => {
    const props = {
      testConnection: () => ({ error: false }),
      refreshConnection: () => { },
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
    }
    const options = { context }
    const enzymeWrapper = shallow(<DatabaseConnectionTesterIconButton {...props} />, options)
    expect(enzymeWrapper.find(IconButton)).to.have.length(1)
    expect(enzymeWrapper.find(PlayArrow)).to.have.length(1)

    enzymeWrapper.find(IconButton).simulate('click')

    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(1)
  })
})
