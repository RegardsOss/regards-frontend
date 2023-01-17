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
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { UIShapes } from '@regardsoss/shape'
import {
  withFiltersPane, TableFilterSortingAndVisibilityContainer,
  FiltersPaneMainComponent,
  FilterPaneTextField, FilterPaneCheckboxField,
} from '@regardsoss/components'
import { FILTER_PARAMS } from '../../../domain/filters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserQuotaFiltersComponent extends React.Component {
  static propTypes = {
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    uiSettings: UIShapes.UISettings.isRequired,
    filtersI18n: UIShapes.FiltersI18nList.isRequired,
    // other props are reported to withFiltersPane (open/close pane & updateRequestParameters)
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for inputValues edition
   */
  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.EMAIL]: '',
    [FILTER_PARAMS.LASTNAME]: '',
    [FILTER_PARAMS.FIRSTNAME]: '',
    [FILTER_PARAMS.USE_QUOTA_LIMITATION]: false,
  }

  render() {
    const {
      updateFilter, inputValues, uiSettings, filtersI18n,
    } = this.props
    return (
      <FiltersPaneMainComponent
        filtersI18n={filtersI18n}
        updateFilter={updateFilter}
        inputValues={inputValues}
      >
        <FilterPaneTextField filterKey={FILTER_PARAMS.EMAIL} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.LASTNAME} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.FIRSTNAME} />
        <FilterPaneCheckboxField filterKey={FILTER_PARAMS.USE_QUOTA_LIMITATION} uiValue={uiSettings.quotaWarningCount} />
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProjectUserQuotaFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserQuotaFiltersComponent)
