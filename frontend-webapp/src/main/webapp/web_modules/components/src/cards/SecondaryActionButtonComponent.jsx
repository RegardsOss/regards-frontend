import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'
import ActionButtonComponent from './ActionButtonComponent'

/**
 * Generic back button
 */
function SecondaryActionButtonComponent(props) {
  return (<ActionButtonComponent
    button={FlatButton}
    secondary
    {...props}
  />)
}
SecondaryActionButtonComponent.propTypes = {
  label: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.element).isRequired,
  url: React.PropTypes.string,

  style: React.PropTypes.objectOf(React.PropTypes.string),
  onTouchTap: React.PropTypes.func,
  isVisible: React.PropTypes.bool,
}

export default SecondaryActionButtonComponent
