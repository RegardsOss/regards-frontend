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
    label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
    button: React.PropTypes.func,
    primary: React.PropTypes.bool,
    secondary: React.PropTypes.bool,
    url: React.PropTypes.string,
    onTouchTap: React.PropTypes.func,
    isVisible: React.PropTypes.bool,
    style: React.PropTypes.objectOf(React.PropTypes.string),
  }

  static defaultProps = {
    label: '',
    button: RaisedButton,
    primary: true,
    secondary: false,
    style: {},
    isVisible: true,
  }

  /**
   * Controls that props provided are correct
   * @param props
   */
  componentWillReceiveProps(props) {
    if (props.url === undefined && props.onTouchTap === undefined) {
      throw new Error('No behavior specified. Please specify props.url or props.onTouchTap')
    }
    if (props.url && props.url.length > 0 && typeof props.onTouchTap === 'function') {
      throw new Error('Too many behavior specified. Please specify either props.url or props.onTouchTap')
    }
  }

  getComponent = (Component, props) => (
    <Component {...props} />
  )

  render() {
    const { button, isVisible, url, style, label, primary, secondary, onTouchTap } = this.props
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
                  label,
                  primary,
                  secondary,
                })}
              </Link>
            )
          }
          return (
            this.getComponent(button, {
              label,
              primary,
              secondary,
              onTouchTap,
            })
          )
        })()}
      </ShowableAtRender>
    )
  }
}

export default ActionButtonComponent
