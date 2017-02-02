/**
 * LICENSE_PLACEHOLDER
 **/
import { connect } from '@regardsoss/redux'
import { fetchAuthenticate } from '@regardsoss/authentication-manager'
import AuthenticationComponent from '../components/AuthenticationComponent'
import AccountOperationMessage, { operationIds } from '../components/AccountOperationMessage'
import AccountRequestFormComponent, { requestFormIds } from '../components/AccountRequestFormComponent'

/** Possible view states with associated builders (those builders use container as parameter) */
const viewStates = {
  authenticationFormView: 'authentication.form.view',
  createAccountFormView: 'create.account.form.view',
  createAccountSentView: 'create.account.sent.view',
  resetPasswordFormView: 'reset.password.form.view',
  resetPasswordSentView: 'reset.password.sent.view',
  unlockAccountFormView: 'unlock.account.form.view',
  unlockAccountSentView: 'unlock.account.sent.view',
}

/**
 * Authentication container : shows authentication options
 */
export class AuthenticationContainer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    fetchAuthenticate: React.PropTypes.func,
    errorMessage: React.PropTypes.string,
    cancelButton: React.PropTypes.bool,
    onCancelAction: React.PropTypes.func,
    project: React.PropTypes.string.isRequired,
  }


  componentWillMount = () => {
    // initialize default view
    this.updateState(viewStates.authenticationFormView, '')
  }

  /**
   * Creates a goto callback expecting current mail value as first parameter.
   * Using no parameter corresponds to BACK behavior (show authentication, do not update mail)
   * @param nextView next view (defaults to authentication)
   * @param mailUpdate true if the view updates mail value (defaults to false)
   * @return goto event callback, requiring mail as first parameter, or no parameter if the view does not update mail
   */
  onGoto = (nextView = viewStates.authenticationFormView, mailUpdate = false) => {
    if (mailUpdate) {
      return currentMailValue => this.updateState(nextView, currentMailValue)
    }
    return () => this.updateState(nextView)
  }

  onLogin = (values) => {
    this.props.fetchAuthenticate(values.username, values.password, this.props.project)
  }

  onResetPassword = () => {
    // TODO
  }

  onUnlockAccount = () => {
    // TODO
  }

  /**
   * Sets current view state
   * @param currentView current view state
   */
  setViewState = currentView => this.updateState(currentView, this.state.currentMail)

  /**
   * Updates this state
   * @param currentView current view
   * @param currentMail current mail (or undefined if unchanged)
   */
  updateState = (currentView, currentMail) => {
    this.setState({
      currentView,
      // use provided mail if any, or current state mail if any
      currentMail: currentMail || (this.state && this.state.currentMail),
    })
  }

  render() {
    const { currentView, currentMail } = this.state
    const { title, errorMessage, cancelButton, onCancelAction } = this.props
    switch (currentView) {
      case viewStates.authenticationFormView:
        return (
          <AuthenticationComponent
            title={title}
            onLogin={this.onLogin}
            initialMail={currentMail}
            errorMessage={errorMessage}
            cancelButton={cancelButton}
            onCancelAction={onCancelAction}
            onGotoCreateAccount={this.onGoto(viewStates.createAccountFormView, true)}
            onGotoResetPassword={this.onGoto(viewStates.resetPasswordFormView, true)}
            onGotoUnlockAccount={this.onGoto(viewStates.unlockAccountFormView, true)}
          />
        )
      // TODO
      // case viewStates.createAccountFormView:
      //   return ()
      case viewStates.createAccountSentView:
        return (
          <AccountOperationMessage
            operationId={operationIds.createAccountSent}
            operationAction={this.onGoto()}
          />
        )
      case viewStates.resetPasswordFormView:
        return (
          <AccountRequestFormComponent
            requestFormId={requestFormIds.resetPasswordRequest}
            sendFailed={errorMessage !== undefined && errorMessage != null}
            initialMail={currentMail}
            onRequestAction={this.onResetPassword}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
          />
        )
      case viewStates.resetPasswordSentView:
        return (
          <AccountOperationMessage
            operationId={operationIds.resetPasswordSent}
            operationAction={this.onGoto()}
          />
        )
      case viewStates.unlockAccountFormView:
        return (
          <AccountRequestFormComponent
            requestFormId={requestFormIds.unlockAccountRequest}
            sendFailed={errorMessage !== undefined && errorMessage !== null}
            initialMail={currentMail}
            onRequestAction={this.onUnlockAccount}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
          />)
      case viewStates.unlockAccountSentView:
        return (
          <AccountOperationMessage
            operationId={operationIds.unlockRequestSent}
            operationAction={this.onGoto()}
          />
        )
      default:
        throw new Error(`Unknown view state ${currentView}`)
    }
  }

}

const mapStateToProps = state => ({
  errorMessage: state.common.authentication.error,
})
const mapDispatchToProps = dispatch => ({
  fetchAuthenticate: (username, password, scope) => dispatch(fetchAuthenticate(username, password, scope)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationContainer)
