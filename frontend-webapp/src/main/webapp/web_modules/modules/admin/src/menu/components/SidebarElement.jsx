/**
 * @author lmieulet
 */
import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import MenuItem from 'material-ui/MenuItem'
import getModuleStyles from '../../styles/styles'

class SidebarElement extends React.Component {
  static propTypes = {
    to: React.PropTypes.string.isRequired,
    currentPath: React.PropTypes.string,
    primaryText: React.PropTypes.element.isRequired,
    leftIcon: React.PropTypes.element.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const style = getModuleStyles()
    let urlToSearch = ''

    // todo : /datamanagement doesn't work
    if (this.props.to.toLowerCase().includes('datamanagement')) {
      urlToSearch = undefined
    } else {
      // removes the last / and everything after it (/board etc.)
      urlToSearch = this.props.to.substring(0, this.props.to.lastIndexOf('/')).toLowerCase()
    }

    return (
      <Link to={this.props.to} style={style.menu.link}>
        <MenuItem
          style={
            this.props.currentPath.toLowerCase().includes(urlToSearch) ?
            { backgroundColor: this.context.muiTheme.baseTheme.palette.primary3Color } : null
          }
          primaryText={this.props.primaryText}
          leftIcon={this.props.leftIcon}
        />
      </Link>
    )
  }
}
export default SidebarElement
