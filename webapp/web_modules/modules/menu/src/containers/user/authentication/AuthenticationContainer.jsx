/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import {
  AuthenticationClient, AuthenticationParametersActions, routeHelpers, AuthenticateResultShape,
  AuthenticateShape,
} from '@regardsoss/authentication-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { AdminShapes, CommonShapes, UIShapes } from '@regardsoss/shape'
import get from 'lodash/get'
import { borrowRoleActions, borrowRoleSelectors } from '../../../clients/BorrowRoleClient'
import { authenticationDialogActions } from '../../../clients/AuthenticationDialogUIClient'
import { serviceProviderPublicSelectors } from '../../../clients/ServiceProviderPublicClient'
import { disconnectServiceProviderAction } from '../../../clients/ServiceProviderDisconnect'
import { ProfileDialogActions } from '../../../model/ProfileDialogActions'
import LoggedUserComponent from '../../../components/user/authentication/LoggedUserComponent'
import LoginButton from '../../../components/user/authentication/LoginButton'
import { PROFILE_VIEW_STATE_ENUM } from '../../../domain/ProfileViewStateEnum'

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
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
      serviceProviderList: serviceProviderPublicSelectors.getList(state),
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
      onShowProfile: (initialView) => dispatch(ProfileDialogActions.showDialog(initialView)),
      toggleAuthenticationDialogOpen: (opened) => dispatch(authenticationDialogActions.toggleDialogDisplay(opened)),
      setMainServiceProvider: (selectedMainService) => dispatch(authenticationDialogActions.setMainService(selectedMainService)),
      disconnectServiceProvider: (serviceProviderName) => dispatch(disconnectServiceProviderAction.disconnectServiceProvider(serviceProviderName)),
    }
  }

  static propTypes = {
    appName: PropTypes.string.isRequired,
    project: PropTypes.string,
    borrowableRoles: AdminShapes.RoleList.isRequired,

    authenticationName: PropTypes.string.isRequired,
    currentRole: PropTypes.string.isRequired,
    isInstance: PropTypes.bool.isRequired,
    // selected main auth service provider configuration to be used in priority by users
    selectedMainService: UIShapes.ServiceProviderConfiguration,
    // from mapStateToProps
    isSendingBorrowRole: PropTypes.bool.isRequired,
    borrowRoleResult: AuthenticateResultShape,
    authentication: AuthenticateShape,
    // from mapDispatchToProps
    onLogout: PropTypes.func.isRequired,
    serviceProviderList: CommonShapes.ServiceProviderList.isRequired,
    sendBorrowRole: PropTypes.func.isRequired,
    dispatchRoleBorrowed: PropTypes.func.isRequired,
    onShowProfile: PropTypes.func.isRequired,
    toggleAuthenticationDialogOpen: PropTypes.func.isRequired,
    setMainServiceProvider: PropTypes.func.isRequired,
    disconnectServiceProvider: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect back from email case and open authentication dialog when required
   */
  UNSAFE_componentWillMount() {
    this.onToggleAuthenticationVisible(routeHelpers.isBackFromAuthenticationMail())
  }

  /**
   * Lifecycle method: component will receive props. It detects here:
   * - send borrow role done to update authentication state (reflect borrowed role in authentication)
   * - authentication change (to hide the authentication dialog)
   */
  UNSAFE_componentWillReceiveProps({
    isSendingBorrowRole, borrowRoleResult, authenticationName, dispatchRoleBorrowed,
  }) {
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
          this.onGoToHomePage()
        }
      })
    }
  }

  onLogout = () => {
    const {
      authentication, disconnectServiceProvider, serviceProviderList, appName, project,
    } = this.props
    const serviceProviderName = get(authentication, 'result.service_provider_name')
    // 1- Send disconnect first to server
    if (serviceProviderName) {
      disconnectServiceProvider(serviceProviderName)
    }
    // 2- Clear login info inside HMI
    this.props.onLogout()
    // 3- Redirect user
    if (serviceProviderName) {
      const logoutUrl = get(serviceProviderList, `${serviceProviderName}.content.logoutUrl`)
      if (logoutUrl) {
        browserHistory.push(`${logoutUrl}?post_logout_redirect_uri=${root.location.origin}/${appName}/${project}`)
      } else {
        this.onGoToHomePage()
      }
    } else {
      this.onGoToHomePage()
    }
  }

  /** Callback to show authentication dialog */
  onShowAuthenticationDialog = () => this.onToggleAuthenticationVisible(true)

  /**
   * Shows and hide authentication dialog
   * @param authenticationVisible is visible in next state?
   */
  onToggleAuthenticationVisible = (authenticationVisible) => {
    const { selectedMainService, setMainServiceProvider, toggleAuthenticationDialogOpen } = this.props
    toggleAuthenticationDialogOpen(authenticationVisible)
    setMainServiceProvider(selectedMainService)
  }

  onGoToHomePage = () => {
    const { project, appName } = this.props
    let url
    if (project && project !== AuthenticationParametersActions.INSTANCE) {
      url = `/${appName}/${project}`
    } else {
      url = `/${appName}`
    }
    browserHistory.push(url)
  }

  /**
   * On show profile edition: shows user profile dialog in profile state initially
   */
  onShowProfileEdition = () => {
    const { onShowProfile } = this.props
    onShowProfile(PROFILE_VIEW_STATE_ENUM.EDIT_PROFILE)
  }

  /**
   * On show quota information: shows user profile dialog in quota information initially
   */
  onShowQuotaInformation = () => {
    const { onShowProfile } = this.props
    onShowProfile(PROFILE_VIEW_STATE_ENUM.VIEW_QUOTA_INFORMATIONS)
  }

  render() {
    const {
      authenticationName, currentRole, borrowableRoles, isInstance,
    } = this.props
    const { intl: { locale } } = this.context
    if (authenticationName) {
      // user is logged
      return (
        <LoggedUserComponent
          name={authenticationName}
          showProfileDialog={!isInstance}
          onShowProfileEdition={this.onShowProfileEdition}
          onShowQuotaInformation={this.onShowQuotaInformation}
          onLogout={this.onLogout}
          currentRole={currentRole}
          borrowableRoles={borrowableRoles}
          onBorrowRole={this.onBorrowRole}
          locale={locale}
        />)
    }
    // user is not logged
    return <LoginButton onLoginAction={this.onShowAuthenticationDialog} />
  }
}

export default connect(
  AuthenticationContainer.mapStateToProps,
  AuthenticationContainer.mapDispatchToProps)(AuthenticationContainer)
