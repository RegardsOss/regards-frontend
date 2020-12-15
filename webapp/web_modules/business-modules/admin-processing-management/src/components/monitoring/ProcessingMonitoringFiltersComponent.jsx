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
import get from 'lodash/get'
import map from 'lodash/map'
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
  PROCESS_BID: 'processBusinessId',
  USERNAME: 'userEmail',
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
    project: PropTypes.string.isRequired,
    processingList: ProcessingShapes.ProcessingList.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [PROCESS_FILTER_PARAMS.PROCESS_BID]: '',
    [PROCESS_FILTER_PARAMS.USERNAME]: '',
    [PROCESS_FILTER_PARAMS.FROM]: null,
    [PROCESS_FILTER_PARAMS.TO]: null,
    [PROCESS_FILTER_PARAMS.STATUS]: ProcessingDomain.PROCESS_STATUS_TYPES,
  }

  state = {
    filters: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE,
  }

  /**
   * Used to set state's processNameHints values
   * @param {*} inputValue
   */
  getConfigurationProcessNames = (inputValue = '') => {
    const { processingList } = this.props
    const processNameList = map(processingList, (processing) => (
      ProcessingDomain.getProcessingName(processing)
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
    const { onApplyFilters } = this.props
    const { filters } = this.state
    if (!isEqual(filters, ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)) {
      const filtersClean = {
        ...filters,
      }
      onApplyFilters(filtersClean)
    }
  }

  onRefresh = () => {
    this.props.onRefresh({ ...this.state.filters, tenant: this.props.project })
  }

  /**
   * User callback: Reset filter to default
   */
  onClearFilters = () => {
    this.setState({
      filters: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE,
    })
  }

  /**
   * Update filters
   * @param {*} newStateValue
   * @param {*} filterElement
   */
  updateState(newStateValue, filterElement) {
    const { filters } = this.state
    const newState = {
      filters: {
        ...filters,
        [filterElement]: newStateValue,
      },
    }
    this.setState(newState)
  }

  render() {
    const {
      intl: { formatMessage, locale },
    } = this.context
    const { filters } = this.state
    const { processingList } = this.props

    return [
      <TableHeaderLine key="filters">
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
          <SelectField
                id={`processing.monitoring.filters.${PROCESS_FILTER_PARAMS.PROCESS_BID}`}
                value={filters[PROCESS_FILTER_PARAMS.PROCESS_BID]}
                floatingLabelText={formatMessage({ id: `processing.monitoring.filters.${PROCESS_FILTER_PARAMS.PROCESS_BID}-hint` })}
                onChange={(event, index, value) => this.updateState(value, PROCESS_FILTER_PARAMS.PROCESS_BID)}
              >
                {map(processingList, (process) => (
                  <MenuItem key={get(process,'content.pluginConfiguration.label')} value={get(process,'content.pluginConfiguration.businessId')} primaryText={get(process,'content.pluginConfiguration.label')} />
                ))}
              </SelectField>
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
              onClick={this.onRefresh}
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
