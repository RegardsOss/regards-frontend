
import TextField from 'material-ui/TextField'

/*
interface TextInputProps {
  label: string | JSX.Element
  value?: string
  type?: string
  onValueChange?: (value: any) => void
  fullWidth?: boolean
}*/
/**
 */
class TextInputComponent extends React.Component {

  static defaultProps = {
    fullWidth: true,
    type: 'text',
  }

  constructor(props) {
    super(props)

    this.state = {
      value: '',
    }
    if (props.value) {
      this.state.value = props.value
    }
  }

  /**
   * Controls that props provided are correct
   * @param props
   */
  componentWillReceiveProps = (props) => {
    const allowedTypes = ['text', 'password']
    if (props.type !== undefined && allowedTypes.indexOf(props.type) === -1) {
      throw `The type [${props.type}] is not accepted. Accepted types: ${allowedTypes}`
    }
  }

  handleInputChange = (event) => {
    const newValue = event.target.value
    if (this.props.onValueChange === undefined) {
      this.setState({
        value: newValue,
      })
    } else {
      this.props.onValueChange(newValue)
    }
  }
  getValue = () => {
    const { value } = this.state
    return value
  }
  isDefaultValue = () => {
    const { value } = this.state
    return value === ''
  }

  render() {
    const { label, value, type } = this.props
    return (
      <TextField
        type={type}
        defaultValue={value}
        floatingLabelText={label}
        fullWidth
        onChange={this.handleInputChange}
      />
    )
  }
}

export default TextInputComponent
