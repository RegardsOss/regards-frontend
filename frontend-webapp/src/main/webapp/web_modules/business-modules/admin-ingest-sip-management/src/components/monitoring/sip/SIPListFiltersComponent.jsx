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
import map from 'lodash/map'
import values from 'lodash/values'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'
import FlatButton from 'material-ui/FlatButton'
import { TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup } from '@regardsoss/components'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import SIPStatusEnum from './SIPStatusEnum'

/**
* Component to display filters on SIPListComponent
* @author Sébastien Binda
*/
class SIPListFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    applyFilters: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
  }

  static defaultProps = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
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

  /**
    * Clear all filters
    */
  handleClearFilters = () => {
    this.setState({ filters: {} })
    this.props.applyFilters({})
  }

  handleFilter = () => {
    const {
      processing, from, state, sipId,
    } = this.state.filters
    const newFilters = {}
    if (processing) {
      newFilters.processing = processing
    }
    if (from) {
      newFilters.from = from.toISOString()
    }
    if (state) {
      newFilters.state = state
    }
    if (sipId) {
      newFilters.sipId = sipId
    }
    this.props.applyFilters(newFilters)
  }

  changeChainFilter = (event, key, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        processing: newValue,
      },
    })
  }

  changeDateFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        from: newValue,
      },
    })
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

  changeSipIdFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        sipId: newValue,
      },
    })
  }

  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    const { chains } = this.props
    return (
      <TableHeaderLine key="filtersLine">
        <TableHeaderOptionsArea key="filtersArea" reducible>
          <TableHeaderOptionGroup key="first">
            <SelectField
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.chain.label',
              })}
              value={get(this.state, 'filters.processing', undefined)}
              onChange={this.changeChainFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(chains, chain => <MenuItem key={chain.content.name} value={chain.content.name} primaryText={chain.content.name} />)}
            </SelectField>
            <TextField
              value={get(this.state, 'filters.sipId', '')}
              onChange={this.changeSipIdFilter}
              hintText={intl.formatMessage({ id: 'sips.list.filters.sipid.label' })}
              style={filter.fieldStyle}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup key="second">
            <SelectField
              multiple
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.status.label',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(SIPStatusEnum, status => (<MenuItem
                key={status}
                value={status}
                primaryText={intl.formatMessage({
                  id: status,
                })}
              />))}
            </SelectField>
            <DatePicker
              value={get(this.state, 'filters.from', undefined)}
              textFieldStyle={filter.dateStyle}
              hintText={intl.formatMessage({
                id: 'sips.list.filters.date.label',
              })}
              onChange={this.changeDateFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderRefreshLine = () => (
    <TableHeaderLine key="buttonsLine">
      <TableHeaderOptionsArea>
        <TableHeaderOptionGroup>
          <FlatButton
            key="clear"
            label={this.context.intl.formatMessage({ id: 'sips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.from') &&
              !get(this.state, 'filters.state') &&
              !get(this.state, 'filters.processing') &&
              !get(this.state, 'filters.sipId')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'sips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea key="buttonArea">
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'sips.session.refresh.button' })}
            icon={<Refresh />}
            onClick={this.props.handleRefresh}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
    </TableHeaderLine>
  )

  render() {
    return [
      this.renderFilters(),
      this.renderRefreshLine(),
    ]
  }
}
export default SIPListFiltersComponent
