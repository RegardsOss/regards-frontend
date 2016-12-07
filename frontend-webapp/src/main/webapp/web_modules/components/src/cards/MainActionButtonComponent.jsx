import * as React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import ActionButtonComponent from './ActionButtonComponent'

/**
 * Generic back button
 */
/* interface MainActionButtonProps {
  label: string | JSX.Element
  url?: string
  style?: any
  onTouchTap?: (event: React.FormEvent) => void
  isVisible?: boolean
}*/
function MainActionButtonComponent(props) {
  console.log(props)
  return (<ActionButtonComponent
    button={RaisedButton}
    {...props}
  />)
}
MainActionButtonComponent.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  url: React.PropTypes.string,
  type: React.PropTypes.string,
  style: React.PropTypes.objectOf(React.PropTypes.string),
  onTouchTap: React.PropTypes.func,
  isVisible: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
}
export default MainActionButtonComponent
