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
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ThemeProvider } from '@regardsoss/theme'
import { ApplicationLayout, ContainerHelper } from '@regardsoss/layout'
import { AccessShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { BrowserCheckerDialog } from '@regardsoss/components'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import { ProjectHandler } from '@regardsoss/project-handler'
import { AuthenticationParametersActions, AuthenticationClient } from '@regardsoss/authentication-utils'
import { attributeModelActions, attributeModelSelectors } from '../clients/AttributeModelClient'
import { layoutActions, layoutSelectors } from '../clients/LayoutClient'
import { moduleActions, moduleSelectors } from '../clients/ModuleClient'
import { uiSettingsActions, uiSettingsSelectors } from '../clients/UISettingsClients'
import AuthenticationContainer from './AuthenticationContainer'

/**
 * Provides the theme to sub containers
 */
export class UserApp extends React.Component {
  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // From React router
    content: PropTypes.element,
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // Set by mapStateToProps
    layout: AccessShapes.Layout,
    modules: AccessShapes.ModuleList,
    currentRole: PropTypes.string.isRequired,
    // eslint-disable-next-line
    isAuthenticated: PropTypes.bool,
    // Set by mapDispatchToProps
    initializeApplication: PropTypes.func.isRequired,
    fetchLayout: PropTypes.func.isRequired,
    fetchModules: PropTypes.func.isRequired,
    flushModules: PropTypes.func.isRequired,
    fetchEndpoints: PropTypes.func.isRequired,
    fetchAttributes: PropTypes.func.isRequired,
    fetchUISettings: PropTypes.func.isRequired,
  }

  static applicationStyle = {
    minHeight: '100vh',
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const authenticationResult = AuthenticationClient.authenticationSelectors.getResult(state)
    return {
      isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
      currentRole: (authenticationResult && authenticationResult.role) || '',
      layout: layoutSelectors.getById(state, UIDomain.APPLICATIONS_ENUM.USER),
      modules: moduleSelectors.getList(state),
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
      fetchAttributes: () => dispatch(attributeModelActions.fetchEntityList(null, { noLink: true })),
      fetchLayout: () => dispatch(layoutActions.fetchEntity(UIDomain.APPLICATIONS_ENUM.USER)),
      fetchModules: () => dispatch(moduleActions.fetchPagedEntityList(0, 100, { applicationId: UIDomain.APPLICATIONS_ENUM.USER })),
      flushModules: () => dispatch(moduleActions.flush(true)),
      fetchEndpoints: () => dispatch(CommonEndpointClient.endpointActions.fetchPagedEntityList(0, 10000)),
      fetchUISettings: () => dispatch(uiSettingsActions.getSettings()),
    }
  }

  state = {
    isLoading: true,
  }

  /**
   * At first render, fetch application layout and modules
   */
  UNSAFE_componentWillMount() {
    // before any request: provide the project name
    // init with project parameter if available, or fallback on INSTANCE default
    const {
      params: { project }, initializeApplication,
      fetchLayout, fetchModules, fetchAttributes,
      fetchUISettings,
    } = this.props

    // Redux store space init for user app
    initializeApplication(project)

    
    Promise.all([
      // fetch endpoints (used to clear locally stored auth data on failure)
      this.fetchEndpoints(),
      
      // Initialize mandatory shared data
      fetchLayout(),
      fetchModules(),
      fetchAttributes(),
      fetchUISettings()
    ])
    .then(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  /**
   * Go to default module page if no module is defined in the dynamic content container
   * @param nextProps
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // If there is no dynamic content display the default module
    if (!nextProps.content && nextProps.modules && nextProps.layout) {
      // find the home page module and redirect user to that page (if there are modules)
      const allContainers = nextProps.layout.content.layout.containers
      const allModules = values(nextProps.modules)
      if (allModules.length) {
        // find home module: use active module OR (when not found) lowest ID module
        const homeModule = reduce(nextProps.modules, (foundModule, currentModule) => {
          // 1 - is it active and dynamic module?
          if (get(currentModule, 'content.active')
            && ContainerHelper.isDynamicContent(get(currentModule, 'content.container'), allContainers)) {
            // 2 - yes it is: is it default or lower ID than previously found?
            if (get(currentModule, 'content.page.home')
              || get(foundModule, 'content.id', Number.MAX_SAFE_INTEGER) > get(currentModule, 'content.id', Number.MAX_SAFE_INTEGER)) {
              // this is the default module
              return currentModule
            }
          }
          // 3 - No, keep currently found
          return foundModule
        }, null)
        if (homeModule) {
          browserHistory.replace(UIDomain.getModuleURL(nextProps.params.project, homeModule.content.id))
        }
      }
    }

    // authentication state changes or user role changes, refresh endpoints
    if (this.props.isAuthenticated !== nextProps.isAuthenticated || this.props.currentRole !== nextProps.currentRole) {
      this.fetchEndpoints()
    }
  }

  /**
   * Clean modules state when user app is unmounting
   */
  componentWillUnmount() {
    const { flushModules } = this.props
    flushModules()
  }

  /**
   * Handle fetch of available backend endpoints for current logged user.
   */
  fetchEndpoints() {
    return Promise.resolve(this.props.fetchEndpoints()).then((actionResult) => {
      if (actionResult.error && UIDomain.LocalStorageUser.retrieve(this.props.params.project, UIDomain.APPLICATIONS_ENUM.USER)) {
        // If unrecoverable error is thrown, then clear localStorage to avoid deadlock on IHM access
        UIDomain.LocalStorageUser.delete(this.props.params.project, UIDomain.APPLICATIONS_ENUM.USER)
        throw new Error('Failed to retrieve endpoint list, which is required on the user dashboard')
      }
    })
  }

  renderLayout(modulesList) {
    if (this.props.layout && this.props.layout.content) {
      return (
        <ApplicationLayout
          appName="user"
          layout={this.props.layout.content.layout}
          modules={modulesList}
          project={this.props.params.project}
          dynamicContent={this.props.content}
          style={UserApp.applicationStyle}
        />
      )
    }
    return null
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { params: { project } } = this.props
    const { isLoading  } = this.state
    return (
      <ThemeProvider>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
          isContentError={!this.props.layout}
        >
          <AuthenticationContainer scope={project}>
            {/* Check browser version and warn user */}
            <BrowserCheckerDialog browserRequirements={STATIC_CONF.BROWSER_REQUIREMENTS} />
            {/* Resolve project */}
            <ProjectHandler
              projectName={project}
              title="Data center"
            />
            { /* render layout */
              this.renderLayout(values(this.props.modules))
            }
            {/* Render network errors */}
            <ApplicationErrorContainer />
          </AuthenticationContainer>
        </LoadableContentDisplayDecorator>
      </ThemeProvider>
    )
  }
}

export default connect(
  UserApp.mapStateToProps,
  UserApp.mapDispatchToProps)(UserApp)
