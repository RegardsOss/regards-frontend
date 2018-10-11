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
import TextField from 'material-ui/TextField'
import { DamDomain, CommonDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { NumericalComparator } from '@regardsoss/components'
import { PluginCriterionContainer, numberRangeHelper } from '@regardsoss/plugins-api'

/**
 * Search form criteria plugin displaying a simple number field
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriteriaContainer extends PluginCriterionContainer {
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
   * @return {[{string}]} computed available comparators
   * @throws {Error} when attribute type is invalid (or attribute is not available)
   */
  getAvailableComparators = () => {
    const { type } = this.props.attributes.searchField
    switch (type) {
      case DamDomain.MODEL_ATTR_TYPES.INTEGER:
      case DamDomain.MODEL_ATTR_TYPES.LONG:
        return NumericalCriteriaContainer.AVAILABLE_INT_COMPARATORS
      case DamDomain.MODEL_ATTR_TYPES.DOUBLE:
        return NumericalCriteriaContainer.AVAILABLE_FLOAT_COMPARATORS
      default:
        throw new Error(`Invalid attribute type for configured searchField ${type}`)
    }
  }

  /**
   * @return {*} Component default state for current attribute
   */
  getDefaultState = () => {
    const availableComparators = this.getAvailableComparators()
    this.setState({
      availableComparators,
      searchField: {
        value: '',
        operator: availableComparators[0],
      },
    })
  }

  /**
   * @param state this current state
   * @return open search query corresponding to current state
   */
  getPluginSearchQuery = (state) => {
    const { value, operator } = state.searchField
    return numberRangeHelper.getNumberAttributeQueryPart(this.getAttributeName('searchField'),
      numberRangeHelper.convertToRange(value, operator))
  }

  /**
   * Parses open search query for a field value
   * @param {string} parameterName parameter name declared by ths plugin (one of firstField/secondField)
   * @param {string} openSearchQuery open search query, value part
   */
  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    // range parsed: this component accepts ranges like [N, N], [N, +inf], [-inf, N] and ]-inf, N[ U ]N, +inf[
    const foundRange = numberRangeHelper.parseRange(openSearchQuery)
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
    // not parsable
    return { value: null, operator: CommonDomain.EnumNumericalComparator.EQ }
  }

  /**
    * Parses the value given from the field input component.
    * @param {String} value
    * @return {Number} parsed value (maybe null / undefined / Number.NaN)
    */
  parse = value => parseFloat(value)

  /**
   * Formats the value before displaying in the field input component.
   * @param {Number} value value to format (maybe null / undefined / Number.NaN)
   * @return {string} formatted value
   */
  format = value => numberRangeHelper.isValidNumber(value) ? value : ''

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeValue = (event, newValue) => {
    const value = this.parse(newValue)
    this.setState({ searchField: { value, operator: this.state.searchField.operator } })
  }

  handleChangeComparator = (operator) => {
    this.setState({ searchField: { value: this.state.searchField.value, operator } })
  }

  /**
   * Clear the entered value
   */
  handleClear = () => this.setState(this.getDefaultState())

  render() {
    const { moduleTheme: { rootStyle, labelSpanStyle, textFieldStyle } } = this.context
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField: { value, operator }, availableComparators } = this.state
    return (
      <div style={rootStyle}>
        <span style={labelSpanStyle}>
          {attributeLabel}
        </span>
        <NumericalComparator
          value={operator}
          onChange={this.handleChangeComparator}
          comparators={availableComparators}
          // disable if there is no value for this attribute in context
          disabled={this.hasNoValue('searchField')}
        />
        <TextField
          id="search"
          type="number"
          // Use common hint formatter to get type and bounds if any
          floatingLabelText={this.getFieldHintText('searchField', PluginCriterionContainer.BOUND_TYPE.ANY_BOUND)}
          title={this.getFieldTooltip('searchField')}
          value={this.format(value)}
          onChange={this.handleChangeValue}
          style={textFieldStyle}
          // disable if there is no value for this attribute in context
          disabled={this.hasNoValue('searchField')}
        />
      </div>
    )
  }
}

export default NumericalCriteriaContainer
