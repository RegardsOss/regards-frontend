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
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { themeContextType } from '@regardsoss/theme'
import { OrderClient } from '@regardsoss/client'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { LoadableContentDisplayDecorator, LocalURLProvider } from '@regardsoss/display-control'
import { DownloadResultComponent } from '@regardsoss/entities-common'
import DownloadOrdersCSVSummaryComponent from '../../../components/orders/options/DownloadOrdersCSVSummaryComponent'

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
  static mapDispatchToProps(dispatch, { downloadOrderActions }) {
    return {
      downloadCSV: (requestParameters) => dispatch(downloadOrderActions.downloadCSV(requestParameters)),
    }
  }

  static propTypes = {
    ordersRequestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    // eslint-disable-next-line react/no-unused-prop-types
    downloadOrderActions: PropTypes.instanceOf(OrderClient.DownloadOrderSummaryCSVFileActions),
    // from mapDispatchToProps
    downloadCSV: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    downloading: false,
    localAccessURL: null, // local file access URL
    fileName: null,
  }

  /**
   * Action to do when download action is done. Save csv file content in local blob.
  */
  onPostDownloadDone = ({ payload = {}, error }) => {
    if (error) {
      console.error('Error downloading csv file')
      this.setState({
        downloading: false,
      })
    } else {
      const resultFile = payload
      const contentDisposition = get(payload, 'contentDisposition')
      const fileName = contentDisposition ? contentDisposition.split('filename=')[1] : 'regards-order-list.csv'
      this.setState({
        localAccessURL: resultFile && resultFile.content ? LocalURLProvider.buildLocalAccessURL(resultFile.content) : null,
        fileName,
        downloading: false,
      })
    }
  }

  /**
   * Force download of localAccessURL created after download click action.
   * Force re-render component by setting key to localAccessURL. With this, if url change, component is mounted and download is started
   */
  forceDownload = () => {
    const {
      localAccessURL, fileName,
    } = this.state
    if (localAccessURL) {
      return <DownloadResultComponent
        key={localAccessURL}
        localAccessURL={localAccessURL}
        fileName={fileName}
      />
    }
    return null
  }

  onDownloadCSV = () => {
    const { downloadCSV, ordersRequestParameters } = this.props
    this.setState({
      downloading: true,
    })
    downloadCSV(ordersRequestParameters).then(this.onPostDownloadDone)
  }

  render() {
    const { downloading } = this.state
    const { moduleTheme: { downloadOrderButton } } = this.context
    return (
      <div style={downloadOrderButton}>
        <LoadableContentDisplayDecorator isLoading={downloading}>
          <DownloadOrdersCSVSummaryComponent onDownloadCSV={this.onDownloadCSV} />
          {this.forceDownload()}
        </LoadableContentDisplayDecorator>
      </div>

    )
  }
}
export default connect(null, DownloadOrdersCSVSummaryContainer.mapDispatchToProps)(DownloadOrdersCSVSummaryContainer)
