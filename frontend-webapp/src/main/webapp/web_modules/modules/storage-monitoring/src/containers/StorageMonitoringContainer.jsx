/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import StoragePluginsClient from '../clients/StoragePluginsClient'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'

/**
 * Fetches storage plugins monitoring information, then display the corresponding component with fetched data
 */
export class StorageMonitoringContainer extends React.Component {
  static propTypes = {
    scale: storage.StorageUnitScaleShape.isRequired,
    // from mapStateToProps
    storagePlugins: StorageShapes.StoragePluginList.isRequired,
    isFetching: PropTypes.bool,
    hasError: PropTypes.bool,
    // from mapDispatchToProps
    fetchStoragePlugins: PropTypes.func,
  }

  /**
   * Lifecycle method: component did mount. Fetches module data.
   */
  componentDidMount = () => {
    this.props.fetchStoragePlugins()
  }

  /**
   * @returns {React.Component}
   */
  render() {
    const {
      scale, storagePlugins, isFetching, hasError,
    } = this.props
    return (
      <StorageMonitoringComponent
        isFetching={isFetching}
        hasError={hasError}
        scale={scale}
        storagePlugins={storagePlugins}
        onUnitScaleChanged={this.onUnitScaleChanged}
      />
    )
  }
}

const mapStateToProps = (state, props) => ({
  storagePlugins: StoragePluginsClient.storagePluginsSelectors.getList(state),
  isFetching: StoragePluginsClient.storagePluginsSelectors.isFetching(state),
  hasError: StoragePluginsClient.storagePluginsSelectors.getError(state).hasError,
})

const mapDispatchToProps = dispatch => ({
  fetchStoragePlugins: () => dispatch(StoragePluginsClient.storagePluginsActions.fetchEntityList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageMonitoringContainer)

