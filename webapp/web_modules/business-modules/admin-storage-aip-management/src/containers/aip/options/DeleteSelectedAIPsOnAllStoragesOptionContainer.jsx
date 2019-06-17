/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { TableSelectionModes } from '@regardsoss/components'
import { aipSelectors } from '../../../clients/AIPClient'
import { tableSelectors } from '../../../clients/TableClient'
import DeleteSelectedAIPsOnAllStoragesComponent from '../../../components/aip/options/DeleteSelectedAIPsOnAllStoragesOptionComponent'

/**
 * Container to delete selected AIP on all storages
 * @author Raphaël Mechali
 */
export class DeleteSelectedAIPsOnAllStoragesOptionContainer extends React.Component {
  /**
   * Is selection valid for current selection mode, toggle elements and page state
   * @param {string} selectionMode selection mode (from table selection modes)
   * @param {[*]} toggledElements toggled elements
   * @param {*} metadata page metadata
   * @param {boolean} isFetching is page fetching?
   * @return {boolean} true when partial delete is allowed
   */
  static isNonEmptySelection(selectionMode, toggledElements, metadata, isFetching) {
    if (isFetching || !metadata || !metadata.totalElements) {
      // Fetching or no data
      return false
    }
    const toggledCount = toggledElements.length
    // inclusive: selection > 0
    return (selectionMode === TableSelectionModes.includeSelected && toggledCount > 0)
      // exclusive: selection < total
      || (selectionMode === TableSelectionModes.excludeSelected && toggledCount < metadata.totalElements)
  }

  /** Operation HATEOS link rel name */
  static LINK = 'deleteByQuery'

  /**
   * @param {[{rel: string, href: string}]} pageLinks page HATEOAS links
   * @return {boolean} true when link is available, false otherwise
   */
  static hasLink(pageLinks) {
    return pageLinks.some(({ rel }) => rel === DeleteSelectedAIPsOnAllStoragesOptionContainer.LINK)
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const toggledAIPs = tableSelectors.getToggledElementsAsList(state)
    const selectionMode = tableSelectors.getSelectionMode(state)
    return {
      toggledAIPs,
      selectionMode,
      canDelete: DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(
        selectionMode, toggledAIPs,
        aipSelectors.getMetaData(state), aipSelectors.isFetching(state))
        && DeleteSelectedAIPsOnAllStoragesOptionContainer.hasLink(aipSelectors.getLinks(state)),
    }
  }

  static propTypes = {
    // callback: on delete (selectionMode, [AIPs]) => ()
    onDelete: PropTypes.func.isRequired,
    // from mapStateToProps
    toggledAIPs: PropTypes.arrayOf(StorageShapes.AIPWithStorages).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    canDelete: PropTypes.bool.isRequired,
  }

  /**
   * User callback on click
   */
  onDelete = () => {
    const { toggledAIPs, selectionMode, onDelete } = this.props
    onDelete(selectionMode, toggledAIPs)
  }

  render() {
    const { canDelete } = this.props
    return (
      <DeleteSelectedAIPsOnAllStoragesComponent
        disabled={!canDelete}
        onDelete={this.onDelete}
      />
    )
  }
}
export default connect(DeleteSelectedAIPsOnAllStoragesOptionContainer.mapStateToProps)(DeleteSelectedAIPsOnAllStoragesOptionContainer)
