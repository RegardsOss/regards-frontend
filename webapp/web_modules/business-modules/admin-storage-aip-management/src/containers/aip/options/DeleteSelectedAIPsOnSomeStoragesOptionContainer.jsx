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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { StorageShapes } from '@regardsoss/shape'
import { TableSelectionModes } from '@regardsoss/components'
import { aipSelectors } from '../../../clients/AIPClient'
import { tableSelectors } from '../../../clients/TableClient'
import DeleteSelectedAIPsOnSomeStoragesComponent from '../../../components/aip/options/DeleteSelectedAIPsOnSomeStoragesOptionComponent'
import { DeleteSelectedAIPsOnAllStoragesOptionContainer } from './DeleteSelectedAIPsOnAllStoragesOptionContainer'

/**
 * Container to delete selected AIP on storages (user can select the storages)
 * @author Raphaël Mechali
 */
export class DeleteSelectedAIPsOnSomeStoragesOptionContainer extends React.Component {
  /**
   * Is partial delete allowed in current context?
   * @param {string} selectionMode selection mode (from table selection modes)
   * @param {[*]} toggledElements toggled elements
   * @param {[*]} dataStorages page context data storages
   * @param {*} metadata page metadata
   * @param {boolean} isFetching is page fetching?
   * @return {boolean} true when partial delete is allowed
   */
  static canDeletePartially(selectionMode, toggledElements, dataStorages, metadata, isFetching) {
    // PRE: selection must be valid (reuse from other container)
    if (!DeleteSelectedAIPsOnAllStoragesOptionContainer.isNonEmptySelection(selectionMode, toggledElements, metadata, isFetching)) {
      return false
    }
    // There must more than one storage space in selection
    let storageSpacesCount = 0
    if (selectionMode === TableSelectionModes.includeSelected) {
      // Count storage from AIP selection
      storageSpacesCount = toggledElements.reduce((previousStorages, { content: { dataStorageIds } }) => {
        const newStorages = dataStorageIds.filter(id => !previousStorages.includes(id))
        return [...previousStorages, ...newStorages]
      }, []).length
    } else {
      // Count from page context
      storageSpacesCount = dataStorages.length
    }
    return storageSpacesCount > 1
  }

  /** Operation HATEOS link rel name */
  static LINK = 'deleteByQueryOnSpecificDataStorages'

  /**
   * @param {[{rel: string, href: string}]} pageLinks page HATEOAS links
   * @return {boolean} true when link is available, false otherwise
   */
  static hasLink(pageLinks) {
    return pageLinks.some(({ rel }) => rel === DeleteSelectedAIPsOnSomeStoragesOptionContainer.LINK)
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
      canDelete: DeleteSelectedAIPsOnSomeStoragesOptionContainer.canDeletePartially(
        selectionMode, toggledAIPs, aipSelectors.getDataStorages(state),
        aipSelectors.getMetaData(state), aipSelectors.isFetching(state))
        && DeleteSelectedAIPsOnSomeStoragesOptionContainer.hasLink(aipSelectors.getLinks(state)),
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
      <DeleteSelectedAIPsOnSomeStoragesComponent
        disabled={!canDelete}
        onDelete={this.onDelete}
      />
    )
  }
}
export default connect(DeleteSelectedAIPsOnSomeStoragesOptionContainer.mapStateToProps)(DeleteSelectedAIPsOnSomeStoragesOptionContainer)
