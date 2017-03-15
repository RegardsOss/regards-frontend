/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/MenuContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
/**
 * Main file of module to expose public interface
 * @author Sébastien binda
 **/
export default {
  adminContainer,
  moduleContainer,
  reducer,
  styles,
  messagesDir: 'modules/menu/src/i18n',
}
