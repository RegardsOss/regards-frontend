/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { connect } from '@regardsoss/redux'
import { FormLoadingComponent } from '@regardsoss/form-utils'
import { PluginShape4Normalizr } from '@regardsoss/model/src/archival-storage/StoragePluginMonitoring'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'
import StoragePluginMonitoringSelector from '../model/StoragePluginMonitoringSelectors'
import StoragePluginMonitoringActions from '../model/StoragePluginMonitoringActions'
/**
 * Display fectches storage plugins monitoring informat them display the corresponding component
 */
export class ModuleContainer extends React.Component {

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
    // TODO use XAB component when merged on trunk
    if (!this.props.storagePlugins && this.props.isFetching) {
      return (<FormLoadingComponent />)
    }

    return (
      <StorageMonitoringComponent
        storagePlugins={map(this.props.storagePlugins, ({ content: { label, description, totalSize, usedSize } }) => ({
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
  storagePlugins: StoragePluginMonitoringSelector(props.appName).getList(state),
  isFetching: StoragePluginMonitoringSelector(props.appName).isFetching(state),
})
const mapDispatchToProps = dispatch => ({
  fetchStoragePlugins: () => dispatch(StoragePluginMonitoringActions.fetchEntityList(dispatch)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModuleContainer)

