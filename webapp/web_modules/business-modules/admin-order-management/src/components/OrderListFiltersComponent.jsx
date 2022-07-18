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
import { MenuItem } from 'material-ui/Menu'
import SelectField from 'material-ui/SelectField'
import { CommonDomain, OrderDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableFilterSortingAndVisibilityContainer, DatePickerField,
  withFiltersPane, TableHeaderAutoCompleteFilter,
} from '@regardsoss/components'
import { REQUEST_FILTERS } from '../domain/requestFilters'
import { WAITING_FOR_USER_ENUM } from '../domain/waitingForUserFilterValues'

/**
* Order list filters component
* @author Raphaël Mechali
*/
class OrderListFiltersComponent extends React.Component {
  static propTypes = {
    matchingUsers: AccessShapes.ProjectUserList,
    isFetching: PropTypes.bool.isRequired,
    dispatchGetUsers: PropTypes.func.isRequired, // user entered some key value, callback to update matching users list
    updateFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [REQUEST_FILTERS.OWNER]: '',
    [REQUEST_FILTERS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [REQUEST_FILTERS.STATUSES]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [REQUEST_FILTERS.WAITING_FOR_USER]: null,
  }

  static EXCLUDED_ORDER_STATUS_FILTER = [OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD, OrderDomain.ORDER_STATUS_ENUM.UNKNOWN]

  /** Component default state (controls the auto complete filter state) */
  state = {
    isInError: false,
  }

  prepareHints = ({ content: { email } }) => ({
    id: email, // the value that interests us here
    text: email, // text field output when a user is selected
    value: <MenuItem primaryText={email} />, // graphic render
  })

  /**
 * Callback: the user selected a user mail or typed in some text
 * @param userEmail: user email or input text
 * @param isInUserList: true when the text match EXACTLY an existing user
 */
  onUserFilterSelected = (userEmail, isInUsersList) => {
    const { updateFilter } = this.props
    // A - Update text and error state
    this.setState({ isInError: !isInUsersList })
    // B - call parent handler (let the no data happen when no correct user is selected)
    updateFilter(userEmail, REQUEST_FILTERS.OWNER)
  }

  /**
   * Called by auto complete filter box
   */
   onUpdateUsersFilter = (newText = '') => {
     const { dispatchGetUsers, updateFilter } = this.props
     // update filter text
     updateFilter(newText, REQUEST_FILTERS.OWNER)
     // dipatch get users list for text (it will provide the new matching users list)
     dispatchGetUsers(newText)
   }

  /**
   * Callback: user cleared the user mail filter
   */
  onUserFilterCleared = () => this.onUserFilterSelected('', true) // empty user is considered part of the list

  render() {
    const {
      updateFilter, inputValues, updateDatesFilter, updateValuesFilter, matchingUsers, isFetching,
    } = this.props
    const { isInError } = this.state
    const {
      intl: { locale, formatMessage }, moduleTheme: { searchPane: { childrenStyles: { mainDivStyle, lineDivStyle, filterLabelStyle } } },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'order.list.filters.creationDate.label' })}
          </div>
          <DatePickerField
            id={`filter.${CommonDomain.REQUEST_PARAMETERS.AFTER}`}
            dateHintText={formatMessage({ id: 'order.list.filters.creationDate.after.label' })}
            onChange={(value) => updateDatesFilter(value.toISOString(), REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
            locale={locale}
            value={UIDomain.FiltersPaneHelper.getFilterDateValue(inputValues, REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.AFTER)}
            fullWidth
          />
          <DatePickerField
            id={`filter.${CommonDomain.REQUEST_PARAMETERS.BEFORE}`}
            dateHintText={formatMessage({ id: 'order.list.filters.creationDate.before.label' })}
            onChange={(value) => updateDatesFilter(value.toISOString(), REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
            locale={locale}
            value={UIDomain.FiltersPaneHelper.getFilterDateValue(inputValues, REQUEST_FILTERS.CREATION_DATE, CommonDomain.REQUEST_PARAMETERS.BEFORE)}
            defaultTime="23:59:59"
            fullWidth
          />
        </div>
        <div style={{ ...lineDivStyle, height: '56px', paddingTop: '10px' }}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'order.list.filter.by.email.label' })}
          </div>
          <TableHeaderAutoCompleteFilter
            hintText={formatMessage({ id: 'order.list.filter.by.email.hint' })}
            text={inputValues[REQUEST_FILTERS.OWNER] || ''}
            currentHints={matchingUsers}
            isFetching={isFetching}
            noData={isInError}
            onUpdateInput={this.onUpdateUsersFilter}
            onFilterSelected={this.onUserFilterSelected}
            prepareHints={this.prepareHints}
            fullWidth
          />
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'order.list.filters.status.label' })}
          </div>
          <SelectField
            id={`filter.${REQUEST_FILTERS.STATUSES}`}
            value={inputValues[REQUEST_FILTERS.STATUSES][CommonDomain.REQUEST_PARAMETERS.VALUES]}
            onChange={(event, index, value) => updateValuesFilter(value, REQUEST_FILTERS.STATUSES)}
            hintText={formatMessage({ id: 'order.list.filters.status.label.title' })}
            multiple
            fullWidth
          >
            {map(OrderDomain.ORDER_STATUS, (status) => {
              if (!includes(OrderListFiltersComponent.EXCLUDED_ORDER_STATUS_FILTER, status)) {
                return <MenuItem key={status} value={status} primaryText={formatMessage({ id: `order.list.filters.status.${status}` })} />
              }
              return null
            })}
          </SelectField>
        </div>
        <div style={lineDivStyle}>
          <div style={filterLabelStyle}>
            {formatMessage({ id: 'order.list.filters.waiting.user.label' })}
          </div>
          <SelectField
            id={`filter.${REQUEST_FILTERS.WAITING_FOR_USER}`}
            value={inputValues[REQUEST_FILTERS.WAITING_FOR_USER] || ''}
            onChange={(event, index, value) => updateFilter(value, REQUEST_FILTERS.WAITING_FOR_USER)}
            hintText={formatMessage({ id: 'order.list.filters.waiting.user.label.hint' })}
            fullWidth
          >
            <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'order.list.filters.waiting.user.any' })} />
            {map(keys(WAITING_FOR_USER_ENUM), (waitingForUserKey) => (
              <MenuItem key={waitingForUserKey} value={WAITING_FOR_USER_ENUM[waitingForUserKey]} primaryText={formatMessage({ id: `order.list.filters.waiting.user.${WAITING_FOR_USER_ENUM[waitingForUserKey]}` })} />
            ))}
          </SelectField>
        </div>
      </div>
    )
  }
}
export default withFiltersPane(OrderListFiltersComponent.DEFAULT_FILTERS_STATE)(OrderListFiltersComponent)
