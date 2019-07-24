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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'


/**
 * Formats a values range
 * @param {formatMessage: function} intl intl context
 * @param {string} lower lower bound text
 * @param {string} upper upper bound text
 */
export const getFormattedRange = (intl, lower, upper) => {
  const hasLower = !isNil(lower)
  const hasUpper = !isNil(upper)
  if (hasLower && hasUpper) {
    return intl.formatMessage({ id: 'value.render.range.full.label' }, { lower, upper })
  } if (hasUpper) {
    return intl.formatMessage({ id: 'value.render.range.upper.only.label' }, { upper })
  } if (hasLower) {
    return intl.formatMessage({ id: 'value.render.range.lower.only.label' }, { lower })
  }
  // undefined range
  return intl.formatMessage({ id: 'value.render.no.value.label' })
}

/**
 * Component to render ranged values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class RangeValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      lowerBound: PropTypes.any,
      upperBound: PropTypes.any,
    }),
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
    const value = this.props.value || {}
    const { multilineDisplay } = this.props
    const { intl, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const textValue = getFormattedRange(intl, value.lowerBound, value.upperBound)
      || intl.formatMessage({ id: 'value.render.no.value.label' })
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default RangeValueRender
