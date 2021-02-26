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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AuthenticateRedirectionApp } from '../../src/containers/AuthenticateRedirectionApp'

const context = buildTestContext()

/**
 * Test AuthenticateRedirectionApp
 * @author Théo Lasserre
 */
describe('[Authenticate] Testing AuthenticateRedirectionApp', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AuthenticateRedirectionApp)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'test',
        serviceProviderName: 'testServiceProviderName',
      },
      // from mapStateToProps
      serviceProvider: { },
      authentication: {
        project: 'test',
        scope: 'test',
        sub: 'test',
        role: 'test',
        access_token: 'test', // eslint wont fix: as externally provided
        token_type: 'bearer',
        expires_in: 98985,
        jti: 'test',
      },
      // from mapDispatchToProps
      requestLogin: () => { },
      fetchServiceProviders: () => { },
    }
    const enzymeWrapper = shallow(<AuthenticateRedirectionApp {...props} />, { context })
    enzymeWrapper.instance()

    let browserHistory = {
      getCurrentLocation: () => ({
        pathname: 'test://www.test.tst',
        query: {},
        hash: '#session_state=xxxxxxxxx&code=aaaaaaaaa',
      }),
    }
    assert.equal(AuthenticateRedirectionApp.getCode(browserHistory), 'aaaaaaaaa', ' 1 : Code should be retrieved')

    browserHistory = {
      getCurrentLocation: () => ({
        pathname: 'test://www.test.tst',
        query: {},
        hash: '#session_state=xxxxxxxxx&code=aaaasefsfaaaa&test=rrrrrrr',
      }),
    }
    assert.equal(AuthenticateRedirectionApp.getCode(browserHistory), 'aaaasefsfaaaa', '2 : Code should be retrieved')

    browserHistory = {
      getCurrentLocation: () => ({
        pathname: 'test://www.test.tst',
        query: { code: 'tetstest' },
        hash: '#session_state=xxxxxxxxx&code=zzzzzz&test=rrrrrrr',
      }),
    }
    assert.equal(AuthenticateRedirectionApp.getCode(browserHistory), 'tetstest', '3 : Code should be retrieved')

    browserHistory = {
      getCurrentLocation: () => ({
        pathname: 'test://www.test.tst',
        query: { },
        hash: '?code=aaaasefsfaaaa&test=rrrrrrr',
      }),
    }
    assert.equal(AuthenticateRedirectionApp.getCode(browserHistory), 'aaaasefsfaaaa', '4 : Code should be retrieved')

    browserHistory = {
      getCurrentLocation: () => ({
        pathname: 'test://www.test.tst',
        query: { },
        hash: '#session_state=xxxxxxxxx&test=rrrrrrr',
      }),
    }
    assert.equal(AuthenticateRedirectionApp.getCode(browserHistory), '', '5 : Code should not be retrieved')
  })
})
