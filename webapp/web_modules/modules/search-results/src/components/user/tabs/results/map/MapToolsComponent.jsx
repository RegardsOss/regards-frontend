/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import {
  TableHeaderLine, TableHeaderOptionGroup, TableHeaderOptionsArea,
} from '@regardsoss/components'
import MapSelectionModeOption from './options/MapSelectionModeOption'
import MapViewModeOption from './options/MapViewModeOption'
import MapOpacityOption from './options/MapOpacityOption'
import MapOpacitySlider from './options/MapOpacitySlider'

/**
 * Component to show map tools
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class MapToolsComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    layers: PropTypes.arrayOf(PropTypes.object).isRequired,
    mapSelectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired, // current selection mode
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired, // current view mode
    onToggleViewMode: PropTypes.func.isRequired,
    onToggleSelectionMode: PropTypes.func.isRequired,
    opacity: PropTypes.number.isRequired,
    handleChangeOpacity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static dataLayerExist(layers, viewMode) {
    return find(layers, (layer) => layer.enabled && !layer.background && layer.layerViewMode === viewMode)
  }

  state = {
    openOpacitySlider: false,
    availableModeList: [],
    dataLayerExist: false,
  }

  UNSAFE_componentWillMount() {
    // Set up available modes
    const {
      layers, viewMode,
    } = this.props
    const enabledBackgroundLayers = filter(layers, (layer) => layer.enabled && layer.background)
    const dataLayerExist = MapToolsComponent.dataLayerExist(layers, viewMode)
    const availableModeList = uniq(map(enabledBackgroundLayers, (layer) => layer.layerViewMode))
    this.setState({
      availableModeList,
      dataLayerExist,
    })
  }

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      viewMode, layers,
    } = newProps
    const oldState = this.state || {}
    const newState = { ...oldState }
    if (!isEqual(oldProps.viewMode, viewMode)) {
      newState.dataLayerExist = MapToolsComponent.dataLayerExist(layers, viewMode)
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  handleToggleOpacitySlider = () => {
    const { openOpacitySlider } = this.state
    this.setState({
      openOpacitySlider: !openOpacitySlider,
    })
  }

  render() {
    const {
      mapSelectionMode: currentSelectionMode, opacity, handleChangeOpacity,
      viewMode: currentViewMode,
      onToggleSelectionMode, onToggleViewMode,
    } = this.props
    const { openOpacitySlider, availableModeList, dataLayerExist } = this.state
    const {
      moduleTheme: {
        user: {
          mapViewStyles: {
            toolsBox, opacityToolsBox,
          },
        },
      },
    } = this.context
    const opacityToolsBoxStyle = {
      ...opacityToolsBox,
      width: availableModeList.length === 2 ? '304px' : '256px',
    }
    return [
      <div style={toolsBox} key="icons">
        <TableHeaderLine>
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              { /** Show a selector for each available selection mode */
                UIDomain.MAP_SELECTION_MODES.map((mapSelectionMode, index) => <MapSelectionModeOption
                  key={mapSelectionMode}
                  index={index}
                  selected={currentSelectionMode === mapSelectionMode}
                  mapSelectionMode={mapSelectionMode}
                  onToggleSelectionMode={onToggleSelectionMode}
                />)
              }
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              { /** Show a selector for each available view mode */
                availableModeList.map((viewMode, index) => <MapViewModeOption
                  key={viewMode}
                  selected={currentViewMode === viewMode}
                  viewMode={viewMode}
                  onToggleViewMode={onToggleViewMode}
                  index={index}
                  addStylingOption={!dataLayerExist}
                  availableModeListLenght={availableModeList.length - 1}
                />)
              }
            </TableHeaderOptionGroup>
            {dataLayerExist && (<TableHeaderOptionGroup>
              <div style={toolsBox.lastBoxStyle}>
                <MapOpacityOption
                  handleToggleOpacitySlider={this.handleToggleOpacitySlider}
                  open={openOpacitySlider}
                />
              </div>

            </TableHeaderOptionGroup>
            )}
          </TableHeaderOptionsArea>
        </TableHeaderLine>
      </div>,
      openOpacitySlider && (<div style={opacityToolsBoxStyle} key="opacity">
        <MapOpacitySlider opacity={opacity} handleChangeOpacity={handleChangeOpacity} />
      </div>),
    ]
  }
}
export default MapToolsComponent
