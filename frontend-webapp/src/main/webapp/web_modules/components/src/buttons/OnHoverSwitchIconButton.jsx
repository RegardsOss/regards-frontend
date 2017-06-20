import React from 'react'
import IconButton from 'material-ui/IconButton'
import mapValues from 'lodash/mapValues'

/**
 * Decorates the material-ui's IconButton in order to handle an entirely specific behaviour on button hover.
 *
 * The component expects for each prop a 2-lenght array argument instead of a single value.
 * The first value will be used as default and the second will be used on button hover.
 */
class OnHoverSwitchIconButton extends React.Component {

  static propTypes = {
    children: PropTypes.element,
    onTouchTap: PropTypes.arrayOf(PropTypes.func),
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
    const { children, onTouchTap, ...otherProps } = this.props
    return (
      <span onMouseEnter={this.handleOnMouseEnter} onMouseLeave={this.handleOnMouseLeave}>
        <IconButton
          onTouchTap={onTouchTap[this.state.usedPropIndex]}
          {...otherProps}
        >
          {children[this.state.usedPropIndex]}
        </IconButton>
      </span >
    )
  }
}

OnHoverSwitchIconButton.propTypes = mapValues(IconButton.propTypes, propType => PropTypes.arrayOf(propType))
OnHoverSwitchIconButton.propTypes.label = PropTypes.arrayOf(PropTypes.string)

export default OnHoverSwitchIconButton
