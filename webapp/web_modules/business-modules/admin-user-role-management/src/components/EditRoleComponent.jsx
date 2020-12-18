/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import EditIcon from 'mdi-material-ui/Pencil'
import { AdminShapes } from '@regardsoss/shape'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction } from '@regardsoss/components'

/**
 * Delete role component for role list
 * @author Raphaël Mechali
 */
class EditRoleComponent extends React.Component {
  static propTypes = {
    role: AdminShapes.Role.isRequired,
    onEdit: PropTypes.func.isRequired, // callback like roleName => ()
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: on edit role
   */
  onEdit = () => {
    const { role, onEdit } = this.props
    onEdit(role.content.name)
  }

  render() {
    const { role } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <HateoasIconAction
        entityLinks={role.links}
        hateoasKey={HateoasKeys.UPDATE}
        onClick={this.onEdit}
        title={formatMessage({ id: 'role.edit.action.title' })}
      >
        <EditIcon hoverColor={moduleTheme.hoverButtonEdit} />
      </HateoasIconAction>)
  }
}
export default EditRoleComponent
