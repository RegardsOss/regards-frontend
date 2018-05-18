/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import { Title } from '@regardsoss/components'

/**
 * A presentation form group for module form (diminuation of boiler plate code! =D)
 * @author Raphaël Mechali
 */
class FormGroup extends React.Component {
  static propTypes = {
    // when title is not provide, only the layout will render
    titleKey: PropTypes.string,
    spanFullWidth: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    spanFullWidth: false,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { titleKey, spanFullWidth, children } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { formGroup: { defaultClass, defaultStyle, fullWidthClass } } } } = this.context
    return (
      <div
        style={spanFullWidth ? null : defaultStyle}
        className={spanFullWidth ? fullWidthClass : defaultClass}
      >
        {
          titleKey ? (
            <Title
              level={3}
              label={formatMessage({ id: titleKey })}
            />) : null
        }
        {HOCUtils.renderChildren(children)}
      </div >
    )
  }
}
export default FormGroup
