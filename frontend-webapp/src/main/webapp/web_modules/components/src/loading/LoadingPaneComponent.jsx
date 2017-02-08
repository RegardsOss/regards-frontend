/**
 * LICENSE_PLACEHOLDER
 */
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
 * Shows loading with title and subtitle (optional)
 */
class LoadingPaneComponent extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subtitle: React.PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { title, subtitle } = this.props
    const { moduleTheme } = this.context
    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle

              title={title}
              subtitle={subtitle}
            />}
        >
          <div style={moduleTheme.finishAccountUnlock.loadingContainer.style}>
            <CircularProgress size={moduleTheme.finishAccountUnlock.loadingContainer.loadingComponent.size} />
          </div>
        </CardMedia>
      </Card>
    )
  }
}

export default LoadingPaneComponent
