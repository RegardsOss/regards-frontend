/**
* LICENSE_PLACEHOLDER
**/
import { LazyModuleComponent } from '@regardsoss/modules'
import { SearchResultsTargetsEnum } from '@regardsoss/model'
import ModuleConfiguration from '../../model/ModuleConfiguration'
/**
* Search result configuration form, using search result module
*/
class SearchResultFormComponent extends React.Component {

  static propTypes = {
    project: React.PropTypes.string.isRequired,
    appName: React.PropTypes.string.isRequired,
    adminForm: React.PropTypes.shape({
      changeField: React.PropTypes.func,
      form: ModuleConfiguration,
    }),
  }

  static defaultProps = {}

  render() {
    const { project, appName, adminForm } = this.props
    const module = {
      type: 'search-results',
      active: true,
      applicationId: this.props.appName,
      conf: {
        resultType: SearchResultsTargetsEnum.DATAOBJECT_RESULTS,
        hideDatasetsConfiguration: true,
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
