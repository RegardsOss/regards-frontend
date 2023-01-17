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
import { MenuItem } from 'material-ui/IconMenu'
import { WorkerDomain, CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { UIShapes } from '@regardsoss/shape'
import {
  TableFilterSortingAndVisibilityContainer, withFiltersPane,
  FiltersPaneMainComponent, FilterPaneSelectField,
  FilterPaneDatePickerField, FilterPaneTextFieldValues,
  FilterPaneTextField, FilterPaneAutoCompleteField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../clients/SearchSessionsClient'

/**
 * @author Théo Lasserre
 */
export class RequestFiltersComponent extends React.Component {
  static propTypes = {
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,

    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
 * Default form state used in filters pane
 */
  static DEFAULT_FILTERS_STATE = {
    [WorkerDomain.FILTER_PARAMS_ENUM.SOURCE]: '',
    [WorkerDomain.FILTER_PARAMS_ENUM.SESSION]: '',
    [WorkerDomain.FILTER_PARAMS_ENUM.WORKER_TYPE]: '',
    [WorkerDomain.FILTER_PARAMS_ENUM.CONTENT_TYPES]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [WorkerDomain.FILTER_PARAMS_ENUM.STATUSES]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
    [WorkerDomain.FILTER_PARAMS_ENUM.CREATION_DATE]: CommonDomain.TableFilterDefaultStateEnum.DATES,
  }

  render() {
    const {
      updateFilter, inputValues, updateDatesFilter, updateValuesFilter,
      filtersI18n,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        updateDatesFilter={updateDatesFilter}
        updateValuesFilter={updateValuesFilter}
        inputValues={inputValues}
        filtersI18n={filtersI18n}
      >
        <FilterPaneDatePickerField filterKey={WorkerDomain.FILTER_PARAMS_ENUM.CREATION_DATE} />
        <FilterPaneTextFieldValues filterKey={WorkerDomain.FILTER_PARAMS_ENUM.CONTENT_TYPES} />
        <FilterPaneTextField filterKey={WorkerDomain.FILTER_PARAMS_ENUM.WORKER_TYPE} />
        <FilterPaneAutoCompleteField
          filterKey={WorkerDomain.FILTER_PARAMS_ENUM.SOURCE}
          arrayActions={searchSourcesActions}
          arraySelectors={searchSourcesSelectors}
        />
        <FilterPaneAutoCompleteField
          filterKey={WorkerDomain.FILTER_PARAMS_ENUM.SESSION}
          arrayActions={searchSessionsActions}
          arraySelectors={searchSessionsSelectors}
        />
        <FilterPaneSelectField filterKey={WorkerDomain.FILTER_PARAMS_ENUM.STATUSES}>
          {map(WorkerDomain.REQUEST_STATUS, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `datapreparation.filters.statuses.${status}` })} />
          ))}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(RequestFiltersComponent.DEFAULT_FILTERS_STATE)(RequestFiltersComponent)
