import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

class OnHoverSwitchRaisedButton extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.state = {
      label: this.props.baseLabel,
      backgroundColor: this.props.baseColor,
      icon: React.createElement(this.props.baseIcon)
    }
  }

  handleOnMouseEnter = () => {
    this.setState({
      label: this.props.hoverLabel,
      backgroundColor: this.props.hoverColor,
      icon: React.createElement(this.props.hoverIcon)
    })
  }

  handleOnMouseLeave = () => {
    this.setState({
      label: this.props.baseLabel,
      backgroundColor: this.props.baseColor,
      icon: React.createElement(this.props.baseIcon)
    })
  }

  render() {
    return (
      <RaisedButton
        label={this.state.label}
        backgroundColor={this.state.backgroundColor}
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseLeave}
        icon={this.state.icon}
        onTouchTap={this.props.onTouchTap}
      />
    )
  }
}

OnHoverSwitchRaisedButton.propTypes = {
  baseLabel: React.PropTypes.string.isRequired,
  baseColor: React.PropTypes.string.isRequired,
  baseIcon: React.PropTypes.func.isRequired,
  hoverLabel: React.PropTypes.string.isRequired,
  hoverColor: React.PropTypes.string.isRequired,
  hoverIcon: React.PropTypes.func.isRequired,
  onTouchTap: React.PropTypes.func,
}

export default OnHoverSwitchRaisedButton
