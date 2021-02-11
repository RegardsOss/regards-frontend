/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import MenuItem from 'material-ui/MenuItem'
import { RenderSelectField, Field } from '@regardsoss/form-utils'

/**
 * Choice parameter field
 * @author Raphaël Mechali
 */
class ChoiceParameterField extends React.Component {
  static propTypes = {
    // field name
    name: PropTypes.string.isRequired,
    // field label
    label: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  render() {
    const { name, label, choices } = this.props
    return (
      <Field
        name={name}
        label={label}
        component={RenderSelectField}
        fullWidth
      >
        {
          choices.map((choice) => <MenuItem key={choice} value={choice} primaryText={choice} />)
        }
      </Field>
    )
  }
}
export default ChoiceParameterField
