/**
 * LICENSE_PLACEHOLDER
 */
import { themeContextType } from '@regardsoss/theme'

/**
 * A link with picture, usable in already overloaded screens to make it look 'lighter'
 */
class PictureLinkComponent extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    text: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    IconComponent: React.PropTypes.func.isRequired,
    onAction: React.PropTypes.func.isRequired,
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
    const { id, disabled, onAction, text, IconComponent, iconStyles, iconToTextGap } = this.props
    const { isOver } = this.state
    const { palette } = this.context.muiTheme

    // compute text colors according with provided properties (use some default otherwise)
    let { defaultTextColor, overTextColor, defaultImageColor, overImageColor } = this.props
    defaultTextColor = defaultTextColor || palette.textColor
    defaultImageColor = defaultImageColor || palette.primary2Color
    overTextColor = overTextColor || palette.primary1Color
    overImageColor = overImageColor || palette.primary1Color

    // compute the colors to use in current state
    let textColor
    let iconColor
    if (disabled) {
      [textColor, iconColor] = [palette.disabledColor, palette.disabledColor]
    } else if (isOver) {
      [textColor, iconColor] = [overTextColor, overImageColor]
    } else {
      [textColor, iconColor] = [defaultTextColor, defaultImageColor]
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions*/
    return (
      <div
        id={id}
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
        onClick={() => !disabled && onAction()}
        onMouseOut={() => this.switchOver(false)}
        onMouseOver={() => this.switchOver(true)}
      >
        <div style={{ flexGrow: '0', flexShrink: '0' }}>
          <IconComponent
            style={{ color: iconColor, ...iconStyles }}
          />
        </div>
        <div style={{ color: textColor, textAlign: 'center', flexGrow: '1', flexShrink: '1', marginLeft: iconToTextGap }}>
          {text}
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions*/
  }
}

export default PictureLinkComponent
