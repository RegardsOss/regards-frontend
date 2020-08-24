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
import { OrderDomain } from '@regardsoss/domain'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import FileDownloadComponent from '../../components/files/FileDownloadComponent'

// create actions to get rights and download URL
const downloadOrderFileActions = new OrderClient.DownloadOrderFileActions()

/**
 * File download container
 * @author Raphaël Mechali
 */
export class FileDownloadContainer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderFileWithContent,
    // from map state to props
    authentication: AuthenticateShape.isRequired,
  }

  /**
   * States in which file can be downloaded
   */
  static DOWNLOADABLE_FILE_STATES = [
    OrderDomain.ORDER_FILE_STATUS_ENUM.AVAILABLE,
    OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOADED,
    OrderDomain.ORDER_FILE_STATUS_ENUM.DOWNLOAD_ERROR,
    OrderDomain.ORDER_FILE_STATUS_ENUM.ONLINE,
  ]

  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
    }
  }

  render() {
    const { entity: { content: { id, state } }, authentication } = this.props
    const canDownload = FileDownloadContainer.DOWNLOADABLE_FILE_STATES.includes(state)
    const url = downloadOrderFileActions.getFileDownloadLink(id, authentication.result.access_token)
    return (
      <FileDownloadComponent
        canDownload={canDownload}
        downloadURL={url}
      />
    )
  }
}
export default connect(FileDownloadContainer.mapStateToProps)(FileDownloadContainer)
