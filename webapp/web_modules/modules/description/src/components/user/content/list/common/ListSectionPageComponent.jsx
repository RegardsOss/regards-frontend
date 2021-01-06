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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'

/**
 * A list section page: shows elements as list
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class ListSectionPageComponent extends React.Component {
  static propTypes = {
    // elements list (min length: 1)
    elements: PropTypes.arrayOf(PropTypes.any).isRequired,
    scrollAreaHeight: PropTypes.number,
    // function to build graphics for an element model: (element:*) => (graphics: React.Element)
    buildElementNode: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { moduleTheme: { user: { main: { content: { listPage, scrolling } } } } } = this.context
    const { elements, buildElementNode, scrollAreaHeight } = this.props

    // Compute scroll height area
    const style = {
      ...scrolling.scrollArea,
      height: scrollAreaHeight,
    }

    return (
      <ScrollArea vertical contentStyle={scrolling.scrollAreaContent} style={style}>
        {/* Root container: decoralates list dimensions of the scroll area dimensions (spanning otherwise) */}
        <div style={listPage.contentRoot}>
          {/* List elements container */}
          <div style={listPage.listContainer}>
            { /** Build a node for each element */
            elements.map(buildElementNode)
            }
          </div>
        </div>
      </ScrollArea>
    )
  }
}
export default ListSectionPageComponent
