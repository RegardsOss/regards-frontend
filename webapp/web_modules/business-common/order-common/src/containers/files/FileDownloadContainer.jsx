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
import compose from 'lodash/fp/compose'
import { connect } from '@regardsoss/redux'
import { OrderDomain } from '@regardsoss/domain'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import { QuotaDownloadUtils, QuotaInfo, withQuotaInfo } from '@regardsoss/entities-common'
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
    // from withQuotaInfo
    quotaInfo: QuotaInfo,
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
    const {
      entity: {
        content: {
          id, state, dataType, reference,
        },
      }, authentication, quotaInfo,
    } = this.props
    return (
      <FileDownloadComponent
        quotaInfo={quotaInfo}
        constrainedByQuota={QuotaDownloadUtils.isConstrainedByQuota(dataType, reference)}
        canDownload={
          QuotaDownloadUtils.canDownload(
            FileDownloadContainer.DOWNLOADABLE_FILE_STATES.includes(state), // File is available only in those states
            dataType, reference, quotaInfo, authentication.result.access_token)
        }
        downloadURL={downloadOrderFileActions.getFileDownloadLink(id, authentication.result.access_token)}
      />
    )
  }
}
export default compose(connect(FileDownloadContainer.mapStateToProps), withQuotaInfo)(FileDownloadContainer)
