/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/AuthenticationModuleContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Main file of module to expose public interface
 **/
export default {
  reducer,
  moduleContainer,
  styles,
  messagesDir: 'modules/authentication/src/i18n',
  dependencies,
}
