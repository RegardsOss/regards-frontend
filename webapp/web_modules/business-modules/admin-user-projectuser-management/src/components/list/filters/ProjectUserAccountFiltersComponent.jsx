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
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import { MenuItem } from 'material-ui/IconMenu'
import { AdminDomain } from '@regardsoss/domain'
import { CommonShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  DatePickerField, withFiltersPane, TableFilterSortingAndVisibilityContainer,
  FiltersPaneMainComponent, FiltersPaneLineComponent,
} from '@regardsoss/components'
import ACCOUNT_FILTERS from '../../../domain/AccountFilters'

/**
 * @author Théo Lasserre
 */
export class ProjectUserAccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: CommonShapes.ServiceProviderList.isRequired,
    roleList: AdminShapes.RoleList.isRequired,
    updateFilter: PropTypes.func.isRequired,
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
    [ACCOUNT_FILTERS.CREATED_BEFORE]: null,
    [ACCOUNT_FILTERS.CREATED_AFTER]: null,
    [ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE]: null,
    [ACCOUNT_FILTERS.LAST_CONNECTION_AFTER]: null,
    [ACCOUNT_FILTERS.EMAIL]: '',
    [ACCOUNT_FILTERS.LASTNAME]: '',
    [ACCOUNT_FILTERS.FIRSTNAME]: '',
    [ACCOUNT_FILTERS.STATUS]: undefined,
    [ACCOUNT_FILTERS.ORIGIN]: undefined,
    [ACCOUNT_FILTERS.ROLE]: undefined,
  }

  getDateValue = (filterValue) => filterValue ? new Date(filterValue) : null

  getRolePrimaryText = (role) => {
    const { intl: { formatMessage } } = this.context
    let roleName = role.content.name
    const defaultRoleFound = find(AdminDomain.DEFAULT_ROLES_ENUM, (defaultRole) => defaultRole === roleName)
    if (defaultRoleFound) {
      roleName = formatMessage({ id: `projectUser.list.table.role.label.${roleName}` })
    }
    return roleName
  }

  render() {
    const {
      updateFilter, inputValues, origins, roleList,
    } = this.props
    const { intl: { locale, formatMessage } } = this.context
    return (
      <FiltersPaneMainComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.created.label' })}
        >
          <DatePickerField
            id={`filter.${ACCOUNT_FILTERS.CREATED_AFTER}`}
            dateHintText={formatMessage({ id: `projectUser.list.table.created.${ACCOUNT_FILTERS.CREATED_AFTER}.label` })}
            onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.CREATED_AFTER)}
            locale={locale}
            value={this.getDateValue(inputValues[ACCOUNT_FILTERS.CREATED_AFTER])}
            fullWidth
          />
          <DatePickerField
            id={`filter.${ACCOUNT_FILTERS.CREATED_BEFORE}`}
            dateHintText={formatMessage({ id: `projectUser.list.table.created.${ACCOUNT_FILTERS.CREATED_BEFORE}.label` })}
            onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.CREATED_BEFORE)}
            locale={locale}
            value={this.getDateValue(inputValues[ACCOUNT_FILTERS.CREATED_BEFORE])}
            defaultTime="23:59:59"
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.lastConnection.label' })}
        >
          <DatePickerField
            id={`filter.${ACCOUNT_FILTERS.LAST_CONNECTION_AFTER}`}
            dateHintText={formatMessage({ id: `projectUser.list.table.lastConnection.${ACCOUNT_FILTERS.LAST_CONNECTION_AFTER}.label` })}
            onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.LAST_CONNECTION_AFTER)}
            locale={locale}
            value={this.getDateValue(inputValues[ACCOUNT_FILTERS.LAST_CONNECTION_AFTER])}
            fullWidth
          />
          <DatePickerField
            id={`filter.${ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE}`}
            dateHintText={formatMessage({ id: `projectUser.list.table.lastConnection.${ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE}.label` })}
            onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE)}
            locale={locale}
            value={this.getDateValue(inputValues[ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE])}
            defaultTime="23:59:59"
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.email.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.email' })}
            value={inputValues[ACCOUNT_FILTERS.EMAIL]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.EMAIL, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.lastname.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
            value={inputValues[ACCOUNT_FILTERS.LASTNAME]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.LASTNAME, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.firstname.label' })}
        >
          <TextField
            hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
            value={inputValues[ACCOUNT_FILTERS.FIRSTNAME]}
            onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.FIRSTNAME, true)}
            fullWidth
          />
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.status.label' })}
        >
          <SelectField
            id="projectUser.list.table.status"
            value={inputValues[ACCOUNT_FILTERS.STATUS]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.STATUS)}
            fullWidth
          >
            <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.status.label.any' })} />
            {map(AdminDomain.PROJECT_USER_STATUS, (status) => (
              <MenuItem key={status} value={status} primaryText={formatMessage({ id: `projectUser.list.table.status.label.${status}` })} />
            ))}
          </SelectField>
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.origin.label' })}
        >
          <SelectField
            id="projectUser.list.table.origin"
            value={inputValues[ACCOUNT_FILTERS.ORIGIN]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ORIGIN)}
            fullWidth
          >
            <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.origin.label.any' })} />
            {map(origins, (origin) => (
              <MenuItem key={origin} value={origin.content.name} primaryText={origin.content.name} />
            ))}
          </SelectField>
        </FiltersPaneLineComponent>
        <FiltersPaneLineComponent
          label={formatMessage({ id: 'projectUser.list.table.role.label' })}
        >
          <SelectField
            id="projectUser.list.table.role"
            value={inputValues[ACCOUNT_FILTERS.ROLE]}
            onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ROLE)}
            fullWidth
          >
            <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.role.label.any' })} />
            {map(roleList, (role) => (
              <MenuItem key={role.content.name} value={role.content.name} primaryText={this.getRolePrimaryText(role)} />
            ))}
          </SelectField>
        </FiltersPaneLineComponent>
      </FiltersPaneMainComponent>
    )
  }
}
export default withFiltersPane(ProjectUserAccountFiltersComponent.DEFAULT_FILTERS_STATE)(ProjectUserAccountFiltersComponent)
