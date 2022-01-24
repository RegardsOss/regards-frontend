/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'

/**
 * Component to display number value values
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
export class NumberValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    precision: PropTypes.number,
    unit: PropTypes.string,
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** No unit constant */
  static UNITLESS = 'unitless'

  /**
   * Formats a value, given intl context, precision and unit
   * @param {*} intl intl context
   * @param {number} value (nil means none)
   * @param {number} precision (nil means none)
   * @param {*} unit (nil means none)
   * @return {string} formatted value when there is a value, null otherwise
   */
  static formatValue(intl, value, precision, unit) {
    // A - Nil value => null
    if (isNil(value)) {
      return null
    }
    // B - Prepare format options to take precision in account (no option when none)
    const numberFormatOptions = precision ? {
      minimumFractionDigits: Math.round(precision),
      maximumFractionDigits: Math.round(precision),
    } : null

    // C - Format number, taking unit in account
    const isNoUnit = !unit || unit.toLowerCase() === NumberValueRender.UNITLESS
    if (!isNoUnit) {
      // C.1 - There is a unit and...
      const storageUnit = storage.StorageUnitScale.getMatchingUnit(unit)
      if (storageUnit) {
        // ... (C.1) it is a storage unit, delegate localization to storage helpers
        const valueWithUnit = new storage.StorageCapacity(value, storageUnit).scaleAndConvert(storageUnit.scale)
        return storage.formatStorageCapacity(intl.formatMessage, intl.formatNumber, valueWithUnit, numberFormatOptions)
      }
    }
    // OR C.2 - Unit is simple string type: format number with precision (or toString when none) and default unit if undefined
    return `${numberFormatOptions ? intl.formatNumber(value, numberFormatOptions) : value}${isNoUnit ? '' : unit}`
  }

  render() {
    const {
      value, precision, unit, multilineDisplay,
    } = this.props
    const { intl, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const textValue = NumberValueRender.formatValue(intl, value, precision, unit) || intl.formatMessage({ id: 'value.render.no.value.label' })

    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue }
      </div>)
  }
}

// report context and static methods for API imports ease
const WithContext = withI18n(storage.messages, true)(NumberValueRender)
WithContext.UNITLESS = NumberValueRender.UNITLESS
WithContext.formatValue = NumberValueRender.formatValue
export default WithContext
