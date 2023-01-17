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
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes, UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { CommonDomain } from '@regardsoss/domain'
import {
  withFiltersPane, TableFilterSortingAndVisibilityContainer,
  FiltersPaneMainComponent, FilterPaneSelectField, FilterPaneTextField,
} from '@regardsoss/components'
import { FILTER_PARAMS } from '../../../domain/filters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccessRightFiltersComponent extends React.Component {
  static propTypes = {
    groups: DataManagementShapes.AccessGroupList.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
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
    [FILTER_PARAMS.GROUP]: CommonDomain.TableFilterDefaultStateEnum.VALUES,
  }

  render() {
    const {
      updateFilter, inputValues, groups, updateValuesFilter, filtersI18n,
    } = this.props
    return (
      <FiltersPaneMainComponent
        filtersI18n={filtersI18n}
        updateFilter={updateFilter}
        inputValues={inputValues}
        updateValuesFilter={updateValuesFilter}
      >
        <FilterPaneTextField filterKey={FILTER_PARAMS.EMAIL} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.LASTNAME} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.FIRSTNAME} />
        <FilterPaneSelectField filterKey={FILTER_PARAMS.GROUP}>
          {map(groups, (group) => (
            <MenuItem key={group.content.name} value={group.content.name} primaryText={group.content.name} />
          ))}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProjectUserAccessRightFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserAccessRightFiltersComponent)
