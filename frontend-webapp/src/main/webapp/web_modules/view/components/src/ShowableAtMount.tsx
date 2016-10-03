import * as React from "react"

interface ShowableAtMountProps {
  show: Boolean
}

interface ShowableAtMountState {
// TODO
}

class ShowableAtMount extends React.Component<ShowableAtMountProps, ShowableAtMountState> {

  oldRender: () => React.ReactElement<any>

  constructor () {
    super()
    this.oldRender = this.render
    this.render = () => {
      return null
    }
  }

  render (): JSX.Element {
    return (<div>{this.props.children}</div>)
  }

  componentWillMount (): any {
    if (this.props.show)
      this.render = this.oldRender
  }

}

export default ShowableAtMount
