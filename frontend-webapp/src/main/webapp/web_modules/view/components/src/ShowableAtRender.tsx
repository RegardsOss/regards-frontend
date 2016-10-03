/** @module common */
import * as React from "react"

interface ShowableAtRenderProps {
  show: Boolean
}

interface ShowableAtRenderState {
  // TODO
}


/**
 * TODO
 */
class ShowableAtRender extends React.Component<ShowableAtRenderProps, ShowableAtRenderState> {

  render (): JSX.Element {
    if (this.props.show) {
      const children: any = this.props.children
      if (React.Children.count(children) === 1) {
        return React.Children.only(children)
      }
      return (<div>{children}</div>)
    }
    return null
  }
}

export default ShowableAtRender
