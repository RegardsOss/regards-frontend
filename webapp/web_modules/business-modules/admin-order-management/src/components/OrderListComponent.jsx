/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  Card, CardText,
} from 'material-ui/Card'
import { BasicPageableSelectors, BasicSelector, BasicListSelectors } from '@regardsoss/store-utils'
import { OrderClient, ProcessingClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardHeaderActions, TableFilterSortingAndVisibilityContainer, FiltersChipsContainer } from '@regardsoss/components'
import {
  ORDER_DISPLAY_MODES, OrderDisplayContainer, OrdersNavigationActions, OrdersNavigationContainer,
} from '@regardsoss/order-common'
import { CommonDomain } from '@regardsoss/domain'
import OrderListFiltersContainer from '../containers/OrderListFiltersContainer'
import { filtersActions, filtersSelectors } from '../clients/FiltersClient'
import { FILTERS_I18N } from '../domain/filters'

/**
* Component to display order list in project
* @author Raphaël Mechali
*/
class OrderListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    onRefresh: PropTypes.func.isRequired,
    // order request actions
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    // order request selectors
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    ordersNavigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired,
    ordersNavigationSelectors: PropTypes.instanceOf(BasicSelector).isRequired,
    orderFilesActions: PropTypes.instanceOf(OrderClient.OrderDatasetFilesActions),
    orderFilesSelectors: PropTypes.instanceOf(BasicPageableSelectors),
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    processingActions: PropTypes.instanceOf(ProcessingClient.ProcessingActions).isRequired,
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    currentRequestParameters: {},
    isPaneOpened: false,
  }

  handleFiltersPane = () => {
    this.setState({
      isPaneOpened: !this.state.isPaneOpened,
    })
  }

  updateRefreshParameters = (requestParameters) => {
    this.setState({
      currentRequestParameters: requestParameters,
    })
  }

  onRefresh = () => {
    const { onRefresh } = this.props
    const { currentRequestParameters } = this.state
    onRefresh(currentRequestParameters)
  }

  render() {
    const {
      backUrl, ordersActions, ordersSelectors, project,
      ordersNavigationActions, ordersNavigationSelectors, orderFilesActions,
      orderFilesSelectors, isProcessingDependenciesExist, processingActions,
      processingSelectors, pluginMetaDataSelectors,
    } = this.props
    const { isPaneOpened } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        orderList: {
          cardTextStyle, cardTitleStyle, filterButtonStyle,
        },
      },
    } = this.context
    return (
      <Card>
        <CardHeaderActions
          title={<OrdersNavigationContainer
            title={formatMessage({ id: 'order.management.list.title' })}
            rootIcon={null}
            navigationActions={ordersNavigationActions}
            navigationSelectors={ordersNavigationSelectors}
          />}
          subtitle={formatMessage({ id: 'order.management.list.subtitle' })}
          titleStyle={cardTitleStyle}
          mainButtonLabel={formatMessage({ id: 'order.management.list.refresh' })}
          mainButtonType="submit"
          mainButtonClick={this.onRefresh}
          secondaryButtonLabel={formatMessage({ id: 'order.management.list.filter' })}
          secondaryButtonClick={this.handleFiltersPane}
          secondaryButtonStyle={filterButtonStyle}
          thirdButtonLabel={formatMessage({ id: 'order.management.list.back' })}
          thirdButtonUrl={backUrl}
        />
        <CardText style={cardTextStyle}>
          <FiltersChipsContainer
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={FILTERS_I18N}
          />
          <TableFilterSortingAndVisibilityContainer
            pageActions={ordersActions}
            pageSelectors={ordersSelectors}
            updateRefreshParameters={this.updateRefreshParameters}
            filtersActions={filtersActions}
            filtersSelectors={filtersSelectors}
            filtersI18n={FILTERS_I18N}
          >
            <OrderListFiltersContainer
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
            />
            <OrderDisplayContainer
              key={CommonDomain.TableFilterComponentType.COMPONENT_TYPE.COMPONENT}
              project={project}
              ordersActions={ordersActions}
              ordersSelectors={ordersSelectors}
              displayMode={ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR}
              navigationActions={ordersNavigationActions}
              navigationSelectors={ordersNavigationSelectors}
              isProcessingDependenciesExist={isProcessingDependenciesExist}
              orderFilesActions={orderFilesActions}
              orderFilesSelectors={orderFilesSelectors}
              processingActions={processingActions}
              processingSelectors={processingSelectors}
              pluginMetaDataSelectors={pluginMetaDataSelectors}
            />

          </TableFilterSortingAndVisibilityContainer>
        </CardText>
      </Card>
    )
  }
}
export default OrderListComponent
