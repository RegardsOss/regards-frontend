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
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { ScrollArea } from '@regardsoss/adapters'
import QuicklookFilePreviewComponent from './QuicklookFilePreviewComponent'

/**
 * Shows quicklook groups list, using QUICKLOOK_SD picture. Displays selected group and allows user picking a new one
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class QuicklookFilesListComponent extends React.Component {
  static propTypes = {
    selectedIndex: PropTypes.number.isRequired,
    quicklookFiles: PropTypes.arrayOf(UIShapes.QuicklookDefinition).isRequired,
    scrollAreaHeight: PropTypes.number,
    onSelectGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      selectedIndex, quicklookFiles, onSelectGroup, scrollAreaHeight,
    } = this.props
    const {
      moduleTheme: {
        user: {
          main: {
            content: {
              quicklook: {
                groupLists: {
                  scrollArea, scrollAreaContent, listContainer, picturesSeparator,
                },
              },
            },
          },
        },
      },
    } = this.context

    // Compute scroll height area
    const style = {
      ...scrollArea,
      height: scrollAreaHeight,
    }

    return (
      <ScrollArea vertical contentStyle={scrollAreaContent} style={style}>
        <div style={listContainer}>
          { /** For each group, add picture displayer / selector and previous group separator */
            quicklookFiles.map((quicklookFile, index) => [
              // add separator when not first element
              index ? <div key={`group.separator.${quicklookFile.label || 'unknown'}`} style={picturesSeparator} /> : null,
              <QuicklookFilePreviewComponent
                key={quicklookFile.label || 'unknown'}
                groupIndex={index}
                selected={index === selectedIndex}
                quicklookFile={quicklookFile}
                onSelectGroup={onSelectGroup}
              />,
            ])
          }
        </div>

      </ScrollArea>

    )
  }
}
export default QuicklookFilesListComponent
