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
import { connect } from '@regardsoss/redux'
import { OrderClient } from '@regardsoss/client'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import DownloadOrdersCSVSummaryComponent from '../../../components/orders/options/DownloadOrdersCSVSummaryComponent'

const csvSummaryFileActions = new OrderClient.DownloadOrderSummaryCSVFileActions()

/**
 * Container for download orders CSV summary option
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
export class DownloadOrdersCSVSummaryContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      downloadCSV: (requestParameters) => dispatch(csvSummaryFileActions.downloadCSV(requestParameters)),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
  }

  static propTypes = {
    ordersRequestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    // from mapDispatchToProps
    downloadCSV: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
  }

  onDownloadCSV = () => {
    const { downloadCSV, ordersRequestParameters, throwError } = this.props
    downloadCSV(ordersRequestParameters).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to download CSV file')
      }
    })
  }

  render() {
    return (
      <DownloadOrdersCSVSummaryComponent onDownloadCSV={this.onDownloadCSV} />
    )
  }
}
export default connect(null, DownloadOrdersCSVSummaryContainer.mapDispatchToProps)(DownloadOrdersCSVSummaryContainer)
