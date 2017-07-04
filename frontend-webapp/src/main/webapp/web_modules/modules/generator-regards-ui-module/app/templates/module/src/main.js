/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/ModuleContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Main file of module to expose public interface
 * @author <%= author %>
 **/
export default {
  adminContainer,
  moduleContainer,
  reducer,
  styles,
  messagesDir: 'modules/menu/src/i18n',
  dependencies,
}
