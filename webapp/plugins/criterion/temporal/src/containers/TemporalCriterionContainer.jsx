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
import isNil from 'lodash/isNil'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, DateRange } from '@regardsoss/plugins-api'
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
    error: false,
    time: null,
    operator: CommonDomain.EnumNumericalComparator.LE,
  }

  static propTypes = {
    /** Plugin identifier */
    pluginInstanceId: PropTypes.string.isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      error: PropTypes.bool.isRequired,
      time: PropTypes.number, // note: the date is stored as timestamp for serialization
      operator: PropTypes.oneOf([CommonDomain.EnumNumericalComparator.GE, CommonDomain.EnumNumericalComparator.LE]), // only accepts >= and <=
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Using default props to ensure a default plugin state */
  static defaultProps = {
    state: TemporalCriterionContainer.DEFAULT_STATE,
  }

  /**
   * Is error state with time and operator as parameter? In error when there is an operator and a selected time but
   * last one is out of attribute bounds
   * @param {*} attribute matching AttributeModelWithBounds shape
   * @param {number} time time
   * @param {string} operator selected operator, from CommonDomain.EnumNumericalComparator
   */
  static isInError(attribute, time, operator) {
    return !isNil(time) && !!operator && !DateRange.isValidRestrictionOn(
      attribute, DateRange.convertToRange(time, operator)) // user input is considered already UTC
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{ error: boolean, time: string, operator: string }} state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ error, time, operator }, attribute) {
    return error || isNil(time) || !operator ? { } : {
      q: DateRange.getDateQueryParameter(attribute.jsonPath,
        DateRange.convertToRange(time, operator)).toQueryString(),
    }
  }

  /**
   * Inner callback: update state
   * @param {number} time selected date time
   * @param {string} operator selected operator
   * @param {{error: boolean, time: number, operator: string}} newState (matching state shape for this criterion)
   */
  onUpdateState = (time, operator) => {
    const { publishState, attributes: { searchField } } = this.props
    const newState = {
      error: TemporalCriterionContainer.isInError(searchField, time, operator),
      time,
      operator,
    }
    publishState(newState, TemporalCriterionContainer.convertToRequestParameters(newState, searchField))
  }

  /**
   * Callback function: user selected a date
   * @param {Date} date new selected date
   */
  onDateChanged = (date) => {
    const { state: { operator } } = this.props
    this.onUpdateState(date ? date.getTime() : null, operator)
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  onOperatorSelected = (operator) => {
    const { state: { time } } = this.props
    this.onUpdateState(time, operator)
  }

  render() {
    const {
      pluginInstanceId, label, state: { error, time, operator }, attributes: { searchField },
    } = this.props
    return (
      <TemporalCriterionComponent
        pluginInstanceId={pluginInstanceId}
        error={error}
        label={label}
        searchAttribute={searchField}
        // provide value as UTC date to component
        value={isNil(time) ? null : new Date(time)}
        operator={operator}
        availableComparators={TemporalCriterionContainer.AVAILABLE_COMPARISON_OPERATORS}
        onDateChanged={this.onDateChanged}
        onOperatorSelected={this.onOperatorSelected}
      />
    )
  }
}

export default TemporalCriterionContainer
