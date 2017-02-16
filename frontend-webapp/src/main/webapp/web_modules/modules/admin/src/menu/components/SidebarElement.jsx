/**
 * @author lmieulet
 */
import { Link } from 'react-router'
import MenuItem from 'material-ui/MenuItem'
import getModuleStyles from '../../styles/styles'

class SidebarElement extends React.Component {
  static propTypes = {
    to: React.PropTypes.string.isRequired,
    primaryText: React.PropTypes.element.isRequired,
    leftIcon: React.PropTypes.element.isRequired,
  }

  render() {
    const style = getModuleStyles()

    return (
      <Link to={this.props.to} style={style.menu.link}>
        <MenuItem primaryText={this.props.primaryText} leftIcon={this.props.leftIcon} />
      </Link>
    )
  }
}
export default SidebarElement
