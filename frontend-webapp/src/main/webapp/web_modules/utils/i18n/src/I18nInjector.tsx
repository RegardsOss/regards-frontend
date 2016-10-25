/** @module common */
import * as React from "react"
import { intlShape } from "react-intl"

/**
 * Retrieves intl fom the context
 * and injects it as a prop to its child
 */
class I18nInjector extends React.Component<any, any> {

  static contextTypes: Object = {
    intl: intlShape
  }
  context: any

  mapContextToChildProps = () => ({
    intl: this.context.intl
  })

  render(): JSX.Element {
    const child = React.Children.only(this.props.children)
    return React.cloneElement(child, this.mapContextToChildProps())
  }
}

export default I18nInjector
