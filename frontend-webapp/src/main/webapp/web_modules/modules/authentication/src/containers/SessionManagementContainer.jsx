/**
* LICENSE_PLACEHOLDER
**/
import root from 'window-or-global'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-manager'
import { UIDomain } from '@regardsoss/domain'
import AuthenticationDialogComponent from '../components/AuthenticationDialogComponent'
import SessionLockedFormComponent from '../components/SessionLockedFormComponent'

/**
* Session management container:
*  - handle session connexion from browser localstorage,
*  - if session times out, shows the session locking pane in dialog
*  - otherwise renders below authentication panels
*/
export class SessionManagementContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    application: PropTypes.string.isRequired,
    showLoginWindow: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    children: PropTypes.element,
    authentication: AuthenticateShape,
    // from mapStateToProps
    hasUnlockingError: PropTypes.bool,
    // from mapDispatchToProps
    fetchAuthenticate: PropTypes.func.isRequired,
    dispatchSessionLocked: PropTypes.func.isRequired,
    notifyAuthenticationChanged: PropTypes.func.isRequired,
  }

  state = {
    initialized: false,
  }

  /**
   * Lifecycle method component will mount: used here to listen for window focus events (broken timers workaround)
   */
  componentWillMount() {
    root.window.addEventListener('focus', this.onWindowFocused, false)
    this.updateAuthenticationFromLocalStorage().then(() => {
      this.setState({
        initialized: true,
      })
    })
  }

  /**
   * Lifecle method Component will receive props: used here to detect authentication state changes
   */
  componentWillReceiveProps = (nextProps) => {
    // check: if the authentication state changes, set up a timer to handle expiration
    const currentAuthData = this.props.authentication || {}
    const nextAuthData = nextProps.authentication || {}
    if (!isEqual(currentAuthData.authenticateDate, nextAuthData.authenticateDate) && !nextAuthData.isFetching) {
      this.onAuthenticationStateChanged(nextProps)
      this.updateAuthenticationInLocalStorage(nextAuthData.result, nextAuthData.authenticateDate)
    }
  }

  /**
   * Component will unmount: remove the focus listener (broken timers workaround)
   */
  componentWillUnmount() {
    root.window.removeEventListener('focus', this.onWindowFocused, false)
  }

  /**
   * On focus gained detected. Check the locked state when focus change, as many browsers do not keep the timers accurate when
   * they are no longer focused
   */
  onWindowFocused = () => this.onAuthenticationStateChanged(this.props)

  /**
   * On authentication state changed (or focus state changed): check again the token validity
   * @param {*} properties component properties to consider
   */
  onAuthenticationStateChanged = ({ authentication }) => {
    // get back transient data from this attributes (not stored in state, as they are useless for graphics)
    if (this.sessionLockTimer) {
      clearTimeout(this.sessionLockTimer)
      this.sessionLockTimer = null
    }
    // is login in or changing role?
    const authenticationResponse = authentication.result
    if (authentication.authenticateDate && !isEmpty(authenticationResponse)) {
      // Is in past? - note that such case may happen, due to inactive windows systems
      const expiresInMS = authenticationResponse.expires_in * 1000 // backend unit is seconds
      const expiresIn = authentication.authenticateDate + expiresInMS - Date.now()
      if (expiresIn < 0) {
        // immediate time out
        this.onSessionTimeout()
      } else {
        // later time out
        this.sessionLockTimer = setTimeout(() => this.onSessionTimeout(), expiresIn)
      }
    }
    // else: not authentified, no session lock for the unknown user =D
  }

  onSessionTimeout = () => {
    const { project, application } = this.props
    // we will here send an authentication action that lock session, and recover it when back from state change (through authentication.sessionLocked attribute)
    this.props.dispatchSessionLocked()
    // Remove user connection information from localstorage
    UIDomain.LocalStorageUser.delete(project || 'instance', application)
  }


  /**
   * Action to update local storage with current user authentication informations
   * @param authentication : authentication informations for current user logged in
   * @param authenticationDate: authentication date
   */
  updateAuthenticationInLocalStorage = (authentication, authenticationDate) => {
    const { project, application } = this.props
    if (authentication && authenticationDate) {
      new UIDomain.LocalStorageUser(authentication, authenticationDate, project || 'instance', application).save()
    } else {
      UIDomain.LocalStorageUser.delete(project || 'instance', application)
    }
  }

  /**
   * If a user is saved in local storage use it to update the current authentication informations
   */
  updateAuthenticationFromLocalStorage = () => {
    const { project, application } = this.props
    const user = UIDomain.LocalStorageUser.retrieve(project || 'instance', application)
    if (user) {
      return this.props.notifyAuthenticationChanged(user.getAuthenticationInformations())
    }
    return new Promise(() => { })
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
    const { initialized } = this.state
    const sessionLocked = !!authentication.sessionLocked
    if (!initialized) {
      return null
    }
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
            /> : children
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
  notifyAuthenticationChanged: authentication => dispatch(AuthenticationClient.authenticationActions.notifyAuthenticationChanged(authentication)),
})


export default connect(mapStateToProps, mapDispatchToProps)(SessionManagementContainer)
