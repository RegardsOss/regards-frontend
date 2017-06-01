/**
 * LICENSE_PLACEHOLDER
 **/

/**
 * @author lmieulet
 */
import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import getModuleStyles from '../../styles/styles'

class SidebarElement extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    currentPath: PropTypes.string,
    primaryText: PropTypes.string.isRequired,
    leftIcon: PropTypes.element.isRequired,
    rightIcon: PropTypes.element,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const style = getModuleStyles()
     // removes everything after the last / (/board etc.)
    const urlToSearch = this.props.to.substring(0, this.props.to.lastIndexOf('/') + 1).toLowerCase()

    const linkStyle = this.props.currentPath.toLowerCase().includes(urlToSearch) ?
      { backgroundColor: this.context.muiTheme.palette.primary1Color } : null

    return (
      <Link to={this.props.to} style={style.menu.link}>
        <MenuItem
          style={linkStyle}
          primaryText={this.props.primaryText}
          leftIcon={this.props.leftIcon}
          rightIcon={this.props.rightIcon}
        />
      </Link>
    )
  }
}
export default SidebarElement
