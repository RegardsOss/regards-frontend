/**
 * LICENSE_PLACEHOLDER
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { AuthenticateActions, AuthenticateSelectors, AuthenticationErrorShape } from '@regardsoss/authentication-manager'
import AuthenticationFormComponent from '../components/AuthenticationFormComponent'

/**
 * Authentication form container
 */
export class AuthenticationFormContainer extends React.Component {

  static propTypes = {
    // initial mail value
    initialMail: React.PropTypes.string,
    // current project (empty if admin)
    project: React.PropTypes.string.isRequired,
    // form title
    title: React.PropTypes.string.isRequired,
    // show create account link?
    showAskProjectAccess: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
    // other authentication forms links
    onGotoCreateAccount: React.PropTypes.func.isRequired,
    onGotoResetPassword: React.PropTypes.func.isRequired,
    onGotoUnlockAccount: React.PropTypes.func.isRequired,
    // from map state to props
    loginError: AuthenticationErrorShape,
    // from map dispatch to props
    dispatchLoginRequest: React.PropTypes.func,
  }

  /** I18N injection & themes */
  static contextTypes = { ...i18nContextType }


  onLoginRequest = ({ username, password }) => {
    const { project, dispatchLoginRequest } = this.props
    dispatchLoginRequest(username, password, project)
  }

  render() {
    const {
      initialMail, title,
      showAskProjectAccess, showCancel, onCancelAction, loginError, onGotoCreateAccount, onGotoResetPassword, onGotoUnlockAccount,
    } = this.props
    const { intl } = this.context
    return (
      <AuthenticationFormComponent
        title={title}
        onLogin={this.onLoginRequest}
        initialMail={initialMail}
        errorMessage={loginError && intl.formatMessage({ id: `authentication.error.${loginError}` })}
        showAskProjectAccess={showAskProjectAccess}
        showCancel={showCancel}
        onCancelAction={onCancelAction}
        onGotoCreateAccount={onGotoCreateAccount}
        onGotoResetPassword={onGotoResetPassword}
        onGotoUnlockAccount={onGotoUnlockAccount}
      />
    )
  }
}

const mapStateToProps = state => ({
  loginError: AuthenticateSelectors.getError(state) && AuthenticateSelectors.getError(state).loginError,
})

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: (username, password, scope) => dispatch(AuthenticateActions.login(username, password, scope)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationFormContainer)
