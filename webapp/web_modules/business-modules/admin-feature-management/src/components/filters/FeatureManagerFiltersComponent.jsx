/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import reduce from 'lodash/reduce'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import values from 'lodash/values'
import IconButton from 'material-ui/IconButton'
import { browserHistory } from 'react-router'
import isEqual from 'lodash/isEqual'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import ClearFilter from 'mdi-material-ui/Backspace'
import { i18nContextType } from '@regardsoss/i18n'
import { FemDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, TableHeaderAutoCompleteFilterContainer, DatePickerField, TableHeaderTextField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/SearchSessionsClient'
import { FILTER_PARAMS } from '../../domain/FilterParams'
import { DISSEMINATION_PENDING_ENUM } from '../../domain/DisseminationStatus'

/**
  * Feature manager filters component.
  * @author Théo Lasserre
  */
export class FeatureManagerFiltersComponent extends React.Component {
  static propTypes = {
    onApplyFilters: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    openedPane: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
  * Default state for filters edition
  */
  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.SOURCE]: '',
    [FILTER_PARAMS.SESSION]: '',
    [FILTER_PARAMS.PROVIDER_ID]: '',
    [FILTER_PARAMS.FROM]: null,
    [FILTER_PARAMS.TO]: null,
    [FILTER_PARAMS.STATE]: null,
    [FILTER_PARAMS.DISSEMINATION_PENDING]: null,
  }

  /**
   * Converts filters state into request parameters
   * @param {*} filters filters state from component state
   * @returns {*} requestParameters as an object compound of string and string arrays
   */
  static buildRequestParameters(filters, oldFilters) {
    const requestParameters = filters

    if (filters[FILTER_PARAMS.FROM]) {
      const dateFrom = new Date(filters[FILTER_PARAMS.FROM])
      requestParameters.from = dateFrom.toISOString()
    }
    if (filters[FILTER_PARAMS.TO]) {
      const dateTo = new Date(filters[FILTER_PARAMS.TO])
      requestParameters.to = dateTo.toISOString()
    }

    if (!isEqual(filters, oldFilters)) {
      FeatureManagerFiltersComponent.updateURL(requestParameters)
    }

    return requestParameters
  }

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = { ...FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE }
    if (values(query).length > 0) {
      const {
        source, session, providerId, from, to, state, disseminationPending,
      } = query
      if (source) {
        urlFilters.source = source
      }
      if (session) {
        urlFilters.session = session
      }
      if (providerId) {
        urlFilters.providerId = providerId
      }
      if (from) {
        urlFilters.from = from
      }
      if (to) {
        urlFilters.to = to
      }
      if (state) {
        urlFilters.state = state
      }
      if (disseminationPending) {
        urlFilters.disseminationPending = disseminationPending
      }
    }
    return urlFilters
  }

  static updateURL = (filters) => {
    const { pathname } = browserHistory.getCurrentLocation()

    const newQuery = reduce(keys(filters), (acc, value) => {
      if (filters[value] !== null && filters[value] !== undefined && !isEmpty(filters[value])) {
        acc[value] = filters[value]
      }
      return acc
    }, {})
    browserHistory.replace({
      pathname,
      search: encodeURIComponent(new URLSearchParams(newQuery).toString()),
      query: newQuery,
    })
  }

  state = {
    filters: FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
 * Properties change detected: update local state
 * @param oldProps previous component properties
 * @param newProps next component properties
 */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      featureManagerFilters,
    } = newProps
    if (!isEqual(oldProps.featureManagerFilters, featureManagerFilters)) {
      this.setState({
        filters: featureManagerFilters,
      })
    }
  }

  /**
   * Update filters
   * @param {*} newStateValue
   * @param {*} filterElement
   */
  updateState(newStateValue, filterElement) {
    const { onApplyFilters } = this.props
    const { filters } = this.state
    const newFilters = {
      ...filters,
      [filterElement]: newStateValue,
    }
    const newState = {
      filters: newFilters,
    }
    this.setState(newState)
    onApplyFilters(newFilters)
  }

  render() {
    const { intl: { formatMessage, locale }, moduleTheme: { filter } } = this.context
    const { filters } = this.state
    const { openedPane, onClearFilters } = this.props
    return (
      <TableLayout>
        <TableHeaderLine>
          <div style={filter.tableHeaderContainerStyle}>
            <div style={filter.tableHeaderFiltersStyle}>
              <TableHeaderOptionsArea reducible alignLeft>
                <TableHeaderOptionGroup>
                  <TableHeaderAutoCompleteFilterContainer
                    onChangeText={(value) => this.updateState(value, FILTER_PARAMS.SOURCE)}
                    text={filters.source || ''}
                    hintText={formatMessage({ id: 'feature.references.list.filters.source' })}
                    style={filter.autocomplete}
                    key="sourceAuto"
                    arrayActions={searchSourcesActions}
                    arraySelectors={searchSourcesSelectors}
                  />
                  <TableHeaderAutoCompleteFilterContainer
                    onChangeText={(value) => this.updateState(value, FILTER_PARAMS.SESSION)}
                    text={filters.session || ''}
                    hintText={formatMessage({ id: 'feature.references.list.filters.session' })}
                    style={filter.autocomplete}
                    key="sessionAuto"
                    arrayActions={searchSessionsActions}
                    arraySelectors={searchSessionsSelectors}
                  />
                  <TableHeaderTextField
                    title={formatMessage({ id: 'feature.references.tooltip.providerId' })}
                    value={filters.providerId || ''}
                    hintText={formatMessage({ id: 'feature.references.list.filters.providerId' })}
                    onChange={(event, value) => this.updateState(value, FILTER_PARAMS.PROVIDER_ID)}
                  />
                </TableHeaderOptionGroup>
                <TableHeaderOptionGroup>
                  <div style={filter.selectFieldGroupStyle}>
                    <SelectField
                      autoWidth
                      style={filter.fieldStyle}
                      floatingLabelText={formatMessage({ id: 'feature.requests.list.filters.state' })}
                      value={filters.state || ''}
                      onChange={(event, index, value) => this.updateState(value, FILTER_PARAMS.STATE)}
                      disabled={openedPane === FemDomain.REQUEST_TYPES_ENUM.REFERENCES}
                    >
                      <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'feature.requests.status.any' })} />
                      {FemDomain.REQUEST_STATUS.map((status) => <MenuItem key={status} value={status} primaryText={formatMessage({ id: `feature.requests.status.${status}` })} />)}
                    </SelectField>
                    <SelectField
                      autoWidth
                      style={filter.fieldStyle}
                      floatingLabelText={formatMessage({ id: 'feature.requests.list.filters.dissemination.status' })}
                      value={filters.disseminationPending || ''}
                      onChange={(event, index, value) => this.updateState(value, FILTER_PARAMS.DISSEMINATION_PENDING)}
                      disabled={openedPane !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES}
                    >
                      <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'feature.requests.dissemination.status.any' })} />
                      {map(keys(DISSEMINATION_PENDING_ENUM), (disseminationKey) => <MenuItem key={disseminationKey} value={DISSEMINATION_PENDING_ENUM[disseminationKey]} primaryText={formatMessage({ id: `feature.requests.dissemination.status.${disseminationKey}` })} />)}
                    </SelectField>
                  </div>

                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
              <TableHeaderOptionsArea reducible alignLeft>
                <TableHeaderOptionGroup>
                  <div style={filter.dateFieldGroupStyle}>
                    <div>
                      {formatMessage({ id: 'feature.references.list.filters.from.label' })}
                    </div>
                    <DatePickerField
                      id="filter.from"
                      value={filters.from ? new Date(filters.from) : null}
                      dateHintText={formatMessage({ id: 'feature.references.list.filters.date.label' })}
                      timeHintText={formatMessage({ id: 'feature.references.list.filters.time.label' })}
                      onChange={(value) => this.updateState(value, FILTER_PARAMS.FROM)}
                      locale={locale}
                      style={filter.dateFromStyle}
                      key="datefrom"
                      displayTime
                      fullWidth
                    />
                  </div>
                </TableHeaderOptionGroup>
                <TableHeaderOptionGroup>
                  <div style={filter.dateFieldGroupStyle}>
                    <div style={filter.dateToLabelStyle}>
                      {formatMessage({ id: 'feature.references.list.filters.to.label' })}
                    </div>
                    <DatePickerField
                      id="filter.to"
                      dateHintText={formatMessage({ id: 'feature.references.list.filters.date.label' })}
                      timeHintText={formatMessage({ id: 'feature.references.list.filters.time.label' })}
                      value={filters.to ? new Date(filters.to) : null}
                      defaultTime="23:59:59"
                      onChange={(value) => this.updateState(value, FILTER_PARAMS.TO)}
                      locale={locale}
                      key="dateto"
                      displayTime
                      fullWidth
                    />
                  </div>
                </TableHeaderOptionGroup>
              </TableHeaderOptionsArea>
            </div>
            <IconButton
              title={formatMessage({ id: 'feature.requests.list.filters.clear' })}
              onClick={() => onClearFilters()}
            >
              <ClearFilter />
            </IconButton>
          </div>
        </TableHeaderLine>
      </TableLayout>
    )
  }
}

export default FeatureManagerFiltersComponent
