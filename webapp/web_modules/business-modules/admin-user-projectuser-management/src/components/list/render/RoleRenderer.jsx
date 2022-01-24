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
import find from 'lodash/find'
import { AdminDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display fragment name for an attribute model
 * @author Sébastien Binda
 * @author Théo Lasserre
 */
class RoleRenderer extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render = () => {
    const { entity } = this.props
    const { intl: { formatMessage } } = this.context
    let roleName = entity.content.role.name
    const defaultRoleFound = find(AdminDomain.DEFAULT_ROLES_ENUM, (defaultRole) => defaultRole === roleName)
    if (defaultRoleFound) {
      roleName = formatMessage({ id: `projectUser.list.table.role.label.${roleName}` })
    }
    return roleName
  }
}
export default RoleRenderer
