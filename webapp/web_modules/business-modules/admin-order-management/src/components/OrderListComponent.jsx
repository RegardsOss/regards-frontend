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
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CardActionsComponent, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES, OrderDisplayContainer } from '@regardsoss/order-common'
import OrderListFiltersContainer from '../containers/OrderListFiltersContainer'
import { REQUEST_FILTERS } from '../domain/requestFilters'

/**
* Component to display order list in project
* @author Raphaël Mechali
*/
class OrderListComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    backUrl: PropTypes.string.isRequired,
    // order request actions
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    // order request selectors
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [REQUEST_FILTERS.OWNER]: '',
    [REQUEST_FILTERS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [REQUEST_FILTERS.STATUSES]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [REQUEST_FILTERS.WAITING_FOR_USER]: null,
  }

  render() {
    const {
      requestParameters, backUrl, ordersActions, ordersSelectors, project,
      filters, updateFilter, updateValuesFilter, updateDatesFilter, clearFilters,
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
            project={project}
            ordersRequestParameters={requestParameters}
            ordersActions={ordersActions}
            ordersSelectors={ordersSelectors}
            displayMode={ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR}
          >
            <OrderListFiltersContainer
              filters={filters}
              updateFilter={updateFilter}
              updateValuesFilter={updateValuesFilter}
              updateDatesFilter={updateDatesFilter}
              clearFilters={clearFilters}
            />
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
