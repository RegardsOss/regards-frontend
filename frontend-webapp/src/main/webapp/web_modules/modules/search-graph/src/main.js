/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/user/UserModuleContainer'
import adminContainer from './containers/admin/AdminModuleContainer'
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
