/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import {
  AttributeModelWithBounds, pluginStateActions, pluginStateSelectors, numberRangeHelper,
} from '@regardsoss/plugins-api'
import MultipleAttributesComponent from '../components/MultipleAttributesComponent'

/**
 * Main container for criterion when working on a different attributes: value1 from / to X and value2 from / to Y
 *
 * @author Xavier-Alexandre Brochard
 */
export class MultipleAttributesContainer extends React.Component {
  /** Default container state */
  static DEFAULT_STATE = {
    value1: null,
    comparator1: CommonDomain.EnumNumericalComparator.GE,
    value2: null,
    comparator2: CommonDomain.EnumNumericalComparator.LE,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pluginInstanceId }) {
    return {
      // current state from redux store
      state: pluginStateSelectors.getCriterionState(state, pluginInstanceId) || MultipleAttributesContainer.DEFAULT_STATE,
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
    /** First configured field attribute */
    firstField: AttributeModelWithBounds.isRequired,
    /** Second configured field attribute */
    secondField: AttributeModelWithBounds.isRequired,
    // From mapStateToProps...
    state: PropTypes.shape({ // specifying here the state this criterion shares with parent search form
      value1: PropTypes.number,
      comparator1: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
      value2: PropTypes.number,
      comparator2: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    }).isRequired,
    // From mapDispatchToProps...
    publishState: PropTypes.func.isRequired,
  }

  /** Available comparison operators for integer numbers */
  static AVAILABLE_INT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.EQ,
    CommonDomain.EnumNumericalComparator.GE,
    CommonDomain.EnumNumericalComparator.LE,
  ]

  /** Available comparison operators for floatting numbers */
  static AVAILABLE_FLOAT_COMPARATORS = [
    CommonDomain.EnumNumericalComparator.GE,
    CommonDomain.EnumNumericalComparator.LE,
  ]

  /**
   * @param {*} attribute searched attributed
   * @return {[{string}]} computed available comparators
   * @throws {Error} when attribute type is invalid (or attribute is not available)
   */
  static getAvailableComparators = (attribute) => {
    switch (attribute.type) {
      case DamDomain.MODEL_ATTR_TYPES.INTEGER:
      case DamDomain.MODEL_ATTR_TYPES.LONG:
        return MultipleAttributesContainer.AVAILABLE_INT_COMPARATORS
      case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
        return MultipleAttributesContainer.AVAILABLE_FLOAT_COMPARATORS
      default:
        throw new Error(`Invalid attribute type for configured searchField ${attribute.type}`)
    }
  }

  /**
   * Converts state as parameter into OpenSearch request parameters
   * @param {{value1: number, comparator1: string, value2: number, comparator2: string}} plugin state
   * @param {*} firstAttribute first criterion attribute
   * @param {*} secondAttribute second criterion attribute
   * @return {*} corresponding OpenSearch request parameters
   */
  static convertToRequestParameters({
    value1, comparator1, value2, comparator2,
  }, firstAttribute, secondAttribute) {
    // Using common toolbox to build range query
    return {
      q: [
        // first attribute
        numberRangeHelper.getNumberAttributeQueryPart(firstAttribute.jsonPath,
          numberRangeHelper.convertToRange(value1, comparator1)),
        // second attribute
        numberRangeHelper.getNumberAttributeQueryPart(secondAttribute.jsonPath,
          numberRangeHelper.convertToRange(value2, comparator2)),
      ]
        .filter(query => !!query)// clear empty queries
        .join(' AND ') || null, // Join all parts with open search instruction, return null if string is empty
    }
  }


  /**
   * Callback: user changed value 1 number and / or operator
   * @param {number} value1 as parsed by NumericalCriteriaComponent
   * @param {string} comparator1 comparator, one of EnumNumericalComparator values
   */
  onChangeValue1 = (value1, comparator1) => {
    const {
      state, publishState, firstField, secondField,
    } = this.props
    const newState = { ...state, value1, comparator1 }
    publishState(newState, MultipleAttributesContainer.convertToRequestParameters(newState, firstField, secondField))
  }

  /**
   * Callback: user changed value 2 number and / or operator
   * @param {number} value2 as parsed by NumericalCriteriaComponent
   * @param {string} comparator2 operator, one of EnumNumericalComparator values
   */
  onChangeValue2 = (value2, comparator2) => {
    const {
      state, publishState, firstField, secondField,
    } = this.props
    const newState = { ...state, value2, comparator2 }
    publishState(newState, MultipleAttributesContainer.convertToRequestParameters(newState, firstField, secondField))
  }

  render() {
    const {
      firstField, secondField,
      state: {
        value1, comparator1, value2, comparator2,
      },
    } = this.props
    return (
      <MultipleAttributesComponent
        attribute1={firstField}
        value1={value1}
        comparator1={comparator1}
        availableComparators1={MultipleAttributesContainer.getAvailableComparators(firstField)}
        onChangeValue1={this.onChangeValue1}

        attribute2={secondField}
        value2={value2}
        comparator2={comparator2}
        availableComparators2={MultipleAttributesContainer.getAvailableComparators(secondField)}
        onChangeValue2={this.onChangeValue2}
      />)
  }
}

export default connect(
  MultipleAttributesContainer.mapStateToProps,
  MultipleAttributesContainer.mapDispatchToProps)(MultipleAttributesContainer)
