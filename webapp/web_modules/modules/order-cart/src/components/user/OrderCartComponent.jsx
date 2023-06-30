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
import isEmpty from 'lodash/isEmpty'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CartIcon from 'mdi-material-ui/Cart'
import NotLoggedIcon from 'mdi-material-ui/Lock'
import { AccessShapes, OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { BasicListSelectors, BasicSignalActions } from '@regardsoss/store-utils'
import { DynamicModulePane, NoContentMessageInfo } from '@regardsoss/components'
import { dependencies } from '../../user-dependencies'
import SelectionItemDetailContainer from '../../containers/user/detail/SelectionItemDetailContainer'
import OrderComponent from './options/OrderComponent'
import ClearCartComponent from './options/ClearCartComponent'
import OrderCartTableComponent from './OrderCartTableComponent'

/**
 * Order cart content component
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class OrderCartComponent extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,

    basket: OrderShapes.Basket,
    refreshBasket: PropTypes.func.isRequired,
    showDatasets: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    onClearCart: PropTypes.func.isRequired,
    onOrder: PropTypes.func.isRequired,
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
    isFileFilterDependenciesExist: PropTypes.bool.isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    linkProcessingDatasetActions: PropTypes.instanceOf(BasicSignalActions).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Initial component state */
  state = {
    showMessage: false,
    totalObjectsCount: 0,
    effectiveObjectsCount: 0,
  }

  /**
   * Callback: show duplicated message
   */
  onShowDuplicatedMessage = (totalObjectsCount, effectiveObjectsCount) => this.setState({ totalObjectsCount, effectiveObjectsCount, showMessage: true })

  /**
   * Callback: show duplicated message
   */
  onHideDuplicatedMessage = () => this.setState({ totalObjectsCount: 0, effectiveObjectsCount: 0, showMessage: false })

  /**
   * Renders module options
   * @param {function} onClearCart on clear cart callback
   * @param {function} onOrder on order callback
   * @param {boolean} isFetching is fetching?
   * @param {boolean} isNoContent is no content?
   * @return [React.Element] options list
   */
  renderOptions = (onClearCart, onOrder, isFetching, isNoContent) => [
    <OrderComponent
      key="options.order"
      isFetching={isFetching}
      empty={isNoContent}
      onOrder={onOrder}
    />,
    <ClearCartComponent
      key="options.clear.cart"
      isFetching={isFetching}
      empty={isNoContent}
      onClearCart={onClearCart}
    />,
  ]

  render() {
    const {
      isAuthenticated, basket, isFetching, onClearCart, onOrder, showDatasets, isProcessingDependenciesExist,
      processingSelectors, pluginMetaDataSelectors, linkProcessingDatasetActions, refreshBasket,
      isFileFilterDependenciesExist,
      ...moduleProperties
    } = this.props
    const { totalObjectsCount, effectiveObjectsCount, showMessage } = this.state
    const { intl: { formatMessage }, moduleTheme: { user: { root } } } = this.context

    const emptyBasket = isEmpty(basket) || isEmpty(basket.datasetSelections)

    // compute current no content data
    const isNoContent = (!isAuthenticated || emptyBasket) && !isFetching
    const noContentTitleKey = !isAuthenticated ? 'order-cart.module.not.logged.title' : 'order-cart.module.empty.basket.title'
    const noContentMesageKey = !isAuthenticated ? 'order-cart.module.not.logged.message' : 'order-cart.module.empty.basket.message'
    const NoContentIconConstructor = !isAuthenticated ? NotLoggedIcon : CartIcon

    return (
      <div style={root}>
        <DynamicModulePane
          options={this.renderOptions(onClearCart, onOrder, isFetching, isNoContent)}
          requiresAuthentication
          requiredDependencies={dependencies}
          {...moduleProperties}
        >
          {/* 1.a - Empty basket display */}
          <NoContentMessageInfo
            noContent={isNoContent}
            titleKey={noContentTitleKey}
            messageKey={noContentMesageKey}
            Icon={NoContentIconConstructor}
          >
            {/* 1.b - content  */}
            <OrderCartTableComponent
              isFetching={isFetching}
              basket={basket}
              refreshBasket={refreshBasket}
              showDatasets={showDatasets}
              onShowDuplicatedMessage={this.onShowDuplicatedMessage}
              isProcessingDependenciesExist={isProcessingDependenciesExist}
              processingSelectors={processingSelectors}
              pluginMetaDataSelectors={pluginMetaDataSelectors}
              linkProcessingDatasetActions={linkProcessingDatasetActions}
              isFileFilterDependenciesExist={isFileFilterDependenciesExist}
            />
          </NoContentMessageInfo>
        </DynamicModulePane>
        { /* 2 - Add dialog component for size informations messages (avoid creating dialogs in table) */}
        <Dialog
          open={showMessage}
          title={formatMessage({ id: 'order-cart.module.duplicate.objects.message.title' })}
          onRequestClose={this.onHideDuplicatedMessage}
          actions={
            <FlatButton
              key="close.button"
              label={formatMessage({ id: 'order-cart.module.duplicate.objects.message.close' })}
              onClick={this.onHideDuplicatedMessage}
            />
          }
        >
          {
            formatMessage({ id: 'order-cart.module.duplicate.objects.message' }, {
              totalObjectsCount,
              duplicatedObjectsCount: totalObjectsCount - effectiveObjectsCount,
              effectiveObjectsCount,
            })
          }
        </Dialog>
        {/* 2 - Add detail dialog */}
        <SelectionItemDetailContainer showDatasets={showDatasets} />
      </div>
    )
  }
}
export default OrderCartComponent
