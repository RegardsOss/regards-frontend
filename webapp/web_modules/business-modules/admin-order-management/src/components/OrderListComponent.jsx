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
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES, OrderDisplayContainer } from '@regardsoss/order-common'
import OrderListFiltersContainer from '../containers/OrderListFiltersContainer'

/**
* Component to display order list in project
* @author Raphaël Mechali
*/
class OrderListComponent extends React.Component {
  static propTypes = {
    // current order request parameters
    ordersRequestParameters: PropTypes.objectOf(PropTypes.string).isRequired,

    backUrl: PropTypes.string.isRequired,
    // order request actions
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    // order request selectors
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // callback: a new user (email) filter was selected
    onUserFilterSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      ordersRequestParameters, backUrl, ordersActions, ordersSelectors, onUserFilterSelected,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { orderList: { cardTextStyle } } } = this.context
    return (
      <Card>
        {/* title */}
        <CardTitle
          title={this.context.intl.formatMessage({ id: 'order.management.list.title' })}
          subtitle={this.context.intl.formatMessage({ id: 'order.management.list.subtitle' })}
        />
        <CardText style={cardTextStyle}>
          <OrderDisplayContainer
            ordersRequestParameters={ordersRequestParameters}
            ordersActions={ordersActions}
            ordersSelectors={ordersSelectors}
            displayMode={ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR}
          >
            <OrderListFiltersContainer onUserFilterSelected={onUserFilterSelected} />
          </OrderDisplayContainer>
        </CardText>
        <CardActions>
          <CardActionsComponent
            secondaryButtonLabel={formatMessage({ id: 'order.list.cancel.button' })}
            secondaryButtonUrl={backUrl}
          />
        </CardActions>
      </Card>
    )
  }
}
export default OrderListComponent
