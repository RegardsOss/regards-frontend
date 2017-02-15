/**
 * LICENSE_PLACEHOLDER
 **/

import { values } from 'lodash'
import root from 'window-or-global'
import AuthenticationFormContainer from '../containers/AuthenticationFormContainer'
import AccountOperationMessage, { operationIds } from './AccountOperationMessage'
import ChangePasswordFormContainer from '../containers/ChangePasswordFormContainer'
import FinishUnlockAccountContainer from '../containers/FinishUnlockAccountContainer'
import CreateAccountFormContainer from '../containers/CreateAccountFormContainer'
import { AskResetPasswordFormContainer, AskUnlockAccountFormContainer } from '../containers/AccountRequestFormContainer'

/**
 * Possible view states with messageOperationId for messages view states (allow really smaller code for view instantiation as
 * every message view is handled by the same component type) */
export const viewStates = {
  authenticationFormView: {},
  askResetPasswordFormView: {},
  askUnlockAccountFormView: { },
  askResetPasswordSentMessageView: { messageOperationId: operationIds.askResetPasswordSent },
  askUnlockAccountSentMessageView: { messageOperationId: operationIds.askUnlockAccountSent },
  // form view to complete reset password operation
  finishResetPasswordFormView: { },
  resetPasswordDoneMessageView: { messageOperationId: operationIds.resetPasswordDone },
  resetPasswordExpiredMessageView: { messageOperationId: operationIds.askResetPasswordTokenExpired },
  // message view to complete unlock account operation
  finishUnlockAccountFetchingView: { },
  unlockAccountExpiredMessageView: { messageOperationId: operationIds.askUnlockAccountTokenExpired },
  unlockAccountDoneMessageView: { messageOperationId: operationIds.unlockAccountDone },
  askProjectAccessFormView: { },
  createAccountSentMessageView: { messageOperationId: operationIds.createAccountSent },
  createAccountDoneMessageView: { messageOperationId: operationIds.createAccountDone },
}

/**
 * Possible initial modes and corresponding view states
 * @type {{loginForm: string}}
 */
export const initialModes = {
  // initially on login form
  loginForm: viewStates.authenticationFormView,
  // mail reset password: finish reset password operation
  finishChangePassword: viewStates.finishResetPasswordFormView,
  // mail unlock account: finish unlock account operation
  finishUnlockAccount: viewStates.finishUnlockAccountFetchingView,
  // mail confirmation: the account was unlocked
  createAccountConfirmation: viewStates.createAccountDoneMessageView,
}

/**
 * Authentication container : shows authentication options and different screens according with external request
 * (coming back from a mail for instance). Switches between components to show  message -> requests -> login transitions
 */
export default class AuthenticationStatesContainer extends React.Component {

  static propTypes = {
    // current project (empty if admin)
    project: React.PropTypes.string.isRequired,
    // extern access mode (from email): initial mail value
    initialEmail: React.PropTypes.string,
    // extern access mode (from mail): token for action to finish
    actionToken: React.PropTypes.string,
    // login screen title
    loginTitle: React.PropTypes.string.isRequired,
    // show create account link?
    showCreateAccount: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
    // extern access mode (from email): mail back entry point in authentication
    initialMode: React.PropTypes.oneOf(values(initialModes)).isRequired,
  }

  componentWillMount = () => {
    // initialize default view state
    this.updateState(this.props.initialMode, this.props.initialEmail, false)
  }

  componentDidUpdate = () => {
    // XXX-workaround for dialog not resized problem when switching from one screen to another (shifts the bigger one
    // down the screen): simulate a resize even when switching state
    if (this.state.repositionRequired) {
      // fire resize event to force Material UI recomputing dialog position
      try {
        const resizeEvent = root.document.createEvent('HTMLEvents')
        resizeEvent.initEvent('resize', true, false)
        root.dispatchEvent(resizeEvent)
      } catch (e) {
        console.trace('Could not recenter dialog, not support by the browser')
      }
      // remove reposition required
      const { currentView, currentMail } = this.state
      this.updateState(currentView, currentMail, false)
    }
  }

