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
import { AuthenticationParametersActions, AuthenticationParametersSelectors, AuthenticationClient } from '@regardsoss/authentication-utils'
import { ProjectHandler } from '@regardsoss/project-handler'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { I18nProvider } from '@regardsoss/i18n'
import { connect } from '@regardsoss/redux'
import { ThemeProvider } from '@regardsoss/theme'
import AdminLayout from './AdminLayout'
import AuthenticationContainer from './AuthenticationContainer'
import messages from '../i18n'

/**
 * React components to manage the instance application.
 * This components displays admin layout or login form if the user is not connected
 */
class AdminApp extends React.Component {
  static propTypes = {
    content: PropTypes.element,
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    scope: PropTypes.string,
    // from mapStateToProps
    currentRole: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool,
    // eslint-disable-next-line react/no-unused-prop-types
    isInstance: PropTypes.bool,
    // from mapDispatchToProps
    initializeApplication: PropTypes.func.isRequired,
    fetchEndpoints: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoadingEndpoints: false,
    }
  }

  componentWillMount() {
    // init with project parameter if available
    const project = (this.props.params && this.props.params.project)
    this.props.initializeApplication(project)
  }

  /**
   * On authentication-manager fetch autorized endpoints
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    const nextProject = nextProps.params.project
    // if project changed reinitialize application
    if (nextProps.params && nextProject !== this.props.params.project) {
      this.props.initializeApplication(nextProject)
    }

    // when user has a new role (and is is authenticated)
    if (this.props.currentRole !== nextProps.currentRole && nextProps.isAuthenticated && !nextProps.isInstance) {
      // Prevent the HMI to show the admin app before endpoints have been retrieved
      this.setState({
        isLoadingEndpoints: true,
      })
      // fetch endpoints only if current route is admin project.
      if (nextProject) {
        Promise.resolve(this.props.fetchEndpoints())
          .then((actionResult) => {
            // We receive here the action
            if (!actionResult.error) {
              this.setState({
                isLoadingEndpoints: false,
              })
            } else {
              throw new Error('Failed to retrieve endpoint list, which is required on the admin dashboard')
            }
          })
      }
    }
  }

  renderLayout = () => (
    <AdminLayout {...this.props}>
      {this.props.content}
    </AdminLayout>
  )

  render() {
    const {
      isAuthenticated, scope, params: { project }, isInstance,
    } = this.props
    const { isLoadingEndpoints } = this.state

    const projectHandlerComp = isInstance || !project ? null :
      (<ProjectHandler
        projectName={project}
        title="Administration"
      />)

    return (
      <div>
        {projectHandlerComp}
        <ThemeProvider>
          <I18nProvider messages={messages}>
            <AuthenticationContainer scope={scope} isAuthenticated={isAuthenticated}>
              <LoadableContentDisplayDecorator isLoading={isLoadingEndpoints}>
                {this.renderLayout}
              </LoadableContentDisplayDecorator>
            </AuthenticationContainer>
          </I18nProvider>
        </ThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const authenticationResult = AuthenticationClient.authenticationSelectors.getResult(state)
  return {
    currentRole: authenticationResult ? authenticationResult.role : '',
    isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
    scope: AuthenticationParametersSelectors.getProject(state),
    isInstance: AuthenticationParametersSelectors.isInstance(state),
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApplication: project => dispatch(AuthenticationParametersActions.applicationStarted(project)),
  fetchEndpoints: () => dispatch(CommonEndpointClient.endpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminApp)
