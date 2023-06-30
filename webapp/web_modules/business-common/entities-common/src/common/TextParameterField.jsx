/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
