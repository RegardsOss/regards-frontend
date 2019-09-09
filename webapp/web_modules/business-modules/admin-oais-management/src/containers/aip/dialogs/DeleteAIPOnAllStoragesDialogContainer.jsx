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
import { deleteAIPssOnAllStoragesClientActions } from '../../../clients/DeleteAIPOnAllStoragesClient'
import DeleteAIPOnAllStoragesDialogComponent from '../../../components/aip/dialogs/DeleteAIPOnAllStoragesDialogComponent'

/**
 * Container for AIP deletion dialog on all storage spaces
 * @author Raphaël Mechali
 */
export class DeleteAIPOnAllStoragesDialogContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      sendDeleteSelectedAIPs: aips => dispatch(deleteAIPssOnAllStoragesClientActions.deleteSelectedAIPs(aips)),
      sendDeleteAIPsByQuery: (contextFiters, excludedAIPs) => dispatch(
        deleteAIPssOnAllStoragesClientActions.deleteAIPsByQuery(contextFiters, excludedAIPs)),
    }
  }

  static propTypes = {
    // Defines target AIP as a selection / request
    aipSelectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    toggleAIPs: PropTypes.arrayOf(StorageShapes.AIPWithStorages).isRequired,
    currentFilters: PropTypes.objectOf(PropTypes.string),
    // Parent callbacks
    onClose: PropTypes.func.isRequired, // close dialog
    onRefresh: PropTypes.func.isRequired, // refresh table content
    // from mapDispatchToProps
    sendDeleteSelectedAIPs: PropTypes.func.isRequired,
    sendDeleteAIPsByQuery: PropTypes.func.isRequired,
  }

  /**
   * User clicked deletion confirmation
   */
  onDelete = () => {
    const {
      aipSelectionMode, toggleAIPs, currentFilters,
      sendDeleteSelectedAIPs, sendDeleteAIPsByQuery,
      onClose, onRefresh,
    } = this.props
    // Send network signal according with AIP selection mode
    switch (aipSelectionMode) {
      case TableSelectionModes.excludeSelected:
        sendDeleteAIPsByQuery(currentFilters, toggleAIPs).then(onRefresh)
        break
      case TableSelectionModes.includeSelected:
        sendDeleteSelectedAIPs(toggleAIPs).then(onRefresh)
        break
      default:
        throw new Error(`Unhandled selection mode ${aipSelectionMode}`)
    }
    // close dialog
    onClose()
  }

  render() {
    const { onClose } = this.props
    return (
      <DeleteAIPOnAllStoragesDialogComponent
        onDelete={this.onDelete}
        onClose={onClose}
      />
    )
  }
}
export default connect(null, DeleteAIPOnAllStoragesDialogContainer.mapDispatchToProps)(DeleteAIPOnAllStoragesDialogContainer)
