/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import { connect } from '@regardsoss/redux'
import { Layout } from '@regardsoss/model'
import { getCurrentTheme } from '@regardsoss/theme'
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
    // Set by mapStateToProps
    theme: React.PropTypes.string,
    layoutIsFetching: React.PropTypes.bool,
    modulesIsFetching: React.PropTypes.bool,
    layout: Layout,
    modules: React.PropTypes.objectOf(ModuleShape),
    // Set by mapDispatchToProps
    fetchLayout: React.PropTypes.func,
    fetchModules: React.PropTypes.func,
  }

  componentWillMount() {
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

    return (
      <ThemeProvider>
        <ApplicationLayout appName="portal" layout={this.props.layout.content.layout} modules={modulesList} />
      </ThemeProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  layout: LayoutSelector.getById(state, 'portal'),
  modules: ModulesSelector.getList(state),
  layoutIsFetching: LayoutSelector.isFetching(state),
  modulesIsFetching: ModulesSelector.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchLayout: () => dispatch(LayoutActions.fetchEntity('portal')),
  fetchModules: () => dispatch(ModulesActions.fetchPagedEntityList(0, 100, { applicationId: 'portal' })),
})

export default connect(mapStateToProps, mapDispatchToProps)(PortalApp)
