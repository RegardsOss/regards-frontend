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
import isEmpty from 'lodash/isEmpty'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import OrderComponent from './options/OrderComponent'
import ClearCartComponent from './options/ClearCartComponent'
import OrderCartTableComponent from './OrderCartTableComponent'

/**
 * Order cart content component
 * @author Raphaël Mechali
 */
class OrderCartComponent extends React.Component {

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    basket: OrderShapes.Basket,
    isFetching: PropTypes.bool.isRequired,
    onClearCart: PropTypes.func.isRequired,
    onOrder: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { isAuthenticated, basket, isFetching, onClearCart, onOrder } = this.props
    const { intl: { formatMessage }, moduleTheme: { user } } = this.context

    const emptyBasket = isEmpty(basket) || isEmpty(basket.datasetSelections)

    // compute current no content data
    const isNoContent = (!isAuthenticated || emptyBasket) && !isFetching
    const noContentTitleKey = !isAuthenticated ? 'order-cart.module.not.logged.title' : 'order-cart.module.empty.basket.title'
    const noContentMesageKey = !isAuthenticated ? 'order-cart.module.not.logged.messsage' : 'order-cart.module.empty.basket.messsage'
    const NoContentIconConstructor = !isAuthenticated ? NotLoggedIcon : CartIcon

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
            <OrderComponent empty={isNoContent} onOrder={onOrder} />
            <ToolbarSeparator style={user.header.options.separator.styles} />
            <ClearCartComponent empty={isNoContent} onClearCart={onClearCart} />
          </ToolbarGroup>
        </Toolbar>
        {/* 2 - Card content */}
        <CardMedia >
          <div style={user.content.styles}>
            {/* 2.a - Empty basket display */}
            <NoContentMessageInfo
              noContent={isNoContent}
              title={formatMessage({ id: noContentTitleKey })}
              message={formatMessage({ id: noContentMesageKey })}
              Icon={NoContentIconConstructor}
            >
              {/* 2.b - content  */}
              <OrderCartTableComponent basket={basket} />
              {/* 2.c - loading (content is not inside, as we need the table to not be
              unmounted. Indeed the table uses previous props to restore the rows expanded state  */}
              <LoadableContentDisplayDecorator isLoading={isFetching} />
            </NoContentMessageInfo>
          </div>
        </CardMedia>
      </Card >
    )
  }

}
export default OrderCartComponent
