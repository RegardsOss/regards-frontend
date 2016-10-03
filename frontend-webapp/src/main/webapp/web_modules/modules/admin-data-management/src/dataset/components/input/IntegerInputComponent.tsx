import * as React from "react"
import TextField from "material-ui/TextField"


interface IntegerInputProps {
  label: string | JSX.Element
  value?: number
  onValueChange?: (value: any) => void
  fullWidth?: boolean
}
/**
 */
class IntegerInputComponent extends React.Component<IntegerInputProps, any> {


  static defaultProps: any = {
    fullWidth: true
  }

  constructor (props: IntegerInputProps) {
    super(props)

    this.state = {
      value: null
    }
    if (props.value) {
      this.state.value = props.value
    }
  }

  handleInputChange = (event: React.FormEvent): any => {
    const newValue = (event.target as any).value
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
  getValue = (): number => {
    const {value} = this.state
    return parseInt(value, 10)
  }
  isDefaultValue = (): boolean => {
    const {value} = this.state
    return value === null
  }

  render (): JSX.Element {
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
