/**
* LICENSE_PLACEHOLDER
**/
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'

/**
* Loading displayer for
*/
class LoadingDisplayerComponent extends React.Component {

  static propTypes = {
    message: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { message } = this.props
    const { rootStyle, circleSize, circleThickness, messageStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.loading

    return (
      <div style={rootStyle} >
        <CircularProgress size={circleSize} thickness={circleThickness} />
        <div style={messageStyle}>{message}</div>
      </div>
    )
  }
}
export default LoadingDisplayerComponent
