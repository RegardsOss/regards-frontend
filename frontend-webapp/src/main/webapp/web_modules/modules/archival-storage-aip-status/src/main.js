/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/AIPStatusContainer'
import styles from './styles/styles'
import reducer from './reducer'

/**
 * Main file of module to expose public interface
 **/
export default {
  styles,
  moduleContainer,
  reducer,
  messagesDir: 'modules/archival-storage-aip-status/src/i18n',
}
