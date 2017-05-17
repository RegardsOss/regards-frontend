/**
 * LICENSE_PLACEHOLDER
 **/
import { LazyModuleComponent } from '@regardsoss/modules'
import { AttributeConfiguration, AttributesRegroupementConfiguration, AttributeModel } from '@regardsoss/model'
import ModuleConfiguration from '../../../models/ModuleConfiguration'
/**
 * Component to display search results parameters
 * @author Sébastien binda
 */
class FormParametersComponent extends React.Component {

  static propTypes = {
    project: PropTypes.string.isRequired,
    appName: PropTypes.string.isRequired,
    adminForm: PropTypes.shape({
      changeField: PropTypes.func,
      form: ModuleConfiguration,
    }),
    attributes: PropTypes.arrayOf(AttributeConfiguration),
    attributesRegroupements: PropTypes.arrayOf(AttributesRegroupementConfiguration),
    selectableAttributes: PropTypes.objectOf(AttributeModel),
    resultType: PropTypes.string,
  }

  render() {
    const moduleConf = {
      attributesConf: this.props.attributes,
      attributesRegroupementsConf: this.props.attributesRegroupements,
      selectableAttributes: this.props.selectableAttributes,
      resultType: this.props.resultType,
      hideDatasetsConfiguration: false,
    }

    const module = {
      type: 'search-results',
      active: true,
      applicationId: this.props.appName,
      conf: moduleConf,
    }

    return (
      <LazyModuleComponent
        project={this.props.project}
        appName={this.props.appName}
        module={module}
        admin
        adminForm={this.props.adminForm}
      />
    )
  }

}

export default FormParametersComponent
