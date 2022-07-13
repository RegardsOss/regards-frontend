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
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { BasicPageableSelectors, BasicSelector, BasicListSelectors } from '@regardsoss/store-utils'
import { OrderClient, ProcessingClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import {
  ORDER_DISPLAY_MODES, OrderDisplayContainer, OrdersNavigationActions, OrdersNavigationContainer,
} from '@regardsoss/order-common'
import OrderListFiltersContainer from '../containers/OrderListFiltersContainer'

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

  onApplyRefreshRequestParameters = (requestParameters) => {
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
          cardTextStyle, cardTitleStyle, cardActionDivStyle, filterButtonStyle,
          headerDivStyle,
        },
      },
    } = this.context
    return (
      <Card>
        {/* title */}
        <div style={headerDivStyle}>
          <CardTitle
            title={<OrdersNavigationContainer
              title={formatMessage({ id: 'order.management.list.title' })}
              rootIcon={null}
              navigationActions={ordersNavigationActions}
              navigationSelectors={ordersNavigationSelectors}
            />}
            subtitle={formatMessage({ id: 'order.management.list.subtitle' })}
            titleStyle={cardTitleStyle}
          />
          <CardActions style={cardActionDivStyle}>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'order.management.list.refresh' })}
              mainButtonType="submit"
              mainButtonClick={this.onRefresh}
              secondaryButtonLabel={formatMessage({ id: 'order.management.list.back' })}
              secondaryButtonUrl={backUrl}
            />
            <RaisedButton
              onClick={this.handleFiltersPane}
              label={formatMessage({ id: 'order.management.list.filter' })}
              secondary
              style={filterButtonStyle}
            />
          </CardActions>
        </div>
        <CardText style={cardTextStyle}>
          <TableFilterSortingAndVisibilityContainer
            pageActions={ordersActions}
            pageSelectors={ordersSelectors}
            onApplyRefreshRequestParameters={this.onApplyRefreshRequestParameters}
          >
            <OrderListFiltersContainer
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.FILTER}
              isPaneOpened={isPaneOpened}
              onCloseFiltersPane={this.handleFiltersPane}
            />
            <OrderDisplayContainer
              key={TableFilterSortingAndVisibilityContainer.COMPONENT_TYPE.COMPONENT}
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
