/**
 * LICENSE_PLACEHOLDER
 **/
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'
import SampleComponent from '../components/SampleComponent'

/**
 * Main component of module menu
 * @author <%= author %>
 **/
class ModuleContainer extends React.Component {

  static propTypes = {
    // Set by module loader (LazyModuleComponent)
    project: PropTypes.string,
    appName: PropTypes.string.isRequired,
    // Module configuration.
    moduleConf: ModuleConfigurationShape
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

export default ModuleContainer
