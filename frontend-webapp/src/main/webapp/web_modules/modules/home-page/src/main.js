/**
 * LICENSE_PLACEHOLDER
 **/
import HomePageContainer from './containers/HomePageContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
/**
 * Module main file to expose public interface
 */
export default {
  moduleContainer: HomePageContainer,
  adminContainer,
  styles,
  messagesDir: 'modules/home-page/src/i18n',
}
