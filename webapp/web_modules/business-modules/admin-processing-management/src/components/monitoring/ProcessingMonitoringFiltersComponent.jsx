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
  DatePickerField
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { isEmpty, isEqual, filter } from 'lodash'
import { SelectField, Checkbox } from 'material-ui'
import { MenuItem } from 'material-ui/Menu'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import Close from 'mdi-material-ui/Close'

const FILTERS_ELEMENT = {
  PROCESS_NAME: 'processName',
  USER_NAME: 'userName',
  DATE: {
    FROM: 'from',
    TO: 'to'
  },
  STATUS: [
    'SUCCESS',
    'FAILURE',
    'CANCELLED',
    'TIMED_OUT',
    'CLEANUP',
    'RUNNING',
    'PREPARE',
    'REGISTERED'
  ]
}

const STATE_TYPE = {
  AUTOCOMPLETE_LIST: 'autocompleteList',
  FILTER: 'filter'
}

/**
 * Monitoring processing list filters
 * @author Théo Lasserre
 */
class ProcessingMonitoringFiltersComponent extends React.Component {

  static propTypes = {
    listEntities: PropTypes.object.isRequired,
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
    [FILTERS_ELEMENT.PROCESS_NAME]: '',
    [FILTERS_ELEMENT.USER_NAME]: '',
    [FILTERS_ELEMENT.DATE.FROM]: null,
    [FILTERS_ELEMENT.DATE.TO]: null,
    [FILTERS_ELEMENT.STATUS] : [
      'SUCCESS',
      'FAILURE',
      'CANCELLED',
      'TIMED_OUT',
      'CLEANUP',
      'RUNNING',
      'PREPARE',
      'REGISTERED'
    ]
  }

  state = {
    listAutoCompleteElements : {
      [FILTERS_ELEMENT.PROCESS_NAME]: [],
      [FILTERS_ELEMENT.USER_NAME]: []
    },
    filters: {
      [FILTERS_ELEMENT.PROCESS_NAME]: '',
      [FILTERS_ELEMENT.USER_NAME]: '',
      [FILTERS_ELEMENT.DATE.FROM]: null,
      [FILTERS_ELEMENT.DATE.TO]: null,
      [FILTERS_ELEMENT.STATUS] : [
        'SUCCESS',
        'FAILURE',
        'CANCELLED',
        'TIMED_OUT',
        'CLEANUP',
        'RUNNING',
        'PREPARE',
        'REGISTERED'
      ]
    }
  }

  UNSAFE_componentWillMount() {
    const { listEntities } = this.props
    const autoCompleteElements = {
      [FILTERS_ELEMENT.PROCESS_NAME]: [],
      [FILTERS_ELEMENT.USER_NAME]: []
    }
    if (listEntities) {
      Object.getOwnPropertyNames(listEntities).forEach(function (key) {
        autoCompleteElements[FILTERS_ELEMENT.PROCESS_NAME].push(listEntities[key].content.processName)
        autoCompleteElements[FILTERS_ELEMENT.USER_NAME].push(listEntities[key].content.userName)
      })
    }
    this.setState({
      listAutoCompleteElements : {
        [FILTERS_ELEMENT.PROCESS_NAME]: autoCompleteElements[FILTERS_ELEMENT.PROCESS_NAME],
        [FILTERS_ELEMENT.USER_NAME]: autoCompleteElements[FILTERS_ELEMENT.USER_NAME]
      }
    })
  }

  onUpdateInput = (inputValue, filterElement) => {
    const { listEntities } = this.props
    this.updateState(inputValue, filterElement, STATE_TYPE.FILTER)
    if (filterElement === FILTERS_ELEMENT.PROCESS_NAME || filterElement === FILTERS_ELEMENT.USER_NAME) {
      const names = []
      Object.getOwnPropertyNames(listEntities).forEach(function (key) {
        let name
        filterElement === FILTERS_ELEMENT.PROCESS_NAME 
          ? name = listEntities[key].content[FILTERS_ELEMENT.PROCESS_NAME] 
          : name = listEntities[key].content[FILTERS_ELEMENT.USER_NAME]
        names.push(name)
      })
      if (!isEmpty(names)) {
        const newAutoCompleteList = names.filter(name => name.startsWith(inputValue))
        this.updateState(newAutoCompleteList, filterElement, STATE_TYPE.AUTOCOMPLETE_LIST)
      }
    }
  }

