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
import { connect } from '@regardsoss/redux'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import ManageDatasetFileFiltersComponent from '../../components/user/ManageDatasetFileFiltersComponent'

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()

/**
 * @author Théo Lasserre
 */
export class ManageDatasetFileFiltersContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    datasetIpid: PropTypes.string.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    datasetSelectionId: PropTypes.number.isRequired,
    fileSelectionDescription: OrderShapes.BasketDatasetFileSelectionDescription,
    onFileSelectionChanged: PropTypes.func.isRequired,
    process: OrderShapes.BasketDatasetProcessingSelection,
    // eslint-disable-next-line react/no-unused-prop-types
    fileFiltersActions: PropTypes.instanceOf(OrderClient.OrderFileFiltersActions).isRequired,
    // from mapStateToProps
    // from mapDispatchToProps
    updateFileFilters: PropTypes.func.isRequired,
    removeProcessing: PropTypes.func.isRequired,
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { fileFiltersActions, datasetSelectionId }) {
    return {
      updateFileFilters: (filters) => dispatch(fileFiltersActions.updateFileFilters(datasetSelectionId, filters)),
      removeProcessing: () => dispatch(orderBasketActions.updateDatasetProcessingSelection(datasetSelectionId, {})),
    }
  }

  updateFileFilters = (filters) => {
    const { updateFileFilters, onFileSelectionChanged } = this.props
    updateFileFilters(filters).then((actionResult) => {
      if (!actionResult.error) {
        onFileSelectionChanged()
      }
    })
  }

  handleConfirm = (filters) => {
    const { process, removeProcessing } = this.props
    if (process) {
      removeProcessing().then((actionResult) => {
        if (!actionResult.error) {
          this.updateFileFilters(filters)
        }
      })
    } else {
      this.updateFileFilters(filters)
    }
  }

  render() {
    const { fileSelectionDescription, process } = this.props
    return (
      <ManageDatasetFileFiltersComponent
        updateFileFilters={this.updateFileFilters}
        fileSelectionDescription={fileSelectionDescription}
        process={process}
        handleConfirm={this.handleConfirm}
      />
    )
  }
}
export default connect(
  null,
  ManageDatasetFileFiltersContainer.mapDispatchToProps)(ManageDatasetFileFiltersContainer)
