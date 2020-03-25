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
import TextField from 'material-ui/TextField'
import { CommonDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { NumericalComparatorSelector } from '@regardsoss/components'
import {
  AttributeModelWithBounds, BOUND_TYPE, formatHintText, formatTooltip, numberRangeHelper,
} from '@regardsoss/plugins-api'

/**
 * Main criterion component
 * @author Raphaël Mechali
 */
class NumericalCriterionComponent extends React.Component {
  static propTypes = {
    label: UIShapes.IntlMessage.isRequired,
    searchAttribute: AttributeModelWithBounds.isRequired,
    value: PropTypes.number,
    operator: PropTypes.oneOf(CommonDomain.EnumNumericalComparators).isRequired,
    availableComparators: PropTypes.arrayOf(PropTypes.oneOf(CommonDomain.EnumNumericalComparators)).isRequired,
    onTextInput: PropTypes.func.isRequired,
    onOperatorSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    // enable plugin theme access through this.context
    ...themeContextType,
    // enable i18n access trhough this.context
    ...i18nContextType,
  }

  /**
    * Parses the value given from the field input component.
    * @param {string} text text
    * @return {Number} parsed value (maybe null / undefined / Number.NaN)
    */
  static toValue(text) {
    return parseFloat(text)
  }

  /**
    * Formats the value before displaying in the field input component.
    * @param {number} value value to format (maybe null / undefined / Number.NaN)
    * @return {string} formatted value
    */
  static toText(value) {
    return numberRangeHelper.isValidNumber(value) ? value : ''
  }


  render() {
    const {
      label, searchAttribute,
      value, operator, availableComparators,
      onTextInput, onOperatorSelected,
    } = this.props
    const { intl, muiTheme } = this.context

    // compute no value state with attribute bounds
    const { lowerBound, upperBound } = searchAttribute.boundsInformation
    const hasNovalue = isNil(lowerBound) && isNil(upperBound)

    return (
      <tr>
        {/* 1. label */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.firstCell}>
          {label[intl.locale] || searchAttribute.label}
        </td>
        {/* 2. Comparison selector */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <NumericalComparatorSelector
            operator={operator}
            operators={availableComparators}
            onSelect={onOperatorSelected}
            disabled={hasNovalue}
          />
        </td>
        {/* 3. input box */}
        <td style={muiTheme.module.searchResults.searchPane.criteria.nextCell}>
          <TextField
            id="search"
            type="number" // TODO NO NO NO NO NO, never!
            hintText={formatHintText(intl, searchAttribute, BOUND_TYPE.ANY_BOUND)}
            title={formatTooltip(intl, searchAttribute)}
            value={NumericalCriterionComponent.toText(value)}
            onChange={onTextInput}
            disabled={hasNovalue}
            fullWidth
          />
        </td>
      </tr>
    )
  }
}
export default NumericalCriterionComponent
