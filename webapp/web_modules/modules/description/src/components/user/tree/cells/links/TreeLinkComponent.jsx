/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

/**
 * A tree link component (may also be used to represent simple text disabling it)
 * @author Raphaël Mechali
 */
class TreeLinkComponent extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired, // Link text
    tooltip: PropTypes.string, // Optional tooltip
    selected: PropTypes.bool.isRequired, // is selected?
    disabled: PropTypes.bool.isRequired, // is link disabled?
    IconConstructor: PropTypes.func, // optional icon constructor
    section: PropTypes.bool.isRequired, // Handle as section (true) or as simple element (false)?
    onClick: PropTypes.func, // on link clicked (only when link, unused when disabled)
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      text, tooltip, selected, disabled,
      IconConstructor, section, onClick,
    } = this.props
    const { moduleTheme: { user: { main: { tree: { cell } } } } } = this.context

    // select current state styles
    const stateStyles = selected ? cell.selected : cell.unselected
    // select state text style
    let textStyle = null
    if (disabled) {
      textStyle = section ? stateStyles.sectionText : stateStyles.elementText
    } else {
      textStyle = section ? stateStyles.sectionLink : stateStyles.elementLink
    }

    return (
      <div
        title={tooltip}
        onClick={disabled ? null : onClick}
        style={disabled ? cell.text : cell.link}
      >
        {/* 1. icon: shown when icon constructor is provided AND link is enabled */
            IconConstructor && !disabled ? (
              <IconConstructor
                style={cell.icon}
                color={stateStyles.iconColor}
              />) : null
          }
        {/* 2. Text (as link when not disabled) */}
        <div style={textStyle}>
          {text}
        </div>
      </div>
    )
  }
}
export default TreeLinkComponent
