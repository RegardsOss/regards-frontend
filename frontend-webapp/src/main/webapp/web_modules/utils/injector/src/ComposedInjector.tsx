/** @module common */
import * as React from "react"
import { intlShape } from "react-intl"
import { ThemeContextType } from "@regardsoss/theme"

/**
 * Retrieves intl fom the context
 * and injects it as a prop to its child
 */
class ComposedInjector extends React.Component<any, any> {

  static contextTypes: Object = {
    muiTheme: ThemeContextType.muiTheme,
    intl: intlShape
  }
  context: any

  mapContextToChildProps = () => ({
    intl: this.context.intl,
    theme: this.context.muiTheme
  })

  render (): JSX.Element {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
    // const mergedContexts = _
    //   .chain(this.props.injectors)
    //   .map((injector: any) => React.createElement(injector, {}, child))
    //   .keyBy((injector: any) => _.keys(injector.props.map))
    //   .value()
  }
}

export default ComposedInjector
