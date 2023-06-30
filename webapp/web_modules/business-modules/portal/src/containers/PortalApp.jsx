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
 **/
import values from 'lodash/values'
import { UIDomain } from '@regardsoss/domain'
import { connect } from '@regardsoss/redux'
import { AccessShapes } from '@regardsoss/shape'
import { AuthenticationParametersActions, AuthenticationParametersSelectors } from '@regardsoss/authentication-utils'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ApplicationLayout } from '@regardsoss/layout'
import { ThemeProvider } from '@regardsoss/theme'
import { BrowserCheckerDialog, ReactErrorBoundaryComponent } from '@regardsoss/components'
import { layoutActions, layoutSelectors } from '../clients/LayoutClient'
import { moduleActions, moduleSelectors } from '../clients/ModuleClient'

/**
 * Provides the theme to sub containers
 * @author Sébastien Binda
 */
export class PortalApp extends React.Component {
  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // from router
    params: PropTypes.shape({
      // Project from the URL
      project: PropTypes.string,
    }),
    // Set by mapStateToProps
    layoutIsFetching: PropTypes.bool,
    modulesIsFetching: PropTypes.bool,
    layout: AccessShapes.Layout,
    modules: AccessShapes.ModuleList,
    // Project from the store
    project: PropTypes.string,
    // Set by mapDispatchToProps
    fetchLayout: PropTypes.func,
    fetchModules: PropTypes.func,
    initializeApplication: PropTypes.func.isRequired,
  }

  static PORTAL_STYLES = { minHeight: '100vh' }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      layout: layoutSelectors.getById(state, UIDomain.APPLICATIONS_ENUM.PORTAL),
      modules: moduleSelectors.getList(state),
      layoutIsFetching: layoutSelectors.isFetching(state),
      modulesIsFetching: moduleSelectors.isFetching(state),
      project: AuthenticationParametersSelectors.getProject(state),
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
      fetchLayout: () => dispatch(layoutActions.fetchEntity(UIDomain.APPLICATIONS_ENUM.PORTAL)),
      fetchModules: () => dispatch(moduleActions.fetchPagedEntityList(0, 100, { applicationId: UIDomain.APPLICATIONS_ENUM.PORTAL })),
    }
  }

  UNSAFE_componentWillMount() {
    // init with project parameter if available
    const project = (this.props.params && this.props.params.project)
    this.props.initializeApplication(project)

    this.props.fetchLayout()
    this.props.fetchModules()
  }

  componentDidMount() {
    document.querySelector('meta[name="title"]').setAttribute('content', 'Portal interface for REGARDS instance')
    document.querySelector('meta[name="description"]').setAttribute('content', 'Portal to access each project of the REGARDS instance.')
  }

  /**
   * @returns {React.Component}
   */
  render() {
    if (this.props.layoutIsFetching || this.props.modulesIsFetching) {
      return (<FormLoadingComponent />)
    }

    if (!this.props.layout) {
      return (<FormEntityNotFoundComponent />)
    }
    const { project } = this.props
    return (
      <ReactErrorBoundaryComponent>
        <ThemeProvider>
          <div>
            {/* Check browser version and warn user */}
            <BrowserCheckerDialog browserRequirements={STATIC_CONF.BROWSER_REQUIREMENTS} />
            {/* Render main tree */}
            <ApplicationLayout
              appName={UIDomain.APPLICATIONS_ENUM.PORTAL}
              layout={this.props.layout.content.layout}
              modules={values(this.props.modules)}
              project={project}
              style={PortalApp.PORTAL_STYLES}
            />
          </div>
        </ThemeProvider>
      </ReactErrorBoundaryComponent>
    )
  }
}

export default connect(PortalApp.mapStateToProps, PortalApp.mapDispatchToProps)(PortalApp)
