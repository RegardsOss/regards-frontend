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
import SplitPane from 'react-split-pane'
import { UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { TableLayout } from '@regardsoss/components'
import { Measure } from '@regardsoss/adapters'
import { DescriptionEntity } from '../../shapes/DescriptionState'
import { TabTitlesConfiguration } from '../../shapes/ModuleConfiguration'
import HeaderBarComponent from './header/HeaderBarComponent'
import ContentDisplayComponent from './content/ContentDisplayComponent'
import BrowsingTreeComponent from './tree/BrowsingTreeComponent'

/**
 * Main description module component. It show entity description view and breadcrumb in table layout.
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class MainModuleComponent extends React.Component {
  static propTypes = {
    settings: UIShapes.UISettings.isRequired,
    descriptionEntity: DescriptionEntity.isRequired,
    selectedEntityIndex: PropTypes.number.isRequired,
    descriptionPath: PropTypes.arrayOf(DescriptionEntity).isRequired,
    allowSearching: PropTypes.bool,
    browsingTreeVisible: PropTypes.bool.isRequired,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
    // Callback: user selected an entity by its index in path (index: number) => ()
    onSelectEntityIndex: PropTypes.func.isRequired,
    // optional tab titles
    tabTitles: TabTitlesConfiguration,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Initial state */
  state = {
    width: null,
    height: undefined, // leave undefined to use a default value
    currentReziserPos: null,
    isTreeButtonToggled: true,
  }

  /**
   * Display or not tree pane
   */
  toggleTreeButton = () => {
    const { isTreeButtonToggled } = this.state
    this.setState({
      isTreeButtonToggled: !isTreeButtonToggled,
    })
  }

  /**
   * Manage reziser in order to save his position in state (used for toggleOn/Off tree)
   * @param {*} splitPosition
   */
  onSplitDroped = (splitPosition) => {
    this.setState({
      currentReziserPos: splitPosition,
    })
  }

  /**
   * Component was resized: store new position
   * Init resizer pos
   * @param {*} measuredElements measure elements with bounds
   */
  onComponentResized = ({ measureDiv: { width, height } }) => {
    const { muiTheme } = this.context
    this.setState({
      width: Math.ceil(width),
      height: Math.ceil(height),
      currentReziserPos: muiTheme.module.description.tree.minWidth,
    })
  }

  render() {
    const {
      settings, descriptionEntity, allowSearching, browsingTreeVisible, isDescriptionAllowed, descriptionPath,
      selectedEntityIndex, onSelectInnerLink, onSelectEntityLink, onSearchWord, onSearchEntity, onSelectEntityIndex,
      tabTitles,
    } = this.props
    const {
      width, height, isTreeButtonToggled, currentReziserPos,
    } = this.state
    const {
      moduleTheme: {
        user: {
          main: {
            root, resizer, paneStyle, pane2Style,
          },
        },
      },
    } = this.context

    return (
      <TableLayout>
        <HeaderBarComponent
          settings={settings}
          descriptionEntity={descriptionEntity}
          selectedEntityIndex={selectedEntityIndex}
          descriptionPath={descriptionPath}
          allowSearching={allowSearching}
          onSelectEntityIndex={onSelectEntityIndex}
          onSearchEntity={onSearchEntity}
          toggleTreeButton={this.toggleTreeButton}
        />
        <Measure bounds onMeasure={this.onComponentResized}>
          {({ bind }) => (
            <div style={root} {...bind('measureDiv')}>
              <SplitPane
                split="vertical"
                size={isTreeButtonToggled ? currentReziserPos : 0}
                minSize={paneStyle.minWidth}
                maxSize={width - paneStyle.minWidth}
                resizerStyle={isTreeButtonToggled ? resizer : null}
                onDragFinished={this.onSplitDroped}
                pane2Style={pane2Style}
              >
                {/* Left: Tree */}
                <BrowsingTreeComponent
                  allowSearching={allowSearching}
                  browsingTreeVisible={browsingTreeVisible}
                  descriptionEntity={descriptionEntity}
                  isDescriptionAllowed={isDescriptionAllowed}
                  onSelectInnerLink={onSelectInnerLink}
                  onSelectEntityLink={onSelectEntityLink}
                  onSearchWord={onSearchWord}
                  onSearchEntity={onSearchEntity}
                  scrollAreaHeight={height}
                  tabTitles={tabTitles}
                />
                {/* Right : Content */}
                <ContentDisplayComponent
                  descriptionEntity={descriptionEntity}
                  isDescriptionAllowed={isDescriptionAllowed}
                  allowSearching={allowSearching}
                  onSelectInnerLink={onSelectInnerLink}
                  onSelectEntityLink={onSelectEntityLink}
                  onSearchWord={onSearchWord}
                  onSearchEntity={onSearchEntity}
                  scrollAreaHeight={height}
                />
              </SplitPane>
            </div>
          )}
        </Measure>
      </TableLayout>
    )
  }
}
export default MainModuleComponent
