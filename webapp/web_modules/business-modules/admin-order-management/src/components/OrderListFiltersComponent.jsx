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
import map from 'lodash/map'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import { MenuItem } from 'material-ui/Menu'
import { OrderDomain, CommonDomain } from '@regardsoss/domain'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableFilterSortingAndVisibilityContainer, FilterPaneAutoCompleteFieldLegacy,
  withFiltersPane, FilterPaneSelectField, FiltersPaneMainComponent,
  FilterPaneSelectFieldLegacy, FilterPaneDatePickerField,
} from '@regardsoss/components'
import { FILTER_PARAMS } from '../domain/filters'
import { WAITING_FOR_USER_ENUM } from '../domain/waitingForUserFilterValues'

/**
* Order list filters component
* @author Théo Lasserre
*/
export class OrderListFiltersComponent extends React.Component {
  static propTypes = {
    matchingUsers: AccessShapes.ProjectUserList,
    isFetching: PropTypes.bool.isRequired,
    dispatchGetUsers: PropTypes.func.isRequired, // user entered some key value, callback to update matching users list
    updateFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.OWNER]: '',
    [FILTER_PARAMS.CREATION_DATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
    [FILTER_PARAMS.STATUSES]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [FILTER_PARAMS.WAITING_FOR_USER]: null,
  }

  static EXCLUDED_ORDER_STATUS_FILTER = [OrderDomain.ORDER_STATUS_ENUM.WAITING_USER_DOWNLOAD, OrderDomain.ORDER_STATUS_ENUM.UNKNOWN]

  static prepareHints({ content: { email } }) {
    return {
      id: email, // the value that interests us here
      text: email, // text field output when a user is selected
      value: <MenuItem primaryText={email} />, // graphic render
    }
  }

  /** Component default state (controls the auto complete filter state) */
  state = {
    isInError: false,
  }

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
    updateFilter(userEmail, FILTER_PARAMS.OWNER)
  }

  /**
   * Called by auto complete filter box
   */
   onUpdateUsersFilter = (newText = '') => {
     const { dispatchGetUsers, updateFilter } = this.props
     // update filter text
     updateFilter(newText, FILTER_PARAMS.OWNER, true)
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
      filtersI18n,
    } = this.props
    const { isInError } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        updateDatesFilter={updateDatesFilter}
        updateValuesFilter={updateValuesFilter}
        inputValues={inputValues}
        filtersI18n={filtersI18n}
      >
        <FilterPaneDatePickerField filterKey={FILTER_PARAMS.CREATION_DATE} />
        <FilterPaneAutoCompleteFieldLegacy
          filterKey={FILTER_PARAMS.OWNER}
          currentHints={matchingUsers}
          isFetching={isFetching}
          noData={isInError}
          onUpdateInput={this.onUpdateUsersFilter}
          onFilterSelected={this.onUserFilterSelected}
          prepareHints={OrderListFiltersComponent.prepareHints}
        />
        <FilterPaneSelectField filterKey={FILTER_PARAMS.STATUSES}>
          {map(OrderDomain.ORDER_STATUS, (status) => {
            if (!includes(OrderListFiltersComponent.EXCLUDED_ORDER_STATUS_FILTER, status)) {
              return <MenuItem key={status} value={status} primaryText={formatMessage({ id: `order.list.filters.statuses.${status}` })} />
            }
            return null
          })}
        </FilterPaneSelectField>
        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.WAITING_FOR_USER} allValuesOption>
          {map(keys(WAITING_FOR_USER_ENUM), (waitingForUserKey) => (
            <MenuItem key={waitingForUserKey} value={WAITING_FOR_USER_ENUM[waitingForUserKey]} primaryText={formatMessage({ id: `order.list.filters.waitingForUser.${WAITING_FOR_USER_ENUM[waitingForUserKey]}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(OrderListFiltersComponent.DEFAULT_FILTERS_STATE)(OrderListFiltersComponent)
