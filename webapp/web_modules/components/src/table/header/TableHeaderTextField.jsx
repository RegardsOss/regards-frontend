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
import TextField from 'material-ui/TextField'
import { themeContextType } from '@regardsoss/theme'

/**
 * Adapated text field for table header (just adds styles to a common text field then reports all properties)
 * @author Raphaël Mechali
 */
class TableHeaderTextField extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { header: { textfield } } } = this.context
    return (
      <TextField
        style={textfield.textStyle}
        {...this.props}
      />
    )
  }
}
export default TableHeaderTextField
