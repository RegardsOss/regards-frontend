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
import { relaunchAIPsStorageActions } from '../../../clients/RelaunchAIPStorageClient'
import RelaunchAIPStorageDialogComponent from '../../../components/aip/dialogs/RelaunchAIPStorageDialogComponent'

/**
 * Container for AIP deletion dialog on all storage spaces
 * @author Kévin Picart
 */
export class RelaunchAIPStorageDialogContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      sendRelaunchSelectedAIPs: aips => dispatch(relaunchAIPsStorageActions.relaunchSelectedAIPs(aips)),
      sendRelaunchAIPsByQuery: (contextFiters, excludedAIPs) => dispatch(
        relaunchAIPsStorageActions.relaunchAIPsByQuery(contextFiters, excludedAIPs)),
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
    sendRelaunchSelectedAIPs: PropTypes.func.isRequired,
    sendRelaunchAIPsByQuery: PropTypes.func.isRequired,
  }

  /**
   * User clicked deletion confirmation
   */
  onRelaunch = () => {
    const {
      aipSelectionMode, toggleAIPs, currentFilters,
      sendRelaunchSelectedAIPs, sendRelaunchAIPsByQuery,
      onClose, onRefresh,
    } = this.props
    // Send network signal according with AIP selection mode
    switch (aipSelectionMode) {
      case TableSelectionModes.excludeSelected:
        sendRelaunchAIPsByQuery(currentFilters, toggleAIPs).then(onRefresh)
        break
      case TableSelectionModes.includeSelected:
        sendRelaunchSelectedAIPs(toggleAIPs).then(onRefresh)
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
      <RelaunchAIPStorageDialogComponent
        onRelaunch={this.onRelaunch}
        onClose={onClose}
      />
    )
  }
}
export default connect(null, RelaunchAIPStorageDialogContainer.mapDispatchToProps)(RelaunchAIPStorageDialogContainer)
