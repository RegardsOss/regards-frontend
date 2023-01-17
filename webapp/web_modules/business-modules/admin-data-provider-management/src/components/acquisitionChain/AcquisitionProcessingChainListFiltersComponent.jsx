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
import {
  TableFilterSortingAndVisibilityContainer,
  withFiltersPane, FiltersPaneMainComponent,
  FilterPaneTextField, FilterPaneSelectFieldLegacy,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { UIShapes } from '@regardsoss/shape'
import { FILTER_PARAMS } from '../../domain/filters'
import { RUNNING_TYPES } from '../../domain/runningTypes'
import { MODE_TYPES } from '../../domain/modeTypes'

/**
* Component to display list filters
* @author Théo Lasserre
*/
export class AcquisitionProcessingChainListFiltersComponent extends React.Component {
  static propTypes = {
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.RUNNING]: null,
    [FILTER_PARAMS.MODE]: null,
    [FILTER_PARAMS.LABEL]: '',
  }

  render() {
    const { updateFilter, inputValues, filtersI18n } = this.props
    const {
      intl: { formatMessage },
    } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        inputValues={inputValues}
        filtersI18n={filtersI18n}
      >
        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.RUNNING} allValuesOption>
          {map(RUNNING_TYPES, (type) => (
            <MenuItem key={type} value={type} primaryText={formatMessage({ id: `acquisition-chain.list.filters.running.${type}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>

        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.MODE} allValuesOption>
          {map(MODE_TYPES, (type) => (
            <MenuItem key={type} value={type} primaryText={formatMessage({ id: `acquisition-chain.list.filters.mode.${type}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>
        <FilterPaneTextField filterKey={FILTER_PARAMS.LABEL} />
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(AcquisitionProcessingChainListFiltersComponent.DEFAULT_FILTERS_STATE)(AcquisitionProcessingChainListFiltersComponent)
