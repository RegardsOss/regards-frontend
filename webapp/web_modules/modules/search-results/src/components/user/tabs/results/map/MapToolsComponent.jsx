/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DeleteIcon from 'mdi-material-ui/CloseCircleOutline'
import find from 'lodash/find'
import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import uniq from 'lodash/uniq'
import map from 'lodash/map'
import filter from 'lodash/filter'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import {
  TableHeaderLine, TableHeaderOptionGroup, TableHeaderOptionsArea,
} from '@regardsoss/components'
import { FlatButton } from 'material-ui'
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
    selectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired, // current selection mode
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired, // current view mode
    onToggleMode: PropTypes.func.isRequired, // (groupMode, mode) => ()
    opacity: PropTypes.number.isRequired,
    handleChangeOpacity: PropTypes.func.isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.object),
    onProductSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
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
    const dataLayerExist = this.dataLayerExist(layers, viewMode)
    const availableModeList = uniq(map(enabledBackgroundLayers, (layer) => layer.layerViewMode))
    this.setState({
      availableModeList,
      dataLayerExist,
    })
  }

  dataLayerExist = (layers, viewMode) => find(layers, (layer) => layer.enabled && !layer.background && layer.layerViewMode === viewMode)

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
   UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

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
      newState.dataLayerExist = this.dataLayerExist(layers, viewMode)
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

  handleRemoveSelectedProduct = () => {
    const {
      selectedProducts, onProductSelected,
    } = this.props
    const lastSelectedProduct = last(selectedProducts)
    onProductSelected(true, lastSelectedProduct)
  }

  render() {
    const {
      selectionMode: currentSelectionMode, opacity, handleChangeOpacity,
      viewMode: currentViewMode,
      onToggleMode, selectedProducts,
    } = this.props
    const {
      moduleTheme: {
        user: {
          mapViewStyles: {
            toolsBox, selectedProductBox, opacityToolsBox, iconToolButton,
          },
        },
      },
    } = this.context
    const { openOpacitySlider, availableModeList, dataLayerExist } = this.state
    return [
      <div style={toolsBox} key="icons">
        <TableHeaderLine>
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              { /** Show a selector for each available selection mode */
                UIDomain.MAP_SELECTION_MODES.map((selectionMode, index) => <MapSelectionModeOption
                  key={selectionMode}
                  index={index}
                  selected={currentSelectionMode === selectionMode}
                  selectionMode={selectionMode}
                  onToggleMode={onToggleMode}
                />)
              }
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              { /** Show a selector for each available view mode */
                availableModeList.map((viewMode, index) => <MapViewModeOption
                  key={viewMode}
                  selected={currentViewMode === viewMode}
                  viewMode={viewMode}
                  onToggleMode={onToggleMode}
                  index={index}
                  addStylingOption={isEmpty(selectedProducts) && !dataLayerExist}
                />)
              }
            </TableHeaderOptionGroup>
            {dataLayerExist && (<TableHeaderOptionGroup>
              <div style={isEmpty(selectedProducts) ? toolsBox.lastBoxStyle : null}>
                <MapOpacityOption
                  handleToggleOpacitySlider={this.handleToggleOpacitySlider}
                  open={openOpacitySlider}
                />
              </div>

            </TableHeaderOptionGroup>
            )}
            {
              !isEmpty(selectedProducts)
              /** Show a chip of for lastSelectedProduct */
                ? <TableHeaderOptionGroup>
                  <div style={selectedProductBox}>
                    <div style={selectedProductBox.labelStyle}>
                      { last(selectedProducts).label }
                    </div>
                    <FlatButton
                      icon={<DeleteIcon />}
                      onClick={this.handleRemoveSelectedProduct}
                      style={iconToolButton}
                    />
                  </div>

                </TableHeaderOptionGroup>
                : null
            }
          </TableHeaderOptionsArea>
        </TableHeaderLine>
      </div>,
      openOpacitySlider && (<div style={opacityToolsBox} key="opacity">
        <MapOpacitySlider opacity={opacity} handleChangeOpacity={handleChangeOpacity} />
      </div>),
    ]
  }
}
export default MapToolsComponent
