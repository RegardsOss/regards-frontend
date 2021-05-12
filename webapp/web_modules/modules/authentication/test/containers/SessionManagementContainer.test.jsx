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
import sinon from 'sinon'
import { shallow } from 'enzyme'
import root from 'window-or-global'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import AuthenticationDialogComponent from '../../src/components/AuthenticationDialogComponent'
import { SessionManagementContainer } from '../../src/containers/SessionManagementContainer'

const context = buildTestContext()

describe('[AUTHENTICATION] Testing SessionManagementContainer', () => {
  before(() => {
    testSuiteHelpers.before()
    root.window = {
      addEventListener: () => { },
      removeEventListener: () => { },
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.window
  })

  it('should exists', () => {
    assert.isDefined(SessionManagementContainer)
  })
  it('should render correctly, using a visible dialog when authentication is visible or session is locked', () => {
    const renderAndTest = (useCase, props) => {
      const enzymeWrapper = shallow(<SessionManagementContainer {...props} />, { context })
      enzymeWrapper.setState({ initialized: true })
      const dialogComps = enzymeWrapper.find(AuthenticationDialogComponent)
      assert.equal(dialogComps.length, 1, `${useCase} - There should be a rendered dialog frame!`)
      assert.isTrue(dialogComps.props().open, `${useCase} The dialog frame should be visible`)
    }

    // test with login visible
    renderAndTest('Login required', {
      project: 'test-project',
      application: 'app',
      showLoginWindow: true,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      // from mapStateToPropsfalse
      isSessionLocked: false,
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: () => { },
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    })

    // test with session locked
    renderAndTest('Session locked', {
      project: 'test-project',
      application: 'app',
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      // from mapStateToProps
      authentication: { sessionLocked: true },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: () => { },
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    })
  })
  it('should hide the dialog when session is not locked, nor authentication is required', () => {
    const props = {
      project: 'test-project',
      application: 'app',
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: () => { },
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    }
    const enzymeWrapper = shallow(<SessionManagementContainer {...props} />, { context })
    enzymeWrapper.setState({ initialized: true })
    const dialogComps = enzymeWrapper.find(AuthenticationDialogComponent)
    assert.equal(dialogComps.length, 1, 'There should be a rendered dialog frame')
    assert.isFalse(dialogComps.props().open, 'The dialog frame should be hidden')
  })
  it('should not set the authentication without the stored one in localstorage', () => {
    const props = {
      project: 'test-project',
      application: 'app',
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: sinon.stub().callsFake(() => new Promise(() => { })),
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    }
    root.localStorage.clear()
    shallow(<SessionManagementContainer {...props} />, { context })
    assert.isFalse(props.notifyAuthenticationChanged.called)
  })
  it('should set the authentication with the stored one in localstorage', () => {
    const props = {
      project: 'test-project',
      application: 'app',
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: sinon.stub().callsFake(() => new Promise(() => { })),
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    }
    // Simulate a token non expired in localstorageUser
    root.localStorage.clear()
    new UIDomain.LocalStorageUser({ token: 'plop', expires_in: 30 }, Date.now() - 20000, props.project, props.application).save()
    shallow(<SessionManagementContainer {...props} />, { context })
    assert.isTrue(props.notifyAuthenticationChanged.called)
  })
  it('should not set the authentication with a expired token stored one in localstorage', () => {
    const props = {
      project: 'test-project',
      application: 'app',
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
      notifyAuthenticationChanged: sinon.stub().callsFake(() => new Promise(() => { })),
      logout: () => { },
      forceAuthentication: () => { },
      throwError: () => { },
      fetchServiceProviders: () => { },
    }
    // Simulate a token non expired in localstorageUser
    root.localStorage.clear()
    new UIDomain.LocalStorageUser({ token: 'plop', expires_in: 10 }, Date.now() - 20000, props.project, props.application).save()
    shallow(<SessionManagementContainer {...props} />, { context })
    assert.isFalse(props.notifyAuthenticationChanged.called)
    assert.isNull(UIDomain.LocalStorageUser.retrieve(props.project, props.application))
  })
})
