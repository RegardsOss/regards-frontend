/**
* LICENSE_PLACEHOLDER
**/
import ScrollArea from 'react-scrollbar'
import Measure from 'react-measure'
import { FormattedMessage } from 'react-intl'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import ModuleConfiguration from '../../model/ModuleConfiguration'
import GraphLevelDisplayerContainer from '../../containers/user/GraphLevelDisplayerContainer'

/**
* Search graph (collections explorer)
*/
class SearchGraph extends React.Component {

  static propTypes = {
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
    const { moduleConf: { graphLevels } } = this.props
    const { viewportStyles } = this.state
    const { moduleTheme: { user } } = this.context
    return (
      <Card>
        <CardTitle
          title={<FormattedMessage id="search.graph.title" />}
          subtitle={<FormattedMessage id="search.graph.subtitle" />}
        />
        <CardMedia>
          <div style={user.graph.styles}>
            <ScrollArea
              horizontal
              vertical={false}
              smoothScrolling
              horizontalContainerStyle={user.scrolling.horizontalScrollContainer.styles}
              horizontalScrollbarStyle={user.scrolling.horizontalScrollbar.styles}
              contentStyle={viewportStyles}
              ref={(scrollArea) => { this.scrollArea = scrollArea }}
            >
              <Measure onMeasure={this.onLevelsResized}>
                <div style={user.levels.styles}>
                  {graphLevels.map((levelModelName, index) => (
                    <GraphLevelDisplayerContainer key={levelModelName} levelModelName={levelModelName} levelIndex={index} />
                  ))}
                </div>
              </Measure>
            </ScrollArea>
          </div>
        </CardMedia>
      </Card >
    )
  }
}

export default SearchGraph
