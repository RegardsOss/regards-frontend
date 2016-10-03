import * as React from "react"
import NavigationContainer from "./containers/NavigationContainer"

interface LayoutProps {
  project: string,
  location: any
}

class Layout extends React.Component<LayoutProps, any> {

  render (): JSX.Element {
    return (
      <div className="full-div">
        <div className="header">
          <h1> Test Application {this.props.project} </h1>
        </div>
        <NavigationContainer project={this.props.project} location={this.props.location}/>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
