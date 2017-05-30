/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
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

    const styles = { minHeight: '100vh' }

    return (
      <ThemeProvider>
        <ApplicationLayout
          appName="portal"
          layout={this.props.layout.content.layout}
          modules={values(this.props.modules)}
          project={project}
          style={styles}
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
