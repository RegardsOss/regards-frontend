/**
 * LICENSE_PLACEHOLDER
 **/
import SelectField from 'material-ui/SelectField'

const renderSelectField = ({ input, label, meta: { touched, error }, fullWidth, children, disabled, onSelect, intl, ...rest }) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error && intl.formatMessage({ id: error })}
    {...input}
    fullWidth={fullWidth}
    onChange={(event, index, value) => {
      if (onSelect) {
        return onSelect(event, index, value, input)
      }
      return input.onChange(value)
    }}
    disabled={disabled}
    {...rest}
  >
    {children}
  </SelectField>
)
renderSelectField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  }),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.element),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
}
export default renderSelectField
