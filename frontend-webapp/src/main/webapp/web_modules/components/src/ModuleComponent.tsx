/** @module common */
import * as React from "react"
import ShowableAtMount from "./ShowableAtMount"

interface ModuleComponentProps {
// TODO
}

interface ModuleComponentState {
// TODO
}


/**
 * TODO
 */
class ModuleComponent extends React.Component<ModuleComponentProps, ModuleComponentState> {
  getModuleVisibility (): Boolean {
    return true
  }

  render (): JSX.Element {
    return (
      <ShowableAtMount show={this.getModuleVisibility()}>
        { this.props.children }
      </ShowableAtMount>
    )
  }

}

export default ModuleComponent
