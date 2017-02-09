/**
 * LICENSE_PLACEHOLDER
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { fetchAuthenticate, AuthenticationSelectors } from '@regardsoss/authentication-manager'
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
    showCreateAccount: React.PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: React.PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: React.PropTypes.func,
    // other authentication forms links
    onGotoCreateAccount: React.PropTypes.func.isRequired,
    onGotoResetPassword: React.PropTypes.func.isRequired,
    onGotoUnlockAccount: React.PropTypes.func.isRequired,
    // from map state to props
    error: React.PropTypes.string,
    // from map dispatch to props
    dispatchLoginRequest: React.PropTypes.func,
  }

  onLoginRequest = ({ username, password }) => {
    const { project, dispatchLoginRequest } = this.props
    dispatchLoginRequest(username, password, project)
  }

  render() {
    const {
      initialMail, title,
      showCreateAccount, showCancel, onCancelAction, error, onGotoCreateAccount, onGotoResetPassword, onGotoUnlockAccount,
       } = this.props
    return (
      <AuthenticationFormComponent
        title={title}
        onLogin={this.onLoginRequest}
        initialMail={initialMail}
        error={error}
        showCreateAccount={showCreateAccount}
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
  error: AuthenticationSelectors.getError(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: (username, password, scope) => dispatch(fetchAuthenticate(username, password, scope)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationFormContainer)
