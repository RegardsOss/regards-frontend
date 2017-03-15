import React from 'react'
import IconButton from 'material-ui/IconButton'
import { mapValues } from 'lodash'

/**
 * Decorates the material-ui's IconButton in order to handle an entirely specific behaviour on button hover.
 *
 * The component expects for each prop a 2-lenght array argument instead of a single value.
 * The first value will be used as default and the second will be used on button hover.
 */
class OnHoverSwitchIconButton extends React.Component {

  static propTypes = {
    children: React.PropTypes.element,
    onTouchTap: React.PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      usedPropIndex: 0,
    }
  }

  handleOnMouseEnter = () => {
    this.setState({
      usedPropIndex: 1,
    })
  }

  handleOnMouseLeave = () => {
    this.setState({
      usedPropIndex: 0,
    })
  }

  render() {
    const { children, ...otherProps } = this.props
    return (
      <span onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave} >
        <IconButton {...otherProps}>
          {children[this.state.usedPropIndex]}
        </IconButton>
      </span >
    )
  }
}

OnHoverSwitchIconButton.propTypes = mapValues(IconButton.propTypes, propType => React.PropTypes.arrayOf(propType))
OnHoverSwitchIconButton.propTypes.label = React.PropTypes.arrayOf(React.PropTypes.string)

export default OnHoverSwitchIconButton
