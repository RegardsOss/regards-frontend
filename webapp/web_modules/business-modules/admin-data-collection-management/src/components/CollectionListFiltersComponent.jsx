/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { i18nContextType } from '@regardsoss/i18n'
import {
  TableHeaderLine,
  TableHeaderOptionGroup,
  TableHeaderOptionsArea,
} from '@regardsoss/components'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'

/**
 * Dataset list filters
 * @author Maxime Bouveron
 */
class CollectionListFiltersComponent extends React.Component {
  static propTypes = {
    onRefresh: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    filters: {
      label: '',
    },
  }

  changeDatasetFilter = (event, newValue) => {
    this.setState({ filters: { label: newValue } })
  }

  handleClearFilters = () => {
    this.setState(
      {
        filters: {
          label: '',
        },
      },
      () => this.props.onRefresh(this.state.filters),
    )
  }

  render() {
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <TextField
              hintText={this.context.intl.formatMessage({
                id: 'collection.table.filter.collection.label',
              })}
              value={this.state.filters.label}
              onChange={this.changeDatasetFilter}
            />
            <FlatButton
              label={this.context.intl.formatMessage({
                id: 'collection.table.filter.clear.button',
              })}
              icon={<Close />}
              onClick={this.handleClearFilters}
            />
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'collection.table.filter.button' })}
              icon={<Filter />}
              onClick={() => this.props.onRefresh(this.state.filters)}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default CollectionListFiltersComponent
