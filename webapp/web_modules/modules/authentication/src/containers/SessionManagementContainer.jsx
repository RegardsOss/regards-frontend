/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import root from 'window-or-global'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
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
    project: PropTypes.string,
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
    logout: PropTypes.func.isRequired,
  }

  static defaultProps = {
    project: '_default',
  }

  static SESSION_TIMEOUT_DURATION = 5000

  state = {
    initialized: false,
  }


  /**
   * Lifecycle method component will mount: used here to listen for window focus events (broken timers workaround)
   */
  componentWillMount() {
    root.window.addEventListener('focus', this.onWindowFocused, false)
    this.updateAuthenticationFromLocalStorage()
    this.setState({
      initialized: true,
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
      this.jobCheckingAuthenticationExpired(nextProps.authentication)
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
  onWindowFocused = () => this.jobCheckingAuthenticationExpired(this.props.authentication)

  /**
   * Check the token validity
   * @param {*} properties component property authentication to consider
   */
  jobCheckingAuthenticationExpired = (authentication) => {
    // get back transient data from this attributes (not stored in state, as they are useless for graphics)
    if (this.sessionLockTimer) {
      clearTimeout(this.sessionLockTimer)
      this.sessionLockTimer = null
    }
    // is login in or changing role?
    if (authentication.authenticateExpirationDate) {
      // Is in past? - note that such case may happen, due to inactive windows systems
      const expiresIn = authentication.authenticateExpirationDate - Date.now()
      if (expiresIn < 0) {
        // immediate time out
        this.onSessionTimeout()
      } else {
        // test again in few seconds
        this.sessionLockTimer = setTimeout(
          () => this.jobCheckingAuthenticationExpired(authentication),
          SessionManagementContainer.SESSION_TIMEOUT_DURATION,
        )
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
      return [this.props.notifyAuthenticationChanged(user.getAuthenticationInformations())]
    }
    // Else we have to clean store if an authentication token is present from an other project or user.
    // Case of switching from one project to another through browser navigation back,next arrows.
    this.props.logout()
    return []
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
          sessionLocked
            ? <SessionLockedFormComponent
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
  logout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
})


export default connect(mapStateToProps, mapDispatchToProps)(SessionManagementContainer)
