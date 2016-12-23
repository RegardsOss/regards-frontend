import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

const RenderCheckbox = ({ input, label, meta: { error }, intl }, { muiTheme }) => {
  const checked = input.value === true
  return (
    <div>
      <Checkbox
        label={label}
        checked={checked}
        onCheck={input.onChange}
      />
      {error && (<span style={{ color: muiTheme.palette.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
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
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
  }),
  intl: React.PropTypes.shape({
    formatMessage: React.PropTypes.func,
  }),
}
export default RenderCheckbox
