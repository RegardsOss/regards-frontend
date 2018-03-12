/**
* LICENSE_PLACEHOLDER
**/
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'
import ModuleConfiguration from '../../model/ModuleConfiguration'

/**
* Search result configuration form, using search result module
*/
class SearchResultFormComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      currentNamespace: PropTypes.string,
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
    }
    const adminFormForSearchResult = {
      ...adminForm,
      currentNamespace: `${adminForm.currentNamespace}.searchResult`,
      conf: {
        displayMode: 'data',
        preventAdminToPickDocumentView: true,
      },
    }

    return (
      <LazyModuleComponent
        project={project}
        appName={appName}
        module={module}
        admin
        adminForm={adminFormForSearchResult}
      />
    )
  }
}
export default SearchResultFormComponent
