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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import get from 'lodash/get'
import compose from 'lodash/fp/compose'
import isEmpty from 'lodash/isEmpty'
import { connect } from '@regardsoss/redux'
import { AuthenticationParametersActions } from '@regardsoss/authentication-utils'
import { UIDomain } from '@regardsoss/domain'
import { browserHistory } from 'react-router'
import root from 'window-or-global'
import { authServiceProviderActions } from '../clients/AuthenticateServiceProviderClient'
import messages from '../i18n'

const STATUS = {
  LOADING: 'loading',
  ERROR: 'error',
  CODE_ERROR: 'code_error',
  SUCCESS: 'success',
}

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
    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    requestLogin: PropTypes.func.isRequired,
    initializeApplication: PropTypes.func.isRequired,
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
      requestLogin: (scope, pluginId, name, code) => dispatch(authServiceProviderActions.login(
        scope,
        pluginId,
        name,
        code,
      )),
    }
  }

  /**
   * Retrieve code parameter from url.
   * Code could be either in query params or in hash of browserHistory
   */
  static getCode = () => {
    let code = get(browserHistory.getCurrentLocation().query, 'code', '')
    if (isEmpty(code)) {
      const regex = /code=([^&]+)/
      console.log('hash', browserHistory.getCurrentLocation().hash)
      const matchStrings = browserHistory.getCurrentLocation().hash.match(regex)
      console.log('yo', matchStrings)
      code = matchStrings && matchStrings[1] ? matchStrings[1] : ''
    }
    return code
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    status: STATUS.LOADING,
  }

  UNSAFE_componentWillMount = () => {
    // Redux store space init for user app
    this.props.initializeApplication(this.props.params.project)
  }

  componentDidMount = () => {
    const {
      params: { project, serviceProviderName }, requestLogin,
    } = this.props

    // Get auth token
    const code = AuthenticateRedirectionApp.getCode()
    if (code === '') {
      const errorMessage = 'Invalid null code for openId connect'
      new UIDomain.LocalStorageUser({ error: errorMessage }, new Date().getTime(), project || 'instance', UIDomain.APPLICATIONS_ENUM.AUTHENTICATE).save()
      this.setState({
        status: STATUS.CODE_ERROR,
      })
      root.window.close()
    } else {
      console.log('login', project, 'OpenId', serviceProviderName, code)
      requestLogin(project, 'OpenId', serviceProviderName, code).then((result) => {
        console.log('result', result)
        let status = STATUS.ERROR
        let storageObj
        if (!result.error) {
          storageObj = result.payload
          status = STATUS.SUCCESS
        } else {
          storageObj = { error: result.payload.message }
        }
        new UIDomain.LocalStorageUser(storageObj, new Date().getTime(), project || 'instance', UIDomain.APPLICATIONS_ENUM.AUTHENTICATE).save()
        this.setState({
          status,
        })
        root.window.close()
      })
    }
  }

  render() {
    const { status } = this.state
    const {
      intl: { formatMessage },
    } = this.context
    const message = formatMessage({ id: `authenticate.message.${status}` }, { serviceProviderName: this.props.params.serviceProviderName })
    return (
      <div id="app" className="mainapp">
        <div id="loader">
          <div style={{ marginRight: '10px' }}>
            {message}
          </div>
          {
            status === STATUS.LOADING
              ? <div className="sk-cube-grid">
                <div className="sk-cube sk-cube1" />
                <div className="sk-cube sk-cube2" />
                <div className="sk-cube sk-cube3" />
                <div className="sk-cube sk-cube4" />
                <div className="sk-cube sk-cube5" />
                <div className="sk-cube sk-cube6" />
                <div className="sk-cube sk-cube7" />
                <div className="sk-cube sk-cube8" />
                <div className="sk-cube sk-cube9" />
              </div> : null
          }
        </div>
      </div>
    )
  }
}

export default compose(
  connect(
    AuthenticateRedirectionApp.mapStateToProps,
    AuthenticateRedirectionApp.mapDispatchToProps),
  withI18n(messages))(AuthenticateRedirectionApp)
