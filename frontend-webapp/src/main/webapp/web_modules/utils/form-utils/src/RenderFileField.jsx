/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
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
