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
import ClearFilter from 'mdi-material-ui/Backspace'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/IconMenu'
import { AdminDomain } from '@regardsoss/domain'
import { CommonShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableFilterSortingAndVisibilityContainer, DatePickerField,
} from '@regardsoss/components'
import ACCOUNT_FILTERS from '../../../domain/AccountFilters'

/**
 * @author Théo Lasserre
 */
class ProjectUserAccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: CommonShapes.ServiceProviderList.isRequired,
    roleList: AdminShapes.RoleList.isRequired,

    // table sorting, column visiblity & filters management
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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
      origins, updateFilter, clearFilters, filters,
      roleList,
    } = this.props
    const {
      intl: { formatMessage, locale }, moduleTheme: {
        usersList: {
          filters: {
            dateFilterDiv, dateFilterLabel, dateFilterDivAlt, fieldMargin,
            mainDivStyle,
          },
        },
      },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <div style={dateFilterDivAlt}>
                <div style={dateFilterLabel}>
                  {formatMessage({ id: 'projectUser.list.table.created.label' })}
                </div>
                <DatePickerField
                  id={`filter.${ACCOUNT_FILTERS.CREATED_AFTER}`}
                  dateHintText={formatMessage({ id: `projectUser.list.table.created.${ACCOUNT_FILTERS.CREATED_AFTER}.label` })}
                  onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.CREATED_AFTER)}
                  locale={locale}
                  value={this.getDateValue(filters[ACCOUNT_FILTERS.CREATED_AFTER])}
                />
                <DatePickerField
                  id={`filter.${ACCOUNT_FILTERS.CREATED_BEFORE}`}
                  dateHintText={formatMessage({ id: `projectUser.list.table.created.${ACCOUNT_FILTERS.CREATED_BEFORE}.label` })}
                  onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.CREATED_BEFORE)}
                  locale={locale}
                  value={this.getDateValue(filters[ACCOUNT_FILTERS.CREATED_BEFORE])}
                  defaultTime="23:59:59"
                />
              </div>
              <div style={dateFilterDiv}>
                <div style={dateFilterLabel}>
                  {formatMessage({ id: 'projectUser.list.table.lastConnection.label' })}
                </div>
                <DatePickerField
                  id={`filter.${ACCOUNT_FILTERS.LAST_CONNECTION_AFTER}`}
                  dateHintText={formatMessage({ id: `projectUser.list.table.lastConnection.${ACCOUNT_FILTERS.LAST_CONNECTION_AFTER}.label` })}
                  onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.LAST_CONNECTION_AFTER)}
                  locale={locale}
                  value={this.getDateValue(filters[ACCOUNT_FILTERS.LAST_CONNECTION_AFTER])}
                />
                <DatePickerField
                  id={`filter.${ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE}`}
                  dateHintText={formatMessage({ id: `projectUser.list.table.lastConnection.${ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE}.label` })}
                  onChange={(value) => updateFilter(value ? value.toISOString() : '', ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE)}
                  locale={locale}
                  value={this.getDateValue(filters[ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE])}
                  defaultTime="23:59:59"
                />
              </div>
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.email' })}
                value={filters[ACCOUNT_FILTERS.EMAIL]}
                onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.EMAIL, true)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
                value={filters[ACCOUNT_FILTERS.LASTNAME]}
                onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.LASTNAME, true)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
                value={filters[ACCOUNT_FILTERS.FIRSTNAME]}
                onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.FIRSTNAME, true)}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <SelectField
                id="projectUser.list.table.status"
                value={filters[ACCOUNT_FILTERS.STATUS]}
                onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.STATUS)}
                style={fieldMargin}
              >
                <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.status.label.any' })} />
                {map(AdminDomain.PROJECT_USER_STATUS, (status) => (
                  <MenuItem key={status} value={status} primaryText={formatMessage({ id: `projectUser.list.table.status.label.${status}` })} />
                ))}
              </SelectField>
              <SelectField
                id="projectUser.list.table.origin"
                value={filters[ACCOUNT_FILTERS.ORIGIN]}
                onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ORIGIN)}
                style={fieldMargin}
              >
                <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.origin.label.any' })} />
                {map(origins, (origin) => (
                  <MenuItem key={origin} value={origin.content.name} primaryText={origin.content.name} />
                ))}
              </SelectField>
              <SelectField
                id="projectUser.list.table.role"
                value={filters[ACCOUNT_FILTERS.ROLE]}
                onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ROLE)}
              >
                <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.role.label.any' })} />
                {map(roleList, (role) => (
                  <MenuItem key={role.content.name} value={role.content.name} primaryText={this.getRolePrimaryText(role)} />
                ))}
              </SelectField>
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </div>
        <IconButton
          title={formatMessage({ id: 'projectUser.list.table.filters.clear' })}
          onClick={clearFilters}
        >
          <ClearFilter />
        </IconButton>
      </div>
    )
  }
}
export default ProjectUserAccountFiltersComponent
