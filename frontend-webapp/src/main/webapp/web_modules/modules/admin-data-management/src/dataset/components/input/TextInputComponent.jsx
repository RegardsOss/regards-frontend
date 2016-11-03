
import TextField from 'material-ui/TextField'


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
      throw new Error(`The type [${props.type}] is not accepted. Accepted types: ${allowedTypes}`)
    }
  }

  getValue = () => {
    const { value } = this.state
    return value
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

  isDefaultValue = () => {
    const { value } = this.state
    return value === ''
  }

  render() {
    const { label, value, type, fullWidth } = this.props
    return (
      <TextField
        type={type}
        defaultValue={value}
        floatingLabelText={label}
        fullWidth={fullWidth}
        onChange={this.handleInputChange}
      />
    )
  }
}
TextInputComponent.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  value: React.PropTypes.number,
  type: React.PropTypes.string,
  onValueChange: React.PropTypes.func,
  fullWidth: React.PropTypes.bool,
}
export default TextInputComponent
