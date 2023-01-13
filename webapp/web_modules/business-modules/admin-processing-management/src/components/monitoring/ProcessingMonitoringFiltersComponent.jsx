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
  withFiltersPane,
  FiltersPaneMainComponent,
  TableFilterSortingAndVisibilityContainer,
  FilterPaneDatePickerField,
  FilterPaneTextField,
  FilterPaneSelectFieldLegacy,
  FilterPaneSelectField,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ProcessingDomain } from '@regardsoss/domain'
import get from 'lodash/get'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { ProcessingShapes } from '@regardsoss/shape'
import { FILTER_PARAMS, FILTERS_I18N } from '../../domain/filters'

/**
 * Monitoring processing list filters
 * @author Théo Lasserre
 */
export class ProcessingMonitoringFiltersComponent extends React.Component {
  static propTypes = {
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    processingList: ProcessingShapes.ProcessingList.isRequired,

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
    [FILTER_PARAMS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [FILTER_PARAMS.USERNAME]: '',
    [FILTER_PARAMS.PROCESS_BID]: null,
    [FILTER_PARAMS.STATUS]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const {
      processingList, updateFilter, inputValues, updateValuesFilter, updateDatesFilter,
    } = this.props
    return (
      <FiltersPaneMainComponent
        filters18n={FILTERS_I18N}
        updateDatesFilter={updateDatesFilter}
        inputValues={inputValues}
        updateFilter={updateFilter}
        updateValuesFilter={updateValuesFilter}
      >
        <FilterPaneDatePickerField filterKey={FILTER_PARAMS.CREATION_DATE} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.USERNAME} />
        <FilterPaneSelectFieldLegacy
          filterKey={FILTER_PARAMS.PROCESS_BID}
          allValuesOption
        >
          {map(processingList, (process) => (
            <MenuItem key={get(process, 'content.pluginConfiguration.label')} value={get(process, 'content.pluginConfiguration.businessId')} primaryText={get(process, 'content.pluginConfiguration.label')} />
          ))}
        </FilterPaneSelectFieldLegacy>
        <FilterPaneSelectField filterKey={FILTER_PARAMS.STATUS}>
          {map(ProcessingDomain.PROCESS_STATUS_TYPES, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `processing.monitoring.filters.status.${status}` })} />
          ))}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)(ProcessingMonitoringFiltersComponent)
