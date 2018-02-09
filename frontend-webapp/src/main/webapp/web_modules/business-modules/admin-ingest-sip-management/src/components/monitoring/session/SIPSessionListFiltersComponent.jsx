/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import FlatButton from 'material-ui/FlatButton'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Component to display filters on the SIPSessionListComponent
* @author Sébastien Binda
*/
class SIPSessionListFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    applyFilters: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
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

  changefrom = (event, newDate) => {
    newDate.setHours(0, 0, 0, 0)
    this.setState({
      filters: {
        ...this.state.filters,
        from: newDate,
      },
    })
  }

  changeto = (event, newDate) => {
    newDate.setHours(23, 59, 59, 999)
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
    const { handleRefresh } = this.props
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <TextField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.session.filter.name.label',
              })}
              onChange={this.changeId}
              value={get(this.state, 'filters.id', '')}
            />
            <DatePicker
              value={this.state.filters.from}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({ id: 'sips.session.filter.from.label' })}
              defaultDate={get(this.state, 'filters.from', undefined)}
              onChange={this.changefrom}
            />
            <DatePicker
              value={this.state.filters.to}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({ id: 'sips.session.filter.to.label' })}
              defaultDate={get(this.state, 'filters.to', undefined)}
              onChange={this.changeto}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.clear.filters.button' })}
              icon={<Close />}
              disabled={!this.state.filters.id && !this.state.filters.to && !this.state.filters.from}
              onTouchTap={this.handleClearFilters}
            />
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.apply.filters.button' })}
              icon={<Filter />}
              onTouchTap={this.handleFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <FlatButton
              label={intl.formatMessage({ id: 'sips.session.refresh.button' })}
              icon={<Refresh />}
              onClick={handleRefresh}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine >
    )
  }
}
export default SIPSessionListFiltersComponent