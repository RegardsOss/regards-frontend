/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Layout } from '@regardsoss/model'
import { EndpointActions } from '@regardsoss/endpoint'
import { ThemeProvider } from '@regardsoss/theme'
import { ApplicationLayout, ContainerHelper } from '@regardsoss/layout'
import { ModuleShape } from '@regardsoss/modules'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ApplicationErrorContainer } from '@regardsoss/global-sytem-error'
import { AuthenticateSelectors, routeHelpers } from '@regardsoss/authentication-manager'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
/**
 * Provides the theme to sub containers
 */
export class UserApp extends React.Component {

  /**
   * @type {{theme: string, content: React.Component}}
   */
  static propTypes = {
    // From React router
    content: React.PropTypes.element,
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    layoutIsFetching: React.PropTypes.bool,
    modulesIsFetching: React.PropTypes.bool,
    layout: Layout,
    modules: React.PropTypes.objectOf(ModuleShape),
    isAuthenticated: React.PropTypes.bool,
    // Set by mapDispatchToProps
    fetchLayout: React.PropTypes.func,
    fetchModules: React.PropTypes.func,
    fetchEndpoints: React.PropTypes.func,
  }

  /**
   * At first render, fetch application layout and modules
   */
  componentWillMount() {
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
      forEach(nextProps.modules, (module, idx) => {
        if (module.content.isDefault) {
          if (ContainerHelper.isDynamicContent(module.content.container, nextProps.layout.content.layout.containers)) {
            console.log('Default module selection : ', module)
            browserHistory.push(`/user/${this.props.params.project}/modules/${module.content.id}`)
          }
        }
      })
    }

    // If a new authentication is present...
    if (!this.props.isAuthenticated && nextProps.isAuthenticated) {
      // ...when back from email, redirect
      if (routeHelpers.isBackFromAuthenticationMail()) {
        routeHelpers.doRedirection()
      } else {
        // ...otherwise, refresh availables endpoints
        this.props.fetchEndpoints()
      }
    }
  }

  /**
   * Callback when a dynamic module is selected
   * @param module
   */
  onDynamicModuleSelection = (module) => {
    browserHistory.push(`/user/${this.props.params.project}/modules/${module.content.id}`)
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
          onDynamicModuleSelection={this.onDynamicModuleSelection}
        />
      )
    }
    return null
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const modulesList = []
    if (this.props.modules) {
      forEach(this.props.modules, (module, key) => {
        modulesList.push(module)
      })
    }

    return (
      <ThemeProvider>
        <LoadableContentDisplayDecorator
          isLoading={this.props.layoutIsFetching || this.props.modulesIsFetching}
          isContentError={!this.props.layout}
        >
          <div>
            {this.renderLayout(modulesList)}
            <ApplicationErrorContainer />
          </div>
        </LoadableContentDisplayDecorator>
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  layout: LayoutSelector.getById(state, 'user'),
  modules: ModulesSelector.getList(state),
  layoutIsFetching: LayoutSelector.isFetching(state),
  modulesIsFetching: ModulesSelector.isFetching(state),
  isAuthenticated: AuthenticateSelectors.isAuthenticated(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLayout: () => dispatch(LayoutActions.fetchEntity('user')),
  fetchModules: () => dispatch(ModulesActions.fetchPagedEntityList(0, 100, { applicationId: 'user' })),
  fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)), // TODO
})

export default connect(mapStateToProps, mapDispatchToProps)(UserApp)
