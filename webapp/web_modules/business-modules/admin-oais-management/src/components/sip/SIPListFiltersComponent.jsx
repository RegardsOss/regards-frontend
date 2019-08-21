/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, DatePickerField, TableHeaderAutoCompleteFilterContainer,
} from '@regardsoss/components'
import { IngestShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { IngestDomain } from '@regardsoss/domain'
import RelaunchSelectedSIPsContainer from '../../containers/sip/options/RelaunchSelectedSIPsContainer'
import DeleteSelectedSIPsContainer from '../../containers/sip/options/DeleteSelectedSIPsContainer'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/session/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/session/SearchSessionsClient'

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
    isEmptySelection: PropTypes.bool.isRequired,
    onRelaunchSelectedDialog: PropTypes.func.isRequired,
    onDeleteSelectedDialog: PropTypes.func.isRequired,
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
      processing, from, state, providerId, source, session,
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
    if (source) {
      newFilters.source = source
    }
    if (session) {
      newFilters.name = session
    }
    if (providerId) {
      // Add '%' caracter at starts and ends of the string to search for matching pattern and not strict value.
      newFilters.providerId = `%${providerId}%`
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

  changeDateFilter = (newValue) => {
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

  changeSessionFilter = (newValues) => {
    if (newValues !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          session: newValues,
        },
      })
    }
  }

  changeSourceFilter = (newValues) => {
    if (newValues !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          source: newValues,
        },
      })
    }
  }

  changeProviderIdFilter = (event, newValue) => {
    this.setState({
      filters: {
        ...this.state.filters,
        providerId: newValue,
      },
    })
  }

  renderFilters = () => {
    const { intl, moduleTheme: { filter } } = this.context
    const { chains } = this.props
    return (
      <TableHeaderLine key="filtersLine">
        <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
          <TableHeaderOptionGroup key="first">
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={this.changeSourceFilter}
              text={get(this.state, 'filters.source', '')}
              arrayActions={searchSourcesActions}
              arraySelectors={searchSourcesSelectors}
              hintText={intl.formatMessage({ id: 'oais.filters.source.title' })}
              style={filter.autocomplete}
            />
            <TableHeaderAutoCompleteFilterContainer
              onChangeText={this.changeSessionFilter}
              text={get(this.state, 'filters.session', '')}
              arrayActions={searchSessionsActions}
              arraySelectors={searchSessionsSelectors}
              hintText={intl.formatMessage({ id: 'oais.filters.session.title' })}
              style={filter.autocomplete}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup key="second">
            <SelectField
              autoWidth
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'oais.sips.listfilters.chain.label',
              })}
              value={get(this.state, 'filters.processing', undefined)}
              onChange={this.changeChainFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(chains, chain => <MenuItem key={chain.content.name} value={chain.content.name} primaryText={chain.content.name} />)}
            </SelectField>
            <TextField
              value={get(this.state, 'filters.providerId', '')}
              onChange={this.changeProviderIdFilter}
              hintText={intl.formatMessage({ id: 'oais.sips.listfilters.providerId.label' })}
              style={filter.fieldStyle}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup key="third">
            <SelectField
              autoWidth
              multiple
              style={filter.fieldStyle}
              hintText={intl.formatMessage({
                id: 'oais.sips.listfilters.status.label',
              })}
              value={get(this.state, 'filters.state', undefined)}
              onChange={this.changeStateFilter}
            >
              <MenuItem value={null} primaryText="" />
              {map(IngestDomain.SIPStateEnum, status => (<MenuItem
                key={status}
                value={status}
                primaryText={intl.formatMessage({
                  id: `sip.state.${status}`,
                })}
              />))}
            </SelectField>
            <DatePickerField
              value={get(this.state, 'filters.from', undefined)}
              dateHintText={intl.formatMessage({
                id: 'oais.sips.listfilters.date.label',
              })}
              onChange={this.changeDateFilter}
              locale={intl.locale}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderRefreshLine = () => (
    <TableHeaderLine key="buttonsLine">
      <TableHeaderOptionsArea key="headerLine">
        <TableHeaderOptionGroup>
          <FlatButton
            key="clear"
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.clear.filters.button' })}
            icon={<Close />}
            disabled={
              !get(this.state, 'filters.from')
              && !get(this.state, 'filters.state')
              && !get(this.state, 'filters.processing')
              && !get(this.state, 'filters.providerId')
              && !get(this.state, 'filters.source')
              && !get(this.state, 'filters.session')
            }
            onClick={this.handleClearFilters}
          />
          <FlatButton
            key="apply"
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.apply.filters.button' })}
            icon={<Filter />}
            onClick={this.handleFilter}
          />
          <RelaunchSelectedSIPsContainer
            disabled={this.props.isEmptySelection}
            onRelaunch={this.props.onRelaunchSelectedDialog}
          />
          <DeleteSelectedSIPsContainer
            disabled={this.props.isEmptySelection}
            onDelete={this.props.onDeleteSelectedDialog}
          />
        </TableHeaderOptionGroup>
      </TableHeaderOptionsArea>
      <TableHeaderOptionsArea key="buttonArea">
        <TableHeaderOptionGroup>
          <FlatButton
            label={this.context.intl.formatMessage({ id: 'oais.sips.session.refresh.button' })}
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
