/**
 * LICENSE_PLACEHOLDER
 **/
import { themeContextType } from '@regardsoss/theme'

/**
 * @auhtor Sébastien Binda
 */
class Title extends React.Component {

  static propTypes = {
    level: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  getLevelStyle = () => {
    const level = this.props.level ? this.props.level : 1
    const levelSize = level / 10
    const fontSize = 1 + (0.5 - levelSize)
    let color = this.context.muiTheme.palette.textColor
    switch (this.props.level) {
      case 0:
      case 1:
        color = this.context.muiTheme.palette.accent1Color
        break
      case 2:
        color = this.context.muiTheme.palette.accent2Color
        break
      default :
        color = this.context.muiTheme.palette.textColor
        break
    }
    return {
      color,
      fontSize: `${fontSize}em`,
      margin: '15px 0px',
    }
  }

  render() {
    return (
      <div style={this.getLevelStyle()}>
        {this.props.label}
      </div>
    )
  }

}

export default Title
