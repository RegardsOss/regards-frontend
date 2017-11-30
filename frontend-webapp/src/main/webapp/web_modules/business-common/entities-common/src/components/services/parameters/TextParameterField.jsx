/**
* LICENSE_PLACEHOLDER
**/
import { RenderTextField, Field, ErrorTypes } from '@regardsoss/form-utils'

/**
 * String parameter field
 * @author Raphaël Mechali
 */
class TextParameterField extends React.Component {
  static propTypes = {
    // field name
    name: PropTypes.string.isRequired,
    // field label
    label: PropTypes.string.isRequired,
    // input validor (if not free input)
    validator: PropTypes.func,
    // is the parameter required? (for auto validation)
    required: PropTypes.bool.isRequired,
  }

  /**
   * Validates input
   */
  validate = (value) => {
    const { required, validator } = this.props
    if (required && !value) {
      return ErrorTypes.REQUIRED
    }
    return validator ? validator(value) : undefined
  }

  render() {
    const { name, label } = this.props
    return (
      <Field
        name={name}
        component={RenderTextField}
        label={label}
        type="text"
        validate={this.validate}
        fullWidth
      />
    )
  }
}
export default TextParameterField
