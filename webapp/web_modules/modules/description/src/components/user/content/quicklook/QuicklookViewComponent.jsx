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
import { UIShapes } from '@regardsoss/shape'
import QuicklookFilesListComponent from './QuicklookFilesListComponent'
import MagnifiedQuicklookPictureComponent from './MagnifiedQuicklookPictureComponent'
import NormalQuicklookPictureComponent from './NormalQuicklookPictureComponent'

/**
 * Shows:
 * - Quicklooks groups list, by their SD picture, on left, when mode is not magnified
 * - Current quiclook view mode render on center
 * @author Léo Mieulet
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class QuicklookViewComponent extends React.Component {
  static propTypes = {
    quicklookFiles: PropTypes.arrayOf(UIShapes.QuicklookDefinition).isRequired,
    scrollAreaHeight: PropTypes.number,
  }

  state = {
    groupIndex: 0,
    magnified: false,
  }

  /**
   * On user selected a group:
   */
  onSelectGroup = (groupIndex) => this.setState({ groupIndex })

  /**
   * On user click, toggle the zoom
   */
  onToggleMagnified = () => {
    const { magnified } = this.state
    this.setState({
      magnified: !magnified,
    })
  }

  render() {
    const { quicklookFiles, scrollAreaHeight } = this.props
    const { magnified, groupIndex } = this.state
    return (
      <>
        { /** Show quicklook groups list, when there are multiple groups and state is not magnified  */
          quicklookFiles.length > 1 && !magnified ? (
            <QuicklookFilesListComponent
              selectedIndex={groupIndex}
              quicklookFiles={quicklookFiles}
              onSelectGroup={this.onSelectGroup}
              scrollAreaHeight={scrollAreaHeight}
            />) : null
        }
        { /** Show current mode render */
          magnified ? (
            <MagnifiedQuicklookPictureComponent
              quicklookFile={quicklookFiles[groupIndex]}
              onToggleMagnified={this.onToggleMagnified}
            />) : (
              <NormalQuicklookPictureComponent
                hasOtherQuicklooks={quicklookFiles.length > 1}
                quicklookFile={quicklookFiles[groupIndex]}
                onToggleMagnified={this.onToggleMagnified}
              />)
        }
      </>
    )
  }
}
export default QuicklookViewComponent
