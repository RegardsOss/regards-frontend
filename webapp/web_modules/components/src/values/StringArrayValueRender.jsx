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
 * Component to display string values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class StringArrayValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.arrayOf(PropTypes.string),
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
    const value = this.props.value || []
    const { multilineDisplay } = this.props
    const { intl, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const noValueText = intl.formatMessage({ id: 'value.render.no.value.label' })
    const textValue = value.map((text) => isNil(text) ? noValueText : text).join(intl.formatMessage({ id: 'value.render.array.values.separator' }))
      || noValueText
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default StringArrayValueRender
