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
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import styles from './styles'

/**
* Horizontal separator component, mainly used to separate a dynamic module from other ones
* @author Raphaël Mechali
*/
export class HorizontalAreasSeparator extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { horizontalSeparator: { rootStyle, lineStyle } } } = this.context
    return (
      <div style={rootStyle}>
        <div style={lineStyle} />
      </div>
    )
  }
}
export default withModuleStyle(styles)(HorizontalAreasSeparator)
