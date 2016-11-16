/** @module common */
import * as React from 'react'
import ShowableAtMount from './ShowableAtMount'


/**
 * TODO
 */
function ModuleComponent(props) {
  return (
    <ShowableAtMount show>
      { props.children }
    </ShowableAtMount>
  )
}

ModuleComponent.propTypes = {
  children: React.PropTypes.element.isRequired,
}

export default ModuleComponent
