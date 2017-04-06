/**
 * LICENSE_PLACEHOLDER
 **/
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

const RenderCheckbox = ({ input, id, label, meta: { touched, error }, intl }, { muiTheme }) => {
  const checked = input.value === true
  return (
    <div>
      <Checkbox
        id={id}
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
  label: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
  input: React.PropTypes.shape({
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }),
  id: React.PropTypes.string,
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
    touched: React.PropTypes.bool,
  }),
  intl: React.PropTypes.shape({
    formatMessage: React.PropTypes.func,
  }),
}
export default RenderCheckbox
