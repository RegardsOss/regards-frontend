/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import AddIcon from 'mdi-material-ui/Plus'
import { DataManagementShapes } from '@regardsoss/shape'

/**
 * Add attribute option
 * @author Raphaël Mechali
 */
class AddOption extends React.Component {
  static propTypes = {
    entity: DataManagementShapes.AttributeModel.isRequired,
    onAdd: PropTypes.func.isRequired,
  }

  /**
   * On user add callback
   */
  onAdd = () => {
    const { entity: { content: { jsonPath } }, onAdd } = this.props
    onAdd(jsonPath)
  }

  render() {
    return (
      <IconButton onClick={this.onAdd}>
        <AddIcon />
      </IconButton>
    )
  }
}
export default AddOption
