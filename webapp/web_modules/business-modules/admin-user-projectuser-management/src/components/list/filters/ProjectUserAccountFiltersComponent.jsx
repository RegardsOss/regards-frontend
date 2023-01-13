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
import find from 'lodash/find'
import { MenuItem } from 'material-ui/IconMenu'
import { AdminDomain } from '@regardsoss/domain'
import { CommonShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  withFiltersPane, TableFilterSortingAndVisibilityContainer, FilterPaneTextField,
  FiltersPaneMainComponent, FilterPaneDatePickerField,
  FilterPaneSelectField,
} from '@regardsoss/components'
import { FILTER_PARAMS, FILTERS_I18N } from '../../../domain/filters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: CommonShapes.ServiceProviderList.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    updateFilter: PropTypes.func.isRequired,
    updateDatesFilter: PropTypes.func.isRequired,
    updateValuesFilter: PropTypes.func.isRequired,
    inputValues: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
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
    [FILTER_PARAMS.CREATION_DATE]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [FILTER_PARAMS.LAST_CONNECTION]: TableFilterSortingAndVisibilityContainer.DEFAULT_DATES_RESTRICTION_STATE,
    [FILTER_PARAMS.EMAIL]: '',
    [FILTER_PARAMS.LASTNAME]: '',
    [FILTER_PARAMS.FIRSTNAME]: '',
    [FILTER_PARAMS.STATUS]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [FILTER_PARAMS.ORIGIN]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
    [FILTER_PARAMS.ROLE]: TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE,
  }

  getRolePrimaryText = (role) => {
    const { intl: { formatMessage } } = this.context
    let roleName = role.content.name
    const defaultRoleFound = find(AdminDomain.DEFAULT_ROLES_ENUM, (defaultRole) => defaultRole === roleName)
    if (defaultRoleFound) {
      roleName = formatMessage({ id: `projectUser.list.table.role.${roleName}` })
    }
    return roleName
  }

  render() {
    const {
      updateFilter, inputValues, origins, roleList, updateDatesFilter, updateValuesFilter,
    } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent
        filters18n={FILTERS_I18N}
        updateDatesFilter={updateDatesFilter}
        inputValues={inputValues}
        updateFilter={updateFilter}
        updateValuesFilter={updateValuesFilter}
      >
        <FilterPaneDatePickerField filterKey={FILTER_PARAMS.CREATION_DATE} />
        <FilterPaneDatePickerField filterKey={FILTER_PARAMS.LAST_CONNECTION} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.EMAIL} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.LASTNAME} />
        <FilterPaneTextField filterKey={FILTER_PARAMS.FIRSTNAME} />
        <FilterPaneSelectField filterKey={FILTER_PARAMS.STATUS}>
          {map(AdminDomain.PROJECT_USER_STATUS, (status) => (
            <MenuItem key={status} value={status} primaryText={formatMessage({ id: `projectUser.list.table.status.${status}` })} />
          ))}
        </FilterPaneSelectField>
        <FilterPaneSelectField filterKey={FILTER_PARAMS.ORIGIN}>
          {map(origins, (origin) => (
            <MenuItem key={origin} value={origin.content.name} primaryText={origin.content.name} />
          ))}
        </FilterPaneSelectField>
        <FilterPaneSelectField filterKey={FILTER_PARAMS.ROLE}>
          {map(roleList, (role) => (
            <MenuItem key={role.content.name} value={role.content.name} primaryText={this.getRolePrimaryText(role)} />
          ))}
        </FilterPaneSelectField>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProjectUserAccountFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserAccountFiltersComponent)
