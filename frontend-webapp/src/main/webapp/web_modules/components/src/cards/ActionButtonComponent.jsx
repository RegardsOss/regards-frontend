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
    const { button } = this.props
    return (
      <ShowableAtRender show={this.props.isVisible}>
        {(() => {
          if (this.props.url) {
            return (
              <Link
                to={this.props.url}
                style={this.props.style}
              >
                {this.getComponent(this.props.button, {
                  label: this.props.label,
                  primary: this.props.primary,
                  secondary: this.props.secondary,
                })}
              </Link>
            )
          }
          return (
            this.getComponent(this.props.button, {
              label: this.props.label,
              primary: this.props.primary,
              secondary: this.props.secondary,
              onTouchTap: this.props.onTouchTap,
            })
          )
        })()}
      </ShowableAtRender>
    )
  }
}

export default ActionButtonComponent
