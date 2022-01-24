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
 * A page element: shows children in element layout
 * @author Raphaël Mechali
 */
class PageElement extends React.Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { user: { main: { content: { listPage } } } } } = this.context
    const { children } = this.props
    return (
      <div style={listPage.elementContainer}>
        {HOCUtils.renderChildren(children)}
      </div>
    )
  }
}
export default PageElement
