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
import MenuItem from 'material-ui/MenuItem'
import { i18nContextType } from '@regardsoss/i18n'
import { FemDomain, CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import {
  FilterPaneDatePickerField, FilterPaneAutoCompleteField, FilterPaneTextFieldValues,
  withFiltersPane, FiltersPaneMainComponent, FilterPaneSelectField, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/SearchSessionsClient'

/**
  * Feature manager filters component.
  * @author Théo Lasserre
  */
export class RequestManagerFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateDatesFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      updateFilter, inputValues, updateDatesFilter, updateValuesFilter, filtersI18n,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        inputValues={inputValues}
        filtersI18n={filtersI18n}
        updateFilter={updateFilter}
        updateDatesFilter={updateDatesFilter}
        updateValuesFilter={updateValuesFilter}
      >
        <FilterPaneDatePickerField
          filterKey={FemDomain.REQUEST_FILTER_PARAMS.LAST_UPDATE}
          multiline
          displayTime
        />
        <FilterPaneAutoCompleteField
          filterKey={FemDomain.REQUEST_FILTER_PARAMS.SOURCE}
          arrayActions={searchSourcesActions}
          arraySelectors={searchSourcesSelectors}
        />
        <FilterPaneAutoCompleteField
          filterKey={FemDomain.REQUEST_FILTER_PARAMS.SESSION}
          arrayActions={searchSessionsActions}
          arraySelectors={searchSessionsSelectors}
        />
        <FilterPaneTextFieldValues filterKey={FemDomain.REQUEST_FILTER_PARAMS.PROVIDER_IDS} matchMode={CommonDomain.MATCH_MODE_ENUM.CONTAINS} />
        <FilterPaneSelectField filterKey={FemDomain.REQUEST_FILTER_PARAMS.STATE}>
          {FemDomain.REQUEST_STATUS.map((status) => <MenuItem key={status} value={status} primaryText={formatMessage({ id: `feature.list.filters.state.${status}` })} />)}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}

export default withFiltersPane(FemDomain.RequestFilters.buildDefault())(RequestManagerFiltersComponent)
