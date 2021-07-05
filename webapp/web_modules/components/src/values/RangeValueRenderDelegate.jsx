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
import isNil from 'lodash/isNil'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to render ranged values group value.
 * Note: It is a delegate for other renders and therefore it is not compatible with table with a ValuesRenderCell API (it does not expect value in properties)
 *
 * @author Sébastien binda
 */
class RangeValueRenderDelegate extends React.Component {
  /**
   * Formats a values range
   * @param {formatMessage: function} intl intl context
   * @param {string} lower lower bound text
   * @param {string} upper upper bound text
   * @param {boolean} noValue if lower and upper are Nil, should it be
   * considered infinite range or no data?
   * @return {string} formatted range text
   */
  static getFormattedRange = (intl, lower, upper, noValue) => {
    const hasLower = !isNil(lower)
    const hasUpper = !isNil(upper)
    if (hasLower && hasUpper) {
      return intl.formatMessage({ id: 'value.render.range.full.label' }, { lower, upper })
    }
    if (hasUpper) {
      return intl.formatMessage({ id: 'value.render.range.upper.only.label' }, { upper })
    }
    if (hasLower) {
      return intl.formatMessage({ id: 'value.render.range.lower.only.label' }, { lower })
    }
    // undefined or infinite range
    return intl.formatMessage({ id: noValue ? 'value.render.no.value.label' : 'value.render.range.infinite.label' })
  }

  static propTypes = {
    // is no value or infinite range (used only when ?
    noValue: PropTypes.bool.isRequired,
    // Formatted lower bound when there is one
    lowerBound: PropTypes.string,
    // Formatted upper bound when there is one
    upperBound: PropTypes.string,
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

  render() {
    const {
      multilineDisplay, noValue, lowerBound, upperBound,
    } = this.props
    const { intl, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const textValue = RangeValueRenderDelegate.getFormattedRange(intl, lowerBound, upperBound, noValue)
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default RangeValueRenderDelegate
