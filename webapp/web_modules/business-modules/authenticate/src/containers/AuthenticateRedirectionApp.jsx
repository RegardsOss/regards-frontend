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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { AuthenticateResultShape, AuthenticationParametersActions } from '@regardsoss/authentication-utils'
import { UIDomain } from '@regardsoss/domain'
import { browserHistory } from 'react-router'
import root from 'window-or-global'
import { authServiceProviderActions, authServiceProviderSelectors } from '../clients/AuthenticateServiceProviderClient'

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
    authentication: AuthenticateResultShape,
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    requestLogin: PropTypes.func.isRequired,
    initializeApplication: PropTypes.func.isRequired,
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
      initializeApplication: (project) => dispatch(AuthenticationParametersActions.applicationStarted(project)),
      requestLogin: (scope, pluginId, serviceProviderName, code, redirectUri) => dispatch(authServiceProviderActions.login(
        scope,
        pluginId,
        serviceProviderName,
        code,
        redirectUri,
      )),
    }
  }

  /**
   * Retrieve code parameter from url.
   * Code could be either in query params or in hash of browserHistory
   * @param {*} browHistory
   */
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
      params: { serviceProviderName, project }, initializeApplication, requestLogin,
    } = this.props

    // Redux store space init for user app
    initializeApplication(project)

    // Get auth token
    if (browserHistory) {
      const code = AuthenticateRedirectionApp.getCode(browserHistory)
      const redirectUri = `${root.location.origin}${browserHistory.getCurrentLocation().pathname}${browserHistory.getCurrentLocation().search}`
      requestLogin(project, 'OpenId', serviceProviderName, code, redirectUri)
    }
  }

  /**
   * Lifecle method Component will receive props: used here to detect authentication state changes
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      params: { project }, authentication,
    } = nextProps
    const currentAuthData = this.props.authentication || {}
    const nextAuthData = authentication || {}

    if (!isEqual(currentAuthData, nextAuthData) && !nextAuthData.isFetching) {
      new UIDomain.LocalStorageUser(nextAuthData, new Date().getTime(), project || 'instance', UIDomain.APPLICATIONS_ENUM.AUTHENTICATE).save()
      root.window.close()
    }
  }

  render() {
    return (
      <div />
    )
  }
}

export default connect(
  AuthenticateRedirectionApp.mapStateToProps,
  AuthenticateRedirectionApp.mapDispatchToProps)(AuthenticateRedirectionApp)
