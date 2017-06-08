/**
 * LICENSE_PLACEHOLDER
 **/
import FlatButton from 'material-ui/FlatButton'
import ActionButtonComponent from './ActionButtonComponent'

/**
 * Generic back button
 */
function SecondaryActionButtonComponent(props) {
  return (<ActionButtonComponent
    button={FlatButton}
    {...props}
  />)
}
SecondaryActionButtonComponent.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  url: PropTypes.string,

  style: PropTypes.objectOf(PropTypes.string),
  onTouchTap: PropTypes.func,
  isVisible: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default SecondaryActionButtonComponent
