/**
 * LICENSE_PLACEHOLDER
 **/
import TextField from 'material-ui/TextField'
import { themeContextType } from '@regardsoss/theme'

const adaptFileEventToValue = delegate =>
  e => delegate(e.target.files[0])

const RenderFileField = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...inputProps
  },
  meta: omitMeta,
  fullWidth,
  // Specifies the types of files that the server accepts
  accept,
  intl,
  ...props
}) => (
  <div>
    <br />
    <br />

    <TextField
      onChange={adaptFileEventToValue(onChange)}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      fullWidth={fullWidth}
      accept={accept}
      underlineShow={false}
      {...inputProps}
      {...props}
    />
  </div>
)
RenderFileField.contextTypes = {
  ...themeContextType,
}
RenderFileField.propTypes = {
  input: React.PropTypes.shape({
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
    onChange: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  }),
  meta: React.PropTypes.shape({
    error: React.PropTypes.string,
  }),
  intl: React.PropTypes.shape({
    formatMessage: React.PropTypes.func,
  }),
  fullWidth: React.PropTypes.bool,
  accept: React.PropTypes.string,
}
export default RenderFileField
