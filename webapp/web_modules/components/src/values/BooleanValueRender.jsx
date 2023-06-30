/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isBoolean from 'lodash/isBoolean'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Component to display Boolean values group value.
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 * Note 2: when using this render outside table, provide context using withValuesRenderContext method
 *
 * @author Sébastien binda
 */
class BooleanValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
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
    const { value, multilineDisplay } = this.props
    const { intl: { formatMessage }, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    let textValue
    if (isBoolean(value)) {
      textValue = String(value)
    } else {
      textValue = value || formatMessage({ id: 'value.render.no.value.label' })
    }
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default BooleanValueRender
