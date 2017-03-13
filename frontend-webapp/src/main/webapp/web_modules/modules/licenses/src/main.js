/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/LicenseModuleContainer'
import styles from './styles/styles'
import reducer from './reducer'

/**
 * Main file of module to expose public interface
 **/
export default {
  styles,
  moduleContainer,
  reducer,
  messagesDir: 'modules/licenses/src/i18n',
}
