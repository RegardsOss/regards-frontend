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
import React from 'react'
import replace from 'lodash/replace'
import { connect } from '@regardsoss/redux'
import { PluginCriterionContainer } from '@regardsoss/plugins-api'
import { enumeratedDOPropertyValuesActions, enumeratedDOPropertyValuesSelectors } from '../clients/EnumeratedDOPropertyValuesClient'
import EnumeratedCriteriaComponent from '../components/EnumeratedCriteriaComponent'

/** Max number of values shown to user at same time */
const MAX_VALUES_COUNT = 20

/**
 * Root container for enumerated criteria: it fetches parameter possible values, ensures the value selection is
 * dispatched and stores current auto-completion state
 */
export class EnumeratedCriteriaContainer extends PluginCriterionContainer {
  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {
      // we select here the current or last fetching state of dispatchGetParameterValues request
      isFetching: enumeratedDOPropertyValuesSelectors.isFetching(state),
      // we select here the results from last dispatchGetParameterValues request
      availablePropertyValues: enumeratedDOPropertyValuesSelectors.getArray(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      // dispatches a request to get property values
      dispatchGetPropertyValues: (name, filterText, maxCount, q) =>
        dispatch(enumeratedDOPropertyValuesActions.fetchValues(name, filterText, MAX_VALUES_COUNT, q)),
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

  /** Initial component state */
  state = {
    value: '',
    isInError: false,
  }

  /**
   * User updated the text field
   * @param {string} value text field value
   */
  onUpdateTextFilter = (value = '') => {
    // A - update parameter and text field value
    this.setState({ value })
    // B - dipatch get values for that filter text
    this.props.dispatchGetPropertyValues(value)
  }

  /**
   * Callback: the user selected a value or typed in some text (validated with return key)
   * @param {string} value selected parameter value or validated text field value
   * @param {string} isInList did user select a strict value in list? (or did he type some unknown value)
   */
  onFilterSelected = (value, isInList) => {
    // Update parameter and value text field, also store the error state (if user typed something unknown,
    // we show him an error as their will be no result)
    this.setState({ value, isInError: !isInList })
  }

  /**
   * Callback: user cleared the filter
   */
  onFilterCleared = () => this.onFilterSelected('', true) // empty user is considered part of the list


  /**
   * Method to create openSearch request associated to the current criteria
   *
   * @param state
   * @returns {string}
   */
  getPluginSearchQuery = (state) => { // TODO
    const attributeName = this.getAttributeName('searchField')
    let openSearchQuery = ''
    if (state.value && state.value.length > 0) {
      // Create openSearch query by adding " characters around the requested value
      openSearchQuery = `${attributeName}:"${state.value}"`
    }
    return openSearchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => // TODO
    // Return the value without the additional " characters
    replace(openSearchQuery, /"/g)


  /**
   * Method to display search criteria
   */
  render() {
    const { isFetching, availablePropertyValues } = this.props
    const { value, isInError } = this.state
    const attributeLabel = this.getAttributeLabel('searchField')

    return (
      <EnumeratedCriteriaComponent
        attributeLabel={attributeLabel}
        text={value}
        availablePropertyValues={availablePropertyValues}
        isInError={isInError}
        isFetching={isFetching}
        onUpdateTextFilter={this.onUpdateTextFilter}
        onFilterSelected={this.onFilterSelected}
        onFilterCleared={this.onFilterCleared}
      />)
  }
}
export default connect(EnumeratedCriteriaContainer.mapStateToProps,
  EnumeratedCriteriaContainer.mapDispatchToProps)(EnumeratedCriteriaContainer)
