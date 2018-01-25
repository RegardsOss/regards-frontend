/**
* LICENSE_PLACEHOLDER
**/
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/**
* Search result configuration form, using search result module
*/
class SearchResultFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      isCreating: PropTypes.bool,
      isDuplicating: PropTypes.bool,
      isEditing: PropTypes.bool,
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
  }

  static defaultProps = {}

  render() {
    const { project, appName, adminForm } = this.props
    const module = {
      type: modulesManager.AllDynamicModuleTypes.SEARCH_RESULTS,
      active: true,
      applicationId: this.props.appName,
      conf: {
        resultType: ENTITY_TYPES_ENUM.DATA,
        preventAdminToPickDocumentView: true,
      },
    }

    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={module}
        admin
        adminForm={adminForm}
      />
    )
  }
}
export default SearchResultFormComponent
