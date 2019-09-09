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
import { StringComparison } from '@regardsoss/form-utils'
import { TableSelectionModes } from '../../../../../../components/src/main'
import { aipSelectors } from '../../../clients/AIPClient'
import { deleteAIPssOnSomeStoragesClientActions } from '../../../clients/DeleteAIPOnSomeStoragesClient'
import DeleteAIPOnSomeStoragesDialogComponent from '../../../components/aip/dialogs/DeleteAIPOnSomeStoragesDialogComponent'
import ConfirmDeleteOnSomeStoragesDialogComponent from '../../../components/aip/dialogs/ConfirmDeleteOnSomeStoragesDialogComponent'

/**
 * Container for AIP deletion dialog on some storage spaces
 * @author Raphaël Mechali
 */
export class DeleteAIPOnSomeStoragesDialogContainer extends React.Component {
  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {
      dataStorages: aipSelectors.getDataStorages(state),
    }
  }

  /**
 * Redux: map dispatch to props function
 * @param {*} dispatch: redux dispatch function
 * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapDispatchToProps(dispatch) {
    return {
      sendDeleteSelectedAIPs: (aips, dataStorages) => dispatch(
        deleteAIPssOnSomeStoragesClientActions.deleteSelectedAIPs(aips, dataStorages)),
      sendDeleteAIPsByQuery: (contextFiters, excludedAIPs, dataStorages) => dispatch(
        deleteAIPssOnSomeStoragesClientActions.deleteAIPsByQuery(contextFiters, excludedAIPs, dataStorages)),
    }
  }

  static propTypes = {
    aipSelectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    toggleAIPs: PropTypes.arrayOf(StorageShapes.AIPWithStorages).isRequired,
    currentFilters: PropTypes.objectOf(PropTypes.string),
    // Parent callbacks
    onClose: PropTypes.func.isRequired, // close dialog
    onRefresh: PropTypes.func.isRequired, // refresh table content
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dataStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent).isRequired, // used only in onPropertiesUpdated
    // from mapDispatchToProps
    sendDeleteSelectedAIPs: PropTypes.func.isRequired,
    sendDeleteAIPsByQuery: PropTypes.func.isRequired,
  }

  /** Default state */
  state = {
    storagesSelectionModel: [],
    canDelete: false, // is delete confirmation currently enabled?
    hasSelectedStorages: false, // when true, show confirmation dialog
  }

  /**
   * Lifecycle method: component will mount. Used here to compute initial dialog state
   */
  componentWillMount = () => {
    const {
      aipSelectionMode, toggleAIPs, dataStorages,
    } = this.props
    let availableStorages = []
    // 1 - Retrieve selectable storages
    switch (aipSelectionMode) {
      case TableSelectionModes.excludeSelected:
        // 1.A - available storages from request results context
        availableStorages = [...dataStorages]
        break
      case TableSelectionModes.includeSelected:
        // 1.B - retrieve Ids in toggled AIPs
        availableStorages = toggleAIPs.reduce(
          (acc, { content: { dataStorageIds } }) => [
            ...acc,
            ...dataStorageIds.filter(id => !acc.includes(id)),
          ], [])
          // Then retrieve corresponding storage models using page context list (Warning: all storages must be retrieved!)
          .map(storageId => dataStorages.find(({ id }) => id === storageId))
        break
      default:
        throw new Error(`Unhandled selection mode ${aipSelectionMode}`)
    }
    // 2 - Sort storages on their label
    availableStorages.sort((str1, str2) => StringComparison.compare(str1.dataStorageConfiguration.label, str2.dataStorageConfiguration.label))

    this.setState({
      storagesSelectionModel: availableStorages.map(storage => ({ selected: false, storage })),
      canDelete: false,
      hasSelectedStorages: false,
    })
  }

   /**
    * User toggled a storage selection state
    * @param {number} toggledIndex toggled index in list
    */
   onToggleStorage = (toggledIndex) => {
     const storagesSelectionModel = this.state.storagesSelectionModel.map((model, index) => ({
       selected: index === toggledIndex ? !model.selected : model.selected, // toggle element in model (keep others unchanged)
       storage: model.storage,
     }))
     const selectedCount = storagesSelectionModel.reduce((acc, model) => model.selected ? acc + 1 : acc, 0)
     this.setState({
       storagesSelectionModel,
       canDelete: selectedCount > 0 && selectedCount < storagesSelectionModel.length,
     })
   }

   /** User callback: data storages selection was confirmed */
   onConfirmSelection = () => {
     this.setState({ hasSelectedStorages: true })
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
         sendDeleteAIPsByQuery(currentFilters, toggleAIPs, this.getSelectedStorages()).then(onRefresh)
         break
       case TableSelectionModes.includeSelected:
         sendDeleteSelectedAIPs(toggleAIPs, this.getSelectedStorages()).then(onRefresh)
         break
       default:
         throw new Error(`Unhandled selection mode ${aipSelectionMode}`)
     }
     // close dialog
     onClose()
   }

   /**
    * @return {[StorageShapes.PrioritizedDataStorageContent]} selected storages from selection model
    */
   getSelectedStorages = () => this.state.storagesSelectionModel
     .filter(({ selected }) => selected)
     .map(({ storage }) => storage)

   render() {
     const { onClose } = this.props
     const { storagesSelectionModel, canDelete, hasSelectedStorages } = this.state
     if (hasSelectedStorages) {
       // Show operation confirmation dialog before deleting
       return (
         <ConfirmDeleteOnSomeStoragesDialogComponent
           selectedStorages={this.getSelectedStorages()}
           onConfirm={this.onDelete}
           onCancel={onClose}
         />)
     }
     // Show data storages selection dialog
     return (
       <DeleteAIPOnSomeStoragesDialogComponent
         storagesSelectionModel={storagesSelectionModel}
         canDelete={canDelete}
         onToggleStorage={this.onToggleStorage}
         onConfirmDelete={this.onConfirmSelection}
         onClose={onClose}
       />
     )
   }
}
export default connect(
  DeleteAIPOnSomeStoragesDialogContainer.mapStateToProps,
  DeleteAIPOnSomeStoragesDialogContainer.mapDispatchToProps)(DeleteAIPOnSomeStoragesDialogContainer)
