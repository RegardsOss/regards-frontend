/**
 * LICENSE_PLACEHOLDER
 */

import AppBar from 'material-ui/AppBar'
import { themeContextType } from '@regardsoss/theme'

/**
 * App bar for modules needing it, renders low contrast on user interface, normal otherwise
 * Please note that the Context must be provided
 */
class ModuleAppBar extends React.Component {

  static propTypes = {
    userInterface: React.PropTypes.bool.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    titleStyle: React.PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    style: React.PropTypes.object,
    children: React.PropTypes.element,
  }

  static defaultProps = {
    userInterface: false,
  }

  /** I18N injection & themes */
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { userInterface, titleStyle, style, ...otherProps } = this.props
    const { muiTheme } = this.context

    // switch bar color, and text color
    const titleStyleModified = Object.assign({}, titleStyle || {}, userInterface ? { color: muiTheme.palette.textColor } : {})
    const styleModified = Object.assign({}, style || {}, userInterface ? { background: muiTheme.palette.canvas } : {})

    return (
      <AppBar style={styleModified} titleStyle={titleStyleModified} {...otherProps}>
        {this.props.children}
      </AppBar>
    )
  }
}

export default ModuleAppBar
