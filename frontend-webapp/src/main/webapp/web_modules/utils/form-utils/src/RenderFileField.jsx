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
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  fullWidth: PropTypes.bool,
  accept: PropTypes.string,
}
export default RenderFileField