  /**
   * Creates a goto callback expecting current mail value as first parameter.
   * Using no parameter corresponds to BACK behavior (show authentication, do not update mail)
   * @param nextView next view (defaults to authentication)
   * @param mailUpdate true if the view updates mail value (defaults to false)
   * @return goto event callback, requiring mail as first parameter, or no parameter if the view does not update mail
   */
  onGoto = (nextView = viewStates.authenticationFormView, mailUpdate = false) => (currentMailValue) => {
    const mailParam = mailUpdate ? currentMailValue : null
    this.updateState(nextView, mailParam)
  }


  /**
   * Updates this state
   * @param currentView current view
   * @param currentMail current mail (or undefined if unchanged)
   * @param repositionRequired XXX-Workaround, see componentDidUpdate for more information
   */
  updateState = (currentView, currentMail = null, repositionRequired = true) => {
    this.setState({
      currentView,
      // use provided mail if any, or current state mail if any
      currentMail: currentMail || (this.state && this.state.currentMail),
      // XXX-workaround for repositionning dialog (see componentDidUpdate method for more detail)
      repositionRequired,
    })
  }

  render() {
    const { currentView, currentMail } = this.state
    const { project, actionToken, loginTitle, showCreateAccount, showCancel, onCancelAction } = this.props

    // 1 - render messages states first (to write a bit less code in switch!)
    if (currentView.messageOperationId) {
      return (
        <AccountOperationMessage operationId={currentView.messageOperationId} operationAction={this.onGoto()} />
      )
    }

    // 2 - render other states (specific forms)
    switch (currentView) {
      case viewStates.authenticationFormView:
        return (
          <AuthenticationFormContainer
            initialMail={currentMail}
            project={project}
            title={loginTitle}
            showCreateAccount={showCreateAccount}
            showCancel={showCancel}
            onCancelAction={onCancelAction}
            onGotoCreateAccount={this.onGoto(viewStates.askProjectAccessFormView, true)}
            onGotoResetPassword={this.onGoto(viewStates.askResetPasswordFormView, true)}
            onGotoUnlockAccount={this.onGoto(viewStates.askUnlockAccountFormView, true)}
          />
        )
      case viewStates.askResetPasswordFormView:
        return (
          <AskResetPasswordFormContainer
            initialMail={currentMail}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
            onDone={this.onGoto(viewStates.askResetPasswordSentMessageView, true)}
          />
        )
      case viewStates.askUnlockAccountFormView:
        return (
          <AskUnlockAccountFormContainer
            initialMail={currentMail}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
            onDone={this.onGoto(viewStates.askUnlockAccountSentMessageView, true)}
          />)
      case viewStates.finishResetPasswordFormView:
        return (
          <ChangePasswordFormContainer
            mail={currentMail}
            token={actionToken}
            onDone={this.onGoto(viewStates.resetPasswordDoneMessageView)}
            onTokenExpired={this.onGoto(viewStates.resetPasswordExpiredMessageView)}
          />)
      case viewStates.finishUnlockAccountFetchingView:
        return (
          <FinishUnlockAccountContainer
            mail={currentMail}
            token={actionToken}
            onDone={this.onGoto(viewStates.unlockAccountDoneMessageView)}
            onTokenExpired={this.onGoto(viewStates.unlockAccountExpiredMessageView)}
          />
        )
      case viewStates.askProjectAccessFormView:
        return (
          <CreateAccountFormContainer
            project={project}
            initialMail={currentMail}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
            onDone={this.onGoto(viewStates.askUnlockAccountSentMessageView, true)}
          />)
        // TODO : also add container when back from mail (for new account, it should call activation link)
      default:
        throw new Error(`Unknown view state ${currentView}`)
    }
  }

}

