/**
 * LICENSE_PLACEHOLDER
 */
import { themeContextType } from '@regardsoss/theme'

/**
 * A link with picture, usable in already overloaded screens to make it look 'lighter'
 */
class PictureLinkComponent extends React.Component {

  static propTypes = {
    text: React.PropTypes.string.isRequired,
    IconComponent: React.PropTypes.constructor.isRequired,

    // eslint-disable-next-line react/forbid-prop-types
    iconStyles: React.PropTypes.object,
    iconToTextGap: React.PropTypes.string,
    defaultTextColor: React.PropTypes.string,
    overTextColor: React.PropTypes.string,
    defaultImageColor: React.PropTypes.string,
    overImageColor: React.PropTypes.string,
  }

  static defaultProps = {
    iconStyles: {
      width: '20x',
      height: '20px',
    },
    iconToTextGap: '5px',
  }

  /** Inject current theme */
  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    this.switchOver(false)
  }

  switchOver = (isOver) => {
    this.setState({
      isOver,
    })
  }

  render() {
    const { text, IconComponent, iconStyles, iconToTextGap } = this.props
    const { isOver } = this.state
    const { palette } = this.context.muiTheme

    // compute text colors according with provided properties (use some default otherwise)
    let { defaultTextColor, overTextColor, defaultImageColor, overImageColor } = this.props
    defaultTextColor = defaultTextColor || palette.textColor
    defaultImageColor = defaultImageColor || palette.primary2Color
    overTextColor = overTextColor || palette.primary1Color
    overImageColor = overImageColor || palette.primary1Color

    // compute the colors to use in current state
    const textColor = isOver ? overTextColor : defaultTextColor
    const iconColor = isOver ? overImageColor : defaultImageColor
    return (
      <div
        onMouseOut={() => this.switchOver(false)}
        onMouseOver={() => this.switchOver(true)}
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
      >
        <div style={{ flexGrow: '0', flexShrink: '0' }}>
          <IconComponent style={{ color: iconColor, ...iconStyles }} />
        </div>
        <div style={{ color: textColor, textAlign: 'center', flexGrow: '1', flexShrink: '1', marginLeft: iconToTextGap }}>
          {text}
        </div>
      </div>
    )
  }
}

export default PictureLinkComponent
