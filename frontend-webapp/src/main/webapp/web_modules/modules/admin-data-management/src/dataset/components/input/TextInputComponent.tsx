import * as React from "react"
import TextField from "material-ui/TextField"


interface TextInputProps {
  label: string | JSX.Element
  value?: string
  type?: string
  onValueChange?: (value: any) => void
  fullWidth?: boolean
}
/**
 */
class TextInputComponent extends React.Component<TextInputProps, any> {

  static defaultProps: any = {
    fullWidth: true,
    type: "text"
  }

  constructor (props: TextInputProps) {
    super(props)

    this.state = {
      value: ''
    }
    if (props.value) {
      this.state.value = props.value
    }
  }

  /**
   * Controls that props provided are correct
   * @param props
   */
  componentWillReceiveProps = (props: TextInputProps): void => {
    const allowedTypes = ["text", "password"]
    if (props.type !== undefined && allowedTypes.indexOf(props.type) === -1) {
      throw "The type [" + props.type + "] is not accepted. Accepted types: " + allowedTypes
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
  getValue = (): any => {
    const {value} = this.state
    return value
  }
  isDefaultValue = (): boolean => {
    const {value} = this.state
    return value === ''
  }

  render (): JSX.Element {
    const {label, value, type} = this.props
    return (
      <TextField
        type={type}
        defaultValue={value}
        floatingLabelText={label}
        fullWidth={true}
        onChange={this.handleInputChange}
      />
    )
  }
}

export default TextInputComponent
