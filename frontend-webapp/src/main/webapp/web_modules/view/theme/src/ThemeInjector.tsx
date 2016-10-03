/** @module CommonTheme */
import * as React from "react"
import { ThemeContextType } from "./ThemeContainerInterface"

/**
 * Retrieves the Material UI theme fom the context
 * and injects it as a prop to its child
 */
class ThemeInjector extends React.Component<any, any> {

  static contextTypes: Object = {
    muiTheme: ThemeContextType.muiTheme
  }
  context: any

  mapContextToChildProps = () => ({
    theme: this.context.muiTheme
  })

  render(): JSX.Element {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
  }
}

export default ThemeInjector
