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
 */
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import {
  AuthenticationRouteParameters, AuthenticationParametersHelper, AuthenticationClient, routeHelpers,
} from '@regardsoss/authentication-utils'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import AuthenticationWorkflowsComponent, { initialModes } from '../components/AuthenticationWorkflowsComponent'
import SessionManagementContainer from './SessionManagementContainer'

/**
 * Mount the authentication module, according with current URL requirements.
 * Handle authentication state locally to:
 * 1 - manage session properly
 * 2 - perform redirections required on external mail re-entries
 */
export class AuthenticationModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: PropTypes.shape({
      // externally controlled login window state
      showLoginWindow: PropTypes.bool.isRequired,
      // login screen title
      loginTitle: PropTypes.string.isRequired,
      // show create account link?
      showAskProjectAccess: PropTypes.bool.isRequired,
      // show cancel button?
      showCancel: PropTypes.bool.isRequired,
      // on cancel button callback, or none if behavior not available
      onCancelAction: PropTypes.func,
      // selected main auth service provider configuration to be used in priority by users
      selectedMainService: UIShapes.ServiceProviderConfiguration,
    }),
    // from mapStateToProps
    authenticated: PropTypes.bool,
  }

  /**
   * Returns view state for external access
   * @param urlAction found url authentication action
   * @returns initial view state
   */
  static getInitialViewMode(urlAction = '') {
    const modes = AuthenticationRouteParameters.mailAuthenticationAction.values
    switch (urlAction) {
      case modes.verifyEmail:
        return initialModes.validateCreatedAccount
      case modes.unlockAccount:
        return initialModes.finishAccountUnlocking
      case modes.changePassword:
        return initialModes.finishChangePassword
      default:
        // no external acces, default view state (login)
        return initialModes.loginForm
    }
  }

  UNSAFE_componentWillMount() {
    // determinate the initial state and parameters for authentication state machine
    this.setState({
      initialViewMode: AuthenticationModuleContainer.getInitialViewMode(AuthenticationParametersHelper.getMailAuthenticationAction()),
      initialEmail: AuthenticationParametersHelper.getAccountEmail(),
      actionToken: AuthenticationParametersHelper.getToken(),
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.props.authenticated && nextProps.authenticated) {
      if (routeHelpers.isBackFromAuthenticationMail()) {
        // now back to default routing state
        this.setState({
          initialViewMode: initialModes.loginForm,
          initialEmail: this.state.initialEmail,
        })
        routeHelpers.doRedirection()
      }
    }
  }

  render() {
    // parse initial state from parameters
    const {
      project, appName, moduleConf: {
        showLoginWindow, loginTitle, showAskProjectAccess, showCancel, onCancelAction, selectedMainService,
      },
    } = this.props
    const { initialViewMode, initialEmail, actionToken } = this.state
    // Only enable extenal service providers for user application
    const enableServiceProviders = appName === UIDomain.APPLICATIONS_ENUM.USER

    // render in session management HOC (can override 'should show' if session is locked, controls dialog state and content)
    return (
      <SessionManagementContainer
        project={project}
        application={appName}
        onRequestClose={routeHelpers.isBackFromAuthenticationMail() ? null : onCancelAction}
        enableServiceProviders={enableServiceProviders}
        showLoginWindow={showLoginWindow}
      >
        <AuthenticationWorkflowsComponent
          project={project || ''}
          loginTitle={loginTitle}
          showCancel={showCancel}
          showAskProjectAccess={showAskProjectAccess}
          enableServiceProviders={enableServiceProviders}
          onCancelAction={onCancelAction}
          initialMode={initialViewMode}
          initialEmail={initialEmail}
          actionToken={actionToken}
          selectedMainService={selectedMainService}
        />
      </SessionManagementContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  authenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
  authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
  scope: AuthenticationParametersHelper.get,
})

export default connect(mapStateToProps)(AuthenticationModuleContainer)
