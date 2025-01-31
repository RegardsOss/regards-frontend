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
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { OrderClient } from '@regardsoss/client'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { AuthenticateShape, AuthenticationClient } from '@regardsoss/authentication-utils'
import DownloadOrderFilesAsZipComponent from '../../../components/orders/options/DownloadOrderFilesAsZipComponent'

const zipFileActions = new OrderClient.DownloadAllOrderFilesAction()

/**
 * Download order metalink file table option container
 * @author Raphaël Mechali
 */
export class DownloadOrderFilesAsZipContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { ordersActions }) {
    return {
      fetchOrders: (pageIndex, pageSize) => dispatch(ordersActions.fetchPagedEntityList(pageIndex, pageSize, {}, {})),
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
    }
  }

  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state, { ordersSelectors }) {
    return {
      authentication: AuthenticationClient.authenticationSelectors.getAuthentication(state),
      pageMetadata: ordersSelectors.getMetaData(state),
    }
  }

  static propTypes = {
    // from table cell API
    entity: OrderShapes.OrderWithContent.isRequired,
    pageSize: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired, // used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // used in mapStateToProps
    // from mapStateToProps
    authentication: AuthenticateShape.isRequired,
    pageMetadata: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDispatchToProps
    throwError: PropTypes.func.isRequired,
    fetchOrders: PropTypes.func.isRequired,
  }

  canDownload = () => this.props.entity.links.some((link) => link.rel === 'download')

  /**
   * Refreshes table up to the current last page
   */
  refreshTable = () => {
    const { pageSize, pageMetadata, fetchOrders } = this.props
    const lastPage = (pageMetadata && pageMetadata.number) || 0
    fetchOrders(0, pageSize * (lastPage + 1))
  }

  render() {
    const {
      entity: { content: { id, waitingForUser = false, availableFilesCount = 0 } },
      authentication: { result: { access_token } }, throwError,
    } = this.props
    return (
      <DownloadOrderFilesAsZipComponent
        isWaitingUser={waitingForUser}
        canDownload={this.canDownload()}
        availableFilesCount={availableFilesCount}
        downloadZipURL={zipFileActions.getFileDownloadLink(id, access_token)}
        refreshTable={this.refreshTable}
        throwError={throwError}
      />
    )
  }
}

export default connect(DownloadOrderFilesAsZipContainer.mapStateToProps, DownloadOrderFilesAsZipContainer.mapDispatchToProps)(DownloadOrderFilesAsZipContainer)