  updateState(newStateValue, filterElement, stateType) {
    const { filters, listAutoCompleteElements } = this.state
    if(newStateValue !== undefined) {
      if (stateType === STATE_TYPE.FILTER) {
        if (filterElement === FILTERS_ELEMENT.PROCESS_NAME) {
          this.setState({
            filters: {
              ...filters,
              [FILTERS_ELEMENT.PROCESS_NAME]: newStateValue,
            }
          })
        } else if (filterElement === FILTERS_ELEMENT.USER_NAME) {
          this.setState({
            filters: {
              ...filters,
              [FILTERS_ELEMENT.USER_NAME]: newStateValue,
            }
          })
        } else if (filterElement === FILTERS_ELEMENT.DATE.FROM) {
          this.setState({
            filters: {
              ...filters,
              [FILTERS_ELEMENT.DATE.FROM]: newStateValue
            }
          })
        } else if (filterElement === FILTERS_ELEMENT.DATE.TO) {
          this.setState({
            filters: {
              ...filters,
              [FILTERS_ELEMENT.DATE.TO]: newStateValue
            }
          })
        } else if (filterElement === FILTERS_ELEMENT.STATUS) {
          this.setState({
            filters: {
              ...filters,
              [FILTERS_ELEMENT.STATUS] : newStateValue
            }
          })
        }
      } else if (stateType === STATE_TYPE.AUTOCOMPLETE_LIST) {
        if (filterElement === FILTERS_ELEMENT.PROCESS_NAME) {
          this.setState({
            listAutoCompleteElements : {
              ...listAutoCompleteElements,
              [FILTERS_ELEMENT.PROCESS_NAME] : newStateValue
            }
          })
        } else if (filterElement === FILTERS_ELEMENT.USER_NAME) {
          this.setState({
            listAutoCompleteElements : {
              ...listAutoCompleteElements,
              [FILTERS_ELEMENT.USER_NAME]: newStateValue
            }
          })
        }
      } 
    }
  }

  prepareHints = (element) => ({ id: element, text: element, value: element })

  /**
   * User callback: Apply edited filters to current request
   */
  onApplyFilters = () => {
    const { filters } = this.state
    if (!isEqual(filters, ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE)) {
      this.props.onRefresh(filters)
    }
  }

  /**
   * User callback: Reset filter to default
   */
  onClearFilters = () => {
    this.setState({
      filters: ProcessingMonitoringFiltersComponent.DEFAULT_FILTERS_STATE
    })
  }

  render() {
    const { intl: { formatMessage, locale } } = this.context
    const {
      listAutoCompleteElements, filters
    } = this.state
    const { moduleTheme: { processingMonitoring: { filters: { autocomplete } } } } = this.context
    return (
      <TableHeaderLine>
        <TableHeaderOptionsArea>
          <TableHeaderOptionGroup>
            <TableHeaderAutoCompleteFilter
              hintText={formatMessage({ id: `processing.monitoring.filters.${FILTERS_ELEMENT.PROCESS_NAME}-hint` })}
              text={filters[FILTERS_ELEMENT.PROCESS_NAME]}
              currentHints={listAutoCompleteElements[FILTERS_ELEMENT.PROCESS_NAME]}
              onUpdateInput={(inputValue) => this.onUpdateInput(inputValue, FILTERS_ELEMENT.PROCESS_NAME)}
              onFilterSelected={(inputValue) => this.updateState(inputValue, FILTERS_ELEMENT.PROCESS_NAME, STATE_TYPE.FILTER)}
              isFetching={false}
              noData={!listAutoCompleteElements[FILTERS_ELEMENT.PROCESS_NAME].length}
              prepareHints={this.prepareHints}
              style={autocomplete}
            />
            <TableHeaderAutoCompleteFilter
              hintText={formatMessage({ id: `processing.monitoring.filters.${FILTERS_ELEMENT.USER_NAME}-hint` })}
              text={filters[FILTERS_ELEMENT.USER_NAME]}
              currentHints={listAutoCompleteElements[FILTERS_ELEMENT.USER_NAME]}
              onUpdateInput={(inputValue) => this.onUpdateInput(inputValue, FILTERS_ELEMENT.USER_NAME)}
              onFilterSelected={(inputValue) => this.updateState(inputValue, FILTERS_ELEMENT.USER_NAME, STATE_TYPE.FILTER)}
              isFetching={false}
              noData={!listAutoCompleteElements[FILTERS_ELEMENT.USER_NAME].length}
              prepareHints={this.prepareHints}
              style={autocomplete}
            />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <DatePickerField
              id={`filter.${FILTERS_ELEMENT.DATE.FROM}`}
              dateHintText={formatMessage({ id: `processing.monitoring.filters.${FILTERS_ELEMENT.DATE.FROM}.label` })}
              onChange={(inputValue) => this.updateState(inputValue, FILTERS_ELEMENT.DATE.FROM, STATE_TYPE.FILTER)}
              locale={locale}
              value={filters[FILTERS_ELEMENT.DATE.FROM]}
            />
            <DatePickerField
              id={`filter.${FILTERS_ELEMENT.DATE.TO}`}
              dateHintText={formatMessage({ id: `processing.monitoring.filters.${FILTERS_ELEMENT.DATE.TO}.label` })}
              onChange={(inputValue) => this.updateState(inputValue, FILTERS_ELEMENT.DATE.TO, STATE_TYPE.FILTER)}
              locale={locale}
              value={filters[FILTERS_ELEMENT.DATE.TO]}
          />
          </TableHeaderOptionGroup>
          <TableHeaderOptionGroup>
            <SelectField
              id="test"
              multiple
              value={filters[FILTERS_ELEMENT.STATUS]}
              onChange={(event, index, value) => this.updateState(value, FILTERS_ELEMENT.STATUS, STATE_TYPE.FILTER)}
            >
              {FILTERS_ELEMENT.STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  <Checkbox label={FILTERS_ELEMENT.STATUS[status]} checked={filters[FILTERS_ELEMENT.STATUS].indexOf(status) > -1} />
                </MenuItem>
              ))}
            </SelectField>
          </TableHeaderOptionGroup>
        </TableHeaderOptionsArea>
        <TableHeaderOptionsArea>
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
      </TableHeaderLine>
    )
  }
}
export default ProcessingMonitoringFiltersComponent