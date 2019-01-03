/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import values from 'lodash/values'

import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField,
} from '@regardsoss/components'

/**
* Component to display filters on the AIPSessionListComponent
 * @author Léo Mieulet
*/
class AIPSessionListFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    applyFilters: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    filters: {},
  }

  componentWillMount() {
    const { initialFilters } = this.props
    if (initialFilters) {
      this.setState({
        filters: initialFilters,
      })
    }
  }

  componentDidMount() {
    if (values(this.state.filters).length > 0) {
      this.handleFilter()
    }
  }

  changeId = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          id: newValue,
        },
      })
    }
  }

  changefrom = (newDate) => {
    this.setState({
      filters: {
        ...this.state.filters,
        from: newDate,
      },
    })
  }

  changeto = (newDate) => {
    this.setState({
      filters: {
        ...this.state.filters,
        to: newDate,
      },
    })
  }

  /**
   * Clear all filters
   */
  handleClearFilters = () => {
    this.setState({ filters: {} })
    this.props.applyFilters({})
  }

  handleFilter = () => {
    const { filters } = this.state
    const appliedFilters = {}
    if (filters.id && filters.id !== '') {
      appliedFilters.id = filters.id
    }
    if (filters.from) {
      appliedFilters.from = filters.from.toISOString()
    }
    if (filters.to) {
      appliedFilters.to = filters.to.toISOString()
    }
    this.props.applyFilters(appliedFilters)
  }

  render = () => {
    const { intl, moduleTheme: { filter } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <TextField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'aips.session.filter.name.label',
              })}
              onChange={this.changeId}
              value={get(this.state, 'filters.id', '')}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <DatePickerField
              value={this.state.filters.from}
              dateHintText={intl.formatMessage({ id: 'aips.session.filter.from.label' })}
              onChange={this.changefrom}
              locale={intl.locale}
            />
            <DatePickerField
              value={this.state.filters.to}
              defaultTime="23:59:59"
              dateHintText={intl.formatMessage({ id: 'aips.session.filter.to.label' })}
              onChange={this.changeto}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <FlatButton
              label={intl.formatMessage({ id: 'aips.session.clear.filters.button' })}
              icon={<Close />}
              disabled={!this.state.filters.id && !this.state.filters.to && !this.state.filters.from}
              onClick={this.handleClearFilters}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'aips.session.apply.filters.button' })}
              icon={<Filter />}
              onClick={this.handleFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }
}
export default AIPSessionListFiltersComponent
