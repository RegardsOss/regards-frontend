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
    disabledTextColor: React.PropTypes.string,
    disabledImageColor: React.PropTypes.string,
    overImageColor: React.PropTypes.string,
  }

  static defaultProps = {
    iconStyles: {
      width: '20x',
      height: '20px',
    },
    disabled: false,
    iconToTextGap: '5px',
  }

  /** Inject current theme */
  static contextTypes = {
    ...themeContextType,
  }

  componentWillMount = () => {
    this.onExit()
  }


  onAction = () => {
    const { disabled, onAction } = this.props
    if (!disabled) {
      onAction()
    }
  }

  onEnter = () => {
    this.setState({
      isOver: true,
    })
  }

  onExit = () => {
    this.setState({
      isOver: false,
    })
  }


  render() {
    const { className, disabled, text, IconComponent, iconStyles, iconToTextGap } = this.props
    const { isOver } = this.state
    const { palette } = this.context.muiTheme

    // compute text colors according with provided properties (use some default otherwise)
    const {
      defaultTextColor = palette.textColor,
      overTextColor = palette.primary2Color,
      defaultImageColor = palette.primary1Color,
      overImageColor = palette.primary1Color,
      disabledTextColor = palette.disabledColor,
      disabledImageColor = palette.disabledColor,
    } = this.props

    // compute the colors to use in current state
    let textColor
    let imageColor
    if (disabled) {
      [textColor, imageColor] = [disabledTextColor, disabledImageColor]
    } else if (isOver) {
      [textColor, imageColor] = [overTextColor, overImageColor]
    } else {
      [textColor, imageColor] = [defaultTextColor, defaultImageColor]
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions*/
    return (
      <div
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', cursor: 'pointer' }}
        onClick={this.onAction}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
      >
        <div style={{ flexGrow: '0', flexShrink: '0' }}>
          <IconComponent
            style={{ color: imageColor, ...iconStyles }}
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
