/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import AuthenticationDialogComponent from '../../src/components/AuthenticationDialogComponent'
import { SessionManagementContainer } from '../../src/containers/SessionManagementContainer'

describe('[AUTHENTICATION] Testing SessionManagementContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SessionManagementContainer)
  })
  const context = {}
  it('should render correctly, using a visible dialog when authentication is visible or session is locked', () => {
    const renderAndTest = (useCase, props) => {
      const enzymeWrapper = shallow(<SessionManagementContainer {...props} />, { context })
      const dialogComps = enzymeWrapper.find(AuthenticationDialogComponent)
      assert.equal(dialogComps.length, 1, `${useCase} - There should be a rendered dialog frame!`)
      assert.isTrue(dialogComps.props().open, `${useCase} The dialog frame should be visible`)
    }

    // test with login visible
    renderAndTest('Login required', {
      showLoginWindow: true,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      // from mapStateToPropsfalse
      isSessionLocked: false,
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
    })

    // test with session locked
    renderAndTest('Session locked', {
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      // from mapStateToProps
      authentication: { sessionLocked: true },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
    })
  })
  it('should hide the dialog when session is not locked, nor authentication is required', () => {
    const props = {
      showLoginWindow: false,
      onRequestClose: null,
      children: <div />,
      authentication: { sessionLocked: false },
      fetchAuthenticate: () => { },
      dispatchSessionLocked: () => { },
    }
    const enzymeWrapper = shallow(<SessionManagementContainer {...props} />, { context })
    const dialogComps = enzymeWrapper.find(AuthenticationDialogComponent)
    assert.equal(dialogComps.length, 1, 'There should be a rendered dialog frame')
    assert.isFalse(dialogComps.props().open, 'The dialog frame should be hidden')
  })
})
