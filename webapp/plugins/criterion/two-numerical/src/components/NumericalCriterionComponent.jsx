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
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip,
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
    error: PropTypes.bool.isRequired,
    value: PropTypes.string,
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

  /** Error text placeholder (used to display empty error on text field) */
  static ERROR_TEXT_PLACEHOLDER = ' '

  /**
   * Callback function that is fired when the textfield's value changes.
   *
   * @param {Object} event Change event targeting the text field.
   * @param {String} newText The new value of the text field.
   */
  onTextChange = (event, newText) => {
    const { onChange, comparator } = this.props
    onChange(newText, comparator)
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
      searchAttribute, error, value,
      comparator, availableComparators,
      fieldBoundType,
    } = this.props
    const { intl, muiTheme } = this.context

    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNoValue = isNil(lowerBound) && isNil(upperBound)
    return (
      <>
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
            hintText={formatHintText(intl, searchAttribute, fieldBoundType)}
            title={formatTooltip(intl, searchAttribute)}
            errorText={error ? NumericalCriterionComponent.ERROR_TEXT_PLACEHOLDER : null}
            value={value}
            fullWidth
            onChange={this.onTextChange}
            disabled={hasNoValue}
          />
        </td>
      </>)
  }
}

export default NumericalCriterionComponent
