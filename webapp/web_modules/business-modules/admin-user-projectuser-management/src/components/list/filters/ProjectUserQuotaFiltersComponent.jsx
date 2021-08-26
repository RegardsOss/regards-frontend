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
import ClearFilter from 'mdi-material-ui/Backspace'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import QUOTA_FILTERS from '../../../domain/quotaFilters'

/**
 * ProjectUserQuotaFiltersComponent
 * @author Théo Lasserre
 */
class ProjectUserQuotaFiltersComponent extends React.Component {
  static propTypes = {
    onToggleOnlyLowQuotaUsers: PropTypes.func.isRequired,
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
      updateFilter, clearFilters, filters, onToggleOnlyLowQuotaUsers,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        usersList: {
          filters: {
            fieldMargin, mainDivStyle, quotaDivStyle,
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
                value={filters[QUOTA_FILTERS.EMAIL]}
                onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.EMAIL)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.lastname' })}
                value={filters[QUOTA_FILTERS.LASTNAME]}
                onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.LASTNAME)}
                style={fieldMargin}
              />
              <TextField
                hintText={formatMessage({ id: 'projectUser.list.table.firstname' })}
                value={filters[QUOTA_FILTERS.FIRSTNAME]}
                onChange={(event, value) => updateFilter(value, QUOTA_FILTERS.FIRSTNAME)}
                style={fieldMargin}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <Checkbox
                checked={filters[QUOTA_FILTERS.QUOTA_LOW]}
                onCheck={() => onToggleOnlyLowQuotaUsers(!filters[QUOTA_FILTERS.QUOTA_LOW])}
                label={formatMessage({ id: 'projectUser.list.only.low.quota' })}
                style={quotaDivStyle}
              />
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
export default ProjectUserQuotaFiltersComponent
