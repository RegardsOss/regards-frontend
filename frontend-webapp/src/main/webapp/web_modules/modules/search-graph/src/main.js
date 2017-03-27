/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/UserModuleContainer'
import adminContainer from './containers/AdminModuleContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Main file of module to expose public interface
 * @author Sébastien binda
 **/
export default {
  adminContainer,
  moduleContainer,
  reducer,
  styles,
  dependencies,
}
