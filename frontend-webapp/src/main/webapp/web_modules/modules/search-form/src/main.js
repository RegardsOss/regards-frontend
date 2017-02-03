/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/ModuleContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'
/**
 * Module main file to expose public interface
 * @author Sébastien binda
 */
export default {
  moduleContainer,
  adminContainer,
  styles,
  reducer,
  messagesDir: 'modules/search-form/src/i18n',
  dependencies,
}
