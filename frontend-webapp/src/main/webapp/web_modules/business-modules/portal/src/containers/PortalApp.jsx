/**
 * LICENSE_PLACEHOLDER
 **/
import forEach from 'lodash/forEach'
import { connect } from '@regardsoss/redux'
import { Layout } from '@regardsoss/model'
import { AuthenticationParametersActions, AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { ApplicationLayout } from '@regardsoss/layout'
import { ModuleShape } from '@regardsoss/modules'
import { ThemeProvider } from '@regardsoss/theme'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'

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
    layout: Layout,
    modules: PropTypes.objectOf(ModuleShape),
    // Project from the store
    project: PropTypes.string,
    // Set by mapDispatchToProps
    fetchLayout: PropTypes.func,
    fetchModules: PropTypes.func,
    // fetchEndpoints: PropTypes.func,
    initializeApplication: PropTypes.func.isRequired,
  }

  componentWillMount() {
    // init with project parameter if available
    const project = (this.props.params && this.props.params.project)
    this.props.initializeApplication(project)

    // TODO V2 : How to retrieve endpoints for instance as a public user ?
    // this.props.fetchEndpoints()
    this.props.fetchLayout()
    this.props.fetchModules()
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

    const modulesList = []
    forEach(this.props.modules, (module, key) => {
      modulesList.push(module)
    })

    const { project } = this.props

    return (
      <ThemeProvider>
        <ApplicationLayout
          appName="portal"
          layout={this.props.layout.content.layout}
          modules={modulesList}
          project={project}
          style={{ minHeight: '100vh' }}
        />
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  layout: LayoutSelector.getById(state, 'portal'),
  modules: ModulesSelector.getList(state),
  layoutIsFetching: LayoutSelector.isFetching(state),
  modulesIsFetching: ModulesSelector.isFetching(state),
  project: AuthenticationParametersSelectors.getProject(state),
})

const mapDispatchToProps = dispatch => ({
  initializeApplication: project => dispatch(AuthenticationParametersActions.applicationStarted(project)),
  fetchLayout: () => dispatch(LayoutActions.fetchEntity('portal')),
  fetchModules: () => dispatch(ModulesActions.fetchPagedEntityList(0, 100, { applicationId: 'portal' })),
  // fetchEndpoints: () => dispatch(EndpointActions.fetchPagedEntityList(0, 10000)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PortalApp)
