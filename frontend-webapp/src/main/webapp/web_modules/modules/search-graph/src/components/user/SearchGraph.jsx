/**
* LICENSE_PLACEHOLDER
**/
import Measure from 'react-measure'
import { Card, CardMedia } from 'material-ui/Card'
import { ScrollArea } from '@regardsoss/adapters'
import { themeContextType } from '@regardsoss/theme'
import { ShowableAtRender } from '@regardsoss/components'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import { DatasetAttributesArrayForGraph } from '../../model/DatasetAttributesForGraph'
import SearchGraphHeaderContainer from '../../containers/user/SearchGraphHeaderContainer'
import GraphLevelDisplayerContainer from '../../containers/user/GraphLevelDisplayerContainer'
import DescriptionContainer from '../../containers/user/DescriptionContainer'

/**
* Search graph (collections explorer)
*/
class SearchGraph extends React.Component {

  static propTypes = {
    graphDatasetAttributes: DatasetAttributesArrayForGraph.isRequired, // graph dataset attributes, required, but empty array is allowed
    moduleCollapsed: React.PropTypes.bool.isRequired, // is module collapsed
    moduleConf: ModuleConfiguration.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    // initialize state
    this.updateForLevelsWidth()
  }

  onLevelsResized = ({ width }) => {
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
    const { moduleConf: { graphLevels }, moduleCollapsed, graphDatasetAttributes } = this.props
    const { viewportStyles } = this.state
    const { moduleTheme: { user } } = this.context
    return (
      <Card style={user.styles}>
        { /* Graph Heeader */}
        <SearchGraphHeaderContainer graphDatasetAttributes={graphDatasetAttributes} />
        { /* Graph horizontal scroll area, holding columns */}
        <ShowableAtRender show={!moduleCollapsed}>
          <CardMedia>
            <div style={user.graph.styles}>
              <ScrollArea
                horizontal
                vertical={false}
                smoothScrolling
                contentStyle={viewportStyles}
                ref={(scrollArea) => { this.scrollArea = scrollArea }}
              >
                <Measure onMeasure={this.onLevelsResized}>
                  <div style={user.levels.styles}>
                    {graphLevels.map((levelModelName, index) => (
                      <GraphLevelDisplayerContainer
                        graphDatasetAttributes={graphDatasetAttributes}
                        key={levelModelName}
                        levelModelName={levelModelName}
                        levelIndex={index}
                        isFirstLevel={index === 0}
                        isLastLevel={index === (graphLevels.length - 1)}
                      />
                    ))}
                  </div>
                </Measure>
              </ScrollArea>
            </div>
          </CardMedia>
        </ShowableAtRender>
        { /* Items description dialog (one instance for the whole graph) */}
        <DescriptionContainer />
      </Card >
    )
  }
}

export default SearchGraph
