/**
 * LICENSE_PLACEHOLDER
 **/

import { values } from 'lodash'
import root from 'window-or-global'
import AuthenticationFormComponent from './AuthenticationFormComponent'
import AccountOperationMessage, { operationIds } from './AccountOperationMessage'
import ChangePasswordFormComponent from './ChangePasswordFormComponent'
import AccountRequestFormComponent, { requestFormIds } from './AccountRequestFormComponent'

/**
 * Possible view states with messageOperationId for messages view states (allow really smaller code for view instantiation as
 * every message view is handled by the same component type) */
const viewStates = {
  authenticationFormView: {
    id: 'authentication.form.view',
  },
  askResetPasswordFormView: {
    id: 'reset.password.form.view',
  },
  askResetPasswordSentMessageView: {
    id: 'reset.password.sent.message.view',
    messageOperationId: operationIds.askResetPasswordSent,
  },
  changePasswordFormView: {
    id: 'change.password.form.view',
  },
  changePasswordDoneMessageView: {
    id: 'change.password.done.message.view',
    messageOperationId: operationIds.changePasswordDone,
  },
  createAccountFormView: {
    id: 'create.account.form.view',
  },
  createAccountSentMessageView: {
    id: 'create.account.sent.message.view',
    messageOperationId: operationIds.createAccountSent,
  },
  createAccountDoneMessageView: {
    id: 'account.created.message.view',
    messageOperationId: operationIds.createAccountDone,
  },
  unlockAccountFormView: {
    id: 'unlock.account.form.view',
  },
  unlockAccountDoneMessageView: {
    id: 'account.unlocked.message.view',
    messageOperationId: operationIds.unlockRequestDone,
  },
  unlockAccountSentMessageView: {
    id: 'unlock.account.sent.message.view',
    messageOperationId: operationIds.unlockRequestSent,
  },
}

/**
 * Possible initial modes and corresponding view states
 * @type {{loginForm: string}}
 */
export const initialModes = {
  // initially on login form
  loginForm: viewStates.authenticationFormView,
  // mail confirmation: the account was unlocked
  unlockAccountConfirmation: viewStates.unlockAccountDoneMessageView,
  // mail confirmation: the account was unlocked
  createAccountConfirmation: viewStates.createAccountDoneMessageView,
  // mail reset password: the password was reset, the user need to provided the new one
  changePasswordForm: viewStates.changePasswordFormView,
}

/**
 * Authentication container : shows authentication options and different screens according with external request
 * (coming back from a mail for instance). Switches between components to show  message -> requests -> login transitions
 */
export default class AuthenticationStatesContainer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    // extern access mode
    // when back from mail, this mode indicates the initial action to handle, other extern parameters
    // may be provided at same time, depending on on access type (reset password, account unlocked...)
    initialMode: React.PropTypes.oneOf(values(initialModes)).isRequired,
    initialEmail: React.PropTypes.string,
    createAccount: React.PropTypes.bool.isRequired,
    cancelButton: React.PropTypes.bool.isRequired,
    lastError: React.PropTypes.string,
    onCancelAction: React.PropTypes.func,
    onLogin: React.PropTypes.func.isRequired,
    // anchor callback: notifies parent that view changed
    onViewChanged: React.PropTypes.func.isRequired,
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

  onResetPassword = () => {
    // this.context.router.getCurrentLocation()
    // TODO
  }

  onUnlockAccount = () => {
    // TODO
  }

  onChangePassword = () => {
    // TODO
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
      // notify parent
    this.props.onViewChanged()
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
    const { title, onLogin, createAccount, cancelButton, onCancelAction, lastError } = this.props

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
          <AuthenticationFormComponent
            title={title}
            onLogin={onLogin}
            initialMail={currentMail}
            lastError={lastError}
            createAccount={createAccount}
            cancelButton={cancelButton}
            onCancelAction={onCancelAction}
            onGotoCreateAccount={this.onGoto(viewStates.createAccountFormView, true)}
            onGotoResetPassword={this.onGoto(viewStates.askResetPasswordFormView, true)}
            onGotoUnlockAccount={this.onGoto(viewStates.unlockAccountFormView, true)}
          />
        )
      // TODO
      // case viewStates.createAccountFormView:
      //   return ()
      case viewStates.askResetPasswordFormView:
        return (
          <AccountRequestFormComponent
            requestFormId={requestFormIds.resetPasswordRequest}
            sendFailed={lastError !== undefined && lastError != null}
            initialMail={currentMail}
            onRequestAction={this.onResetPassword}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
          />
        )
      case viewStates.unlockAccountFormView:
        return (
          <AccountRequestFormComponent
            requestFormId={requestFormIds.unlockAccountRequest}
            sendFailed={lastError !== undefined && lastError !== null}
            initialMail={currentMail}
            onRequestAction={this.onUnlockAccount}
            onBack={this.onGoto(viewStates.authenticationFormView, true)}
          />)
      case viewStates.changePasswordFormView:
        return (
          <ChangePasswordFormComponent onChangePassword={this.onChangePassword} />)
      default:
        throw new Error(`Unknown view state ${currentView}`)
    }
  }

}

