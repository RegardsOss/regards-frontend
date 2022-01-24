/**
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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoggedUserComponent from '../../../../src/components/user/authentication/LoggedUserComponent'
import LoginButton from '../../../../src/components/user/authentication/LoginButton'
import { AuthenticationContainer } from '../../../../src/containers/user/authentication/AuthenticationContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing AuthenticationContainer', () => {
  before(() => {
    testSuiteHelpers.before()
  })
  after(() => {
    testSuiteHelpers.after()
  })

  it('should exists', () => {
    assert.isDefined(AuthenticationContainer)
  })
  it('should render correctly when user is not logged', () => {
    const props = {
      // from mapStateToProps
      project: 'test',
      appName: 'test',
      authenticationName: '',
      currentRole: 'Peon',
      borrowableRoles: {},
      serviceProviderList: {},
      isSendingBorrowRole: false,
      isInstance: false,
      onLogout: () => { },
      fetchBorrowableRoles: () => { },
      sendBorrowRole: () => { },
      dispatchRoleBorrowed: () => { },
      onShowProfile: () => { },
      toggleAuthenticationDialogOpen: () => { },
      disconnectServiceProvider: () => { },
    }

    const enzymeWrapper = shallow(<AuthenticationContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoggedUserComponent), 0, 'The logged component should be hidden')
    const loginButton = enzymeWrapper.find(LoginButton)
    assert.lengthOf(loginButton, 1, 'The login button should be visibile component should be rendered')
    assert.equal(loginButton.props().onLoginAction, enzymeWrapper.instance().onShowAuthenticationDialog,
      'Show authentication dialog callback should be correctly provided')
  })
  it('should render correctly when user is logged', () => {
    const props = {
      // from mapStateToProps
      project: 'test',
      appName: 'test',
      authenticationName: 'hellooo',
      currentRole: 'Peon',
      borrowableRoles: {},
      isSendingBorrowRole: false,
      isInstance: false,
      serviceProviderList: {},
      onLogout: () => { },
      fetchBorrowableRoles: () => { },
      sendBorrowRole: () => { },
      dispatchRoleBorrowed: () => { },
      onShowProfile: () => { },
      toggleAuthenticationDialogOpen: () => { },
      disconnectServiceProvider: () => { },
    }
    const enzymeWrapper = shallow(<AuthenticationContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(LoginButton), 0, 'The login button should be hidden')
    const loggedUserComponent = enzymeWrapper.find(LoggedUserComponent)
    assert.lengthOf(loggedUserComponent, 1, 'The logged component should be visible')
    testSuiteHelpers.assertWrapperProperties(loggedUserComponent, {
      name: props.authenticationName,
      showProfileDialog: !props.isInstance,
      onShowProfileEdition: enzymeWrapper.instance().onShowProfileEdition,
      onShowQuotaInformation: enzymeWrapper.instance().onShowQuotaInformation,
      onLogout: enzymeWrapper.instance().onLogout,
      currentRole: props.currentRole,
      borrowableRoles: props.borrowableRoles,
      onBorrowRole: enzymeWrapper.instance().onBorrowRole,
    }, 'Logged component properties should be correctly reported')
  })
})
