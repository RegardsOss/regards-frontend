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
import { OrderDomain } from '@regardsoss/domain'
import { OrderShapes } from '@regardsoss/shape'
import { OrderClient } from '@regardsoss/client'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import DownloadOrderMetaLinkFileComponent from '../../../components/orders/options/DownloadOrderMetaLinkFileComponent'

const metalinkFileActions = new OrderClient.DownloadOrderMetalinkFileActions()

/**
 * Download order metalink file table option container
 * @author Raphaël Mechali
 */
export class DownloadOrderMetaLinkFileContainer extends React.Component {
  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    // from mapStateToProps
    authentication: AuthenticateShape.isRequired,
  }

  /** States in which meta link is available */
  static METALINK_AVAILABLE_STATE = [
    OrderDomain.ORDER_STATUS_ENUM.PENDING,
    OrderDomain.ORDER_STATUS_ENUM.RUNNING,
    OrderDomain.ORDER_STATUS_ENUM.PAUSED,
    OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING,
    OrderDomain.ORDER_STATUS_ENUM.DONE,
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
    const { entity: { content: { id, status } }, authentication: { result: { access_token } } } = this.props
    return (
      <DownloadOrderMetaLinkFileComponent
        canDownload={DownloadOrderMetaLinkFileContainer.METALINK_AVAILABLE_STATE.includes(status)}
        downloadMetalinkURL={metalinkFileActions.getFileDownloadLink(id, access_token)}
      />
    )
  }
}

export default connect(DownloadOrderMetaLinkFileContainer.mapStateToProps)(DownloadOrderMetaLinkFileContainer)
