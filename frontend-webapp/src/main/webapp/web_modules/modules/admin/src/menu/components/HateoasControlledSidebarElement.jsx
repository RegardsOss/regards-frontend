import { Link } from 'react-router'
import MenuItem from 'material-ui/MenuItem'
import { applyHateoasDisplayControl } from '@regardsoss/display-control'
/*
interface Props {
  to: string,
  linkStyle: any,
  primaryText: string,
  leftIcon: JSX.Element
}*/

export class SidebarElement extends React.Component {
  static propTypes = {
    to: React.PropTypes.string.isRequired,
    linkStyle: React.PropTypes.objectOf(React.PropTypes.string),
    primaryText: React.PropTypes.element.isRequired,
    leftIcon: React.PropTypes.element.isRequired,
  }
  render() {
    return (
      <Link to={this.props.to} style={this.props.linkStyle}>
        <MenuItem primaryText={this.props.primaryText} leftIcon={this.props.leftIcon} />
      </Link>
    )
  }
}

// Decorate it with the Hateoas display control logic
export default applyHateoasDisplayControl(SidebarElement)
