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
import find from 'lodash/find'
import get from 'lodash/get'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { AccessProjectClient } from '@regardsoss/client'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ThemeProvider } from '@regardsoss/theme'
import { ApplicationLayout, ContainerHelper } from '@regardsoss/layout'
import { AccessShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import { ProjectHandler } from '@regardsoss/project-handler'
import { AuthenticationParametersActions, AuthenticationClient } from '@regardsoss/authentication-manager'

// get default layout client actions and reducers instances
const layoutActions = new AccessProjectClient.LayoutActions()
const layoutSelectors = AccessProjectClient.LayoutSelectors()

// get default modules client actions and reducers instances
const modulesActions = new AccessProjectClient.ModuleActions()
const modulesSelectors = AccessProjectClient.ModuleSelectors()

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
    layoutIsFetching: PropTypes.bool,
    modulesIsFetching: PropTypes.bool,
    layout: AccessShapes.Layout,
    modules: AccessShapes.ModuleList,
    currentRole: PropTypes.string.isRequired,
    // eslint-disable-next-line
    isAuthenticated: PropTypes.bool,
    // Set by mapDispatchToProps
    initializeApplication: PropTypes.func.isRequired,
    fetchLayout: PropTypes.func,
    fetchModules: PropTypes.func,
    fetchEndpoints: PropTypes.func,
  }

  static applicationStyle = {
    minHeight: '100vh',
  }

  /**
   * At first render, fetch application layout and modules
   */
  componentWillMount() {
    // before any request: provide the project name
    // init with project parameter if available, or fallback on INSTANCE default
    const { project } = this.props.params
    this.props.initializeApplication(project)

    this.props.fetchLayout()
    this.props.fetchModules()
    this.props.fetchEndpoints()
  }

  /**
   * Go to default module page if no module is defiend in the dynamic content container
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    // If there is no dynamic content display the default module
    if (!nextProps.content && nextProps.modules && nextProps.layout) {
      // find the home page module and redirect user to that page (if there are modules)
      const allContainers = nextProps.layout.content.layout.containers
      const allModules = values(nextProps.modules)
      if (allModules.length) {
        // find home module (module marked as active and page.home)
        let homeModule = find(nextProps.modules, ({ content: { active, page, container } }) =>
          active && get(page, 'home', false) && ContainerHelper.isDynamicContent(container, allContainers))
        // when not found, find the first active module in list
        if (!homeModule) {
          homeModule = allModules.find(({ active, container }) =>
            active && ContainerHelper.isDynamicContent(container, allContainers))
        }
        if (homeModule) {
          browserHistory.replace(UIDomain.getModuleURL(nextProps.params.project, homeModule.content.id))
        }
      }
    }

    // authentication state changes or user role changes, refresh endpoints
    if (this.props.isAuthenticated !== nextProps.isAuthenticated || this.props.currentRole !== nextProps.currentRole) {
      this.props.fetchEndpoints()
    }
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
    return (
      <ThemeProvider>
        <LoadableContentDisplayDecorator
          isLoading={this.props.layoutIsFetching || this.props.modulesIsFetching}
          isContentError={!this.props.layout}
        >
          <div>
            <ProjectHandler
              projectName={this.props.params.project}
              title="Data center"
            />
            {this.renderLayout(values(this.props.modules))}
            <ApplicationErrorContainer />
          </div>
        </LoadableContentDisplayDecorator>
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const authenticationResult = AuthenticationClient.authenticationSelectors.getResult(state)
  return {
    layout: layoutSelectors.getById(state, 'user'),
    modules: modulesSelectors.getList(state),
    layoutIsFetching: layoutSelectors.isFetching(state),
    modulesIsFetching: modulesSelectors.isFetching(state),
    currentRole: (authenticationResult && authenticationResult.role) || '',
    isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApplication: project => dispatch(AuthenticationParametersActions.applicationStarted(project)),
  fetchLayout: () => dispatch(layoutActions.fetchEntity('user')),
  fetchModules: () => dispatch(modulesActions.fetchPagedEntityList(0, 100, { applicationId: 'user' })),
  fetchEndpoints: () => dispatch(CommonEndpointClient.endpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserApp)
