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
import map from 'lodash/map'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import SelectField from 'material-ui/SelectField'
import ClearFilter from 'mdi-material-ui/Backspace'
import { CommonDomain, OrderDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableHeaderAutoCompleteFilter, TableHeaderLine, TableHeaderOptionsArea,
  TableFilterSortingAndVisibilityContainer, DatePickerField, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { REQUEST_FILTERS } from '../domain/requestFilters'
import { WAITING_FOR_USER_ENUM } from '../domain/waitingForUserFilterValues'

/**
* Order list filters component
* @author Raphaël Mechali
*/
class OrderListFiltersComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    matchingUsers: AccessShapes.ProjectUserList, // used in onPropertiesUpdated, current users list
    isInError: PropTypes.bool.isRequired, // is currently in error?
    isFetching: PropTypes.bool.isRequired, // is current fetching?
    onUpdateUsersFilter: PropTypes.func.isRequired, // user entered some key value, callback to update matching users list
    onUserFilterSelected: PropTypes.func.isRequired, // callback: user selected a user mail OR entered some text
    onUpdateWaitingForUserFilter: PropTypes.func.isRequired,

    // table sorting, column visiblity & filters management
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static EXCLUDED_ORDER_STATUS_FILTER = [OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD, OrderDomain.ORDER_STATUS_ENUM.UNKNOWN]

  prepareHints = ({ content: { email } }) => ({
    id: email, // the value that interests us here
    text: email, // text field output when a user is selected
    value: <MenuItem primaryText={email} />, // graphic render
  })

  render() {
    const {
      isFetching, isInError, matchingUsers,
      onUpdateUsersFilter, onUserFilterSelected, updateDatesFilter,
      clearFilters, filters, updateValuesFilter, onUpdateWaitingForUserFilter,
    } = this.props
    const {
      intl: { formatMessage, locale },
      moduleTheme: {
        orderList: {
          clearFilterButton, autoCompleteFilterStyle, selectFieldStyle,
        },
      },
    } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <DatePickerField
              id={`filter.${CommonDomain.REQUEST_PARAMETERS.AFTER}`}
              dateHintText={formatMessage({ id: 'order.list.filters.creationDate.after.label' })}
              onChange={(value) => updateDatesFilter(value.toISOString(), REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
              locale={locale}
              value={TableFilterSortingAndVisibilityContainer.getFilterDateValue(filters, REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
            />
            <DatePickerField
              id={`filter.${CommonDomain.REQUEST_PARAMETERS.BEFORE}`}
              dateHintText={formatMessage({ id: 'order.list.filters.creationDate.before.label' })}
              onChange={(value) => updateDatesFilter(value.toISOString(), REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
              locale={locale}
              value={TableFilterSortingAndVisibilityContainer.getFilterDateValue(filters, REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
              defaultTime="23:59:59"
            />
          </TableHeaderOptionGroup>
          <TableHeaderAutoCompleteFilter
            hintText={formatMessage({ id: 'order.list.filter.by.email.hint' })}
            text={filters[REQUEST_FILTERS.OWNER] || ''}
            currentHints={matchingUsers}
            isFetching={isFetching}
            noData={isInError}
            onUpdateInput={onUpdateUsersFilter}
            onFilterSelected={onUserFilterSelected}
            prepareHints={this.prepareHints}
            style={autoCompleteFilterStyle}
          />
          <SelectField
            id={`filter.${REQUEST_FILTERS.STATUSES}`}
            value={filters[REQUEST_FILTERS.STATUSES][CommonDomain.REQUEST_PARAMETERS.VALUES]}
            onChange={(event, index, value) => updateValuesFilter(value, REQUEST_FILTERS.STATUSES)}
            floatingLabelText={formatMessage({ id: 'order.list.filters.status.label.title' })}
            multiple
            style={selectFieldStyle}
          >
            {map(OrderDomain.ORDER_STATUS, (status) => {
              if (!includes(OrderListFiltersComponent.EXCLUDED_ORDER_STATUS_FILTER, status)) {
                return <MenuItem key={status} value={status} primaryText={formatMessage({ id: `order.list.filters.status.${status}` })} />
              }
              return null
            })}
          </SelectField>
          <SelectField
            id={`filter.${REQUEST_FILTERS.WAITING_FOR_USER}`}
            value={filters[REQUEST_FILTERS.WAITING_FOR_USER] || ''}
            onChange={(event, index, value) => onUpdateWaitingForUserFilter(value)}
            floatingLabelText={formatMessage({ id: 'order.list.filters.waiting.user.label' })}
            style={selectFieldStyle}
          >
            <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'order.list.filters.waiting.user.any' })} />
            {map(keys(WAITING_FOR_USER_ENUM), (waitingForUserKey) => (
              <MenuItem key={waitingForUserKey} value={WAITING_FOR_USER_ENUM[waitingForUserKey]} primaryText={formatMessage({ id: `order.list.filters.waiting.user.${WAITING_FOR_USER_ENUM[waitingForUserKey]}` })} />
            ))}
          </SelectField>
          <IconButton
            title={formatMessage({ id: 'order.list.clear.filter.tooltip' })}
            style={clearFilterButton.style}
            onClick={clearFilters}
          >
            <ClearFilter />
          </IconButton>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default OrderListFiltersComponent
