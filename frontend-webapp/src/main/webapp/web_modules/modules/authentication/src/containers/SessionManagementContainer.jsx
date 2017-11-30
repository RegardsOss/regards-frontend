/**
* LICENSE_PLACEHOLDER
**/
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-manager'
import AuthenticationDialogComponent from '../components/AuthenticationDialogComponent'
import SessionLockedFormComponent from '../components/SessionLockedFormComponent'

/**
* Session management container: if session times out, shows the session locking pane in dialog,
* otherwise renders below authentication panes
*/
export class SessionManagementContainer extends React.Component {
  static propTypes = {
    showLoginWindow: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    children: PropTypes.element,
    authentication: AuthenticateShape,
    // from mapStateToProps
    hasUnlockingError: PropTypes.bool,
    // from mapDispatchToProps
    fetchAuthenticate: PropTypes.func.isRequired,
    dispatchSessionLocked: PropTypes.func.isRequired,
  }

  componentWillReceiveProps = (nextProps) => {
    // check: if the authentication state changes, set up a timer to handle expiration
    const currentAuthData = this.props.authentication || {}
    const nextAuthData = nextProps.authentication || {}
    if (currentAuthData.authenticateDate !== nextAuthData.authenticateDate) {
      // get back transient data from this attributes (not stored in state, as they are useless for graphics)
      if (this.sessionLockTimer) {
        clearTimeout(this.sessionLockTimer)
        this.sessionLockTimer = null
      }
      // is login in or changing role?
      const nextAuthResponse = nextAuthData.result
      if (nextAuthData.authenticateDate && !isEmpty(nextAuthResponse)) {
        // Is in past? - note that such case is not supposed to happen, except maybe for auto log in systems
        // current authentication date is expressed using Date.now(), Date.now() is express in ms, expires_in is expressed in seconds, see
        // http://docs.spring.io/spring-security/oauth/apidocs/org/springframework/security/oauth2/common/OAuth2AccessToken.html#EXPIRES_IN
        const expiresInMS = nextAuthResponse.expires_in * 1000
        if (nextAuthData.authenticateDate + expiresInMS <= Date.now()) {
          // immediate time out
          this.onSessionTimeout()
        } else {
          // later time out
          this.sessionLockTimer = setTimeout(() => this.onSessionTimeout(), expiresInMS)
        }
      }
    }
  }

  onSessionTimeout = () => {
    // we will here send an authentication action that lock session, and recover it when back from state change (through authentication.sessionLocked attribute)
    this.props.dispatchSessionLocked()
  }

  unlockSession = (formValues) => {
    const { fetchAuthenticate, authentication: { result: { scope, sub } } } = this.props
    // fetch authentication (will unlock session when it returns successfully )
    fetchAuthenticate(sub, formValues.password, scope)
  }

  render() {
    const {
      hasUnlockingError, authentication, onRequestClose, showLoginWindow, children,
    } = this.props
    const sessionLocked = !!authentication.sessionLocked
    return (
      <AuthenticationDialogComponent
        onRequestClose={sessionLocked ? null : onRequestClose}
        open={showLoginWindow || sessionLocked}
      >
        {
          sessionLocked ?
            <SessionLockedFormComponent
              hasUnlockingError={hasUnlockingError}
              onUnlock={this.unlockSession}
            /> :
            children
        }
      </AuthenticationDialogComponent>
    )
  }
}

const mapStateToProps = state => ({
  hasUnlockingError: AuthenticationClient.authenticationSelectors.hasError(state),
  authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchSessionLocked: () => dispatch(AuthenticationClient.authenticationActions.lockSession()),
  fetchAuthenticate: (login, password, scope) => dispatch(AuthenticationClient.authenticationActions.login(login, password, scope)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SessionManagementContainer)
