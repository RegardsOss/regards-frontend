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
import CartIcon from 'material-ui/svg-icons/action/shopping-cart'
import NotLoggedIcon from 'material-ui/svg-icons/action/lock'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModule, ModuleTitle, NoContentMessageInfo } from '@regardsoss/components'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { dependencies } from '../../user-dependencies'
import OrderComponent from './options/OrderComponent'
import ClearCartComponent from './options/ClearCartComponent'
import OrderCartTableComponent from './OrderCartTableComponent'

/**
 * Order cart content component
 * @author Raphaël Mechali
 */
class OrderCartComponent extends React.Component {
  static propTypes = {
    basket: OrderShapes.Basket,
    showDatasets: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    onClearCart: PropTypes.func.isRequired,
    onOrder: PropTypes.func.isRequired,
    // expanded state management
    expanded: PropTypes.bool.isRequired,
    onExpandChange: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Renders module options
   * @return [React.Element] options list
   */
  renderOptions = (isNoContent) => {
    const { onClearCart, onOrder } = this.props
    return [
      <OrderComponent key="options.order" empty={isNoContent} onOrder={onOrder} />,
      <ClearCartComponent key="options.clear.cart" empty={isNoContent} onClearCart={onClearCart} />,
    ]
  }

  render() {
    const {
      isAuthenticated, basket, isFetching, onExpandChange, expanded, showDatasets,
    } = this.props
    const { intl: { formatMessage } } = this.context

    const emptyBasket = isEmpty(basket) || isEmpty(basket.datasetSelections)

    // compute current no content data
    const isNoContent = (!isAuthenticated || emptyBasket) && !isFetching
    const noContentTitleKey = !isAuthenticated ? 'order-cart.module.not.logged.title' : 'order-cart.module.empty.basket.title'
    const noContentMesageKey = !isAuthenticated ? 'order-cart.module.not.logged.messsage' : 'order-cart.module.empty.basket.messsage'
    const NoContentIconConstructor = !isAuthenticated ? NotLoggedIcon : CartIcon

    return (
      <DynamicModule
        title={<ModuleTitle IconConstructor={CartIcon} text={formatMessage({ id: 'order-cart.module.title' })} />}
        onExpandChange={onExpandChange}
        expanded={expanded}
        options={this.renderOptions(isNoContent)}
        requiresAuthentication
        requiredDependencies={dependencies}
      >
        <div>
          {/* 2.a - Empty basket display */}
          <NoContentMessageInfo
            noContent={isNoContent}
            title={formatMessage({ id: noContentTitleKey })}
            message={formatMessage({ id: noContentMesageKey })}
            Icon={NoContentIconConstructor}
          >
            {/* 2.b - content  */}
            <OrderCartTableComponent basket={basket} showDatasets={showDatasets} />
            {/* 2.c - loading (content is not inside, as we need the table to not be
              unmounted. Indeed the table uses previous props to restore the rows expanded state  */}
            <LoadableContentDisplayDecorator isLoading={isFetching} />
          </NoContentMessageInfo>
        </div>
      </DynamicModule>
    )
  }
}
export default OrderCartComponent
