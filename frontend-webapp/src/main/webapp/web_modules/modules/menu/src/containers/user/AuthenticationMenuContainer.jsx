/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { AuthenticationClient, routeHelpers } from '@regardsoss/authentication-manager'
import LoginButton from '../../components/user/LoginButton'
import LoggedUserContainer from './LoggedUserContainer'

/**
 * Manages authentication state machine. The callbacks are provided by parent
 * This container display the login button and the modal with login informations.
 * @author Sébastien binda
 */
export class AuthenticationMenuContainer extends React.Component {
  static propTypes = {
    // should be displayed?
    display: PropTypes.bool,
    appName: PropTypes.string.isRequired,
    project: PropTypes.string.isRequired,
    // from mapStateToProps
    isAuthenticated: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
    // router injection
    router: PropTypes.any,
  }

  // when user access interface from mail (like reset password), he should see dialog initially
  componentWillMount = () => this.setAuthenticationVisible(routeHelpers.isBackFromAuthenticationMail())

  componentWillReceiveProps(nextProps) {
    if (!this.props.isAuthenticated && nextProps.isAuthenticated && this.state && this.state.authenticationVisible) {
      // user logged in, hide the dialog
      this.onCloseDialog()
    }
  }

  // forbid closing when we are in a specific authentication URL (to avoid inconsistent states)
  onCloseDialog = () => this.setAuthenticationVisible(false)

  /**
   * Callback when user click on the authentication button
   */
  onClickAuthenticationButton = () => this.setAuthenticationVisible(true)

  /**
   * Shows and hide authentication dialog
   * @param authenticationVisible is visible in next state?
   */
  setAuthenticationVisible = (authenticationVisible) => {
    if (!this.state || this.state.authenticationVisible !== authenticationVisible) {
      this.setState({ authenticationVisible })
    }
  }

  render() {
    const {
      display, isAuthenticated, project, appName,
    } = this.props
    const { authenticationVisible } = this.state

    if (!display) { // hidden by configuration
      return null
    }

    // Initialise the authentication module configuration
    const authenticationModule = {
      type: modulesManager.AllDynamicModuleTypes.AUTHENTICATION,
      active: true,
      conf: {
        showLoginWindow: authenticationVisible,
        loginTitle: this.context.intl.formatMessage({ id: 'loginFormTitle' }),
        // show cancel button only when not in a specific authentication URL
        showCancel: !routeHelpers.isBackFromAuthenticationMail(),
        showAskProjectAccess: true,
        onCancelAction: this.onCloseDialog,
      },
    }

    // in bar: render user status or connection button
    const buttonComponent = isAuthenticated ?
      (<LoggedUserContainer
        appName={appName}
        project={project}
      />) :
      <LoginButton onLoginAction={this.onClickAuthenticationButton} />

    return (
      <div>
        {buttonComponent}
        <LazyModuleComponent
          module={authenticationModule}
          appName={this.props.appName}
          project={this.props.project}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
})

export default connect(mapStateToProps)(AuthenticationMenuContainer)