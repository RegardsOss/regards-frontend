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
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import FieldTitle from './FieldTitle'
import styles from '../../styles'

/**
 * A presentation fields group for forms, to be used with a FormPresentation, in FormRow
 * Note: as it is an HOC, it stack context to let its children render in parent context
 *
 * @author Raphaël Mechali
 */
class FieldsGroup extends React.Component {
  static propTypes = {
    // when title is not provided, only the layout will render
    title: PropTypes.string,
    spanFullWidth: PropTypes.bool,
    clearSpaceToChildren: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    clearSpaceToChildren: false,
    spanFullWidth: false,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      title, clearSpaceToChildren, spanFullWidth, children,
    } = this.props
    const {
      moduleTheme: {
        fieldsGroup: {
          defaultClass, defaultStyle, fullWidthClass,
          defaultContentStyle, clearSpaceToChildrenStyle,
        },
      },
    } = this.context
    return (
      <div
        style={spanFullWidth ? null : defaultStyle}
        className={spanFullWidth ? fullWidthClass : defaultClass}
      >
        <FieldTitle label={title} />
        <div style={clearSpaceToChildren ? clearSpaceToChildrenStyle : defaultContentStyle}>
          {HOCUtils.renderChildren(children)}
        </div>
      </div>
    )
  }
}

export default withModuleStyle(styles, true)(FieldsGroup)
