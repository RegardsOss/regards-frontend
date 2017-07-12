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
import SelectField from 'material-ui/SelectField'
import RenderHelper from './RenderHelper'

const renderSelectField = ({ input, label, meta: { touched, error }, fullWidth, children, disabled, onSelect, intl, ...rest }) => {
  const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
  return (
    <SelectField
      floatingLabelText={label}
      errorText={errorMessage}
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
}
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
