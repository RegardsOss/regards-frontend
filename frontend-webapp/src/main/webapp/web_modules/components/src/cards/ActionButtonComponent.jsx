/**
 * LICENSE_PLACEHOLDER
 **/
import isFunction from 'lodash/isFunction'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
import ShowableAtRender from './ShowableAtRender'

/**
 * A generic button used for UI actions
 *
 * It can handle actions defined as:
 * - a url => it will use a <Link> component
 * - a onTouchTap callback
 */
class ActionButtonComponent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    button: PropTypes.func,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    url: PropTypes.string,
    onTouchTap: PropTypes.func,
    isVisible: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.string),
    type: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    label: '',
    button: RaisedButton,
    primary: false,
    secondary: false,
    style: {},
    isVisible: true,
    type: 'button',
  }

  /**
   * Controls that props provided are correct
   * @param props
   */
  componentWillReceiveProps(props) {
    if (props.type === 'submit') {
      // Clicking on this button will submit the parent form
    } else if (props.url === undefined && props.onTouchTap === undefined) {
      throw new Error('No behavior specified. Please specify props.url or props.onTouchTap')
    } else if (props.url && props.url.length > 0 && isFunction(props.onTouchTap)) {
      throw new Error('Too many behavior specified. Please specify either props.url or props.onTouchTap')
    }
  }

  getComponent = (Component, props) => (
    <Component {...props} />
  )

  render() {
    const { className, button, isVisible, disabled, url, style, label, primary, secondary, onTouchTap, type } = this.props
    return (
      <ShowableAtRender show={isVisible}>
        {(() => {
          if (url) {
            return (
              <Link
                to={url}
                style={style}
              >
                {this.getComponent(button, {
                  className,
                  label,
                  primary,
                  secondary,
                  type,
                  disabled,
                })}
              </Link>
            )
          }
          return (
            this.getComponent(button, {
              className,
              label,
              primary,
              secondary,
              onTouchTap,
              type,
              disabled,
            })
          )
        })()}
      </ShowableAtRender>
    )
  }
}

export default ActionButtonComponent
