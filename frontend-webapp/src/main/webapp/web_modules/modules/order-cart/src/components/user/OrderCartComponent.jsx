/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import ClearBasketIcon from 'material-ui/svg-icons/action/delete'
import OrderIcon from 'material-ui/svg-icons/action/play-for-work'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { withConfirmDialog } from '@regardsoss/components'
import OrderCartTableComponent from './OrderCartTableComponent'

// TODO very temporary

const WithConfirmationButton = withConfirmDialog(FlatButton)

/**
 * Order cart content component
 * @author Raphaël Mechali
 */
class OrderCartComponent extends React.Component {

  static propTypes = {
    basket: OrderShapes.Basket,
    hasError: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onClearBasket: PropTypes.func.isRequired,
    onOrder: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { basket, hasError, isFetching, onClearBasket, onOrder } = this.props

    // TODO 1: empty basket: ni clear ni order (disabled)
    // TODO 2: tester clear et order

    const { intl: { formatMessage }, moduleTheme: { user } } = this.context
    return (
      <Card style={user.styles}>
        {/* 1 - Card title */}
        {/* 1.a - Title and subtitles */}
        <Toolbar style={user.header.styles}>
          <ToolbarGroup firstChild style={user.header.firstToolbarGroup.styles}>
            <CardTitle
              style={user.header.cardTitle.styles}
              titleStyle={user.header.cardTitle.titleStyles}
              title={formatMessage({ id: 'order-cart.module.title' })}
              subtitle={formatMessage({ id: 'order-cart.module.subtitle' })}
            />
          </ToolbarGroup>
          {/* 1.b - Clear basket */}
          {/* 1.c - order */}
          <ToolbarGroup lastChild>
            <WithConfirmationButton
              onTouchTap={onOrder} // confirmation properties
              dialogTitle={formatMessage({ id: 'order-cart.module.order.confirmation.title' })}
              dialogMessage={formatMessage({ id: 'order-cart.module.order.confirmation.message' })}

              label={formatMessage({ id: 'order-cart.module.order.label' })} // button properties
              title={formatMessage({ id: 'order-cart.module.order.tooltip' })}
              icon={<OrderIcon />}
              style={user.header.options.styles}
            />
            <ToolbarSeparator style={user.header.options.separator.styles} />
            <WithConfirmationButton
              onTouchTap={onClearBasket} // confirmation properties
              dialogTitle={formatMessage({ id: 'order-cart.module.clear.confirmation.title' })}
              dialogMessage={formatMessage({ id: 'order-cart.module.clear.confirmation.message' })}

              label={formatMessage({ id: 'order-cart.module.clear.label' })} // button properties
              title={formatMessage({ id: 'order-cart.module.clear.tooltip' })}
              icon={<ClearBasketIcon />}
              style={user.header.options.styles}
            />
          </ToolbarGroup>
        </Toolbar>
        {/* 2 - Card content */}
        <CardMedia >
          <div style={user.content.styles}>
            {/* 2.a - Error / empty display */}
            {/* 2.b - loading or content display */}
            {/* TODO  */}
            <OrderCartTableComponent basket={basket} />
          </div>
        </CardMedia>
      </Card>
    )
  }

}
export default OrderCartComponent
