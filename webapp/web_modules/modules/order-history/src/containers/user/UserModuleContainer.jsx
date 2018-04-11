/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { UIDomain } from '@regardsoss/domain'
import { i18nSelectors } from '@regardsoss/i18n'
import OrderHistoryComponent from '../../components/user/OrderHistoryComponent'
import orderListClient from '../../client/OrderListClient'
import orderFilesClient from '../../client/OrderFilesClient'
import OrdersNavigationClient from '../../client/OrdersNavigationClient'

/**
 * User module container
 * @author Raphaël Mechali
 */
export class UserModuleContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state),
    }
  }

  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
  }

  render() {
    return (
      <OrderHistoryComponent
        ordersActions={orderListClient.orderListActions}
        ordersSelectors={orderListClient.orderListSelectors}
        orderFilesActions={orderFilesClient.orderFilesActions}
        orderFilesSelectors={orderFilesClient.orderFilesSelectors}
        navigationActions={OrdersNavigationClient.ordersNavigationActions}
        navigationSelectors={OrdersNavigationClient.ordersNavigationSelectors}
        defaultIconURL={UIDomain.getModuleDefaultIconURL(this.props.type)}
        {...this.props}
      />
    )
  }
}

export default connect(UserModuleContainer.mapStateToProps)(UserModuleContainer)
