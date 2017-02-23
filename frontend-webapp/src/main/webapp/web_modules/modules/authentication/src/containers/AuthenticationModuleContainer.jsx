/**
 * LICENSE_PLACEHOLDER
 */

import { AuthenticationRouteParameters, AuthenticationParametersHelper, AuthenticateSelectors, routeHelpers } from '@regardsoss/authentication-manager'
import { connect } from '@regardsoss/redux'
import AuthenticationWorkflowsComponent, { initialModes } from '../components/AuthenticationWorkflowsComponent'
import SessionManagementContainer from '../containers/SessionManagementContainer'

/**
 * Mount the authentication module, according with current URL requirements.
 * Handle authentication state locally to:
 * 1 - manage session properly
 * 2 - perform redirections required on external mail re-entries
 */
export class AuthenticationModuleContainer extends React.Component {

  static propTypes = {
    // current project (undefined or empty if admin)
    project: React.PropTypes.string.isRequired,
    // externally controlled login window state
    showLoginWindow: React.PropTypes.bool.isRequired,
    // login screen title
    loginTitle: React.PropTypes.string.isRequired,
    // show create account link?
    showAskProjectAccess: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
    // from mapStateToProps
    authenticated: React.PropTypes.bool,

  }

  componentWillMount = () => {
    // determinate the initial state and parameters for authentication state machine
    this.setState({
      initialViewMode: this.getInitialViewMode(AuthenticationParametersHelper.getMailAuthenticationAction()),
      initialEmail: AuthenticationParametersHelper.getAccountEmail(),
      actionToken: AuthenticationParametersHelper.getToken(),
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.authenticated && nextProps.authenticated) {
      if (routeHelpers.isBackFromAuthenticationMail()) {
        // now back to default routing state
        this.setState({
          initialViewMode: initialModes.loginForm,
          initialEmail: this.state.initialEmail,
          token: null,
        })
        routeHelpers.doRedirection()
      }
    }
  }

  /**
   * Returns view state for external access
   * @param urlAction found url authentication action
   * @returns initial view state
   */
  getInitialViewMode = (urlAction = '') => {
    const modes = AuthenticationRouteParameters.mailAuthenticationAction.values
    switch (urlAction) {
      case modes.validateAccount:
        return initialModes.validateCreatedAccount
      case modes.unlockAccount:
        return initialModes.finishAccountUnlocking
      case modes.changePassword:
        return initialModes.finishChangePassword
      default:
        // no external acces, default view state (login)
        return initialModes.loginForm
    }
  }

  render() {
    // parse initial state from parameters
    const { project, showLoginWindow, loginTitle, showAskProjectAccess, showCancel, onCancelAction } = this.props
    const { initialViewMode, initialEmail, actionToken } = this.state
    // render in session management HOC (can override 'should show' if session is locked, controls dialog state and content)
    return (
      <SessionManagementContainer
        onRequestClose={routeHelpers.isBackFromAuthenticationMail() ? null : onCancelAction}
        showLoginWindow={showLoginWindow}
        isSessionLocked
      >
        <AuthenticationWorkflowsComponent
          project={project || ''}
          loginTitle={loginTitle}
          showCancel={showCancel}
          showAskProjectAccess={showAskProjectAccess}
          onCancelAction={onCancelAction}
          initialMode={initialViewMode}
          initialEmail={initialEmail}
          actionToken={actionToken}
        />
      </SessionManagementContainer>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: AuthenticateSelectors.isAuthenticated(state),
  authentication: AuthenticateSelectors.getAuthentication(state),
})

export default connect(mapStateToProps)(AuthenticationModuleContainer)
