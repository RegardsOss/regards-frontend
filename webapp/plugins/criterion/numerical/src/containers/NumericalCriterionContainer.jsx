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
import { DamDomain, CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { AttributeModelWithBounds, NumberRange } from '@regardsoss/plugins-api'
import NumericalCriterionComponent from '../components/NumericalCriterionComponent'

/**
 * Search form criteria plugin displaying a simple number field
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriterionContainer extends React.Component {
  static propTypes = {
    /** Configuration attributes, by attributes logical name (see plugin-info.json) */
    attributes: PropTypes.shape({
      searchField: AttributeModelWithBounds.isRequired,
    }).isRequired,
    // configured plugin label, where object key is locale and object value message
    label: UIShapes.IntlMessage.isRequired,
    // state shared and consumed by this criterion
    state: PropTypes.shape({
      error: PropTypes.bool.isRequired,
      value: PropTypes.string,
      operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    }),
    // Callback to share state update with parent form like (state, requestParameters) => ()
    publishState: PropTypes.func.isRequired,
  }

  /** Available comparison operators for integer attributes */
  static AVAILABLE_INT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.LE,
    CommonDomain.EnumNumericalComparator.EQ,
    CommonDomain.EnumNumericalComparator.GE,
  ]

  /** Available comparison operators for floating attributes*/
  static AVAILABLE_FLOAT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.LE,
    CommonDomain.EnumNumericalComparator.GE,
  ]

  /** Default state for integer attributes (equal operator has higher priority) */
  static DEFAULT_INTEGER_TYPE_STATE = {
    error: false,
    value: '',
    operator: CommonDomain.EnumNumericalComparator.EQ,
  }

  /** Default state for floating types (equal operator is not available) */
  static DEFAULT_FLOATING_TYPE_STATE = {
    error: false,
    value: '',
    operator: CommonDomain.EnumNumericalComparator.GE,
  }

  /**
   * Simple selector for attribute type
   * @param {*} attributeType attribute type
   * @param {*} integerTypesValue value to select when integer type
   * @param {*} floatingTypesValue value to select when floating type
   */
  static selectForType(attributeType, integerTypesValue, floatingTypesValue) {
    switch (attributeType) {
      case DamDomain.MODEL_ATTR_TYPES.INTEGER:
      case DamDomain.MODEL_ATTR_TYPES.LONG:
        return integerTypesValue
      case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
        return floatingTypesValue
      default:
        throw new Error(`Invalid attribute type for configured searchField ${attributeType}`)
    }
  }

  /**
   * Is error state with text and operator as parameter? In error when:
   * (pre) : there is an input text and selected operator AND
   * A - There is some some text but is cannot be parsed into a valid number value (OR)
   * B - The number value is valid but outside attributes bounds
   * Both cases are covered by NumberRange.isValidRestricionOn (tests NaN and bounds)
   * @param {*} attribute matching AttributeModelWithBounds shape
   * @param {string} text input text
   * @param {string} operator selected operator, from CommonDomain.EnumNumericalComparator
   */
  static isInError(attribute, text, operator) {
    return !!text && !!operator && !NumberRange.isValidRestrictionOn(
      attribute, NumberRange.convertToRange(parseFloat(text), operator))
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{value: number, operator: string}} plugin state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ error, value, operator }, attribute) {
    return error || !value ? {} : {
      q: NumberRange.getNumberQueryParameter(attribute.jsonPath,
        NumberRange.convertToRange(parseFloat(value), operator)).toQueryString(),
    }
  }

  /**
   * @returns {*} current state or default state for attribute type when current state is not set
   */
  getState = () => {
    const { state, attributes: { searchField } } = this.props
    return state || NumericalCriterionContainer.selectForType(searchField.type, NumericalCriterionContainer.DEFAULT_INTEGER_TYPE_STATE, NumericalCriterionContainer.DEFAULT_FLOATING_TYPE_STATE)
  }

  /**
   * Callback function: user input a new number value
   *
   * @param {*} event original event
   * @param {string} value new input text
   */
  onTextChange = (event, value) => {
    // update state value and publish new state with query
    const { publishState, attributes: { searchField } } = this.props
    const { operator } = this.getState()
    const nextState = {
      error: NumericalCriterionContainer.isInError(searchField, value, operator),
      value,
      operator,
    }
    publishState(nextState, NumericalCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * Callback function: user selected another operator
   * @param {string} operator operator from EnumNumericalComparator
   */
  onOperatorSelected = (operator) => {
    // update state opetarator and publish new state with query
    const { publishState, attributes: { searchField } } = this.props
    const { value } = this.getState()
    const nextState = {
      error: NumericalCriterionContainer.isInError(searchField, value, operator),
      value,
      operator,
    }
    publishState(nextState, NumericalCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  render() {
    const { label, attributes: { searchField } } = this.props
    const { error, value, operator } = this.getState()
    return (
      <NumericalCriterionComponent
        label={label}
        searchAttribute={searchField}
        error={error}
        value={value}
        operator={operator}
        availableComparators={NumericalCriterionContainer.selectForType(searchField.type,
          NumericalCriterionContainer.AVAILABLE_INT_COMPARATORS, NumericalCriterionContainer.AVAILABLE_FLOAT_COMPARATORS)}
        onTextChange={this.onTextChange}
        onOperatorSelected={this.onOperatorSelected}
      />
    )
  }
}

export default NumericalCriterionContainer
