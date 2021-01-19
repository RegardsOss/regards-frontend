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

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import get from 'lodash/get'
import {
  TableHeaderLine,
  TableHeaderOptionGroup,
  TableHeaderOptionsArea,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Access Rights list filters
 * @author Maxime Bouveron
 */
class AccessRightListFiltersComponent extends React.Component {
  static propTypes = {
    onFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    filters: {},
  }

  changeDatasetFilter = (event, newValue) => {
    const filters = {
      ...this.state.filters,
      datasetLabel: newValue,
    }
    this.setState({ filters })
  }

  handleClearFilters = () => {
    const clearedFilters = {}
    this.setState({
      filters: clearedFilters,
    }, () => this.props.onFilter(this.state.filters))
  }

  /** On filter applied callback */
  onFilter = () => {
    const { onFilter } = this.props
    const { filters } = this.state
    onFilter(filters)
  }

  render() {
    const { intl, moduleTheme: { filter } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <TextField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({ id: 'accessright.table.filter.dataset.label' })}
              value={get(this.state, 'filters.datasetLabel', '')}
              onChange={this.changeDatasetFilter}
            />
            <FlatButton
              label={intl.formatMessage({
                id: 'accessright.table.filter.clear.button',
              })}
              icon={<Close />}
              disabled={!get(this.state, 'filters.datasetLabel', undefined)}
              onClick={this.handleClearFilters}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'accessright.table.filter.button' })}
              icon={<Filter />}
              onClick={this.onFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default AccessRightListFiltersComponent
