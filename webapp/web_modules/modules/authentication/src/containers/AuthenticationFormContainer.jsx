/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
} from '@regardsoss/authentication-utils'
import { CommonShapes } from '@regardsoss/shape'
import AuthenticationFormComponent from '../components/AuthenticationFormComponent'
import ChangePasswordFormContainer from './ChangePasswordFormContainer'
import { serviceProviderActions, serviceProviderSelectors } from '../clients/ServiceProviderClient'

/**
 * Authentication form container
 */
export class AuthenticationFormContainer extends React.Component {
  static propTypes = {
    // initial mail value
    initialMail: PropTypes.string,
    // current project (empty if admin)
    project: PropTypes.string,
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
    serviceProviderList: CommonShapes.ServiceProviderList.isRequired,
    // from map dispatch to props
    dispatchLoginRequest: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    fetchServiceProviders: PropTypes.func.isRequired,
  }

  /** I18N injection */
  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    userMail: null,
    loading: false,
  }

  UNSAFE_componentWillMount() {
    this.props.fetchServiceProviders()
  }

  onLoginRequest = ({ username, password }) => {
    const { project, dispatchLoginRequest } = this.props
    this.setState({
      userMail: username,
      loading: true,
    }, () => Promise.resolve(dispatchLoginRequest(username, password, project)).then((ar) => {
      this.setState({ loading: false })
    }))
  }

  onCancelChangePassword = () => {
    this.props.clearErrors()
    if (this.props.onCancelAction) {
      this.props.onCancelAction()
    }
  }

  render() {
    const {
      initialMail, title, showAskProjectAccess, showCancel, serviceProviderList,
      loginError, onGotoCreateAccount, onGotoResetPassword, onGotoUnlockAccount,
    } = this.props
    const { intl } = this.context
    if (loginError === 'ACCOUNT_INACTIVE_PASSWORD') {
      return (
        <ChangePasswordFormContainer
          mail={this.state.userMail}
          onDone={this.onLoginRequest}
          errorMessage={intl.formatMessage({ id: `authentication.error.${loginError}` })}
          onCancel={this.onCancelChangePassword}
        />
      )
    }
    return (
      <AuthenticationFormComponent
        title={title}
        onLogin={this.onLoginRequest}
        loading={this.state.loading}
        initialMail={initialMail}
        errorMessage={loginError && intl.formatMessage({ id: `authentication.error.${loginError}` })}
        showAskProjectAccess={showAskProjectAccess}
        showCancel={showCancel}
        onCancelAction={this.onCancelChangePassword}
        onGotoCreateAccount={onGotoCreateAccount}
        onGotoResetPassword={onGotoResetPassword}
        onGotoUnlockAccount={onGotoUnlockAccount}
        serviceProviderList={serviceProviderList}
      />
    )
  }
}

const mapStateToProps = (state) => ({
  loginError: AuthenticationClient.authenticationSelectors.getError(state)
    && AuthenticationClient.authenticationSelectors.getError(state).loginError,
  serviceProviderList: serviceProviderSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginRequest: (username, password, scope) => dispatch(AuthenticationClient.authenticationActions.login(
    username,
    password,
    scope,
    AuthenticationRouteHelper.getOriginUrlWithoutQueryParams(),
    AuthenticationRouteHelper.getRequestLinkURL(AuthenticationRouteParameters.mailAuthenticationAction.values.verifyEmail),
  )),
  clearErrors: () => dispatch(AuthenticationClient.authenticationActions.clearErrors()),
  fetchServiceProviders: () => dispatch(serviceProviderActions.fetchPagedEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationFormContainer)
