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
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { PluginCriterionContainer, numberRangeHelper, BOUND_TYPE } from '@regardsoss/plugins-api'
import NumericalCriteriaComponent from '../components/NumericalCriteriaComponent'

/**
 * Main container for criterion when working on a different attributes: value1 from / to X and value2 from / to Y
 *
 * @author Xavier-Alexandre Brochard
 */
export class MultipleAttributesContainer extends PluginCriterionContainer {
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

  static propTypes = {
    // parent props
    ...PluginCriterionContainer.propTypes,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /**
   * Lifecycle method: component will mount. Used to initialized the state
   */
  componentWillMount() {
    this.setState(this.getDefaultState())
  }

  /**
   * @param {string} fieldName configured field name
   * @return {[{string}]} computed available comparators
   * @throws {Error} when attribute type is invalid (or attribute is not available)
   */
  getAvailableComparators = (fieldName) => {
    const { type } = this.props.attributes[fieldName]
    switch (type) {
      case DamDomain.MODEL_ATTR_TYPES.INTEGER:
      case DamDomain.MODEL_ATTR_TYPES.LONG:
        return MultipleAttributesContainer.AVAILABLE_INT_COMPARATORS
      case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
        return MultipleAttributesContainer.AVAILABLE_FLOAT_COMPARATORS
      default:
        throw new Error(`Invalid attribute type for configured searchField ${type}`)
    }
  }

  /**
   * @return {*} Component default state for current attribute
   */
  getDefaultState = () => {
    this.setState({
      firstFieldComparators: this.getAvailableComparators('firstField'),
      secondFieldComparators: this.getAvailableComparators('secondField'),
      firstField: {
        value: null,
        operator: CommonDomain.EnumNumericalComparator.GE, // always available
      },
      secondField: {
        value: null,
        operator: CommonDomain.EnumNumericalComparator.LE, // always available
      },
    })
  }

  /**
   * Callback: user changed value 1 number and / or operator
   * @param {number} value as parsed by NumericalCriteriaComponent
   * @param {string} operator operator, one of EnumNumericalComparator values
   */
  onChangeValue1 = (value, operator) => {
    this.setState({
      firstField: { value, operator },
    })
  }

  /**
   * Callback: user changed value 2 number and / or operator
   * @param {number} value as parsed by NumericalCriteriaComponent
   * @param {string} operator operator, one of EnumNumericalComparator values
   */
  onChangeValue2 = (value, operator) => {
    this.setState({
      secondField: { value, operator },
    })
  }

  /**
   * @param state this current state
   * @return open search query corresponding to current state
   */
  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state

    const firstQueryPart = numberRangeHelper.getNumberAttributeQueryPart(this.getAttributeName('firstField'),
      numberRangeHelper.convertToRange(firstField.value, firstField.operator))

    const secondQueryPart = numberRangeHelper.getNumberAttributeQueryPart(this.getAttributeName('secondField'),
      numberRangeHelper.convertToRange(secondField.value, secondField.operator))
    return `${firstQueryPart}${firstQueryPart && secondQueryPart ? ' AND ' : ''}${secondQueryPart}`
  }

  /**
   * Parses open search query for a field value
   * @param {string} parameterName parameter name declared by ths plugin (one of firstField/secondField)
   * @param {string} openSearchQuery open search query, value part
   */
  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const foundRange = numberRangeHelper.parseRange(openSearchQuery)
    // range parsed: this component accepts only ranges like [N, N], [N, +inf] or [-inf, N]
    if (!foundRange.isFullyInifiniteRange()) {
      if (foundRange.isSingleValueRange()) {
        // strict equality tested ([N, N])
        return { value: foundRange.lowerBound, operator: CommonDomain.EnumNumericalComparator.EQ }
      }
      if (!foundRange.isInfiniteLowerBound()) {
        // greater than value range ([N, +inf])
        return { value: foundRange.lowerBound, operator: CommonDomain.EnumNumericalComparator.GE }
      }
      if (foundRange.isInfiniteLowerBound()) {
        // greater than value range [-inf, N]
        return { value: foundRange.upperBound, operator: CommonDomain.EnumNumericalComparator.LE }
      }
    }
    // not parsable (attempt keeping current operator)
    return { value: null, operator: this.state[parameterName].operator }
  }

  /**
   * Clear the entered value
   */
  handleClear = () => this.setState(this.getDefaultState())


  render() {
    const {
      firstField, secondField, firstFieldComparators, secondFieldComparators,
    } = this.state
    const { moduleTheme: { rootStyle, lineStyle } } = this.context
    return (
      <div style={rootStyle}>
        <div style={lineStyle}>
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            value={firstField.value}
            comparator={firstField.operator}
            availableComparators={firstFieldComparators}
            onChange={this.onChangeValue1}
            hintText={this.getFieldHintText('firstField', BOUND_TYPE.LOWER_BOUND)}
            tooltip={this.getFieldTooltip('firstField')}
            disabled={this.hasNoValue('firstField')}
          />
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            value={secondField.value}
            comparator={secondField.operator}
            availableComparators={secondFieldComparators}
            onChange={this.onChangeValue2}
            hintText={this.getFieldHintText('secondField', BOUND_TYPE.UPPER_BOUND)}
            tooltip={this.getFieldTooltip('secondField')}
            disabled={this.hasNoValue('secondField')}
          />
        </div>
      </div>
    )
  }
}

export default MultipleAttributesContainer
