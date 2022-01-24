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
import values from 'lodash/values'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'mdi-material-ui/Pencil'
import { NAVIGATION_ITEM_TYPES_ENUM } from '../../../../domain/NavigationItemTypes'
/**
 * Edit option for navigation edition table
 * @author Raphaël Mechali
 */
class EditOption extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(values(NAVIGATION_ITEM_TYPES_ENUM)).isRequired,
    id: PropTypes.number.isRequired,
    onEdit: PropTypes.func.isRequired,
    canEdit: PropTypes.bool.isRequired,
  }

  /** On edit clicked callback */
  onEdit = () => {
    const { type, id, onEdit } = this.props
    onEdit(type, id)
  }

  render() {
    const { canEdit } = this.props
    return (
      <IconButton disabled={!canEdit} onClick={this.onEdit}>
        <EditIcon />
      </IconButton>)
  }
}
export default EditOption
