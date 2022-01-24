/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { themeContextType } from '@regardsoss/theme'

/**
 * A link with picture, usable in already overloaded screens to make it look 'lighter'
 */
class PictureLinkComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    IconComponent: PropTypes.func.isRequired,
    onAction: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    iconStyles: PropTypes.object,
    iconToTextGap: PropTypes.string,
    defaultTextColor: PropTypes.string,
    overTextColor: PropTypes.string,
    defaultImageColor: PropTypes.string,
    disabledTextColor: PropTypes.string,
    disabledImageColor: PropTypes.string,
    overImageColor: PropTypes.string,
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

  static ROOT_STYLES = {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  static ICON_CONTAINER_STYLE = {
    flexGrow: '0',
    flexShrink: '0',
  }

  state = {
    isOver: false,
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
    const {
      className, disabled, text, IconComponent, iconStyles, iconToTextGap,
    } = this.props
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
    return (
      <div
        className={className}
        style={PictureLinkComponent.ROOT_STYLES}
        onClick={this.onAction}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
      >
        <div style={PictureLinkComponent.ICON_CONTAINER_STYLE}>
          <IconComponent
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            style={{ // eslint wont fix: requires context data, not accurate outside render
              color: imageColor,
              ...iconStyles,
            }}
          />
        </div>
        { /* eslint-disable-next-line react-perf/jsx-no-new-object-as-prop */ }
        <div style={{ // eslint wont fix: requires context information, not accurate outside render
          color: textColor,
          textAlign: 'center',
          flexGrow: '1',
          flexShrink: '1',
          marginLeft: iconToTextGap,
        }}
        >
          {text}
        </div>
      </div>
    )
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

export default PictureLinkComponent
