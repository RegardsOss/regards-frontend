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
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import { DamDomain, IngestDomain, CommonDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { UIShapes } from '@regardsoss/shape'
import {
  FilterPaneAutoCompleteField, withFiltersPane, TableFilterSortingAndVisibilityContainer, FiltersPaneMainComponent,
  FilterPaneDatePickerField, FilterPaneSelectFieldLegacy, FilterPaneTextFieldValues, FilterPaneSelectField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/SearchSessionsClient'
import { VERSION_OPTIONS } from '../../domain/versionOptions'
import { AIP_FILTER_PARAMS } from '../../domain/filters'

/**
 * AIP Feature manager filters component.
 * @author Théo Lasserre
 */
export class AIPFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    storages: PropTypes.arrayOf(PropTypes.string),
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * AIP tab default form state used in filters pane
   */
  static DEFAULT_FILTERS_STATE = {
    [AIP_FILTER_PARAMS.SOURCE]: '',
    [AIP_FILTER_PARAMS.SESSION]: '',
    [AIP_FILTER_PARAMS.PROVIDER_IDS]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [AIP_FILTER_PARAMS.LAST_UPDATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
    [AIP_FILTER_PARAMS.AIP_IP_TYPE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [AIP_FILTER_PARAMS.AIP_STATE]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [AIP_FILTER_PARAMS.STORAGES]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [AIP_FILTER_PARAMS.LAST]: null,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      updateFilter, inputValues, storages, updateValuesFilter, updateDatesFilter,
      filtersI18n,
    } = this.props
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        inputValues={inputValues}
        updateValuesFilter={updateValuesFilter}
        updateDatesFilter={updateDatesFilter}
        filtersI18n={filtersI18n}
      >
        <FilterPaneDatePickerField
          filterKey={AIP_FILTER_PARAMS.LAST_UPDATE}
          multiline
          displayTime
        />
        <FilterPaneAutoCompleteField
          filterKey={AIP_FILTER_PARAMS.SOURCE}
          arrayActions={searchSourcesActions}
          arraySelectors={searchSourcesSelectors}
        />
        <FilterPaneAutoCompleteField
          filterKey={AIP_FILTER_PARAMS.SESSION}
          arrayActions={searchSessionsActions}
          arraySelectors={searchSessionsSelectors}
        />
        <FilterPaneTextFieldValues
          filterKey={AIP_FILTER_PARAMS.PROVIDER_IDS}
          title={formatMessage({ id: 'oais.packages.tooltip.providerId' })}
          matchMode={CommonDomain.MATCH_MODE_ENUM.CONTAINS}
        />
        <FilterPaneSelectField
          filterKey={AIP_FILTER_PARAMS.AIP_IP_TYPE}
          title={formatMessage({ id: 'oais.packages.tooltip.type' })}
        >
          {map(DamDomain.ENTITY_TYPES, (type) => <MenuItem key={type} value={type} primaryText={formatMessage({ id: `oais.list.filters.aipIdType.${type}` })} />)}
        </FilterPaneSelectField>
        <FilterPaneSelectField
          filterKey={AIP_FILTER_PARAMS.AIP_STATE}
          title={formatMessage({ id: 'oais.packages.tooltip.state' })}
        >
          {map(IngestDomain.AIP_STATUS, (state) => <MenuItem key={state} value={state} primaryText={formatMessage({ id: `oais.list.filters.aipState.${state}` })} />)}
        </FilterPaneSelectField>
        <FilterPaneSelectField
          filterKey={AIP_FILTER_PARAMS.STORAGES}
          disabled={isEmpty(storages)}
          title={formatMessage({ id: 'oais.packages.tooltip.storage' })}
        >
          {map(storages, (storage) => <MenuItem key={storage} value={storage} primaryText={storage} />)}
        </FilterPaneSelectField>
        <FilterPaneSelectFieldLegacy
          filterKey={AIP_FILTER_PARAMS.LAST}
          allValuesOption
          title={formatMessage({ id: 'oais.packages.tooltip.version' })}
        >
          {map(VERSION_OPTIONS, (option) => <MenuItem key={option} value={option} primaryText={formatMessage({ id: `oais.list.filters.last.${option}` })} />)}
        </FilterPaneSelectFieldLegacy>
      </FiltersPaneMainComponent>
    )
  }
}

export default withFiltersPane(AIPFiltersComponent.DEFAULT_FILTERS_STATE)(AIPFiltersComponent)
