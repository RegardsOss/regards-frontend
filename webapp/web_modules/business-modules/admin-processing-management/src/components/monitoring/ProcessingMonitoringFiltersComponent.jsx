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
  TableHeaderAutoCompleteFilter,
  DatePickerField,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ProcessingDomain } from '@regardsoss/domain'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import find from 'lodash/find'
import filter from 'lodash/filter'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'
import Refresh from 'mdi-material-ui/Refresh'
import { ProcessingShapes } from '@regardsoss/shape'

const PROCESS_FILTER_PARAMS = {
  NAME: 'processName',
  USERNAME: 'userName',
  FROM: 'from',
  TO: 'to',
  STATUS: 'status',
}

/**
 * Monitoring processing list filters
 * @author Théo Lasserre
 */
class ProcessingMonitoringFiltersComponent extends React.Component {
  static propTypes = {
    processingList: ProcessingShapes.ProcessingList.isRequired,
    onRefresh: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [PROCESS_FILTER_PARAMS.NAME]: '',
    [PROCESS_FILTER_PARAMS.USERNAME]: '',
    [PROCESS_FILTER_PARAMS.FROM]: null,
    [PROCESS_FILTER_PARAMS.TO]: null,
    [PROCESS_FILTER_PARAMS.STATUS]: ProcessingDomain.PROCESS_STATUS_TYPES,
  }

  state = {
    processNameHints: [],
    filters: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE,
  }

  /**
   * Initialize processNameHints
   */
  UNSAFE_componentWillMount() {
    this.setState({
      processNameHints: this.getConfigurationProcessNames(),
    })
  }

  /**
   * Used to set state's processNameHints values
   * @param {*} inputValue
   */
  getConfigurationProcessNames = (inputValue = '') => {
    const { processingList } = this.props
    const processNameList = map(processingList, (processing) => (
      find(processing.content.pluginConfiguration.parameters, (param) => (
        param.name === PROCESS_FILTER_PARAMS.NAME
      )).value
    ))
    return !isEmpty(inputValue) ? filter(processNameList, (processName) => processName.startsWith(inputValue)) : processNameList
  }

  /**
   * Used to build hint items correctly
   * @param {*} element
   */
  prepareHints = (element) => ({ id: element, text: element, value: element })

  /**
   * User callback: Apply edited filters to current request
   */
  onApplyFilters = () => {
    const { onRefresh } = this.props
    const { filters } = this.state
    if (!isEqual(filters, ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)) {
      const filtersClean = {
        ...filters,
      }
      // Remove from params the status field if it is still pristine
      if (filters[PROCESS_FILTER_PARAMS.STATUS].length === PROCESS_FILTER_PARAMS.STATUS.length) {
        delete filtersClean[PROCESS_FILTER_PARAMS.STATUS]
      }
      onRefresh(filtersClean)
    }
  }

  /**
   * User callback: Reset filter to default
   */
  onClearFilters = () => {
    this.setState({
      filters: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE,
    })
  }

  updateState(newStateValue, filterElement) {
    const { filters } = this.state
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue,
      },
    }
    if (filterElement === PROCESS_FILTER_PARAMS.NAME) {
      newState.processNameHints = this.getConfigurationProcessNames(newStateValue)
    }
    this.setState(newState)
  }

  render() {
    const {
      intl: { formatMessage, locale },
      moduleTheme: { processingMonitoring: { filters: { autocomplete } } },
    } = this.context
    const {
      processNameHints, filters,
    } = this.state

    return [
      <TableHeaderLine key="filters">
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <TableHeaderAutoCompleteFilter
              hintText={formatMessage({ id: `processing.monitoring.filters.${PROCESS_FILTER_PARAMS.NAME}-hint` })}
              text={filters[PROCESS_FILTER_PARAMS.NAME]}
              currentHints={processNameHints}
              onUpdateInput={(inputValue) => this.updateState(inputValue, PROCESS_FILTER_PARAMS.NAME)}
              onFilterSelected={(inputValue) => this.updateState(inputValue, PROCESS_FILTER_PARAMS.NAME)}
              isFetching={false}
              noData={!processNameHints.length}
              prepareHints={this.prepareHints}
              style={autocomplete}
            />
            <TextField
              hintText={formatMessage({ id: `processing.monitoring.filters.${PROCESS_FILTER_PARAMS.USERNAME}-hint` })}
              name={`processing.monitoring.filters.${PROCESS_FILTER_PARAMS.USERNAME}`}
              type="text"
              fullWidth
              onChange={(event) => this.updateState(event.target.value, PROCESS_FILTER_PARAMS.USERNAME)}
              value={filters[PROCESS_FILTER_PARAMS.USERNAME]}
            />

          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <DatePickerField
              id={`filter.${PROCESS_FILTER_PARAMS.FROM}`}
              dateHintText={formatMessage({ id: `processing.monitoring.filters.${PROCESS_FILTER_PARAMS.FROM}.label` })}
              onChange={(inputValue) => this.updateState(inputValue, PROCESS_FILTER_PARAMS.FROM)}
              locale={locale}
              value={filters[PROCESS_FILTER_PARAMS.FROM]}
            />
            <DatePickerField
              id={`filter.${PROCESS_FILTER_PARAMS.TO}`}
              dateHintText={formatMessage({ id: `processing.monitoring.filters.${PROCESS_FILTER_PARAMS.TO}.label` })}
              onChange={(inputValue) => this.updateState(inputValue, PROCESS_FILTER_PARAMS.TO)}
              locale={locale}
              value={filters[PROCESS_FILTER_PARAMS.TO]}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              <SelectField
                id="filter.select.field"
                multiple
                value={filters[PROCESS_FILTER_PARAMS.STATUS]}
                floatingLabelText={formatMessage({ id: 'processing.monitoring.filters.status' })}
                onChange={(event, index, value) => this.updateState(value, PROCESS_FILTER_PARAMS.STATUS)}
              >
                {map(ProcessingDomain.PROCESS_STATUS_TYPES, (status) => (
                  <MenuItem key={status} value={status} primaryText={status} />
                ))}
              </SelectField>
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderOptionsArea>
      </TableHeaderLine>,
      <TableHeaderLine key="table_actions">
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <FlatButton
              label={formatMessage({ id: 'processing.management.table.refresh.button' })}
              icon={<Refresh />}
              onClick={this.props.onRefresh}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <FlatButton
              label={formatMessage({ id: 'processing.monitoring.filters.reset' })}
              icon={<Close />}
              disabled={isEqual(filters, ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)}
              onClick={this.onClearFilters}
            />
            <FlatButton
              label={formatMessage({ id: 'processing.monitoring.filters.apply' })}
              icon={<Filter />}
              disabled={isEqual(filters, ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)}
              onClick={this.onApplyFilters}
            />
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
      </TableHeaderLine>,
    ]
  }
}
export default ProcessingMonitoringFiltersComponent
