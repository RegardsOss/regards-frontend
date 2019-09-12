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
import { IngestShapes } from '@regardsoss/shape'
import { TableSelectionModes } from '@regardsoss/components'
import { deleteSIPsActions } from '../../../clients/DeleteSIPClient'
import DeleteSelectedSIPsDialogComponent from '../../../components/sip/dialogs/DeleteSelectedSIPsDialogComponent'

/**
 * Container for SIP deletion dialog
 * @author Kévin Picart
 */
export class DeleteSelectedSIPsDialogContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      sendDeleteSelectedSIPs: sips => dispatch(deleteSIPsActions.deleteSelectedSIPs(sips)),
      sendDeleteSIPsByQuery: (contextFiters, excludedSIPs) => dispatch(
        deleteSIPsActions.deleteSIPsByQuery(contextFiters, excludedSIPs)),
    }
  }

  static propTypes = {
    // Defines target SIP as a selection / request
    sipSelectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    toggleSIPs: PropTypes.arrayOf(IngestShapes.IngestSIP).isRequired,
    currentFilters: PropTypes.objectOf(PropTypes.string),
    // Parent callbacks
    onClose: PropTypes.func.isRequired, // close dialog
    onRefresh: PropTypes.func.isRequired, // refresh table content
    // from mapDispatchToProps
    sendDeleteSelectedSIPs: PropTypes.func.isRequired,
    sendDeleteSIPsByQuery: PropTypes.func.isRequired,
  }

  /**
   * User clicked deletion confirmation
   */
  onDelete = () => {
    const {
      sipSelectionMode, toggleSIPs, currentFilters,
      sendDeleteSelectedSIPs, sendDeleteSIPsByQuery,
      onClose, onRefresh,
    } = this.props
    // Send network signal according with SIP selection mode
    switch (sipSelectionMode) {
      case TableSelectionModes.excludeSelected:
        sendDeleteSIPsByQuery(currentFilters, toggleSIPs).then(onRefresh)
        break
      case TableSelectionModes.includeSelected:
        sendDeleteSelectedSIPs(toggleSIPs).then(onRefresh)
        break
      default:
        throw new Error(`Unhandled selection mode ${sipSelectionMode}`)
    }
    // close dialog
    onClose()
  }

  render() {
    const { onClose } = this.props
    return (
      <DeleteSelectedSIPsDialogComponent
        onDelete={this.onDelete}
        onClose={onClose}
      />
    )
  }
}
export default connect(null, DeleteSelectedSIPsDialogContainer.mapDispatchToProps)(DeleteSelectedSIPsDialogContainer)
