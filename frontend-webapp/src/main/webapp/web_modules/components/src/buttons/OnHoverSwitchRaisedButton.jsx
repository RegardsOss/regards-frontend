import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import mapValues from 'lodash/mapValues'

/**
 * Decorates the material-ui's RaisedButton in order to handle an entirely specific behaviour on button hover.
 *
 * The component expects for each prop a 2-lenght array argument instead of a single value.
 * The first value will be used as default and the second will be used on button hover.
 */
class OnHoverSwitchRaisedButton extends React.Component {

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
    const usedProps = mapValues(this.props, prop => prop[this.state.usedPropIndex])
    usedProps.onMouseEnter = this.handleOnMouseEnter
    usedProps.onMouseLeave = this.handleOnMouseLeave

    return (
      <RaisedButton {...usedProps} />
    )
  }
}

OnHoverSwitchRaisedButton.propTypes = mapValues(RaisedButton.propTypes, propType => PropTypes.arrayOf(propType))
OnHoverSwitchRaisedButton.propTypes.label = PropTypes.arrayOf(PropTypes.string)

export default OnHoverSwitchRaisedButton
