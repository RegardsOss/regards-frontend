/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/MenuContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
/**
 * Main file of module to expose public interface
 **/
export default {
  adminContainer,
  moduleContainer,
  styles,
  messagesDir: 'modules/menu/src/i18n',
}
