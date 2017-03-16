/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
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
    params: React.PropTypes.shape({
      // Project from the URL
      project: React.PropTypes.string,
    }),
    // Set by mapStateToProps
    layoutIsFetching: React.PropTypes.bool,
    modulesIsFetching: React.PropTypes.bool,
    layout: Layout,
    modules: React.PropTypes.objectOf(ModuleShape),
    // Project from the store
    project: React.PropTypes.string,
    // Set by mapDispatchToProps
    fetchLayout: React.PropTypes.func,
    fetchModules: React.PropTypes.func,
    initializeApplication: React.PropTypes.func.isRequired,
  }

  componentWillMount() {
    // init with project parameter if available
    const project = (this.props.params && this.props.params.project)
    this.props.initializeApplication(project)

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
})

export default connect(mapStateToProps, mapDispatchToProps)(PortalApp)
