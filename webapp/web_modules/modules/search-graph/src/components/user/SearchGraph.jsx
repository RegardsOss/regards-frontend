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
import get from 'lodash/get'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModulePane } from '@regardsoss/components'
import { Measure, ScrollArea } from '@regardsoss/adapters'
import { UIDomain } from '@regardsoss/domain'
import { dependencies } from '../../user-dependencies'
import ModuleConfiguration from '../../shapes/ModuleConfiguration'
import { DatasetAttributesArrayForGraph } from '../../shapes/DatasetAttributesForGraph'
import { DescriptionProperties } from '../../shapes/DescriptionProperties'
import GraphLevelDisplayerContainer from '../../containers/user/GraphLevelDisplayerContainer'
import ToggleDatasetDetailsContainer from '../../containers/user/ToggleDatasetDetailsContainer'

/**
* Search graph (collections explorer)
*/
class SearchGraph extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration.isRequired,
    presentationState: PropTypes.oneOf(UIDomain.PRESENTATION_STATE).isRequired,
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    // From description HOC (not required as it comes from HOC, after initialization)
    descriptionProperties: DescriptionProperties,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Scroll area reference */
  scrollArea = React.createRef()

  UNSAFE_componentWillMount = () => {
    // initialize state
    this.updateForLevelsWidth()
  }

  onLevelsResized = ({ measureDiv: { width } }) => {
    // A - update for level width
    this.updateForLevelsWidth(width)
    // B - make sure scroll component sticks on right level
    if (this.scrollArea.current) {
      this.scrollArea.current.scrollRight()
    }
  }

  updateForLevelsWidth = (width = 0) => {
    const currentViewportWidth = this.state ? this.state.currentViewportWidth : null
    if (width !== currentViewportWidth) {
      const { moduleTheme: { user } } = this.context
      // update styles reference, to not build it when rendering
      this.setState({
        viewportStyles: {
          width,
          ...user.graphScrollableContent.styles,
        },
      })
    }
  }

  render() {
    const {
      moduleConf, graphDatasetAttributes,
      descriptionProperties, presentationState, ...moduleProps
    } = this.props
    const { viewportStyles } = this.state
    const { moduleTheme: { user } } = this.context

    // header options
    const graphLevels = get(moduleConf, 'graphLevels', [])

    return (
      <DynamicModulePane
        {...moduleProps}
        moduleConf={moduleConf}
        // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
        options={[ // eslint wont fix: react accepts only one children list by parent, two would be required here
          <ToggleDatasetDetailsContainer
            key="toggle.datasets.visible"
            graphDatasetAttributes={graphDatasetAttributes}
          />]}
        requiredDependencies={dependencies}
        mainModule={false}
      >
        { /* Graph horizontal scroll area, holding columns */}
        <ScrollArea
          horizontal
          vertical
          smoothScrolling
          style={presentationState === UIDomain.PRESENTATION_STATE_ENUM.MAXIMIZED
            ? user.scrollArea.fullscreenStyles
            : user.scrollArea.defaultStyles} // limit height in normal and fullscreen modes
          contentStyle={viewportStyles}
          ref={this.scrollArea}
        >
          <Measure bounds onMeasure={this.onLevelsResized}>
            {
              ({ bind }) => (
                <div style={user.levels.styles} {...bind('measureDiv')}>
                  {graphLevels.map((levelModelName, index) => (
                    <GraphLevelDisplayerContainer
                      key={levelModelName}
                      graphDatasetAttributes={graphDatasetAttributes}
                      descriptionProperties={descriptionProperties}
                      levelModelName={levelModelName}
                      levelIndex={index}
                      isFirstLevel={index === 0}
                      isLastLevel={false}
                    />
                  ))}
                  {/* Last level to show datasets */}
                  <GraphLevelDisplayerContainer
                    key="last.level.datasets.only"
                    graphDatasetAttributes={graphDatasetAttributes}
                    descriptionProperties={descriptionProperties}
                    levelModelName={null}
                    levelIndex={graphLevels.length}
                    isFirstLevel={graphLevels.length === 0}
                    isLastLevel
                  />
                </div>)
            }
          </Measure>
        </ScrollArea>
      </DynamicModulePane>
    )
  }
}

export default SearchGraph
