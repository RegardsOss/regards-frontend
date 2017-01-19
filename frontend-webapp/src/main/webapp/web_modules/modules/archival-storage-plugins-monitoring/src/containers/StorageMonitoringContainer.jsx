/**
 * LICENSE_PLACEHOLDER
 **/
import { map, keys } from 'lodash'
import { connect } from '@regardsoss/redux'
import { PluginShape4Normalizr } from '@regardsoss/model/src/archival-storage/StoragePluginMonitoring'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'
import StoragePluginMonitoringSelector from '../model/StoragePluginMonitoringSelectors'
import StoragePluginMonitoringActions from '../model/StoragePluginMonitoringActions'
import { bytesScale } from '../helper/StorageUnit'
/**
 * Fetches storage plugins monitoring information, then display the corresponding component with fetched data
 */
export class StorageMonitoringContainer extends React.Component {

  static propTypes = {
    // Set by module loader, required for map state to props
    // eslint-disable-next-line react/no-unused-prop-types
    appName: React.PropTypes.string.isRequired, // Set by mapStateToProps
    storagePlugins: React.PropTypes.objectOf(PluginShape4Normalizr),
    isFetching: React.PropTypes.bool, // Set by mapDispatchToProps
    fetchStoragePlugins: React.PropTypes.func,
  }

  componentWillMount() {
    this.props.fetchStoragePlugins()
  }

  /**
   * @returns {React.Component}
   */
  render() {
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.props.isFetching}
        isEmpty={!this.props.storagePlugins || !keys(this.props.storagePlugins).length}
      >
        <StorageMonitoringComponent
          initScale={bytesScale}
          storagePlugins={map(this.props.storagePlugins, ({ content: { label, description, totalSize, usedSize } }) => ({
            label,
            description,
            totalSize,
            usedSize,
          }))}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, props) => ({
  storagePlugins: StoragePluginMonitoringSelector(props.appName).getList(state),
  isFetching: StoragePluginMonitoringSelector(props.appName).isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchStoragePlugins: () => dispatch(StoragePluginMonitoringActions.fetchEntityList(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageMonitoringContainer)

