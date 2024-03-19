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
import { i18nContextType } from '@regardsoss/i18n'
import { AdminDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { UIShapes } from '@regardsoss/shape'
import {
  Title,
  withFiltersPane,
  TableFilterSortingAndVisibilityContainer,
  FiltersPaneMainComponent,
  FilterPaneAutoCompleteField,
  FilterPaneSelectFieldLegacy,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import { STATUS_TYPES } from '../domain/statusTypes'

/**
 * @author Théo Lasserre
 */
export class DashboardFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    // eslint-disable-next-line react/no-unused-prop-types
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,

    // eslint-disable-next-line react/no-unused-prop-types
    updateRequestParameters: PropTypes.func.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = AdminDomain.DashboardFilters.buildDefault()

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  static onPropertiesUpdated(oldProps, newProps) {
    const { requestParameters, updateRequestParameters } = newProps
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (oldProps.requestParameters !== requestParameters) {
      updateRequestParameters(requestParameters)
    }
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    return DashboardFiltersComponent.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    return DashboardFiltersComponent.onPropertiesUpdated(this.props, nextProps)
  }

  render() {
    const {
      updateFilter, inputValues, filtersI18n,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        inputValues={inputValues}
        filtersI18n={filtersI18n}
      >
        <Title
          level={3}
          label={formatMessage({ id: 'dashboard.sources.title' })}
        />
        <FilterPaneAutoCompleteField
          filterKey={AdminDomain.SOURCE_FILTER_PARAMS.NAME}
          arrayActions={searchSourcesActions}
          arraySelectors={searchSourcesSelectors}
        />
        <FilterPaneSelectFieldLegacy filterKey={AdminDomain.SOURCE_FILTER_PARAMS.STATUS} allValuesOption>
          {map(STATUS_TYPES, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.filter.sourceState.${status}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>
        <Title
          level={3}
          label={formatMessage({ id: 'dashboard.sessions.title' })}
        />
        <FilterPaneAutoCompleteField
          filterKey={AdminDomain.SESSION_FILTER_PARAMS.NAME}
          arrayActions={searchSessionsActions}
          arraySelectors={searchSessionsSelectors}
        />
        <FilterPaneSelectFieldLegacy filterKey={AdminDomain.SESSION_FILTER_PARAMS.STATUS} allValuesOption>
          {map(STATUS_TYPES, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `dashboard.filter.sessionState.${status}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>
      </FiltersPaneMainComponent>)
  }
}
export default withFiltersPane(DashboardFiltersComponent.DEFAULT_FILTERS_STATE)(DashboardFiltersComponent)
