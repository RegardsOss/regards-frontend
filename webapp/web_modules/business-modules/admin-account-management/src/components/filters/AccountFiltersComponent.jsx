/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ClearFilter from 'mdi-material-ui/Backspace'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/IconMenu'
import { AdminInstanceDomain } from '@regardsoss/domain'
import { CommonShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import ACCOUNT_FILTERS from '../../domain/AccountFilters'

/**
 * @author Théo Lasserre
 */
class AccountFiltersComponent extends React.Component {
  static propTypes = {
    origins: CommonShapes.ServiceProviderList.isRequired,
    projects: AdminShapes.ProjectList.isRequired,

    // table sorting, column visiblity & filters management
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      origins, projects, updateFilter, clearFilters, filters,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        accounts: {
          filtersDiv, fieldStyle, fieldWidth,
        },
      },
    } = this.context
    return (
      <div style={filtersDiv}>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <TextField
              hintText={formatMessage({ id: 'account.list.table.filters.email' })}
              value={filters[ACCOUNT_FILTERS.EMAIL]}
              onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.EMAIL)}
              style={{ ...fieldStyle, ...fieldWidth }}
            />
            <TextField
              hintText={formatMessage({ id: 'account.list.table.filters.firstname' })}
              value={filters[ACCOUNT_FILTERS.FIRSTNAME]}
              onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.FIRSTNAME)}
              style={{ ...fieldStyle, ...fieldWidth }}
            />
            <TextField
              hintText={formatMessage({ id: 'account.list.table.filters.lastname' })}
              value={filters[ACCOUNT_FILTERS.LASTNAME]}
              onChange={(event, value) => updateFilter(value, ACCOUNT_FILTERS.LASTNAME)}
              style={fieldWidth}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <SelectField
              id="account.list.table.filters.status"
              value={filters[ACCOUNT_FILTERS.STATUS]}
              hintText={formatMessage({ id: 'account.list.table.filters.status' })}
              onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.STATUS)}
              style={{ ...fieldStyle, ...fieldWidth }}
            >
              <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.status.any' })} />
              {map(AdminInstanceDomain.ACCOUNT_STATUS_ENUM, (status) => (
                <MenuItem key={status} value={status} primaryText={formatMessage({ id: `account.list.table.filters.status.${status}` })} />
              ))}
            </SelectField>
            <SelectField
              id="account.list.table.filters.origin"
              value={filters[ACCOUNT_FILTERS.ORIGIN]}
              hintText={formatMessage({ id: 'account.list.table.filters.origin' })}
              onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.ORIGIN)}
              style={{ ...fieldStyle, ...fieldWidth }}
            >
              <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.origin.any' })} />
              {map(origins, (origin) => (
                <MenuItem key={origin} value={origin.content.name} primaryText={origin.content.name} />
              ))}
            </SelectField>
            <SelectField
              id="account.list.table.filters.projects"
              value={filters[ACCOUNT_FILTERS.PROJECTS]}
              hintText={formatMessage({ id: 'account.list.table.filters.projects' })}
              onChange={(event, index, value) => updateFilter(value, ACCOUNT_FILTERS.PROJECTS)}
              style={fieldWidth}
            >
              <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.projects.any' })} />
              {map(projects, (project) => (
                <MenuItem key={project} value={project.content.name} primaryText={project.content.name} />
              ))}
            </SelectField>
            <IconButton
              title={formatMessage({ id: 'account.list.table.filters.clear' })}
              onClick={clearFilters}
            >
              <ClearFilter />
            </IconButton>
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </div>
    )
  }
}
export default AccountFiltersComponent
