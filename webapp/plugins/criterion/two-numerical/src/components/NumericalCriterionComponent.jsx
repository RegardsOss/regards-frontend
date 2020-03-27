/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import TextField from 'material-ui/TextField'
import { CommonDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { NumericalComparatorSelector } from '@regardsoss/components'
import {
  AttributeModelWithBounds, BOUND_TYPE, numberRangeHelper,
  formatHintText, formatTooltip,
} from '@regardsoss/plugins-api'

/**
 * Component allowing the user to configure the numerical value of an attribute with a mathematical comparator (=, >, <=, ...).
 *
 * @author Xavier-Alexandre Brochard
 */
export class NumericalCriterionComponent extends React.Component {
  static propTypes = {
    searchAttribute: AttributeModelWithBounds.isRequired,
    fieldBoundType: PropTypes.oneOf(values(BOUND_TYPE)).isRequired,
    value: PropTypes.number,
    comparator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    /** Callback to change the current criteria values in form: (value:number, operator:EnumNumicalComparators) => () */
    onChange: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /**
   * Parses the value given from the field input component.
   * @param {String} text
   * @return {number} parsed value (maybe null / undefined / Number.NaN)
   */
  static toValue(text) {
    return parseFloat(text)
  }

  /**
   * Returns text for current value
   * @param {number} value
   * @return {string} corresponding text
   */
  static toText(value) {
    return numberRangeHelper.isValidNumber(value) ? value : ''
  }

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newText The new value of the text field.
   */
  onTextInput = (event, newText) => {
    const { onChange, comparator } = this.props
    onChange(NumericalCriterionComponent.toValue(newText), comparator)
  }

  /**
   * Callback function that is fired when the comparator's value changes.
   *
   * @param {String} comparator selected comparator
   */
  onComparatorSelected = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
  }

  render() {
    const {
      searchAttribute, comparator, value, availableComparators,
      fieldBoundType,
    } = this.props
    const { intl, muiTheme } = this.context

    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = isNil(lowerBound) && isNil(upperBound)
    return (
      <React.Fragment>
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <NumericalComparatorSelector
            operator={comparator}
            operators={availableComparators}
            onSelect={this.onComparatorSelected}
            disabled={hasNoValue}
          />
        </td>
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <TextField
            key="field"
            type="number" // TODO no!
            hintText={formatHintText(intl, searchAttribute, fieldBoundType)}
            title={formatTooltip(intl, searchAttribute)}
            value={NumericalCriterionComponent.toText(value)}
            fullWidth
            onChange={this.onTextInput}
            disabled={hasNoValue}
          />
        </td>
      </React.Fragment>)
  }
}

export default NumericalCriterionComponent
