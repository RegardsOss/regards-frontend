/**
 * LICENSE_PLACEHOLDER
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
