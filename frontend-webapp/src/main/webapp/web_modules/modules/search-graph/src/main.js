/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/UserModuleContainer'
import adminContainer from './containers/AdminModuleContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Expose module
 */
export default {
  adminContainer,
  moduleContainer,
  reducer,
  styles,
  dependencies,
}
