/**
 * LICENSE_PLACEHOLDER
 **/
import { I18nProvider, i18nContextType } from '@regardsoss/i18n'
import { ModuleShape } from '@regardsoss/modules'
import connect from '@regardsoss/redux'
import ModulesSelector from '../model/modules/ModulesSelector'
import ModulesActions from '../model/modules/ModulesActions'
import ModuleListComponent from '../components/ModuleListComponent'
import { EditModuleRoute } from '../router'

/**
 * Module container to display list of configured modules for a given application id.
 */
class ModulesListContainer extends React.Component {

  static propTypes = {
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      application_id: React.PropTypes.string,
    }),
    // Set by mapDispatchToProps
    fetchModules: React.PropTypes.func,
    moduleList: React.PropTypes.arrayOf(ModuleShape),
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentWillMount() {
    this.props.fetchModules(this.props.params.application_id)
  }

  handleEditModule = () => {
    const url = `/admin/project/${projectName}/edit`
    browserHistory.push(url)
  }

  render() {
    return (
      <I18nProvider messageDir="modules/ui-configuration/src/i18n">
        <ModuleListComponent
          project={this.props.params.project}
          moduleList={this.props.moduleList}
          onEdit={this.handleEditModule}
          onDelete={this.handleDeleteModule}
        />
      </I18nProvider>
    )
  }
}

const mapStateToProps = state => ({
  moduleList: ModulesSelector.getList(state),
})
const mapDispatchToProps = dispatch => ({
  fetchModules: applicationId => dispatch(ModulesActions.fetchEntityList([applicationId])),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModulesListContainer)
