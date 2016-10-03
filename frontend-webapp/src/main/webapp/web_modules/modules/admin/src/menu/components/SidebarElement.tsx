/** @module AdminMenu */
import * as React from "react"
import { Link } from "react-router"
import MenuItem from "material-ui/MenuItem"
import { applyHateoasDisplayControl } from "@regardsoss/display-control"

interface Props {
  to: string,
  linkStyle: any,
  primaryText: string,
  leftIcon: JSX.Element
}

export default class SidebarElement extends React.Component<Props, any> {

  render (): JSX.Element {
    return (
      <Link to={this.props.to} style={this.props.linkStyle}>
        <MenuItem primaryText={this.props.primaryText} leftIcon={this.props.leftIcon}/>
      </Link>
    )
  }
}

// Decorate it with the Hateoas display control logic
export const HateoasControlledSidebarElement = applyHateoasDisplayControl(SidebarElement)
