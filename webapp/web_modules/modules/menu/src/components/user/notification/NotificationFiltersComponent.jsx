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
import MenuItem from 'material-ui/MenuItem'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { UIShapes } from '@regardsoss/shape'
import { CommonDomain } from '@regardsoss/domain'
import {
  TableFilterSortingAndVisibilityContainer, FiltersPaneMainComponent,
  FilterPaneSelectField, FilterPaneDatePickerField,
} from '@regardsoss/components'
import { NOTIFICATION_FILTER_PARAMS } from '../../../domain/filters'
import { STATUS_ENUM } from '../../../domain/statusEnum'
import { LEVELS_ENUM } from '../../../domain/levelsEnum'

/**
 * Manage filters for notifications.
 * @author Théo Lasserre
 */
class NotificationFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [NOTIFICATION_FILTER_PARAMS.LEVELS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [NOTIFICATION_FILTER_PARAMS.CREATION_DATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
    [NOTIFICATION_FILTER_PARAMS.SENDERS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [NOTIFICATION_FILTER_PARAMS.STATUS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  }

  render() {
    const {
      inputValues, updateFilter, updateValuesFilter, updateDatesFilter, filtersI18n,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { notifications: { filters: { statusFieldStyle, levelFieldStyle, sendersFieldStyle } } } } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        inputValues={inputValues}
        updateValuesFilter={updateValuesFilter}
        updateDatesFilter={updateDatesFilter}
        filtersI18n={filtersI18n}
        style={{ display: 'flex' }}
      >
        <FilterPaneSelectField
          filterKey={NOTIFICATION_FILTER_PARAMS.LEVELS}
          title={formatMessage({ id: 'user.menu.notification.filters.levels.label' })}
          additionnalLineStyle={levelFieldStyle}
        >
          {map(LEVELS_ENUM, (level) => <MenuItem key={level} value={level} primaryText={formatMessage({ id: `user.menu.notification.filters.levels.${level}` })} />)}
        </FilterPaneSelectField>
        <FilterPaneDatePickerField
          filterKey={NOTIFICATION_FILTER_PARAMS.CREATION_DATE}
        />
        <FilterPaneSelectField
          filterKey={NOTIFICATION_FILTER_PARAMS.SENDERS}
          title={formatMessage({ id: 'user.menu.notification.filters.senders.label' })}
          additionnalLineStyle={sendersFieldStyle}
        >
          {map(STATIC_CONF.MSERVICES, (msservice) => <MenuItem key={msservice} value={msservice} primaryText={msservice} />)}
        </FilterPaneSelectField>
        <FilterPaneSelectField
          filterKey={NOTIFICATION_FILTER_PARAMS.STATUS}
          title={formatMessage({ id: 'user.menu.notification.filters.status.label' })}
          additionnalLineStyle={statusFieldStyle}
        >
          {map(STATUS_ENUM, (status) => <MenuItem key={status} value={status} primaryText={formatMessage({ id: `user.menu.notification.filters.status.${status}` })} />)}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}
export default NotificationFiltersComponent
