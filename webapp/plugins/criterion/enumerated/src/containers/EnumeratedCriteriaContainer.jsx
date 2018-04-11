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
import React from 'react'
import throttle from 'lodash/throttle'
import { connect } from '@regardsoss/redux'
import { PluginsClientsMap, PluginCriterionContainer } from '@regardsoss/plugins-api'
import buildClient from '../clients/EnumeratedDOPropertyValuesClient'
import EnumeratedCriteriaComponent from '../components/EnumeratedCriteriaComponent'

/** Max number of values shown to user at same time */
const MAX_VALUES_COUNT = 100

/** Search field Id in state (see plugin-info.json) */
const SEARCH_FIELD_ID = 'searchField'

/** Throttle delay for values list queries (avoids flooding the network) */
const THROTTLE_DELAY_MS = 300

/**
 * Root container for enumerated criteria: it fetches parameter possible values, ensures the value selection is
 * dispatched and stores current auto-completion state
 */
export class EnumeratedCriteriaContainer extends PluginCriterionContainer {
  /**
   * Stores clients map for each client and plugin instance ID, to avoid building new instances each
   * time mapStateToProps and mapDispatchToProps are called
   */
  static CLIENTS_MAP = new PluginsClientsMap()

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    // 1 - get selectors for this plugin instance ID
    const enumeratedValuesSelectors = EnumeratedCriteriaContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).selectors
    // 2 - select in state fetching data (state and results)
    return {
      // we select here the current or last fetching state of dispatchGetParameterValues request
      isFetching: enumeratedValuesSelectors.isFetching(state),
      // we select here the results from last dispatchGetParameterValues request
      availablePropertyValues: enumeratedValuesSelectors.getArray(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    const enumeratedValuesActions = EnumeratedCriteriaContainer.CLIENTS_MAP.getClient(buildClient, pluginInstanceId).actions
    return {
      // dispatches a request to get property values
      dispatchGetPropertyValues:
        // Note: we throttle here the emitted network requests to avoid dispatching for each key entered
        throttle(
          (name, filterText = '', q = '') => dispatch(enumeratedValuesActions.fetchValues(name, filterText, MAX_VALUES_COUNT)),
          THROTTLE_DELAY_MS, { leading: true }),
      // make sure not add q parameter when empty / null
    }
  }

  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
    // from map state to props
    isFetching: PropTypes.bool.isRequired,
    availablePropertyValues: PropTypes.arrayOf(PropTypes.string).isRequired,
    // from map dispatch to props
    dispatchGetPropertyValues: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    // as expected by parent container, this field, using plugin-info.json key, holds the search field text value
    [SEARCH_FIELD_ID]: '',
    // current error state (switched to true when user enters some unknown value)
    isInError: false,
  }

  /**
   * User updated the text field
   * @param {string} value text field value
   */
  onUpdateTextFilter = (text = '') => {
    // A - update parameter and text field value
    this.setState({ [SEARCH_FIELD_ID]: text })
    // B - dipatch get values for that filter text
    const { dispatchGetPropertyValues, initialQuery } = this.props
    dispatchGetPropertyValues(this.getAttributeName(SEARCH_FIELD_ID), text, initialQuery)
  }

  /**
   * Callback: the user selected a value or typed in some text (validated with return key)
   * @param {string} test selected parameter value or validated text field value
   * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
   */
  onFilterSelected = (text, isInList) => {
    // Update parameter and value text field, also store the error state (if user typed something unknown,
    // we show him an error as their will be no result)
    this.setState({ [SEARCH_FIELD_ID]: text, isInError: !isInList })
  }

  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state current state
   * @returns {string} query for current state
   */
  getPluginSearchQuery = state =>
    // return query only when there is a value
    state[SEARCH_FIELD_ID] ? `${this.getAttributeName(SEARCH_FIELD_ID)}:"${state[SEARCH_FIELD_ID]}"` : ''

  /**
   * Parses, in open search query for this plugin attribute, the value set
   * @param {string} parameterName parameter name
   * @param {string} openSearchQuery query value for the parameterName previously mentioned
   * @return {string} parsed value without quote characters, added by getPluginSearchQuery
   */
  parseOpenSearchQuery = (parameterName, openSearchQuery) => openSearchQuery.replace(/"/g, '')

  /**
   * Method to clear the field of its value
   */
  handleClear = () => {
    this.onUpdateTextFilter()
  }

  /**
   * Method to display search criteria
   */
  render() {
    const { isFetching, availablePropertyValues } = this.props
    const { isInError } = this.state
    const attributeLabel = this.getAttributeLabel(SEARCH_FIELD_ID)
    const attributeEditionValue = this.state[SEARCH_FIELD_ID]
    return (
      <EnumeratedCriteriaComponent
        attributeLabel={attributeLabel}
        text={attributeEditionValue}
        availablePropertyValues={availablePropertyValues}
        isInError={isInError}
        isFetching={isFetching}
        onUpdateTextFilter={this.onUpdateTextFilter}
        onFilterSelected={this.onFilterSelected}
      />)
  }
}
export default connect(EnumeratedCriteriaContainer.mapStateToProps,
  EnumeratedCriteriaContainer.mapDispatchToProps)(EnumeratedCriteriaContainer)
