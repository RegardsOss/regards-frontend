/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import isEqual from 'lodash/isEqual'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup, TableHeaderAutoCompleteFilterContainer, DatePickerField, TableHeaderTextField,
} from '@regardsoss/components'
import { searchSourcesActions, searchSourcesSelectors } from '../../clients/SearchSourcesClient'
import { searchSessionsActions, searchSessionsSelectors } from '../../clients/SearchSessionsClient'
import { FILTER_PARAMS } from '../../domain/FilterParams'

/**
  * Feature manager filters component.
  * @author Théo Lasserre
  */
export class FeatureManagerFiltersComponent extends React.Component {
   static propTypes = {
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
    [FILTER_PARAMS.SOURCE]: '',
    [FILTER_PARAMS.SESSION]: '',
    [FILTER_PARAMS.PROVIDER_ID]: '',
    [FILTER_PARAMS.FROM]: null,
    [FILTER_PARAMS.TO]: null,
  }

  /**
   * Converts filters state into request parameters
   * @param {*} filters filters state from component state
   * @returns {*} requestParameters as an object compound of string and string arrays
   */
  static buildRequestParameters(filters) {
    const requestParameters = filters

    if (filters[FILTER_PARAMS.FROM]) {
      const dateFrom = new Date(filters[FILTER_PARAMS.FROM])
      requestParameters.from = [dateFrom.toISOString()]
    }
    if (filters[FILTER_PARAMS.TO]) {
      const dateFrom = new Date(filters[FILTER_PARAMS.TO])
      requestParameters.from = [dateFrom.toISOString()]
    }

    return requestParameters
  }

  static extractFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    if (values(query).length > 0) {
      const {
        sessionOwner, session, providerId, from, to,
      } = query
      if (sessionOwner) {
        urlFilters.sessionOwner = sessionOwner
      }
      if (session) {
        urlFilters.session = session
      }
      if (providerId) {
        urlFilters.providerId = providerId
      }
      if (from) {
        urlFilters.lastUpdate.from = from.fromISOString()
      }
      if (to) {
        urlFilters.lastUpdate.to = to.fromISOString()
      }
    }
    return urlFilters
  }

  static extractStateFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    const urlFilters = {}
    if (values(query).length > 0) {
      const {
        state,
      } = query
      if (state) {
        urlFilters.state = state
      }
    }
    return urlFilters
  }

  state = {
    filters: FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE,
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
    if (!isEqual(newFilters, FeatureManagerFiltersComponent.DEFAULT_FILTERS_STATE)) {
      onApplyFilters(newFilters)
    }
  }

  render() {
    const { intl: { formatMessage, locale }, moduleTheme: { filter } } = this.context
    const { filters } = this.state
    return (
      <>
        <TableLayout>
          <TableHeaderLine key="idLine">
            <TableHeaderOptionsArea key="idLini" reducible alignLeft>
              <TableHeaderOptionGroup key="idLina">
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={(event, index, value) => this.updateState(value, FILTER_PARAMS.SOURCE)}
                  text={filters.source || ''}
                  hintText={formatMessage({ id: 'feature.references.list.filters.source' })}
                  style={filter.autocomplete}
                  key="sourceAuto"
                  arrayActions={searchSourcesActions}
                  arraySelectors={searchSourcesSelectors}
                />
                <TableHeaderAutoCompleteFilterContainer
                  onChangeText={(event, index, value) => this.updateState(value, FILTER_PARAMS.SESSION)}
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
                  onChange={(event, index, value) => this.updateState(value, FILTER_PARAMS.PROVIDER_ID)}
                />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup key="dateForm">
                <DatePickerField
                  id="filter.from"
                  value={null}
                  dateHintText={formatMessage({
                    id: 'feature.references.list.filters.from.label',
                  })}
                  onChange={(event, index, value) => this.updateState(value, FILTER_PARAMS.FROM)}
                  locale={locale}
                  key="datefrom"
                />
                <DatePickerField
                  id="filter.to"
                  value={null}
                  defaultTime="23:59:59"
                  dateHintText={formatMessage({ id: 'feature.references.list.filters.to.label' })}
                  onChange={(event, index, value) => this.updateState(value, FILTER_PARAMS.FROM)}
                  locale={locale}
                  key="dateto"
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
        </TableLayout>
      </>
    )
  }
}

export default FeatureManagerFiltersComponent
