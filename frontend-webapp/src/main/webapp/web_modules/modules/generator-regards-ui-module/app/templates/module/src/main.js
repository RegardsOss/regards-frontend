/**
 * LICENSE_PLACEHOLDER
 **/
import ModuleContainer from './containers/ModuleContainer'
import AdminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Main file of module to expose public interface
 * @author <%= author %>
 **/
export default {
  AdminContainer,
  ModuleContainer,
  reducer,
  styles,
  messagesDir: 'modules/menu/src/i18n',
  dependencies,
}
