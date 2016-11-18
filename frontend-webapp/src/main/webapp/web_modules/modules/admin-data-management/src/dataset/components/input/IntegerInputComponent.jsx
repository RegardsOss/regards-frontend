import TextField from 'material-ui/TextField'

/**
 */
class IntegerInputComponent extends React.Component {

  static defaultProps = {
    fullWidth: true,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: null,
    }
    if (props.value) {
      this.state.value = props.value
    }
  }

  /**
   * Provides a getter when this parent component has a ref for this component
   * @returns {number}
   */
  getValue = () => {
    const { value } = this.state
    return parseInt(value, 10)
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
    return value === null
  }
  render() {
    const { label, value, fullWidth } = this.props
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
IntegerInputComponent.propTypes = {
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]).isRequired,
  value: React.PropTypes.number,
  onValueChange: React.PropTypes.func,
  fullWidth: React.PropTypes.bool,
}
export default IntegerInputComponent
