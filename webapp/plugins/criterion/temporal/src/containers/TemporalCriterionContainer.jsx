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
import { connect } from '@regardsoss/redux'
import { CommonDomain } from '@regardsoss/domain'
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors,
} from '@regardsoss/plugins-api'
import TemporalCriterionComponent from '../components/TemporalCriterionComponent'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriterionContainer extends React.Component {
  /** Available operators for date attributes */
  static AVAILABLE_COMPARISON_OPERATORS = [CommonDomain.EnumNumericalComparator.LE, CommonDomain.EnumNumericalComparator.GE]

  /** Default state for floating types (equal operator is not available) */
  static DEFAULT_STATE = {
    value: null,
    operator: CommonDomain.EnumNumericalComparator.LE,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId, attributes: { searchField } }) {
    return {
      // current state from redux store, defaults to a static JS objects (avoids constant re-render issues)
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || TemporalCriterionContainer.DEFAULT_STATE,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch, { pluginInstanceId }) {
    return {
      publishState: (state, query) => dispatch(pluginStateActions.publishState(pluginInstanceId, state, query)),
    }
  }

  static propTypes = {
    /** Plugin identifier */
    // eslint-disable-next-line react/no-unused-prop-types
    pluginInstanceId: PropTypes.string.isRequired, // used in mapStateToProps and mapDispatchToProps
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      value: PropTypes.string, // note: the date is defined as ISO date string to avoid growing the state size on URLs
      operator: PropTypes.oneOf([CommonDomain.EnumNumericalComparator.GE, CommonDomain.EnumNumericalComparator.LE]), // only accepts >= and <=
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts current state into query
   * @param {{value: string, operator: string}} state plugin state values
   * @param {*} attribute criterion attribute
   * @return {string} corresponding search query or null if none
   */
  static convertToQuery({ value, operator }, attribute) {
    if (!value || !operator) {
      return null // no query
    }
    let rangeAsQuery = ''
    switch (operator) {
      case CommonDomain.EnumNumericalComparator.LE:
        rangeAsQuery = `[* TO ${value}]`
        break
      case CommonDomain.EnumNumericalComparator.GE:
        rangeAsQuery = `[${value} TO *]`
        break
      default:
        throw new Error(`Invalid comparator type ${operator}`)
    }
    return `${attribute.jsonPath}:${rangeAsQuery}`
  }


  /**
   * Callback function that is fired when the date value changes.
   * @param {Date} date new selected date
   */
  onDateChanged = (date) => {
    // update state value and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const newState = { ...state, value: date ? date.toISOString() : null }
    publishState(newState, TemporalCriterionContainer.convertToQuery(newState, searchField))
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  onOperatorSelected = (operator) => {
    // update state operator and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const newState = { ...state, operator }
    publishState(newState, TemporalCriterionContainer.convertToQuery(newState, searchField))
  }

  render() {
    const { state: { value, operator }, attributes: { searchField } } = this.props
    return (
      <TemporalCriterionComponent
        searchAttribute={searchField}
        value={value ? new Date(value) : null} // provide value as date to components below
        operator={operator}
        availableComparators={TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS}
        onDateChanged={this.onDateChanged}
        onOperatorSelected={this.onOperatorSelected}
      />
    )
  }
}

export default connect(
  TemporalCriterionContainer.mapStateToProps,
  TemporalCriterionContainer.mapDispatchToProps)(TemporalCriterionContainer)
