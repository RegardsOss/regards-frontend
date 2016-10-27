import * as React from "react"
import TextField from "material-ui/TextField"

/*
interface IntegerInputProps {
  label: string | JSX.Element
  value?: number
  onValueChange?: (value: any) => void
  fullWidth?: boolean
}*/
/**
 */
class IntegerInputComponent extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      value: null
    }
    if (props.value) {
      this.state.value = props.value
    }
  }

  static defaultProps = {
    fullWidth: true
  }

  handleInputChange = (event) => {
    const newValue = event.target.value
    if (this.props.onValueChange === undefined) {
      this.setState({
        value: newValue
      })
    } else {
      this.props.onValueChange(newValue)
    }
  }
  /**
   * Provides a getter when this parent component has a ref for this component
   * @returns {number}
   */
  getValue = ()  => {
    const {value} = this.state
    return parseInt(value, 10)
  }
  isDefaultValue = ()  => {
    const {value} = this.state
    return value === null
  }

  render () {
    const {label, value, fullWidth} = this.props
    return (
      <TextField
        type="number"
        defaultValue={value}
        floatingLabelText={label}
        fullWidth={fullWidth}
        onChange={this.handleInputChange}
      />
    )
  }
}

export default IntegerInputComponent
