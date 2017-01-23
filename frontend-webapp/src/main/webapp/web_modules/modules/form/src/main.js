/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/ModuleContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
/**
 * Module main file to expose public interface
 */
export default {
  moduleContainer,
  adminContainer,
  styles,
  reducer,
  messagesDir: 'modules/form/src/i18n',
}
