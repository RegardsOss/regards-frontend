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
import { AdminInstanceDomain } from '@regardsoss/domain'
import { AdminShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableFilterSortingAndVisibilityContainer, withFiltersPane,
  FiltersPaneMainComponent, FilterPaneTextField, FilterPaneSelectFieldLegacy,
} from '@regardsoss/components'
import { FILTER_PARAMS } from '../../domain/filters'

/**
 * @author Théo Lasserre
 */
export class AccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: PropTypes.arrayOf(PropTypes.string),
    projects: AdminShapes.ProjectList.isRequired,
    updateFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
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
    [FILTER_PARAMS.EMAIL]: '',
    [FILTER_PARAMS.FIRSTNAME]: '',
    [FILTER_PARAMS.LASTNAME]: '',
    [FILTER_PARAMS.STATUS]: null,
    [FILTER_PARAMS.ORIGIN]: null,
    [FILTER_PARAMS.PROJECT]: null,
  }

  render() {
    const {
      origins, projects, updateFilter, inputValues, filtersI18n,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        updateFilter={updateFilter}
        inputValues={inputValues}
        filtersI18n={filtersI18n}
      >
        <FilterPaneTextField filterKey={FILTER_PARAMS.EMAIL} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.FIRSTNAME} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.LASTNAME} />
        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.STATUS} allValuesOption>
          {map(AdminInstanceDomain.ACCOUNT_STATUS_ENUM, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `account.list.table.filters.status.${status}` })} />
          ))}
        </FilterPaneSelectFieldLegacy>
        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.ORIGIN} allValuesOption>
          {map(origins, (origin) => (
            <MenuItem key={origin} value={origin} primaryText={origin} />
          ))}
        </FilterPaneSelectFieldLegacy>
        <FilterPaneSelectFieldLegacy filterKey={FILTER_PARAMS.PROJECT} allValuesOption>
          {map(projects, (project) => (
            <MenuItem key={project.content.name} value={project.content.name} primaryText={project.content.name} />
          ))}
        </FilterPaneSelectFieldLegacy>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(AccountFiltersComponent.DEFAULT_FILTERS_STATE)(AccountFiltersComponent)
