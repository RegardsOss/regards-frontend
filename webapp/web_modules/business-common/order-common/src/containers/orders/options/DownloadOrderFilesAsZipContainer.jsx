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
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import DownloadOrderFilesAsZipComponent from '../../../components/orders/options/DownloadOrderFilesAsZipComponent'

const zipFileActions = new OrderClient.DownloadAllOrderFilesAction()

/**
 * Download order metalink file table option container
 * @author Raphaël Mechali
 */
export class DownloadOrderFilesAsZipContainer extends React.Component {
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

  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    // from mapStateToProps
    authentication: AuthenticateShape.isRequired,
  }

  canDownload = () => this.props.entity.links.some((link) => link.rel === 'download')

  render() {
    const { entity: { content: { id, availableFilesCount = 0, waitingForUser = false } }, authentication: { result: { access_token } } } = this.props
    return (
      <DownloadOrderFilesAsZipComponent
        isWaitingUser={waitingForUser}
        canDownload={this.canDownload()}
        availableFilesCount={availableFilesCount}
        downloadZipURL={zipFileActions.getFileDownloadLink(id, access_token)}
      />
    )
  }
}

export default connect(DownloadOrderFilesAsZipContainer.mapStateToProps)(DownloadOrderFilesAsZipContainer)
