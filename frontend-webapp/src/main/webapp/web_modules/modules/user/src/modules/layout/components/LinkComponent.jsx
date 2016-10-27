import * as React from "react"
import { Link } from "react-router"

interface LinkProps {
  to: string
  location: any
}

class Linkcomponent extends React.Component<LinkProps, any> {

  render (): JSX.Element {
    // to props is passed throught the react component creation
    // children props is the children of te curent component. This props is autmatically set
    // by react when creatin the component.
    const {to, children} = this.props
    const style = {"fontSize": "20px", "lineHeight": "50px", margin: "0px 20px", "textDecoration": "none"}
    const activeStyle = {'borderBottom': '2px solid Red'}
    return (
      <Link
        to={to}
        activeStyle={activeStyle}
        style={style}>
        {children}
      </Link>
    )
  }
}

export default Linkcomponent
