/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { Layout } from '@regardsoss/model'
import { CommonEndpointClient } from '@regardsoss/endpoints-common'
import { ThemeProvider } from '@regardsoss/theme'
import { ApplicationLayout, ContainerHelper } from '@regardsoss/layout'
import { ModuleShape } from '@regardsoss/modules'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { ApplicationErrorContainer } from '@regardsoss/global-system-error'
import { ProjectHandler } from '@regardsoss/project-handler'
import { AuthenticationParametersActions, AuthenticationClient } from '@regardsoss/authentication-manager'
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
    content: PropTypes.element,
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // Set by mapStateToProps
    layoutIsFetching: PropTypes.bool,
    modulesIsFetching: PropTypes.bool,
    layout: Layout,
    modules: PropTypes.objectOf(ModuleShape),
    currentRole: PropTypes.string.isRequired,
    // eslint-disable-next-line
    isAuthenticated: PropTypes.bool,
    // Set by mapDispatchToProps
    initializeApplication: PropTypes.func.isRequired,
    fetchLayout: PropTypes.func,
    fetchModules: PropTypes.func,
    fetchEndpoints: PropTypes.func,
  }

  /**
   * At first render, fetch application layout and modules
   */
  componentWillMount() {
    // before any request: provide the project name
    // init with project parameter if available, or fallback on INSTANCE default
    const project = this.props.params.project
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
      forEach(nextProps.modules, (module, idx) => {
        if (module.content.defaultDynamicModule) {
          if (ContainerHelper.isDynamicContent(module.content.container, nextProps.layout.content.layout.containers)) {
            console.log('Default module selection : ', module)
            browserHistory.replace(`/user/${this.props.params.project}/modules/${module.content.id}`)
          }
        }
      })
    }

    // when user has a new role (and is is authenticated). ie: at first connection then at role update
    if (this.props.currentRole !== nextProps.currentRole && nextProps.isAuthenticated) {
      // ... refresh availables endpoints
      this.props.fetchEndpoints()
    }
  }

  renderLayout(modulesList) {
    if (this.props.layout && this.props.layout.content) {
      const styles = { minHeight: '100vh' }
      return (
        <ApplicationLayout
          appName="user"
          layout={this.props.layout.content.layout}
          modules={modulesList}
          project={this.props.params.project}
          dynamicContent={this.props.content}
          style={styles}
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
    layout: LayoutSelector.getById(state, 'user'),
    modules: ModulesSelector.getList(state),
    layoutIsFetching: LayoutSelector.isFetching(state),
    modulesIsFetching: ModulesSelector.isFetching(state),
    currentRole: authenticationResult ? authenticationResult.role : '',
    isAuthenticated: AuthenticationClient.authenticationSelectors.isAuthenticated(state),
  }
}

const mapDispatchToProps = dispatch => ({
  initializeApplication: project => dispatch(AuthenticationParametersActions.applicationStarted(project)),
  fetchLayout: () => dispatch(LayoutActions.fetchEntity('user')),
  fetchModules: () => dispatch(ModulesActions.fetchPagedEntityList(0, 100, { applicationId: 'user' })),
  fetchEndpoints: () => dispatch(CommonEndpointClient.endpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserApp)
