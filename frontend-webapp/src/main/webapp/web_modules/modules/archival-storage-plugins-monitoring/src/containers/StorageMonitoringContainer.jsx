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
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { ArchivalStorageShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import StorageMonitoringComponent from '../components/StorageMonitoringComponent'
import StoragePluginSelectors from '../model/StoragePluginSelectors'
import StoragePluginActions from '../model/StoragePluginActions'

/**
 * Fetches storage plugins monitoring information, then display the corresponding component with fetched data
 */
export class StorageMonitoringContainer extends React.Component {

  static propTypes = {
    // from mapStateToProps
    storagePlugins: ArchivalStorageShapes.StoragePluginList.isRequired,
    isFetching: PropTypes.bool,
    hasError: PropTypes.bool,
    // from mapDispatchToProps
    fetchStoragePlugins: PropTypes.func,
  }

  /**
   * Container default state
   */
  static DEFAULT_STATE = {
    expanded: true,
    currentScale: storage.StorageUnitScale.bytesScale,
  }

  /**
   * Lifecycle method: component will mount.
   * Initializes the expanded state of module
   */
  componentWillMount = () => this.setState(StorageMonitoringContainer.DEFAULT_STATE)

  /**
   * Lifecycle method: component did mount. Fetches module data.
   */
  componentDidMount = () => {
    this.props.fetchStoragePlugins()
  }

  /**
  * User callback: on toggle expanded state
  */
  onExpandChange = () => this.setState({ expanded: !this.state.expanded })

  /**
   * User callback: on unit scale changed by user
   * @param newScale new selected scale
   */
  onUnitScaleChanged = newScale => this.setState({ currentScale: newScale })

  /**
   * @returns {React.Component}
   */
  render() {
    const { isFetching, storagePlugins, hasError } = this.props
    const { expanded, currentScale } = this.state
    return (
      <StorageMonitoringComponent
        isFetching={isFetching}
        hasError={hasError}
        scale={currentScale}
        storagePlugins={storagePlugins}
        expanded={expanded}
        onExpandChange={this.onExpandChange}
        onUnitScaleChanged={this.onUnitScaleChanged}
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

