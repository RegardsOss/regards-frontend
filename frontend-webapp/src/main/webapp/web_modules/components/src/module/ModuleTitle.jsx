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
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import styles from './styles'

/**
* Common dynamic modules title (when not using a breadcrumb)
* @author Raphaël Mechali
*/
export class ModuleTitle extends React.Component {
  static propTypes = {
    icon: PropTypes.node,
    text: PropTypes.string.isRequired,
    tooltip: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { icon, text, tooltip } = this.props
    const { moduleTheme: { moduleTitle } } = this.context
    // TODO enforce icon style
    return (
      <div style={moduleTitle.style} title={tooltip}>
        { // icon if any
          icon || null
        }
        <div style={moduleTitle.labelStyle}>
          {text}
        </div >
      </div>
    )
  }
}
export default withModuleStyle(styles)(ModuleTitle)
