/**
 * LICENSE_PLACEHOLDER
 **/
import { forEach } from 'lodash'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { connect } from '@regardsoss/redux'
import { ThemeHelper, ThemeSelectors } from '@regardsoss/theme'
import { FormLoadingComponent, FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import { LayoutShape, ApplicationLayout } from '@regardsoss/layout'
import { ModuleShape } from '@regardsoss/modules'
import LayoutSelector from '../model/layout/LayoutSelector'
import LayoutActions from '../model/layout/LayoutActions'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
/**
 * Provides the theme to sub containers
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
    layout: LayoutShape,
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
    const { theme } = this.props
    const muiTheme = ThemeHelper.getByName(theme)

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
      <MuiThemeProvider muiTheme={muiTheme}>
        <ApplicationLayout appName="portal" layout={this.props.layout} modules={modulesList} />
      </MuiThemeProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  theme: ThemeSelectors.getCurrentTheme(state),
  layout: LayoutSelector.getContentById(state, 'portal'),
  modules: ModulesSelector.getList(state),
  layoutIsFetching: LayoutSelector.isFetching(state),
  modulesIsFetching: ModulesSelector.isFetching(state),

})

const mapDispatchToProps = dispatch => ({
  fetchLayout: () => dispatch(LayoutActions.fetchEntity('portal', dispatch)),
  fetchModules: () => dispatch(ModulesActions.fetchPagedEntityList(dispatch, 0, 100, ['portal'])),
})

export default connect(mapStateToProps, mapDispatchToProps)(PortalApp)
