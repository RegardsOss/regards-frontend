/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DynamicModulePane } from '@regardsoss/components'
import { Measure, ScrollArea } from '@regardsoss/adapters'
import { dependencies } from '../../user-dependencies'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
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
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentWillMount = () => {
    // initialize state
    this.updateForLevelsWidth()
  }

  onLevelsResized = ({ measureDiv: { width } }) => {
    // A - update for level width
    this.updateForLevelsWidth(width)
    // B - make sure scroll component sticks on right level
    if (this.scrollArea) {
      this.scrollArea.scrollRight()
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
      moduleConf, expanded, graphDatasetAttributes,
      ...moduleProps
    } = this.props
    const { viewportStyles } = this.state
    const { moduleTheme: { user } } = this.context

    // header options
    const headerOptionsComponents = [
      <ToggleDatasetDetailsContainer
        key="toggle.datasets.visible"
        graphDatasetAttributes={graphDatasetAttributes}
      />]

    const graphLevels = get(moduleConf, 'graphLevels', [])

    return (
      <DynamicModulePane
        {...moduleProps}
        moduleConf={moduleConf}
        expanded={expanded}
        options={headerOptionsComponents}
        requiredDependencies={dependencies}
      >
        { /* Graph horizontal scroll area, holding columns */}
        <ScrollArea
          horizontal
          vertical={false}
          smoothScrolling
          contentStyle={viewportStyles}
          ref={(scrollArea) => { this.scrollArea = scrollArea }}
        >
          <Measure bounds onMeasure={this.onLevelsResized}>
            {
              ({ bind }) => (
                <div style={user.levels.styles} {...bind('measureDiv')} >
                  {graphLevels.map((levelModelName, index) => (
                    <GraphLevelDisplayerContainer
                      graphDatasetAttributes={graphDatasetAttributes}
                      key={levelModelName}
                      levelModelName={levelModelName}
                      levelIndex={index}
                      isFirstLevel={index === 0}
                      isLastLevel={false}
                    />
                  ))}
                  {/* Last level to show datasets */}
                  <GraphLevelDisplayerContainer
                    graphDatasetAttributes={graphDatasetAttributes}
                    key="last.level.datasets.only"
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
