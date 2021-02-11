/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import FlatButton from 'material-ui/FlatButton'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import { OnHoverSwitchFlatButton } from '@regardsoss/components'
import DatabaseConnectionTester from '../../../src/components/projectConnection/DatabaseConnectionTester'
import ConnectionTesterProgress from '../../../src/components/projectConnection/ConnectionTesterProgress'

const context = buildTestContext()

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing DatabaseConnectionTester', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatabaseConnectionTester)
  })

  it('should render the test button if connectivity is NOT_TESTED', () => {
    const props = {
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
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, { context })
    expect(enzymeWrapper.find(FlatButton)).to.have.length(1)
  })

  it('should render the success button if connectivity is SUCCESS', () => {
    const props = {
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
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, { context })
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the warning button if connectivity is WARNING', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.WARNING,
        },
        links: [],
      },
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, { context })
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the error button if connectivity is ERROR', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.WARNING,
        },
        links: [],
      },
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, { context })
    expect(enzymeWrapper.find(OnHoverSwitchFlatButton)).to.have.length(1)
  })

  it('should render the liner progress if connectivity is PENDING', () => {
    const props = {
      projectConnection: {
        content: {
          id: 0,
          projectName: 'cdpp',
          microservice: 'rs-admin',
          userName: 'Alice',
          password: 'password',
          driverClassName: 'PostgreSQL',
          url: 'http://google.com',
          connectivity: EnumConnectivity.PENDING,
        },
        links: [],
      },
      testConnection: () => {},
    }
    const enzymeWrapper = shallow(<DatabaseConnectionTester {...props} />, { context })
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(1)
  })
})
