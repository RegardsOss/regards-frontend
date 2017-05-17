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
  return (<ActionButtonComponent
    button={RaisedButton}
    primary
    {...props}
  />)
}
MainActionButtonComponent.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  url: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.string),
  onTouchTap: PropTypes.func,
  isVisible: PropTypes.bool,
  disabled: PropTypes.bool,
}
export default MainActionButtonComponent
