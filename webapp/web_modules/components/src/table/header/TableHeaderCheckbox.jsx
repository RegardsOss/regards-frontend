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
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

/**
 * Table header check box: It uses the CheckBox API and customizes styles for table header.
 * @author Raphaël Mechali
 */
class TableHeaderCheckbox extends React.Component {
  static propTypes = {
    // This component accepts all properties of Checkbox
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const { moduleTheme: { header: { checkbox } } } = this.context
    return (
      <Checkbox
        style={checkbox}
        {...this.props}
      />
    )
  }
}
export default TableHeaderCheckbox
