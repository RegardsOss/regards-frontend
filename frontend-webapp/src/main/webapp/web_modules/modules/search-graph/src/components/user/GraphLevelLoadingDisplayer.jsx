/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
* Level loading displayer
*/
class GraphLevelLoadingDisplayer extends React.Component {

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { user: { levelLoading } } } = this.context
    return (
      <div style={levelLoading.styles}>
        <CircularProgress {...levelLoading.progressConfiguration} />
      </div>)
  }
}
export default GraphLevelLoadingDisplayer
