/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'
import SampleComponent from '../components/SampleComponent'

/**
 * React component to display module administration module.
 * @author <%= author %>
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Application name
    appName: PropTypes.string,
    // Project name
    project: PropTypes.string,
    // Form parameters
    adminForm: PropTypes.shape({
      // Function to change a field value
      changeField: PropTypes.func,
      // Current values of the form
      form: ModuleConfigurationShape,
    }).isRequired,
    // Default values of the module configuration
    moduleConf: ModuleConfigurationShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    return (
      <SampleComponent />
    )
  }
}

export default AdminContainer
