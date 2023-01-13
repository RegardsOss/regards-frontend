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
import MenuItem from 'material-ui/MenuItem'
import { IngestDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  FilterPaneDatePickerField, FilterPaneAutoCompleteField, FilterPaneTextFieldValues,
  withFiltersPane, TableFilterSortingAndVisibilityContainer, FiltersPaneMainComponent, FilterPaneSelectField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'
import { FILTER_PARAMS, FILTERS_I18N } from '../domain/filters'

/**
  * Requests Feature manager filters component.
  * @author Théo Lasserre
  */
export class RequestsFeatureManagerFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Requests tab default form state used in filters pane
   */
  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.SOURCE]: '',
    [FILTER_PARAMS.SESSION]: '',
    [FILTER_PARAMS.PROVIDER_IDS]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [FILTER_PARAMS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [FILTER_PARAMS.REQUEST_ID_TYPE]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [FILTER_PARAMS.REQUEST_STATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      updateFilter, inputValues, updateValuesFilter, updateDatesFilter,
    } = this.props
    return (
      <FiltersPaneMainComponent
        filters18n={FILTERS_I18N}
        updateDatesFilter={updateDatesFilter}
        inputValues={inputValues}
        updateFilter={updateFilter}
        updateValuesFilter={updateValuesFilter}
      >
        <FilterPaneDatePickerField
          filterKey={FILTER_PARAMS.LAST_UPDATE}
          multiline
          displayTime
        />
        <FilterPaneAutoCompleteField
          filterKey={FILTER_PARAMS.SOURCE}
          arrayActions={searchSourcesActions}
          arraySelectors={searchSourcesSelectors}
        />
        <FilterPaneAutoCompleteField
          filterKey={FILTER_PARAMS.SESSION}
          arrayActions={searchSessionsActions}
          arraySelectors={searchSessionsSelectors}
        />
        <FilterPaneTextFieldValues
          filterKey={FILTER_PARAMS.PROVIDER_IDS}
          title={formatMessage({ id: 'oais.packages.tooltip.providerId' })}
        />
        <FilterPaneSelectField
          filterKey={FILTER_PARAMS.REQUEST_ID_TYPE}
          title={formatMessage({ id: 'oais.packages.tooltip.type' })}

        >
          {map(IngestDomain.AIP_REQUEST_TYPES, (type) => <MenuItem key={type} value={type} primaryText={formatMessage({ id: `oais.list.filters.requestIdType.${type}` })} />)}
        </FilterPaneSelectField>
        <FilterPaneSelectField
          filterKey={FILTER_PARAMS.REQUEST_STATE}
          title={formatMessage({ id: 'oais.packages.tooltip.type' })}
        >
          {map(IngestDomain.AIP_REQUEST_STATUS, (state) => <MenuItem key={state} value={state} primaryText={formatMessage({ id: `oais.list.filters.requestState.${state}` })} />)}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}

export default withFiltersPane(RequestsFeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE)(RequestsFeatureManagerFiltersComponent)
