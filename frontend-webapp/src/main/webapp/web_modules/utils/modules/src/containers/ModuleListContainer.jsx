/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { AccessShapes } from '@regardsoss/shape'
import ModulesSelector from '../model/ModulesSelector'
import LayoutSelector from '../model/LayoutSelector'
import ModuleListComponent from '../components/ModuleListComponent'

/**
 * Display the menu with all modules of the dynamic container.
 * @author Sébastien Binda
 */
class ModuleListContainer extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onCloseMenu: PropTypes.func,
    modules: AccessShapes.ModuleList,
    container: AccessShapes.ContainerContent,
  }

  render() {
    if (!this.props.container) {
      return null
    }
    return (
      <I18nProvider messageDir="utils/modules/src/i18n">
        <ModuleListComponent
          project={this.props.project}
          open={this.props.open}
          modules={values(this.props.modules)}
          onCloseMenu={this.props.onCloseMenu}
          container={this.props.container.id}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  modules: ModulesSelector.getList(state),
  container: LayoutSelector.getDynamicContainer(state, 'user'),
})

export default connect(mapStateToProps)(ModuleListContainer)
