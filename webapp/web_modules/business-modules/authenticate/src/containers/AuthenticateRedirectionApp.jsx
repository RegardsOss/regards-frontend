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
import compose from 'lodash/fp/compose'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { AuthenticateResultShape } from '@regardsoss/authentication-utils'
import { CommonShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { browserHistory } from 'react-router'
import { authServiceProviderActions, authServiceProviderSelectors } from '../clients/AuthenticateServiceProviderClient'
import { serviceProviderActions, serviceProviderSelectors } from '../clients/ServiceProviderClient'
import messages from '../i18n'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class AuthenticateRedirectionApp extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string.isRequired,
      serviceProviderName: PropTypes.string.isRequired,
    }),
    // from mapStateToProps
    serviceProvider: CommonShapes.ServiceProvider,
    authentication: AuthenticateResultShape,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    requestLogin: PropTypes.func.isRequired,
    fetchServiceProviders: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      authentication: authServiceProviderSelectors.getResult(state),
      serviceProvider: ownProps.params.serviceProviderName ? serviceProviderSelectors.getById(state, ownProps.params.serviceProviderName) : null,
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
      requestLogin: (scope, serviceProviderName, pluginId, code, redirectUri) => dispatch(authServiceProviderActions.login(
        scope,
        serviceProviderName,
        pluginId,
        code,
        redirectUri,
      )),
      fetchServiceProviders: (serviceName) => dispatch(serviceProviderActions.fetchEntity(serviceName)),
    }
  }

  static getCode = (browHistory) => {
    let code = get(browHistory.getCurrentLocation().query, 'code', '')
    if (isEmpty(code)) {
      const regex = /code=([^&]+)/
      const matchStrings = browHistory.getCurrentLocation().hash.match(regex)
      code = matchStrings && matchStrings[1] ? matchStrings[1] : ''
    }
    return code
  }

  UNSAFE_componentWillMount = () => {
    const {
      params: { serviceProviderName }, fetchServiceProviders,
    } = this.props
    // Fetch serviceProvider if exist
    if (serviceProviderName) {
      fetchServiceProviders(serviceProviderName)
    }
  }

  /**
   * Lifecle method Component will receive props: used here to detect authentication state changes
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      serviceProvider, requestLogin, params: { project, serviceProviderName },
      authentication,
    } = nextProps
    const currentAuthData = this.props.authentication || {}
    const nextAuthData = authentication || {}
    if (!isEqual(serviceProvider, this.props.serviceProvider) && serviceProvider) {
      // Get auth token
      const code = AuthenticateRedirectionApp.getCode(browserHistory)
      const redirectUri = browserHistory.getCurrentLocation().pathname
      const pluginId = get(serviceProvider, 'content.pluginConfiguration.pluginId', '')
      requestLogin(project, serviceProviderName, pluginId, code, redirectUri)
    }

    if (!isEqual(currentAuthData, nextAuthData) && !nextAuthData.isFetching) {
      new UIDomain.LocalStorageUser(nextAuthData, project || 'instance', UIDomain.APPLICATIONS_ENUM.AUTHENTICATE).save()
    }
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <div>{formatMessage({ id: 'authenticate.redirection.loading' })}</div>
    )
  }
}

export default compose(connect(
  AuthenticateRedirectionApp.mapStateToProps,
  AuthenticateRedirectionApp.mapDispatchToProps), withI18n(messages))(AuthenticateRedirectionApp)
