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
import { themeContextType } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'

/**
* Breadcrumb element displayer, to be built by a parent Breadcrumb
*/
class BreadcrumbElement extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    element: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    onAction: PropTypes.func.isRequired, // callback (element, index) => void
    label: PropTypes.string.isRequired,
    navigationAllowed: PropTypes.bool.isRequired,
    icon: PropTypes.node,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * On user click callback
   */
  onClick = () => {
    const {
      isLast, navigationAllowed, element, index, onAction,
    } = this.props
    // block onAction for last element and non navigable elements (already disabled)
    if (!isLast && navigationAllowed) {
      onAction(element, index)
    }
  }

  render() {
    const {
      isFirst, isLast, label, icon, navigationAllowed,
    } = this.props
    const {
      breadcrumbIcon,
      element: {
        navigable, nonNavigable, selectedLabelStyle, defaultLabelStyle,
      },
    } = this.context.moduleTheme.breadcrumb
    // is element selected? (last item, when it is not the first)
    const isSelected = isLast && !isFirst
    // When there is an icon, apply styles for it. (leave null otherwise)
    const styledIcon = icon ? HOCUtils.cloneChildrenWith(icon, {
      style: isSelected ? breadcrumbIcon.selectedStyle : breadcrumbIcon.defaultStyle,
    }) : null
    // compute root div style (to not show cursor when navigation is not allowed)
    let rootDivStyle = null
    if (isSelected) {
      rootDivStyle = nonNavigable.lastStyle
    } else if (!isLast && navigationAllowed) {
      rootDivStyle = navigable.style
    } else {
      rootDivStyle = nonNavigable.style
    }
    return (
      <div
        style={rootDivStyle}
        onClick={this.onClick}
        title={label}
      >
        {
          styledIcon
        }
        <div style={isSelected ? selectedLabelStyle : defaultLabelStyle}>
          {label}
        </div>

      </div>
    )
  }
}

export default BreadcrumbElement
