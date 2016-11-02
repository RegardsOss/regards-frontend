/** @module common */
import * as React from "react"
import ShowableAtMount from "./ShowableAtMount"
/*

interface ModuleComponentProps {
// TODO
}

interface ModuleComponentState {
// TODO
}
*/


/**
 * TODO
 */
class ModuleComponent extends React.Component {
  getModuleVisibility () {
    return true
  }

  render () {
    return (
      <ShowableAtMount show={this.getModuleVisibility()}>
        { this.props.children }
      </ShowableAtMount>
    )
  }

}

export default ModuleComponent
