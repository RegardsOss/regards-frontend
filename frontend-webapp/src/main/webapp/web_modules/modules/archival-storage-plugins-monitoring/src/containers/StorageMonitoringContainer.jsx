/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { connect } from '@regardsoss/redux'
import { PluginShape4Normalizr } from '@regardsoss/model/src/archival-storage/StoragePluginMonitoring'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'
import StoragePluginMonitoringSelector from '../model/StoragePluginsMonitoringSelectors'
import StoragePluginMonitoringActions from '../model/StoragePluginsMonitoringActions'
import { bytesScale } from '../helper/StorageUnit'

/**
 * Fetches storage plugins monitoring information, then display the corresponding component with fetched data
 */
export class StorageMonitoringContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    // Set by module loader, required for map state to props
    storagePlugins: React.PropTypes.objectOf(PluginShape4Normalizr),
    isFetching: React.PropTypes.bool,
    hasError: React.PropTypes.bool,
    // from mapDispatchToProps
    fetchStoragePlugins: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchStoragePlugins()
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const { isFetching, storagePlugins, hasError } = this.props
    return (
      <StorageMonitoringComponent
        isFetching={isFetching}
        hasError={hasError}
        initScale={bytesScale}
        storagePlugins={map(storagePlugins, ({ content: { label, description, totalSize, usedSize } }) => ({
          label,
          description,
          totalSize,
          usedSize,
        }))}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  storagePlugins: StoragePluginMonitoringSelector.getList(state),
  isFetching: StoragePluginMonitoringSelector.isFetching(state),
  hasError: StoragePluginMonitoringSelector.getError(state).hasError,
})

const mapDispatchToProps = dispatch => ({
  fetchStoragePlugins: () => dispatch(StoragePluginMonitoringActions.fetchEntityList(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageMonitoringContainer)

