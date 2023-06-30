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
import { themeContextType } from '@regardsoss/theme'
import Chip from 'material-ui/Chip'
import find from 'lodash/find'
import {
  DataManagementShapes,
} from '@regardsoss/shape'

/**
 * Shows a user group chip, allowing delete operation
 * @author Raphaël Mechali
 */
class UserGroupChip extends React.Component {
  static propTypes = {
    groupName: PropTypes.string.isRequired,
    isAdded: PropTypes.bool.isRequired, // We can remove added group. We cannot remove initialized public group.
    groupList: DataManagementShapes.AccessGroupList,
    onRemoveGroup: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: removes this group (only if group is not public)
   */
  onRemoveGroup = () => {
    const {
      groupName, onRemoveGroup,
    } = this.props
    onRemoveGroup(groupName)
  }

  render() {
    const { groupName, groupList, isAdded } = this.props
    const { moduleTheme: { userForm: { chip } } } = this.context
    const groupFound = find(groupList, (group) => group.content.name === groupName)
    if (groupFound && groupFound.content.isPublic && !isAdded) {
      return (
        <Chip
          style={chip}
          key={groupName}
        >
          {groupName}
        </Chip>
      )
    }
    return (
      <Chip
        onRequestDelete={this.onRemoveGroup}
        style={chip}
        key={groupName}
      >
        {groupName}
      </Chip>
    )
  }
}
export default UserGroupChip
