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
import map from 'lodash/map'
import get from 'lodash/get'
import values from 'lodash/values'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField/TextField'
import { TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField } from '@regardsoss/components'
import { DataProviderDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Component to display filter and refresh actions of ProductListComponent
* @author Sébastien Binda
*/
class ProductListFiltersComponent extends React.Component {
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
      const initalStateFilters = initialFilters.state && initialFilters.state.includes(',') ? initialFilters.state.split(',') : [initialFilters.state]
      const initalSipStateFilters = initialFilters.sipState && initialFilters.sipState.includes(',') ? initialFilters.sipState.split(',') : [initialFilters.sipState]
      const filters = {
        ...initialFilters,
      }
      if (initialFilters.state && initalStateFilters.length > 0) {
        filters.state = initalStateFilters
      }
      if (initialFilters.sipState && initalSipStateFilters.length > 0) {
        filters.sipState = initalSipStateFilters
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

  changeSIPStateFilter = (event, key, newValues) => {
    if (newValues !== null && newValues.length > 0) {
      this.setState({
        filters: {
          ...this.state.filters,
          sipState: newValues,
        },
      })
    }
  }

  changeProductNameFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          productName: newValue,
        },
      })
    }
  }

  changeSessionFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          session: newValue,
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

  changeNoSessionFilter = (event, isInputChecked) => {
    this.setState({
      filters: {
        ...this.state.filters,
        nosession: isInputChecked,
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
    const sipState = get(this.state.filters, 'sipState', null)
    const productName = get(this.state.filters, 'productName', null)
    const session = get(this.state.filters, 'session', null)
    const from = get(this.state.filters, 'from', null)
    const nosession = get(this.state, 'filters.nosession', false)
    const filters = {}
    if (state && state.length > 0) {
      filters.state = state.join(',')
    }
    if (sipState) {
      filters.sipState = sipState
    }
    if (productName) {
      filters.productName = productName
    }
    if (session) {
      filters.session = session
    }
    if (from) {
      filters.from = from.toISOString()
    }
    if (nosession) {
      filters.nosession = true
    }

    this.props.applyFilters(filters)
  }

  renderActionsLine = () => (
    <TableHeaderLine key="actions">
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.filters.clear.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.state') &&
              !get(this.state, 'filters.sipState') &&
              !get(this.state, 'filters.productName') &&
              !get(this.state, 'filters.session') &&
              !get(this.state, 'filters.from') &&
              !get(this.state, 'filters.nosession')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.filters.apply.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'acquisition.product.list.refresh.button' })}
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
    const sipStateValues = get(this.state, 'filters.sipState', [])
    return (
      <TableHeaderLine key="filters">
        <TableHeaderOptionsArea reducible alignLeft>
          <TableHeaderOptionGroup>
            <SelectField
              multiple
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.state',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              {map(DataProviderDomain.ProductStateValues, state =>
                (<MenuItem
                  key={state}
                  value={state}
                  insetChildren
                  checked={stateValues && stateValues.includes(state)}
                  primaryText={formatMessage({
                    id: `acquisition.product.list.filters.state.${state}`,
                  })}
                />),
              )}
            </SelectField>
            <TextField
              hintText={formatMessage({
                id: 'acquisition-product.list.filters.productName',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.productName', '')}
              onChange={this.changeProductNameFilter}
            />
            <DatePickerField
              value={get(this.state, 'filters.from', undefined)}
              dateHintText={formatMessage({ id: 'acquisition.product.list.filters.from' })}
              onChange={this.changeFromFilter}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <SelectField
              multiple
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.sipState',
              })}
              value={get(this.state, 'filters.sipState', undefined)}
              onChange={this.changeSIPStateFilter}
            >
              {map(DataProviderDomain.ProductSIPStateEnumValues, sipState =>
                (<MenuItem
                  value={sipState}
                  insetChildren
                  checked={sipStateValues && sipStateValues.includes(sipState)}
                  primaryText={formatMessage({
                    id: `acquisition.product.list.filters.sipState.${sipState}`,
                  })}
                />),
              )}
            </SelectField>
            <TextField
              hintText={formatMessage({
                id: 'acquisition.product.list.filters.session',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.session', '')}
              disabled={get(this.state, 'filters.nosession', false)}
              onChange={this.changeSessionFilter}
            />
            <Checkbox
              label={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.no.session',
              })}
              checked={get(this.state, 'filters.nosession', '')}
              onCheck={this.changeNoSessionFilter}
              style={filters.checkboxFieldStyle}
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
export default ProductListFiltersComponent
