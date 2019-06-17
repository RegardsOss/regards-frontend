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
import { DamDomain, CommonDomain } from '@regardsoss/domain'
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors, numberRangeHelper,
} from '@regardsoss/plugins-api'
import NumericalCriterionComponent from '../components/NumericalCriterionComponent'

/**
 * Search form criteria plugin displaying a simple number field
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriterionContainer extends React.Component {
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

  /** Available comparison operators for integer attributes */
  static AVAILABLE_INT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.EQ,
    CommonDomain.EnumNumericalComparator.GE,
    CommonDomain.EnumNumericalComparator.LE,
  ]

  /** Available comparison operators for floating attributes*/
  static AVAILABLE_FLOAT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.GE,
    CommonDomain.EnumNumericalComparator.LE,
  ]

  /** Default state for integer attributes (equal operator has higher priority) */
  static DEFAULT_INTEGER_TYPE_STATE = {
    value: null,
    operator: CommonDomain.EnumNumericalComparator.EQ,
  }

  /** Default state for floating types (equal operator is not available) */
  static DEFAULT_FLOATING_TYPE_STATE = {
    value: null,
    operator: CommonDomain.EnumNumericalComparator.GE,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId, attributes: { searchField } }) {
    return {
      // current state from redux store
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId)
      || NumericalCriterionContainer.selectForType(searchField.type, NumericalCriterionContainer.DEFAULT_INTEGER_TYPE_STATE, NumericalCriterionContainer.DEFAULT_FLOATING_TYPE_STATE),
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
      publishState: (state, requestParameters) => dispatch(pluginStateActions.publishState(pluginInstanceId, state, requestParameters)),
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
      value: PropTypes.number,
      operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{value: number, operator: string}} plugin state
   * @param {*} attribute criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({ value, operator }, attribute) {
    // Using common toolbox to build range query
    return { q: numberRangeHelper.getNumberAttributeQueryPart(attribute.jsonPath, numberRangeHelper.convertToRange(value, operator)) }
  }

  /**
   * Callback function: user input some text
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  onTextInput = (event, newValue) => {
    // update state value and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const nextState = { ...state, value: parseFloat(newValue) }
    publishState(nextState, NumericalCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  /**
   * Callback function: user selected another operator
   * @param {string} operator operator from EnumNumericalComparator
   */
  onOperatorSelected = (operator) => {
    // update state opetarator and publish new state with query
    const { state, publishState, attributes: { searchField } } = this.props
    const nextState = { ...state, operator }
    publishState(nextState, NumericalCriterionContainer.convertToRequestParameters(nextState, searchField))
  }

  render() {
    const { state: { value, operator }, attributes: { searchField } } = this.props
    return (
      <NumericalCriterionComponent
        searchAttribute={searchField}
        value={value}
        operator={operator}
        availableComparators={NumericalCriterionContainer.selectForType(searchField.type,
          NumericalCriterionContainer.AVAILABLE_INT_COMPARATORS, NumericalCriterionContainer.AVAILABLE_FLOAT_COMPARATORS)}
        onTextInput={this.onTextInput}
        onOperatorSelected={this.onOperatorSelected}
      />
    )
  }
}

export default connect(
  NumericalCriterionContainer.mapStateToProps,
  NumericalCriterionContainer.mapDispatchToProps)(NumericalCriterionContainer)
