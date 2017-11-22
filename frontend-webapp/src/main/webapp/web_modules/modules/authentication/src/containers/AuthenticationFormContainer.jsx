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
 */
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import {
  AuthenticationClient, AuthenticationErrorShape, AuthenticationRouteParameters, AuthenticationRouteHelper,
} from '@regardsoss/authentication-manager'
import AuthenticationFormComponent from '../components/AuthenticationFormComponent'

/**
 * Authentication form container
 */
export class AuthenticationFormContainer extends React.Component {

  static propTypes = {
    // initial mail value
    initialMail: PropTypes.string,
    // current project (empty if admin)
    project: PropTypes.string.isRequired,
    // form title
    title: PropTypes.string.isRequired,
    // show create account link?
    showAskProjectAccess: PropTypes.bool.isRequired,
    // show cancel button?
    showCancel: PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: PropTypes.func,
    // other authentication forms links
    onGotoCreateAccount: PropTypes.func.isRequired,
    onGotoResetPassword: PropTypes.func.isRequired,
    onGotoUnlockAccount: PropTypes.func.isRequired,
    // from map state to props
    loginError: AuthenticationErrorShape,
    // from map dispatch to props
    dispatchLoginRequest: PropTypes.func,
  }

  /** I18N injection */
  static contextTypes = {
    ...i18nContextType,
  }

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('DEV', 'Auto connection')
      const that = this
      setTimeout(() => {
        //that.onLoginRequest({ username: 'regards-admin@c-s.fr', password: 'root_admin' })
        that.onLoginRequest({ username: 'hello@hello.com', password: 'hello' })
      }, 150)
    }
  }

  onLoginRequest = ({ username, password }) => {
    const { project, dispatchLoginRequest } = this.props
    dispatchLoginRequest(username, password, project)
  }

  render() {
    const {
      initialMail, title, showAskProjectAccess, showCancel, onCancelAction,
      loginError, onGotoCreateAccount, onGotoResetPassword, onGotoUnlockAccount,
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
  loginError: AuthenticationClient.authenticationSelectors.getError(state) &&
    AuthenticationClient.authenticationSelectors.getError(state).loginError,
})

const mapDispatchToProps = dispatch => ({
  dispatchLoginRequest: (username, password, scope) => dispatch(AuthenticationClient.authenticationActions.login(
    username,
    password,
    scope,
    AuthenticationRouteHelper.getOriginUrlWithoutQueryParams(),
    AuthenticationRouteHelper.getRequestLinkURL(AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail))),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationFormContainer)
