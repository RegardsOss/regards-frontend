/**
 * LICENSE_PLACEHOLDER
 **/
import moduleContainer from './containers/StorageMonitoringContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'

/**
 * Main file of module to expose public interface
 **/
export default {
  styles,
  moduleContainer,
  reducer,
  messagesDir: 'modules/archival-storage-plugins-monitoring/src/i18n',
  dependencies,
}
