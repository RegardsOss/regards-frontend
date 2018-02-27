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
import map from 'lodash/map'
import get from 'lodash/get'
import values from 'lodash/values'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField/TextField'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField,
} from '@regardsoss/components'
import { DataProviderDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Component to display filter and refresh actions of AcquisitionFileListComponent
* @author Sébastien Binda
*/
class AcquisitionFileListFiltersComponent extends React.Component {
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
      let filters = {}
      if (initialFilters.state) {
        filters = {
          ...initialFilters,
          state: initialFilters.state.includes(',') ? initialFilters.state.split(',') : [initialFilters.state],
        }
      } else {
        filters = {
          ...initialFilters,
        }
      }
      this.setState({
        filters,
      })
    }
  }

  componentDidMount() {
    if (values(this.state.filters).length > 0) {
      this.handleFilter()
    }
  }

  changeFilePathFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          filePath: newValue,
        },
      })
    }
  }

  changeStateFilter = (event, key, newValues) => {
    if (newValues !== null && newValues.length > 0) {
      this.setState({
        filters: {
          ...this.state.filters,
          state: newValues,
        },
      })
    }
  }

  changeFromFilter = (newDate) => {
    this.setState({
      filters: {
        ...this.state.filters,
        from: newDate,
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

  /**
  * Callback to apply selected filters
  */
  handleFilter = () => {
    const state = get(this.state.filters, 'state', null)
    const filePath = get(this.state.filters, 'filePath', null)
    const from = get(this.state.filters, 'from', null)
    const filters = {}
    if (state && state.length > 0) {
      filters.state = state.join(',')
    }
    if (filePath) {
      filters.filePath = filePath
    }
    if (from) {
      filters.from = from.toISOString()
    }

    this.props.applyFilters(filters)
  }

  renderActionsLine = () => (
    <TableHeaderLine key="actions">
      <TableHeaderOptionsArea key="actions-1">
        <TableHeaderOptionGroup>
          <FlatButton
            key="clear"
            label={this.context.intl.formatMessage({ id: 'acquisition.file.list.filters.clear.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.state') &&
              !get(this.state, 'filters.filePath') &&
              !get(this.state, 'filters.from')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'acquisition.file.list.filters.apply.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea key="actions-2">
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.file.list.refresh.button' })}
            icon={<Refresh />}
            onClick={this.props.handleRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  renderFilters() {
    const { intl, intl: { formatMessage }, moduleTheme: { monitoring: { filters } } } = this.context
    const stateValues = get(this.state, 'filters.state', [])
    return (
      <TableHeaderLine key="filters">
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SelectField
              key="state"
              multiple
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition.file.list.filters.state',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              {map(DataProviderDomain.AcquisitionFileStateValues, state =>
                (<MenuItem
                  key={state}
                  value={state}
                  insetChildren
                  checked={stateValues && stateValues.includes(state)}
                  primaryText={formatMessage({
                    id: `acquisition.file.list.filters.state.${state}`,
                  })}
                />),
              )}
            </SelectField>
            <TextField
              key="filePath"
              hintText={formatMessage({
                id: 'acquisition.file.list.filters.filePath',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.filePath', '')}
              onChange={this.changeFilePathFilter}
            />
            <DatePickerField
              value={get(this.state, 'filters.from', undefined)}
              dateHintText={formatMessage({ id: 'acquisition.file.list.filters.from' })}
              onChange={this.changeFromFilter}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  render() {
    return [
      this.renderFilters(),
      this.renderActionsLine(),
    ]
  }
}
export default AcquisitionFileListFiltersComponent
