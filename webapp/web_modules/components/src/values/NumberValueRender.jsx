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
  static unitless = 'unitless'

  render() {
    const { value, unit, multilineDisplay } = this.props
    const { intl: { formatMessage, formatNumber }, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    let textValue
    // No value
    if (isNil(value)) {
      textValue = formatMessage({ id: 'value.render.no.value.label' })
    } else if (!unit || unit.toLowerCase() === NumberValueRender.unitless) {
      // no unit
      textValue = value
    } else {
      // unit: is a known scalable unit?
      const storageUnit = storage.StorageUnitScale.getMatchingUnit(unit)
      if (storageUnit) {
        const valueWithUnit = new storage.StorageCapacity(value, storageUnit).scaleAndConvert(storageUnit.scale)
        textValue = storage.formatStorageCapacity(formatMessage, formatNumber, valueWithUnit)
      } else {
        textValue = `${value}${unit}`
      }
    }

    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default withI18n(storage.messages, true)(NumberValueRender)
