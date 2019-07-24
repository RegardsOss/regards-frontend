/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DatasetIcon from 'material-ui/svg-icons/device/widgets'
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { ResolvedDatasetAttributesArray } from '../../model/DatasetAttributesForGraph'
import DatasetAttributes from './DatasetAttributes'
import ItemLinkContainer from '../../containers/user/ItemLinkContainer'
import ItemLink from './ItemLink'

/**
* Displays a dataset
*/
class DatasetItem extends React.Component {
  static propTypes = {
    locked: PropTypes.bool.isRequired,
    dataset: CatalogShapes.Entity.isRequired,
    datasetAttributes: ResolvedDatasetAttributesArray.isRequired, // resolved attributes, empty array allowed
    attributesVisible: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    // initialize this state styles
    this.onItemLinkStateChange(ItemLink.States.DEFAULT)
  }

  /**
   * Handles item state change. Note: no need to optimize state update here, the item link container transfers as few events as possible
   * @param newLinkState new link state
   */
  onItemLinkStateChange = (newLinkState) => {
    // store in state the current right arrow appearance (to avoid computing new references at runtime)
    this.setState({
      detailState: newLinkState,
    })
  }

  render() {
    const {
      dataset, datasetAttributes, locked, selected, attributesVisible, onSelect,
    } = this.props
    const { detailState } = this.state
    const { moduleTheme: { user } } = this.context
    return (
      <div style={user.datasetItem.styles}>
        <ItemLinkContainer
          entity={dataset}
          Icon={DatasetIcon}
          onSelect={onSelect}
          selected={selected}
          locked={locked}
          onStateChange={this.onItemLinkStateChange}
        />
        <DatasetAttributes
          datasetAttributes={datasetAttributes}
          visible={attributesVisible}
          state={detailState}
        />
      </div>
    )
  }
}
export default DatasetItem
