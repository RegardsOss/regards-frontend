/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { connect } from '@regardsoss/redux'
import { StoragePlugin } from '@regardsoss/model'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'
import StoragePluginSelectors from '../model/StoragePluginSelectors'
import StoragePluginActions from '../model/StoragePluginActions'
import StorageUnitScale from '../helper/StorageUnit'

/**
 * Fetches storage plugins monitoring information, then display the corresponding component with fetched data
 */
export class StorageMonitoringContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    // Set by module loader, required for map state to props
    storagePlugins: React.PropTypes.objectOf(StoragePlugin).isRequired,
      // React.PropTypes.objectOf(StoragePlugin),
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
        initScale={StorageUnitScale.bytesScale}
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
  storagePlugins: StoragePluginSelectors.getList(state),
  isFetching: StoragePluginSelectors.isFetching(state),
  hasError: StoragePluginSelectors.getError(state).hasError,
})

const mapDispatchToProps = dispatch => ({
  fetchStoragePlugins: () => dispatch(StoragePluginActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageMonitoringContainer)

