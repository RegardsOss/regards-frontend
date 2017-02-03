/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { fetchAuthenticate, AuthenticationRouteParameters, AuthenticationParametersHelper } from '@regardsoss/authentication-manager'
import AuthenticationStatesContainer, { initialModes } from '../components/AuthenticationWorkflowsComponent'

/**
 * Mount the authentication module, according with current URL requirements
 */
export class AuthenticationModuleContainer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    createAccount: React.PropTypes.bool.isRequired,
    cancelButton: React.PropTypes.bool.isRequired,
    onCancelAction: React.PropTypes.func,
    // from module system
    project: React.PropTypes.string.isRequired,
    // from map state to props
    lastError: React.PropTypes.string,
    // from map dispatch to props
    fetchAuthenticate: React.PropTypes.func,
  }

  componentWillMount = () => {
    // determinate the initial state and parameters for authentication state machine
    // Note: not stored in state as it is immutable
    this.initialViewMode = this.getInitialViewMode(AuthenticationParametersHelper.getMailAuthenticationAction())
    this.initialMail = AuthenticationParametersHelper.getAccountEmail()
  }

  onLogin = (authenticationValues) => {
    this.props.fetchAuthenticate(authenticationValues.username, authenticationValues.password, this.props.project)
    // TODO use extern origin URL to redirect after login if possible
    // TODO : when back from mail, always redirect!!
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
      case modes.accountUnlocked:
        return initialModes.unlockAccountConfirmation
      case modes.changePassword:
        return initialModes.changePasswordForm
      default:
        // no external acces, default view state (login)
        return initialModes.loginForm
    }
  }

/*  onViewChanged = () => {
    // lets this component flush error messages in store
    // TODO
    const {flushResetPasswordData, flushFetchAuthenticationData, flushAccountUnlockData} = this.props
    flushResetPasswordData()
    flushFetchAuthenticationData()
    flushAccountUnlockData()
  }*/

  render() {
    // parse initial state from parameters
    const { title, createAccount, cancelButton, onCancelAction, lastError } = this.props

    return (
      <AuthenticationStatesContainer
        title={title}
        cancelButton={cancelButton}
        createAccount={createAccount}
        onCancelAction={onCancelAction}
        lastError={lastError}
        onLogin={this.onLogin}
        initialMode={this.initialViewMode}
        initialEmail={this.initialMail}
        onViewChanged={this.onViewChanged}
      />
    )
  }
}

// TODO: right connetion
const mapStateToProps = state => ({
  lastError: state.common.authentication.error,
})
// TODO right dispatch
const mapDispatchToProps = dispatch => ({
  fetchAuthenticate: (username, password, scope) => dispatch(fetchAuthenticate(username, password, scope)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationModuleContainer)

