/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import {
  TableHeaderOptionsArea,
  TableHeaderLine,
  TableHeaderOptionGroup,
} from '@regardsoss/components'
import TextField from 'material-ui/TextField/TextField'
import FlatButton from 'material-ui/FlatButton/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'

/**
 * Processing list filters
 * @author Théo Lasserre
 */
class ProcessingListFiltersComponent extends React.Component {
  static propTypes = {
    onRefresh: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    filters: {
      processName: '',
    },
  }

  changeProcessingFilter = (event, newValue) => {
    this.setState({ filters: { processName: newValue } })
  }

  handleClearFilters = () => {
    this.setState(
      {
        filters: {
          processName: '',
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
                id: 'processing.management.table.filter.processing.label',
              })}
              value={this.state.filters.processName}
              onChange={this.changeProcessingFilter}
            />
            <FlatButton
              label={this.context.intl.formatMessage({
                id: 'processing.management.table.filter.clear.button',
              })}
              icon={<Close />}
              onClick={this.handleClearFilters}
            />
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'processing.management.table.filter.button' })}
              icon={<Filter />}
              onClick={() => this.props.onRefresh(this.state.filters)}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}

export default ProcessingListFiltersComponent
