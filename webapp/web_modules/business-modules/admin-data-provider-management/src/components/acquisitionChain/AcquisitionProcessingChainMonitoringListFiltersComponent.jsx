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
import values from 'lodash/values'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Enable from 'material-ui/svg-icons/av/play-arrow'
import Disable from 'material-ui/svg-icons/av/stop'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import TextField from 'material-ui/TextField/TextField'
import {
  TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
} from '@regardsoss/components'
import {
  withResourceDisplayControl,
} from '@regardsoss/display-control'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AcquisitionProcessingChainMonitorListContainer } from '../../containers/acquisitionChain/AcquisitionProcessingChainMonitorListContainer'

const ResourceIconAction = withResourceDisplayControl(FlatButton)

/**
* Component to display list filters
* @author Sébastien Binda
*/
class AcquisitionProcessingChainMonitoringListFiltersComponent extends React.Component {
  static propTypes = {
    initialFilters: PropTypes.objectOf(PropTypes.string),
    applyFilters: PropTypes.func.isRequired,
    onMultiToggleSelection: PropTypes.func.isRequired,
    isOneCheckboxToggled: PropTypes.bool.isRequired,
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

  onDisableSelection = () => {
    const { onMultiToggleSelection } = this.props
    onMultiToggleSelection('ONLY_ACTIVITY', false)
  }

  onEnableSelection = () => {
    const { onMultiToggleSelection } = this.props
    onMultiToggleSelection('ONLY_ACTIVITY', true)
  }

  /**
   * Callback when the label filter is updated
   */
  changeLabelFilter = (event, newValue) => {
    if (newValue !== null) {
      this.setState({
        filters: {
          ...this.state.filters,
          label: newValue,
        },
      })
    }
  }

  /**
   * Callback when running filter is updated
   */
  changeRunningFilter = (event, key, newValue) => {
    if (newValue) {
      this.setState({
        filters: {
          ...this.state.filters,
          running: newValue,
        },
      })
    }
  }

  /**
   * Callback when running filter is updated
   */
  changeModeFilter = (event, key, newValue) => {
    if (newValue) {
      this.setState({
        filters: {
          ...this.state.filters,
          mode: newValue,
        },
      })
    }
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
    const running = get(this.state.filters, 'running', 'all')
    const mode = get(this.state.filters, 'mode', 'all')
    const label = get(this.state.filters, 'label', null)
    const filters = {}
    if (running !== 'all') {
      filters.running = running === 'running'
    }
    if (mode !== 'all') {
      filters.mode = mode
    }
    if (label) {
      filters.label = label
    }

    this.props.applyFilters(filters)
  }

  renderFilters = () => {
    const { intl: { formatMessage }, moduleTheme: { monitoring: { filters } } } = this.context
    return (
      <TableHeaderLine key="filters">
        <TableHeaderOptionsArea reducible>
          <TableHeaderOptionGroup>
            <SelectField
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.running',
              })}
              value={get(this.state, 'filters.running', undefined)}
              onChange={this.changeRunningFilter}
            >
              <MenuItem
                value="all"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.all',
                })}
              />
              <MenuItem
                value="running"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.running',
                })}
              />
              <MenuItem
                value="stopped"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.running.stopped',
                })}
              />
            </SelectField>
            <SelectField
              style={filters.fieldStyle}
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.mode',
              })}
              value={get(this.state, 'filters.mode', undefined)}
              onChange={this.changeModeFilter}
            >
              <MenuItem
                value="all"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.all',
                })}
              />
              <MenuItem
                value="AUTO"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.auto',
                })}
              />
              <MenuItem
                value="MANUAL"
                primaryText={formatMessage({
                  id: 'acquisition-chain.monitor.list.filters.mode.manual',
                })}
              />
            </SelectField>
            <TextField
              hintText={formatMessage({
                id: 'acquisition-chain.monitor.list.filters.label',
              })}
              style={filters.fieldStyle}
              value={get(this.state, 'filters.label', '')}
              onChange={this.changeLabelFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>
    )
  }

  renderActionsLine = () => {
    const { isOneCheckboxToggled } = this.props
    return (
      <TableHeaderLine key="options">
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.filters.clear.button' })}
              icon={<Close />}
              disabled={!get(this.state, 'filters.running') && !get(this.state, 'filters.label') && !get(this.state, 'filters.mode')}
              onClick={this.handleClearFilters}
            />
            <FlatButton
              label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.filters.apply.button' })}
              icon={<Filter />}
              onClick={this.handleFilter}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <ResourceIconAction
              label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.disable-selected.button' })}
              icon={<Disable />}
              onClick={this.onDisableSelection}
              disabled={!isOneCheckboxToggled}
              resourceDependencies={AcquisitionProcessingChainMonitorListContainer.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES}
            />
            <ResourceIconAction
              label={this.context.intl.formatMessage({ id: 'acquisition-chain.monitor.list.enable-selected.button' })}
              icon={<Enable />}
              onClick={this.onEnableSelection}
              disabled={!isOneCheckboxToggled}
              resourceDependencies={AcquisitionProcessingChainMonitorListContainer.TOGGLE_MULTIPLE_CHAIN_DEPENDENCIES}
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
export default AcquisitionProcessingChainMonitoringListFiltersComponent
