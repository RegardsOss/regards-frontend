import * as React from "react"
/*
interface ShowableAtMountProps {
  show: Boolean
}

interface ShowableAtMountState {
// TODO
}*/

class ShowableAtMount extends React.Component {


  constructor () {
    super()
    this.oldRender = this.render
    this.render = () => {
      return null
    }
  }

  render () {
    return (<div>{this.props.children}</div>)
  }

  componentWillMount () {
    if (this.props.show)
      this.render = this.oldRender
  }

}

export default ShowableAtMount
