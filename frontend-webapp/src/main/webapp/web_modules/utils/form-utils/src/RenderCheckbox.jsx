/**
 * LICENSE_PLACEHOLDER
 **/
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

const RenderCheckbox = ({ input, className, label, meta: { touched, error }, intl }, { muiTheme }) => {
  const checked = input.value === true
  return (
    <div>
      <Checkbox
        className={className}
        label={label}
        checked={checked}
        onCheck={input.onChange}
      />
      {touched && error && (<span style={{ color: muiTheme.palette.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
    </div>
  )
}
RenderCheckbox.contextTypes = {
  ...themeContextType,
}
RenderCheckbox.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  className: PropTypes.string,
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
}
export default RenderCheckbox
