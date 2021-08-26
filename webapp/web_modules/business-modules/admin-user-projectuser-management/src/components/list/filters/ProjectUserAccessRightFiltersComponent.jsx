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
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import ClearFilter from 'mdi-material-ui/Backspace'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import ACCESS_RIGHT_FILTERS from '../../../domain/accessRightFilters'

/**
 * ProjectUserAccessRightFiltersComponent
 * @author Théo Lasserre
 */
class ProjectUserAccessRightFiltersComponent extends React.Component {
  static propTypes = {
    groups: DataManagementShapes.AccessGroupList.isRequired,

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
      updateFilter, clearFilters, filters, groups,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        usersList: {
          filters: {
            fieldMargin, mainDivStyle,
          },
        },
      },
    } = this.context
    return (
      <div style={mainDivStyle}>
        <div>
          <TableHeaderOptionsArea reducible alignLeft>
            <TableHeaderOptionGroup>
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.email' })}
                value={filters[ACCESS_RIGHT_FILTERS.EMAIL]}
                onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.EMAIL)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
                value={filters[ACCESS_RIGHT_FILTERS.LASTNAME]}
                onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.LASTNAME)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
                value={filters[ACCESS_RIGHT_FILTERS.FIRSTNAME]}
                onChange={(event, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.FIRSTNAME)}
                style={fieldMargin}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <SelectField
                id="projectUser.list.table.groups"
                value={filters[ACCESS_RIGHT_FILTERS.GROUP]}
                onChange={(event, index, value) => updateFilter(value, ACCESS_RIGHT_FILTERS.GROUP)}
              >
                <MenuItem key="any.option" value={undefined} primaryText={formatMessage({ id: 'projectUser.list.table.groups.label.any' })} />
                {map(groups, (group) => (
                  <MenuItem key={group.content.name} value={group.content.name} primaryText={group.content.name} />
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
export default ProjectUserAccessRightFiltersComponent
