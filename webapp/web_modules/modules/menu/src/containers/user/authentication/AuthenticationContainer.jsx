/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import {
  AuthenticationClient, AuthenticationParametersActions, routeHelpers, AuthenticateResultShape,
} from '@regardsoss/authentication-utils'
import { AdminShapes } from '@regardsoss/shape'
import { borrowRoleActions, borrowRoleSelectors } from '../../../clients/BorrowRoleClient'
import { authenticationDialogActions } from '../../../clients/AuthenticationDialogUIClient'
import profileDialogActions from '../../../model/ProfileDialogActions'
import LoggedUserComponent from '../../../components/user/authentication/LoggedUserComponent'
import LoginButton from '../../../components/user/authentication/LoginButton'

/**
 * Authentication related container, that displays:
 * - authentication state when user is logged
 * - authentication button (and dispatches show dialog operation) when user is not logged
 * - authentication dialog when back from an email related with authentication
 * @author Sébastien binda
 */
export class AuthenticationContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      isSendingBorrowRole: borrowRoleSelectors.isFetching(state),
      borrowRoleResult: borrowRoleSelectors.getResult(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      onLogout: () => dispatch(AuthenticationClient.authenticationActions.logout()),
      sendBorrowRole: (roleName) => dispatch(borrowRoleActions.borrowRole(roleName)),
      dispatchRoleBorrowed: (authResult) => dispatch(AuthenticationClient.authenticationActions.notifyAuthenticationChanged(authResult)),
      showProfileEdition: () => dispatch(profileDialogActions.showEdition()),
      toggleAuthenticationDialogOpen: (opened) => dispatch(authenticationDialogActions.toggleDialogDisplay(opened)),
    }
  }

  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    borrowableRoles: AdminShapes.RoleList.isRequired,

    authenticationName: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    isInstance: PropTypes.bool.isRequired,
    // from mapStateToProps
    isSendingBorrowRole: PropTypes.bool.isRequired,
    borrowRoleResult: AuthenticateResultShape,
    // from mapDispatchToProps
    onLogout: PropTypes.func.isRequired,
    sendBorrowRole: PropTypes.func.isRequired,
    dispatchRoleBorrowed: PropTypes.func.isRequired,
    showProfileEdition: PropTypes.func.isRequired,
    toggleAuthenticationDialogOpen: PropTypes.func.isRequired,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect back from email case and open authentication dialog when required
   */
  UNSAFE_componentWillMount = () => this.onToggleAuthenticationVisible(routeHelpers.isBackFromAuthenticationMail())

  /**
   * Lifecycle method: component will receive props. It detects here:
   * - send borrow role done to update authentication state (reflect borrowed role in authentication)
   * - authentication change (to hide the authentication dialog)
   */
  UNSAFE_componentWillReceiveProps = ({
    isSendingBorrowRole, borrowRoleResult, authenticationName, dispatchRoleBorrowed,
  }) => {
    if (this.props.isSendingBorrowRole && !isSendingBorrowRole) {
      // we just finished changing role, notice the authenication state so that he updates with the new state
      dispatchRoleBorrowed(borrowRoleResult)
    }
    if (!this.props.authenticationName && authenticationName) {
      // user logged in, hide the dialog
      this.onToggleAuthenticationVisible(false)
    }
  }

  onBorrowRole = (roleName) => {
    const { sendBorrowRole, currentRole } = this.props
    if (roleName !== currentRole) {
      Promise.resolve(sendBorrowRole(roleName)).then((actionResult) => {
        if (!actionResult.error) {
          this.goToHomePage()
        }
      })
    }
  }

  onLogout = () => {
    this.props.onLogout()
    this.goToHomePage()
  }

  /** Callback to show authentication dialog */
  onShowAuthenticationDialog = () => this.onToggleAuthenticationVisible(true)

  /**
   * Shows and hide authentication dialog
   * @param authenticationVisible is visible in next state?
   */
  onToggleAuthenticationVisible = (authenticationVisible) => {
    this.props.toggleAuthenticationDialogOpen(authenticationVisible)
  }

  goToHomePage = () => {
    const { project, appName } = this.props
    let url
    if (project && project !== AuthenticationParametersActions.INSTANCE) {
      url = `/${appName}/${project}`
    } else {
      url = `/${appName}`
    }
    browserHistory.push(url)
  }

  render() {
    const {
      authenticationName, currentRole, borrowableRoles,
      showProfileEdition, isInstance,
    } = this.props
    if (authenticationName) {
      // user is logged
      return (
        <LoggedUserComponent
          name={authenticationName}
          showProfileEdition={!isInstance}
          onShowProfileEdition={showProfileEdition}
          onLogout={this.onLogout}
          currentRole={currentRole}
          borrowableRoles={borrowableRoles}
          onBorrowRole={this.onBorrowRole}
        />)
    }
    // user is not logged
    return <LoginButton onLoginAction={this.onShowAuthenticationDialog} />
  }
}

export default connect(
  AuthenticationContainer.mapStateToProps,
  AuthenticationContainer.mapDispatchToProps)(AuthenticationContainer)
