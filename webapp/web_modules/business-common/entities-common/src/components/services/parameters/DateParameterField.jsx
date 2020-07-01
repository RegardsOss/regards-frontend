/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { RenderDateTimeField, Field, ErrorTypes } from '@regardsoss/form-utils'

/**
* Date parameter field
* @author Raphaël Mechali
*/
class DateParameterField extends React.Component {
  static propTypes = {
    // field name
    name: PropTypes.string.isRequired,
    // field label
    label: PropTypes.string.isRequired,
    // is the parameter required? (for auto validation)
    required: PropTypes.bool.isRequired,
  }

  /**
   * Validate the field value (redux form field validator)
   * @param value value to validate
   * @return error when any error, undefined otherwise
   */
  validate = (value) => this.props.required && !value ? ErrorTypes.REQUIRED : undefined

  render() {
    const { name, label } = this.props
    return (
      <Field
        name={name}
        label={label}
        component={RenderDateTimeField}
        fullWidth
        validate={this.validate}
      />
    )
  }
}
export default DateParameterField
