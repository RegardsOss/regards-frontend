/**
 * LICENSE_PLACEHOLDER
 */
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import CircularProgress from 'material-ui/CircularProgress'

/**
 * Shows loading with title and subtitle (optional)
 */
class LoadingPaneComponent extends React.Component {

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    // styles: no specific
    // eslint-disable-next-line
    containerStyle: PropTypes.object,
    loadingComponentSize: PropTypes.number,
  }

  static defaultProps = {
    containerStyle: {
      display: 'flex',
      flexDirection: 'horizontal',
      paddingBottom: '90px',
      alignItems: 'center',
      height: '330px',
      justifyContent: 'space-around',
    },
    loadingComponentSize: 150,
  }

  render() {
    const { title, subtitle, containerStyle, loadingComponentSize } = this.props
    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={title}
              subtitle={subtitle}
            />}
        >
          <div style={containerStyle}>
            <CircularProgress size={loadingComponentSize} />
          </div>
        </CardMedia>
      </Card>
    )
  }
}

export default LoadingPaneComponent
