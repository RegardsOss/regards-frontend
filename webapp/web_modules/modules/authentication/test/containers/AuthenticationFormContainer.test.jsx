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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AuthenticationFormComponent from '../../src/components/AuthenticationFormComponent'
import { AuthenticationFormContainer } from '../../src/containers/AuthenticationFormContainer'

describe('[AUTHENTICATION] Testing AuthenticationFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(AuthenticationFormContainer)
  })

  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      project: 'any',
      // form title
      title: 'any',
      // show create account link?
      showAskProjectAccess: true,
      showCancel: true,
      dispatchLoginRequest: () => { },
      clearErrors: () => { },
      onGotoCreateAccount: () => { },
      onGotoResetPassword: () => { },
      onGotoUnlockAccount: () => { },
      serviceProviderList: {},
      fetchServiceProviders: () => { },
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<AuthenticationFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(AuthenticationFormComponent).length, 1, 'There should be the rendered component!')
  })
})
