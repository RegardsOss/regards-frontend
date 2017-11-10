/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'


/**
 * Formats a values range
 * @param {formatMessage: function} intl intl context
 * @param {string} lower lower bound text
 * @param {string} upper upper bound text
 */
export const getFormattedRange = (intl, lower, upper) => {
  if (upper && lower) {
    return intl.formatMessage({ id: 'attribute.render.range.full.label' }, { lower, upper })
  } else if (upper) {
    return intl.formatMessage({ id: 'attribute.render.range.upper.only.label' }, { upper })
  } else if (lower) {
    return intl.formatMessage({ id: 'attribute.render.range.lower.only.label' }, { lower })
  }
  // undefined range
  return null
}

/**
 * Component to render ranged attributes group value
 *
 * @author Sébastien binda
 */
class RangeAttributeRender extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      lowerBound: PropTypes.any,
      upperBound: PropTypes.any,
    }),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { value = {} } = this.props
    const { intl, moduleTheme: { textRenderCell } } = this.context
    const textValue = getFormattedRange(intl, value.lowerBound, value.upperBound) ||
      intl.formatMessage({ id: 'attribute.render.no.value.label' })
    return (
      <div style={textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }

}

export default compose(withModuleStyle(styles, true), withI18n(messages, true))(RangeAttributeRender)

