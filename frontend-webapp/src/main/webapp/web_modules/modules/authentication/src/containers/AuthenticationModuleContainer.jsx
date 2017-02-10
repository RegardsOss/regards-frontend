/**
 * LICENSE_PLACEHOLDER
 */

import { AuthenticationRouteParameters, AuthenticationParametersHelper } from '@regardsoss/authentication-manager'
import AuthenticationWorkflowsComponent, { initialModes } from '../components/AuthenticationWorkflowsComponent'

/**
 * Mount the authentication module, according with current URL requirements
 */
export default class AuthenticationModuleContainer extends React.Component {

  static propTypes = {
    // current project (undefined or empty if admin)
    project: React.PropTypes.string.isRequired,
    // login screen title
    loginTitle: React.PropTypes.string.isRequired,
    // show create account link?
    showCreateAccount: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
  }

  componentWillMount = () => {
    // determinate the initial state and parameters for authentication state machine
    // Note: not stored in state as it is immutable
    this.initialViewMode = this.getInitialViewMode(AuthenticationParametersHelper.getMailAuthenticationAction())
    this.initialMail = AuthenticationParametersHelper.getAccountEmail()
    this.actionToken = AuthenticationParametersHelper.getToken()
  }

  /**
   * Returns view state for external access
   * @param urlAction found url authentication action
   * @returns initial view state
   */
  getInitialViewMode = (urlAction = '') => {
    const modes = AuthenticationRouteParameters.mailAuthenticationAction.values
    switch (urlAction) {
      case modes.accountCreated:
        return initialModes.createAccountConfirmation
      case modes.unlockAccount:
        return initialModes.finishUnlockAccount
      case modes.changePassword:
        return initialModes.finishChangePassword
      default:
        // no external acces, default view state (login)
        return initialModes.loginForm
    }
  }

  render() {
    // parse initial state from parameters
    const { project, loginTitle, showCreateAccount, showCancel, onCancelAction } = this.props
    return (
      <AuthenticationWorkflowsComponent
        project={project || ''}
        loginTitle={loginTitle}
        showCancel={showCancel}
        showCreateAccount={showCreateAccount}
        onCancelAction={onCancelAction}
        initialMode={this.initialViewMode}
        initialEmail={this.initialMail}
        actionToken={this.actionToken}
      />
    )
  }
}

